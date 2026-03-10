<template>
    <!-- Trigger button (always visible in topbar) -->
    <div class="relative flex flex-1 items-center">
        <button
            type="button"
            class="flex flex-1 items-center gap-x-2 rounded-md px-3 py-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            @click="open"
        >
            <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
            </svg>
            <span class="hidden sm:inline">Search...</span>
            <kbd v-if="mode === 'spotlight'" class="hidden sm:inline-flex ml-auto items-center gap-x-0.5 rounded border border-gray-300 dark:border-gray-600 px-1.5 py-0.5 text-xs text-gray-400 font-sans">
                <abbr title="Command" class="no-underline">{{ isMac ? '&#8984;' : 'Ctrl' }}</abbr>K
            </kbd>
        </button>

        <!-- Dropdown mode: results panel -->
        <div
            v-if="mode === 'dropdown' && isOpen"
            ref="dropdownRef"
            class="absolute left-0 right-0 top-full mt-1 z-50 max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10"
        >
            <div class="p-3">
                <div class="relative">
                    <svg class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
                    </svg>
                    <input
                        ref="dropdownInputRef"
                        v-model="query"
                        type="search"
                        class="block w-full border-0 bg-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm"
                        placeholder="Search..."
                        @keydown.escape="close"
                        @keydown.down.prevent="moveSelection(1)"
                        @keydown.up.prevent="moveSelection(-1)"
                        @keydown.enter.prevent="selectCurrent"
                    >
                </div>
            </div>
            <search-results
                :groups="results"
                :loading="loading"
                :query="query"
                :selected-index="selectedIndex"
                :spa="spa"
                @select="navigateTo"
            />
        </div>
    </div>

    <!-- Spotlight mode: modal overlay -->
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="mode === 'spotlight' && isOpen"
                class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
                @click.self="close"
            >
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/75" @click="close"></div>

                <!-- Modal -->
                <div
                    ref="spotlightRef"
                    class="relative w-full max-w-xl rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                >
                    <!-- Search input -->
                    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                        <svg class="h-5 w-5 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
                        </svg>
                        <input
                            ref="spotlightInputRef"
                            v-model="query"
                            type="search"
                            class="block w-full border-0 bg-transparent py-4 pl-3 pr-3 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm"
                            placeholder="Search..."
                            @keydown.escape="close"
                            @keydown.down.prevent="moveSelection(1)"
                            @keydown.up.prevent="moveSelection(-1)"
                            @keydown.enter.prevent="selectCurrent"
                        >
                        <div v-if="loading" class="flex-shrink-0">
                            <svg class="h-5 w-5 animate-spin text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Results -->
                    <div class="max-h-80 overflow-y-auto">
                        <search-results
                            :groups="results"
                            :loading="loading"
                            :query="query"
                            :selected-index="selectedIndex"
                            :spa="spa"
                            @select="navigateTo"
                        />
                    </div>

                    <!-- Footer -->
                    <div v-if="results.length > 0" class="flex items-center justify-end gap-x-4 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-xs text-gray-400">
                        <span class="flex items-center gap-x-1">
                            <kbd class="rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans">&uarr;&darr;</kbd>
                            Navigate
                        </span>
                        <span class="flex items-center gap-x-1">
                            <kbd class="rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans">&crarr;</kbd>
                            Open
                        </span>
                        <span class="flex items-center gap-x-1">
                            <kbd class="rounded border border-gray-300 dark:border-gray-600 px-1 py-0.5 font-sans">Esc</kbd>
                            Close
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, nextTick, computed, defineComponent, inject, h } from 'vue';

