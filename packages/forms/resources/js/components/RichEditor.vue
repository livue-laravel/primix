<template>
    <div
        class="primix-tiptap-editor"
        :class="{
            'primix-tiptap-invalid': invalid,
            'primix-tiptap-disabled': disabled,
        }"
        :style="stylePt?.container"
    >
        <!-- Toolbar -->
        <div
            v-if="editor"
            class="primix-tiptap-toolbar"
            :style="stylePt?.toolbar"
        >
            <template v-for="(button, index) in activeButtons" :key="index">
                <span v-if="button === '|'" class="primix-tiptap-divider"></span>
                <button
                    v-else
                    type="button"
                    class="primix-tiptap-btn"
                    :class="{ 'primix-tiptap-btn-active': isActive(button) }"
                    @click="executeCommand(button)"
                    :disabled="disabled"
                    :aria-label="BUTTON_META[button]?.title || button"
                    :title="BUTTON_META[button]?.title || button"
                >
                    <i v-if="BUTTON_META[button]?.icon" :class="BUTTON_META[button].icon"></i>
                    <span v-else :style="BUTTON_META[button]?.labelStyle">{{ BUTTON_META[button]?.label || '?' }}</span>
                </button>
            </template>
        </div>

        <!-- Editor content -->
        <div
            ref="editorElement"
            class="primix-tiptap-content"
            :style="{
                minHeight: editorHeight || '200px',
                ...(stylePt?.content || {}),
            }"
        ></div>

        <!-- Character count -->
        <div v-if="maxLength && editor" class="primix-tiptap-footer">
            <span class="text-xs text-surface-400">
                {{ editor.storage.characterCount?.characters() ?? 0 }} / {{ maxLength }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
    id: String,
    modelValue: {
        type: String,
        default: '',
    },
    toolbarButtons: {
        type: Array,
        default: () => [],
    },
    disabledToolbarButtons: {
        type: Array,
        default: () => [],
    },
    disabled: Boolean,
    invalid: Boolean,
    maxLength: Number,
    editorHeight: String,
    stylePt: Object,
});

const emit = defineEmits(['update:modelValue']);

const editorElement = ref(null);
const editor = shallowRef(null);
const isUpdatingFromEditor = ref(false);

const BUTTON_META = {
    bold: { label: 'B', labelStyle: 'font-weight:700', title: 'Bold' },
    italic: { label: 'I', labelStyle: 'font-style:italic', title: 'Italic' },
    underline: { label: 'U', labelStyle: 'text-decoration:underline', title: 'Underline' },
    strike: { label: 'S', labelStyle: 'text-decoration:line-through', title: 'Strikethrough' },
    heading: { label: 'H', labelStyle: 'font-weight:700;font-size:0.85rem', title: 'Heading' },
    bulletList: { icon: 'pi pi-list', title: 'Bullet List' },
    orderedList: { label: '1.', labelStyle: 'font-weight:600;font-size:0.7rem', title: 'Ordered List' },
    link: { icon: 'pi pi-link', title: 'Link' },
    blockquote: { label: '\u201C', labelStyle: 'font-weight:700;font-size:1.2rem;line-height:1;font-family:serif', title: 'Blockquote' },
    codeBlock: { icon: 'pi pi-code', title: 'Code Block' },
    undo: { icon: 'pi pi-undo', title: 'Undo' },
    redo: { label: '\u21B7', labelStyle: 'font-size:1.1rem;line-height:1', title: 'Redo' },
    horizontalRule: { label: '\u2014', labelStyle: 'font-weight:700', title: 'Horizontal Rule' },
};

const activeButtons = computed(() => {
    const disabled = new Set(props.disabledToolbarButtons);
    return props.toolbarButtons.filter(b => b === '|' || !disabled.has(b));
});

function isActive(button) {
    if (!editor.value) return false;

    const e = editor.value;
    switch (button) {
        case 'bold': return e.isActive('bold');
        case 'italic': return e.isActive('italic');
        case 'underline': return e.isActive('underline');
        case 'strike': return e.isActive('strike');
        case 'heading': return e.isActive('heading');
        case 'bulletList': return e.isActive('bulletList');
        case 'orderedList': return e.isActive('orderedList');
        case 'link': return e.isActive('link');
        case 'blockquote': return e.isActive('blockquote');
        case 'codeBlock': return e.isActive('codeBlock');
        default: return false;
    }
}

function executeCommand(button) {
    if (!editor.value) return;

    const e = editor.value;
    switch (button) {
        case 'bold': e.chain().focus().toggleBold().run(); break;
        case 'italic': e.chain().focus().toggleItalic().run(); break;
        case 'underline': e.chain().focus().toggleUnderline().run(); break;
        case 'strike': e.chain().focus().toggleStrike().run(); break;
        case 'heading': e.chain().focus().toggleHeading({ level: 2 }).run(); break;
        case 'bulletList': e.chain().focus().toggleBulletList().run(); break;
        case 'orderedList': e.chain().focus().toggleOrderedList().run(); break;
        case 'blockquote': e.chain().focus().toggleBlockquote().run(); break;
        case 'codeBlock': e.chain().focus().toggleCodeBlock().run(); break;
        case 'horizontalRule': e.chain().focus().setHorizontalRule().run(); break;
        case 'undo': e.chain().focus().undo().run(); break;
        case 'redo': e.chain().focus().redo().run(); break;
        case 'link': {
            const previousUrl = e.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);
            if (url === null) return;
            if (url === '') {
                e.chain().focus().extendMarkRange('link').unsetLink().run();
            } else {
                e.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
            break;
        }
    }
}

