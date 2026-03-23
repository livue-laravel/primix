const STORAGE_KEY = 'primix-resource-workspaces:v1';

function normalizeWorkspacePath(pathname) {
    if (typeof pathname !== 'string' || pathname === '') {
        return '/';
    }

    const collapsed = pathname.replace(/\/{2,}/g, '/');

    if (collapsed.length > 1 && collapsed.endsWith('/')) {
        return collapsed.slice(0, -1);
    }

    return collapsed;
}

function normalizeWorkspaceSearch(search) {
    if (typeof search !== 'string' || search === '') {
        return '';
    }

    const entries = Array.from(new URLSearchParams(search).entries())
        .sort(([aKey, aValue], [bKey, bValue]) => {
            if (aKey === bKey) {
                return aValue.localeCompare(bValue);
            }

            return aKey.localeCompare(bKey);
        });

    if (entries.length === 0) {
        return '';
    }

    return `?${new URLSearchParams(entries).toString()}`;
}

function normalizeWorkspaceTabId(id, normalizedUrl = null) {
    if (typeof id === 'string') {
        const trimmedId = id.trim();

        if (trimmedId.startsWith('key:') && trimmedId.length > 4) {
            return trimmedId;
        }

        const normalizedIdUrl = normalizeWorkspaceUrl(trimmedId);

        if (normalizedIdUrl !== null) {
            return normalizedIdUrl;
        }
    }

    return normalizedUrl;
}

function resolveCurrentTabId(workspace, normalizedUrl) {
    if (typeof workspace?.currentKey === 'string' && workspace.currentKey.trim() !== '') {
        return `key:${workspace.currentKey.trim()}`;
    }

    return normalizedUrl;
}

function dedupeWorkspaceTabs(tabs) {
    if (!Array.isArray(tabs) || tabs.length === 0) {
        return [];
    }

    const dedupedTabs = [];
    const dedupedTabsIndex = {};

    for (const tab of tabs) {
        if (!tab || typeof tab !== 'object') {
            continue;
        }

        const normalizedUrl = normalizeWorkspaceUrl(tab.url);

        if (normalizedUrl === null) {
            continue;
        }

        const normalizedTab = {
            id: normalizeWorkspaceTabId(tab.id, normalizedUrl),
            url: normalizedUrl,
            title: typeof tab.title === 'string' ? tab.title : '',
            updatedAt: typeof tab.updatedAt === 'number' ? tab.updatedAt : Date.now(),
        };

        const existingIndex = dedupedTabsIndex[normalizedTab.id];

        if (existingIndex === undefined) {
            dedupedTabsIndex[normalizedTab.id] = dedupedTabs.length;
            dedupedTabs.push(normalizedTab);

            continue;
        }

        const existingTab = dedupedTabs[existingIndex];
        const existingUpdatedAt = existingTab.updatedAt;

        if (existingTab.title.trim() === '' && normalizedTab.title.trim() !== '') {
            existingTab.title = normalizedTab.title;
        }

        existingTab.updatedAt = Math.max(existingUpdatedAt, normalizedTab.updatedAt);

        if (normalizedTab.updatedAt >= existingUpdatedAt) {
            existingTab.url = normalizedTab.url;
        }
    }

    return dedupedTabs;
}

export function normalizeWorkspaceUrl(url) {
    if (typeof url !== 'string' || url.trim() === '') {
        return null;
    }

    try {
        const parsed = new URL(url, window.location.origin);
        const pathname = normalizeWorkspacePath(parsed.pathname);
        const search = normalizeWorkspaceSearch(parsed.search);

        return `${pathname}${search}`;
    } catch {
        return null;
    }
}

function decodeWorkspaceState(raw) {
    if (!raw || typeof raw !== 'object') {
        return {};
    }

    const workspaces = {};

    for (const [key, workspace] of Object.entries(raw)) {
        if (!workspace || typeof workspace !== 'object') {
            continue;
        }

        const tabs = Array.isArray(workspace.tabs) ? workspace.tabs : [];
        const dedupedTabs = dedupeWorkspaceTabs(tabs);

        const activeTabId = normalizeWorkspaceTabId(workspace.activeTabId, null);

        workspaces[key] = {
            tabs: dedupedTabs,
            activeTabId: activeTabId && dedupedTabs.some((tab) => tab.id === activeTabId)
                ? activeTabId
                : null,
        };
    }

    return workspaces;
}