// Inline sub-component for rendering search results
const SearchResults = defineComponent({
    name: 'SearchResults',
    props: {
        groups: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false },
        query: { type: String, default: '' },
        selectedIndex: { type: Number, default: -1 },
        spa: { type: Boolean, default: false },
    },
    emits: ['select'],
    setup(props, { emit }) {
        let flatIndex = -1;

        return () => {
            flatIndex = -1;

            // Empty state
            if (!props.loading && props.query.length >= 2 && props.groups.length === 0) {
                return h('div', { class: 'px-6 py-14 text-center text-sm text-gray-500 dark:text-gray-400' }, [
                    h('svg', {
                        class: 'mx-auto h-6 w-6 text-gray-400 mb-2',
                        fill: 'none',
                        viewBox: '0 0 24 24',
                        'stroke-width': '1.5',
                        stroke: 'currentColor',
                    }, [
                        h('path', {
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
                        }),
                    ]),
                    h('p', 'No results found.'),
                ]);
            }

            // No query yet
            if (props.query.length < 2 && props.groups.length === 0) {
                return null;
            }

            // Render groups
            return h('div', { class: 'py-2' }, props.groups.map(group => {
                return h('div', { key: group.label }, [
                    // Group header
                    h('div', { class: 'px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-x-2' }, [
                        group.label,
                        group.panelLabel ? h('span', {
                            class: 'inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300 normal-case tracking-normal',
                        }, group.panelLabel) : null,
                    ]),
                    // Results
                    ...group.results.map(result => {
                        flatIndex++;
                        const currentIndex = flatIndex;
                        const isSelected = currentIndex === props.selectedIndex;

                        return h('a', {
                            key: result.url,
                            href: result.url,
                            class: [
                                'flex items-center gap-x-3 px-4 py-2.5 cursor-pointer transition-colors',
                                isSelected
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50',
                            ],
                            ...(props.spa ? { 'data-livue-navigate': 'true' } : {}),
                            onClick(e) {
                                e.preventDefault();
                                emit('select', result.url);
                            },
                        }, [
                            h('div', { class: 'flex-1 min-w-0' }, [
                                h('div', { class: 'text-sm font-medium truncate' }, result.title),
                                Object.keys(result.details || {}).length > 0
                                    ? h('div', { class: 'flex items-center gap-x-3 mt-0.5' },
                                        Object.entries(result.details).map(([key, value]) =>
                                            h('span', { key, class: 'text-xs text-gray-500 dark:text-gray-400' }, [
                                                h('span', { class: 'font-medium' }, key + ': '),
                                                String(value),
                                            ])
                                        )
                                    )
                                    : null,
                            ]),
                            isSelected
                                ? h('svg', {
                                    class: 'h-4 w-4 flex-shrink-0 text-gray-400',
                                    fill: 'none',
                                    viewBox: '0 0 24 24',
                                    'stroke-width': '2',
                                    stroke: 'currentColor',
                                }, [
                                    h('path', {
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                        d: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
                                    }),
                                ])
                                : null,
                        ]);
                    }),
                ]);
            }));
        };
    },
});

export default {
    name: 'PrimixGlobalSearch',
    components: { SearchResults },
    props: {
        mode: {
            type: String,
            default: 'spotlight',
            validator: (v) => ['spotlight', 'dropdown'].includes(v),
        },
        spa: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const livue = inject('livue');

        const isOpen = ref(false);
        const query = ref('');
        const results = ref([]);
        const loading = ref(false);
        const selectedIndex = ref(-1);
        const spotlightInputRef = ref(null);
        const dropdownInputRef = ref(null);
        const spotlightRef = ref(null);
        const dropdownRef = ref(null);

        const isMac = computed(() => {
            return typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
        });

        // Total count of all results across groups
        const totalResults = computed(() => {
            return results.value.reduce((sum, group) => sum + group.results.length, 0);
        });

        // Debounce timer
        let debounceTimer = null;

        function open() {
            isOpen.value = true;
            query.value = '';
            results.value = [];
            selectedIndex.value = -1;

            nextTick(() => {
                if (props.mode === 'spotlight' && spotlightInputRef.value) {
                    spotlightInputRef.value.focus();
                } else if (props.mode === 'dropdown' && dropdownInputRef.value) {
                    dropdownInputRef.value.focus();
                }
            });
        }

        function close() {
            isOpen.value = false;
            query.value = '';
            results.value = [];
            selectedIndex.value = -1;
        }

        function moveSelection(delta) {
            const total = totalResults.value;
            if (total === 0) return;

            let next = selectedIndex.value + delta;
            if (next < 0) next = total - 1;
            if (next >= total) next = 0;
            selectedIndex.value = next;
        }

        function selectCurrent() {
            if (selectedIndex.value < 0 || totalResults.value === 0) return;

            let idx = 0;
            for (const group of results.value) {
                for (const result of group.results) {
                    if (idx === selectedIndex.value) {
                        navigateTo(result.url);
                        return;
                    }
                    idx++;
                }
            }
        }

        function navigateTo(url) {
            close();

            if (props.spa) {
                // Use LiVue SPA navigation
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('data-livue-navigate', 'true');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                window.location.href = url;
            }
        }

        // Watch query for debounced search
        watch(query, (newQuery) => {
            clearTimeout(debounceTimer);
            selectedIndex.value = -1;

            if (newQuery.length < 2) {
                results.value = [];
                loading.value = false;
                return;
            }

            loading.value = true;

            debounceTimer = setTimeout(async () => {
                try {
                    const response = await livue.search(newQuery);
                    results.value = response || [];
                } catch {
                    results.value = [];
                } finally {
                    loading.value = false;
                }
            }, 300);
        });

        // Global keyboard shortcut (Cmd+K / Ctrl+K)
        function handleKeydown(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen.value) {
                    close();
                } else {
                    open();
                }
            }
        }

        // Click outside handler for dropdown mode
        function handleClickOutside(e) {
            if (props.mode !== 'dropdown' || !isOpen.value) return;

            if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
                close();
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', handleKeydown);
            document.addEventListener('mousedown', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(debounceTimer);
        });

        return {
            isOpen,
            query,
            results,
            loading,
            selectedIndex,
            spotlightInputRef,
            dropdownInputRef,
            spotlightRef,
            dropdownRef,
            isMac,
            open,
            close,
            moveSelection,
            selectCurrent,
            navigateTo,
        };
    },
};
</script>
