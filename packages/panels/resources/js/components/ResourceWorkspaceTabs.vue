<template>
    <div v-if="tabs.length > 0" class="mt-4 mb-6">
        <div class="overflow-x-auto pb-1">
            <div class="flex min-w-max items-center gap-2">
                <div
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="group inline-flex max-w-[18rem] items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors"
                    :class="tab.id === activeTabId
                        ? 'border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-600/60 dark:bg-primary-900/20 dark:text-primary-300'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600'"
                >
                    <a
                        :href="tab.url"
                        class="min-w-0 flex-1 truncate"
                        v-bind="workspace.spa ? { 'data-livue-navigate': 'true' } : {}"
                        @click.prevent="activateTab(tab)"
                    >
                        {{ tab.title || workspace.resourceLabel }}
                    </a>

                    <button
                        type="button"
                        class="inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-200"
                        :aria-label="workspace.closeTabLabel"
                        @click.stop.prevent="closeTab(tab)"
                    >
                        <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, onMounted, watch } from 'vue';

import { normalizeWorkspaceUrl, useResourceWorkspaceStore } from '../stores/resourceWorkspaceStore';

const props = defineProps({
    workspace: {
        type: Object,
        required: true,
    },
});

const livue = inject('livue');
const store = useResourceWorkspaceStore(livue);

const workspaceKey = computed(() => store.workspaceKey(props.workspace));

const tabs = computed(() => store.workspaces[workspaceKey.value]?.tabs ?? []);
const activeTabId = computed(() => store.workspaces[workspaceKey.value]?.activeTabId ?? null);

function navigate(url) {
    if (!url) {
        return;
    }

    if (props.workspace.spa) {
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('data-livue-navigate', 'true');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return;
    }

    window.location.href = url;
}

function syncCurrentTab() {
    if (!props.workspace.enabled) {
        return;
    }

    store.registerCurrent({
        ...props.workspace,
        currentUrl: typeof window !== 'undefined' ? window.location.href : props.workspace.currentUrl,
    });
}

function activateTab(tab) {
    store.setActiveTab(workspaceKey.value, tab.id);

    const currentUrl = normalizeWorkspaceUrl(
        typeof window !== 'undefined' ? window.location.href : props.workspace.currentUrl,
    );

    if (currentUrl === tab.url) {
        return;
    }

    navigate(tab.url);
}

function closeTab(tab) {
    const currentUrl = normalizeWorkspaceUrl(
        typeof window !== 'undefined' ? window.location.href : props.workspace.currentUrl,
    );
    const { closedActive, nextUrl } = store.closeTab(workspaceKey.value, tab.id);

    if (!closedActive) {
        return;
    }

    if (nextUrl) {
        navigate(nextUrl);

        return;
    }

    const fallbackUrl = normalizeWorkspaceUrl(props.workspace.indexUrl);

    if (fallbackUrl && fallbackUrl !== currentUrl) {
        navigate(props.workspace.indexUrl);
    }
}

onMounted(syncCurrentTab);

watch(
    () => [props.workspace.currentUrl, props.workspace.currentTitle, props.workspace.enabled],
    syncCurrentTab,
);
</script>
