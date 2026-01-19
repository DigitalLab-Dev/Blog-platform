'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import React from 'react';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading2,
    Heading3,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
} from 'lucide-react';

interface RichTextEditorProps {
    content: any;
    onChange: (content: any) => void;
    onImageUpload?: () => void;
}

export default function RichTextEditor({ content, onChange, onImageUpload }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Link.configure({
                openOnClick: false,
            }),
            TiptapImage,
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'max-w-none focus:outline-none min-h-[400px] px-4 py-3 text-gray-900',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const toolbarButtons = [
        {
            icon: Bold,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            title: 'Bold',
        },
        {
            icon: Italic,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            title: 'Italic',
        },
        {
            icon: Heading2,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
        },
        {
            icon: Heading3,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive('heading', { level: 3 }),
            title: 'Heading 3',
        },
        {
            icon: List,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
            title: 'Bullet List',
        },
        {
            icon: ListOrdered,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
            title: 'Numbered List',
        },
        {
            icon: Quote,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive('blockquote'),
            title: 'Quote',
        },
        {
            icon: LinkIcon,
            onClick: addLink,
            isActive: editor.isActive('link'),
            title: 'Add Link',
        },
        {
            icon: ImageIcon,
            onClick: onImageUpload,
            isActive: false,
            title: 'Add Image',
        },
    ];

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
                {toolbarButtons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={button.onClick}
                            className={`p-2 rounded hover:bg-gray-200 transition-colors ${button.isActive ? 'bg-gray-300' : ''
                                }`}
                            title={button.title}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    );
                })}

                <div className="border-l border-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Undo"
                    disabled={!editor.can().undo()}
                >
                    <Undo className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Redo"
                    disabled={!editor.can().redo()}
                >
                    <Redo className="h-4 w-4" />
                </button>
            </div>

            {/* Editor */}
            <div className="bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
