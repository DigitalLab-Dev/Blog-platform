/**
 * Generate an excerpt from rich text content
 */
export function generateExcerpt(content: any[], maxLength: number = 160): string {
    if (!content || !Array.isArray(content)) return '';

    let text = '';

    // Extract text from Tiptap JSON content
    const extractText = (nodes: any[]): string => {
        return nodes
            .map((node: any) => {
                if (node.type === 'text') {
                    return node.text || '';
                }
                if (node.content && Array.isArray(node.content)) {
                    return extractText(node.content);
                }
                return '';
            })
            .join(' ');
    };

    text = extractText(content);

    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();

    // Truncate to maxLength
    if (text.length > maxLength) {
        text = text.substring(0, maxLength);
        // Try to end at a word boundary
        const lastSpace = text.lastIndexOf(' ');
        if (lastSpace > 0) {
            text = text.substring(0, lastSpace);
        }
        text += '...';
    }

    return text;
}
