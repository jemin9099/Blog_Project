<template>
    <div class="main-container">
        <div class="editor-container editor-container_classic-editor editor-container_include-block-toolbar editor-container_include-word-count"
            ref="editorContainerElement">
            <div class="editor-container__editor">
                <div ref="editorElement">
                    <ckeditor v-if="editor && config"  :editor="editor" :config="config"
                        @ready="onReady" v-model="configData.initialData"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch ,defineEmits, onMounted, useTemplateRef, defineProps } from 'vue';

import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import {
    ClassicEditor,
    AutoImage,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    BlockToolbar,
    Bold,
    CloudServices,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageInsertViaUrl,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    RemoveFormat,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    Title,
    Underline,
    WordCount
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */

const props = defineProps({
    modelValue: String,
})

const emit = defineEmits(['onChange'])
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

const editorWordCount = useTemplateRef<any>('editorWordCountElement');

const isLayoutReady = ref(false);

const editor = ClassicEditor;

const configData = ref<any>({
    toolbar: {
        items: [
            'sourceEditing',
            'showBlocks',
            'textPartLanguage',
            '|',
            'heading',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'specialCharacters',
            'link',
            'insertTable',
            'highlight',
            'blockQuote',
            'htmlEmbed',
            '|',
            'outdent',
            'indent'
        ],
        shouldNotGroupWhenFull: false
    },
    plugins: [
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        BlockToolbar,
        Bold,
        CloudServices,
        Code,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        FullPage,
        GeneralHtmlSupport,
        Heading,
        Highlight,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageInsertViaUrl,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        Paragraph,
        RemoveFormat,
        ShowBlocks,
        SourceEditing,
        SpecialCharacters,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextPartLanguage,
        Title,
        Underline,
        WordCount
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link'],
    blockToolbar: [
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'insertTable',
        '|',
        'outdent',
        'indent'
    ],
    fontFamily: {
        supportAllValues: true
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3'
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4'
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5'
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6'
            }
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
            }
        ]
    },
    image: {
        toolbar: ['imageTextAlternative']
    },
    initialData:  '',
    licenseKey: LICENSE_KEY,
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    placeholder: 'Type or paste your content here!',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
})
 

const config = computed(() => {
    if (!isLayoutReady.value) {
        return null;
    }

    return configData.value
});

onMounted(() => {
    isLayoutReady.value = true;
    
});
function onReady(editor:any) {
    [...editorWordCount.value.children].forEach(child => child.remove());
    const wordCount = editor.plugins.get('WordCount');
    editorWordCount.value.appendChild(wordCount.wordCountContainer);
}

watch(() => props.modelValue, ()=> {
    configData.value.initialData = props.modelValue as string
})

watch(() => configData.value.initialData,()=>{
    emit('onChange',configData.value.initialData)
})
</script>

<style scoped></style>