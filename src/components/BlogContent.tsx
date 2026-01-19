import React from 'react';
import Image from 'next/image';

interface BlogContentProps {
    content: any;
}

export default function BlogContent({ content }: BlogContentProps) {
    // Handle null/undefined
    if (!content) {
        return null;
    }

    // Extract the content array from Tiptap's JSON format
    // Tiptap stores as: { type: 'doc', content: [...] }
    const contentArray = Array.isArray(content)
        ? content
        : content.content || [];

    if (!contentArray || contentArray.length === 0) {
        return null;
    }

    const renderNode = (node: any, index: number): React.ReactNode => {
        if (!node.type) return null;

        switch (node.type) {
            case 'heading':
                const level = node.attrs?.level || 2;
                const headingContent = node.content && renderContent(node.content);

                if (level === 1) return <h1 key={index}>{headingContent}</h1>;
                if (level === 2) return <h2 key={index}>{headingContent}</h2>;
                if (level === 3) return <h3 key={index}>{headingContent}</h3>;
                if (level === 4) return <h4 key={index}>{headingContent}</h4>;
                if (level === 5) return <h5 key={index}>{headingContent}</h5>;
                return <h6 key={index}>{headingContent}</h6>;

            case 'paragraph':
                return (
                    <p key={index}>
                        {node.content && renderContent(node.content)}
                    </p>
                );

            case 'bulletList':
                return (
                    <ul key={index}>
                        {node.content && renderContent(node.content)}
                    </ul>
                );

            case 'orderedList':
                return (
                    <ol key={index}>
                        {node.content && renderContent(node.content)}
                    </ol>
                );

            case 'listItem':
                return (
                    <li key={index}>
                        {node.content && renderContent(node.content)}
                    </li>
                );

            case 'blockquote':
                return (
                    <blockquote key={index}>
                        {node.content && renderContent(node.content)}
                    </blockquote>
                );

            case 'codeBlock':
                return (
                    <pre key={index}>
                        <code>{node.content && renderContent(node.content)}</code>
                    </pre>
                );

            case 'image':
                return (
                    <div key={index} className="relative w-full h-96 my-6">
                        <Image
                            src={node.attrs?.src || ''}
                            alt={node.attrs?.alt || ''}
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                );

            case 'text':
                let text = node.text || '';

                // Apply marks (bold, italic, etc.)
                if (node.marks && Array.isArray(node.marks)) {
                    node.marks.forEach((mark: any) => {
                        switch (mark.type) {
                            case 'bold':
                                text = <strong key={`${index}-bold`}>{text}</strong>;
                                break;
                            case 'italic':
                                text = <em key={`${index}-italic`}>{text}</em>;
                                break;
                            case 'code':
                                text = <code key={`${index}-code`}>{text}</code>;
                                break;
                            case 'link':
                                text = (
                                    <a
                                        key={`${index}-link`}
                                        href={mark.attrs?.href || '#'}
                                        target={mark.attrs?.target}
                                        rel="noopener noreferrer"
                                    >
                                        {text}
                                    </a>
                                );
                                break;
                        }
                    });
                }

                return text;

            default:
                // Render children for unknown types
                return node.content && renderContent(node.content);
        }
    };

    const renderContent = (nodes: any[]): React.ReactNode[] => {
        return nodes.map((node, index) => renderNode(node, index));
    };

    return (
        <div className="blog-content">
            {renderContent(contentArray)}
        </div>
    );
}