onMounted(async () => {
    const { Editor } = await import('@tiptap/core');
    const { default: StarterKit } = await import('@tiptap/starter-kit');
    const { default: Underline } = await import('@tiptap/extension-underline');
    const { default: Link } = await import('@tiptap/extension-link');

    const extensions = [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
    ];

    if (props.maxLength) {
        const { default: CharacterCount } = await import('@tiptap/extension-character-count');
        extensions.push(CharacterCount.configure({ limit: props.maxLength }));
    }

    editor.value = new Editor({
        element: editorElement.value,
        extensions,
        content: props.modelValue || '',
        editable: !props.disabled,
        onUpdate: ({ editor: e }) => {
            isUpdatingFromEditor.value = true;
            emit('update:modelValue', e.getHTML());
            // Reset flag on next tick so the watch triggered by emit is skipped
            Promise.resolve().then(() => {
                isUpdatingFromEditor.value = false;
            });
        },
    });
});

onBeforeUnmount(() => {
    editor.value?.destroy();
});

watch(() => props.modelValue, (newVal) => {
    if (isUpdatingFromEditor.value) return;
    if (editor.value && editor.value.getHTML() !== newVal) {
        editor.value.commands.setContent(newVal || '', false);
    }
});

watch(() => props.disabled, (val) => {
    editor.value?.setEditable(!val);
});
</script>

<style>
.primix-tiptap-editor {
    border: 1px solid var(--p-surface-300);
    border-radius: var(--p-content-border-radius);
    overflow: hidden;
}

.primix-tiptap-editor:focus-within {
    border-color: var(--p-primary-color);
    box-shadow: 0 0 0 1px var(--p-primary-color);
}

.primix-tiptap-invalid {
    border-color: var(--p-red-500);
}

.primix-tiptap-disabled {
    opacity: 0.6;
    pointer-events: none;
}

.primix-tiptap-toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 0.25rem;
    border-bottom: 1px solid var(--p-surface-200);
    background: var(--p-surface-50);
}

.dark .primix-tiptap-toolbar {
    background: var(--p-surface-800);
    border-bottom-color: var(--p-surface-700);
}

.primix-tiptap-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: var(--p-content-border-radius);
    background: transparent;
    color: var(--p-surface-600);
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.15s, color 0.15s;
}

.primix-tiptap-btn:hover {
    background: var(--p-surface-100);
}

.primix-tiptap-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.primix-tiptap-btn-active {
    background: var(--p-primary-color);
    color: var(--p-primary-contrast-color);
}

.primix-tiptap-btn-active:hover {
    background: var(--p-primary-color);
    opacity: 0.9;
}

.dark .primix-tiptap-btn {
    color: var(--p-surface-400);
}

.dark .primix-tiptap-btn:hover {
    background: var(--p-surface-700);
}

.primix-tiptap-divider {
    width: 1px;
    margin: 0.25rem 0.25rem;
    background: var(--p-surface-300);
}

.primix-tiptap-content {
    padding: 0.75rem 1rem;
    outline: none;
}

.primix-tiptap-content .tiptap {
    outline: none;
    min-height: inherit;
}

.primix-tiptap-content .tiptap p {
    margin: 0.5em 0;
}

.primix-tiptap-content .tiptap h1,
.primix-tiptap-content .tiptap h2,
.primix-tiptap-content .tiptap h3 {
    font-weight: 600;
    margin: 0.75em 0 0.25em;
}

.primix-tiptap-content .tiptap h1 { font-size: 1.5em; }
.primix-tiptap-content .tiptap h2 { font-size: 1.25em; }
.primix-tiptap-content .tiptap h3 { font-size: 1.1em; }

.primix-tiptap-content .tiptap ul,
.primix-tiptap-content .tiptap ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
}

.primix-tiptap-content .tiptap ul { list-style-type: disc; }
.primix-tiptap-content .tiptap ol { list-style-type: decimal; }

.primix-tiptap-content .tiptap blockquote {
    border-left: 3px solid var(--p-surface-300);
    padding-left: 1em;
    margin: 0.5em 0;
    color: var(--p-surface-500);
}

.primix-tiptap-content .tiptap code {
    background: var(--p-surface-100);
    border-radius: 3px;
    padding: 0.1em 0.3em;
    font-family: monospace;
    font-size: 0.9em;
}

.primix-tiptap-content .tiptap pre {
    background: var(--p-surface-100);
    border-radius: var(--p-content-border-radius);
    padding: 0.75em 1em;
    margin: 0.5em 0;
    overflow-x: auto;
}

.primix-tiptap-content .tiptap pre code {
    background: none;
    padding: 0;
}

.primix-tiptap-content .tiptap a {
    color: var(--p-primary-color);
    text-decoration: underline;
}

.primix-tiptap-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.25rem 0.5rem;
    border-top: 1px solid var(--p-surface-200);
}
</style>