const storeDefinition = {
    state: () => ({
        hydrated: false,
        workspaces: {},
    }),
    actions: {
        workspaceKey(workspace) {
            const panelId = workspace?.panelId || 'default';
            const resourceSlug = workspace?.resourceSlug || 'resource';

            return `${panelId}::${resourceSlug}`;
        },

        hydrate() {
            if (this.hydrated || typeof window === 'undefined') {
                return;
            }

            try {
                const raw = window.localStorage.getItem(STORAGE_KEY);
                this.workspaces = decodeWorkspaceState(raw ? JSON.parse(raw) : {});
            } catch {
                this.workspaces = {};
            }

            this.hydrated = true;
            this.persist();
        },

        persist() {
            if (typeof window === 'undefined') {
                return;
            }

            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.workspaces));
        },

        ensureWorkspace(key) {
            if (!this.workspaces[key]) {
                this.workspaces[key] = {
                    tabs: [],
                    activeTabId: null,
                };
            }

            return this.workspaces[key];
        },

        registerCurrent(workspace) {
            this.hydrate();

            const key = this.workspaceKey(workspace);
            const url = normalizeWorkspaceUrl(workspace?.currentUrl);

            if (url === null) {
                return key;
            }

            const tabId = resolveCurrentTabId(workspace, url);
            const title = `${workspace?.currentTitle || workspace?.resourceLabel || 'Untitled'}`.trim();
            const state = this.ensureWorkspace(key);
            state.tabs = dedupeWorkspaceTabs(state.tabs);

            if (!state.tabs.some((tab) => tab.id === state.activeTabId)) {
                state.activeTabId = null;
            }

            const existing = state.tabs.find((tab) => tab.id === tabId || tab.url === url);

            if (existing) {
                existing.id = tabId;
                existing.url = url;
                existing.title = title || existing.title;
                existing.updatedAt = Date.now();
                state.activeTabId = existing.id;
            } else {
                const tab = {
                    id: tabId,
                    url,
                    title,
                    updatedAt: Date.now(),
                };

                state.tabs.push(tab);
                state.activeTabId = tab.id;
            }

            this.persist();

            return key;
        },

        setActiveTab(key, tabId) {
            this.hydrate();

            const state = this.ensureWorkspace(key);
            const tab = state.tabs.find((item) => item.id === tabId);

            if (!tab) {
                return;
            }

            state.activeTabId = tab.id;
            tab.updatedAt = Date.now();

            this.persist();
        },

        closeTab(key, tabId) {
            this.hydrate();

            const state = this.ensureWorkspace(key);
            const index = state.tabs.findIndex((tab) => tab.id === tabId);

            if (index === -1) {
                return {
                    closedActive: false,
                    nextUrl: null,
                };
            }

            const wasActive = state.activeTabId === tabId;

            state.tabs.splice(index, 1);

            if (!wasActive) {
                this.persist();

                return {
                    closedActive: false,
                    nextUrl: null,
                };
            }

            if (state.tabs.length === 0) {
                state.activeTabId = null;
                this.persist();

                return {
                    closedActive: true,
                    nextUrl: null,
                };
            }

            const nextIndex = index < state.tabs.length ? index : state.tabs.length - 1;
            const nextTab = state.tabs[nextIndex];

            state.activeTabId = nextTab.id;
            nextTab.updatedAt = Date.now();

            this.persist();

            return {
                closedActive: true,
                nextUrl: nextTab.url,
            };
        },
    },
};

export function useResourceWorkspaceStore(livue) {
    if (!livue || typeof livue.store !== 'function') {
        throw new Error('[Primix] Unable to resolve LiVue store helper for resource workspace tabs.');
    }

    return livue.store('primix-resource-workspace', storeDefinition, { scope: 'global' });
}
