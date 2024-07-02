import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function renderMarkdown(input: string): string {
  const result = marked.parse(input);
  return typeof result === 'string' ? result : result.toString();
}

export function wrapSelection(textarea: HTMLTextAreaElement, before: string, after: string) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selected = text.substring(start, end);
  const replacement = `${before}${selected || 'text'}${after}`;

  const newValue = text.substring(0, start) + replacement + text.substring(end);
  textarea.value = newValue;

  const cursor = start + before.length + (selected.length || 0);
  textarea.setSelectionRange(cursor, cursor);

  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  textarea.focus();
}

export function insertAtCursor(textarea: HTMLTextAreaElement, insertion: string) {
  const start = textarea.selectionStart;
  const text = textarea.value;
  const newValue = text.substring(0, start) + insertion + text.substring(textarea.selectionEnd);
  textarea.value = newValue;

  const cursor = start + insertion.length;
  textarea.setSelectionRange(cursor, cursor);

  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  textarea.focus();
}

export function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function downloadMarkdown(content: string, filename = 'document.md') {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadWord(html: string, title = 'Document', filename = 'document.doc') {
  const doc = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${title}</title>
<style>
body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 0 20px; }
h1 { font-size: 24pt; font-weight: 700; margin-top: 24pt; margin-bottom: 6pt; }
h2 { font-size: 18pt; font-weight: 600; margin-top: 18pt; margin-bottom: 6pt; }
h3 { font-size: 14pt; font-weight: 600; margin-top: 14pt; margin-bottom: 4pt; }
p { margin: 6pt 0; }
a { color: #2563eb; }
code { background: #f3f4f6; padding: 1px 4px; border-radius: 3px; font-size: 0.9em; }
pre { background: #f3f4f6; padding: 12px; border-radius: 4px; border: 1px solid #e5e7eb; overflow-x: auto; }
pre code { background: none; padding: 0; }
blockquote { border-left: 3px solid #d1d5db; padding-left: 12px; color: #6b7280; font-style: italic; margin: 12pt 0; }
ul, ol { padding-left: 24pt; margin: 6pt 0; }
li { margin: 2pt 0; }
table { width: 100%; border-collapse: collapse; margin: 12pt 0; }
th, td { border: 1px solid #d1d5db; padding: 6pt 8pt; text-align: left; }
th { background: #f3f4f6; font-weight: 600; }
hr { border: none; border-top: 1px solid #d1d5db; margin: 18pt 0; }
</style></head>
<body>
<h1 style="margin-top:0">${title}</h1>
${html}
</body></html>`;
  const blob = new Blob([doc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPDF() {
  window.print();
}

export const SAMPLE = `# Welcome to Markdown Editor

Start typing on the left to see the live preview on the right.

## Text Formatting

**Bold text**, *italic text*, ~~strikethrough~~, and \`inline code\`.

## Lists

### Unordered
- Item one
- Item two
  - Nested item

### Ordered
1. First step
2. Second step

## Links & Images

[Visit Next.js](https://nextjs.org)

## Code Blocks

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Blockquotes

> The best way to predict the future is to invent it.

## Tables

| Name  | Role     |
|-------|----------|
| Alice | Designer |
| Bob   | Developer|

---

*Happy writing!*
`;
