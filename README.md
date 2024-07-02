# Markdown Editor

A live, browser-based **Markdown Editor** built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Write Markdown on the left and see a real-time rendered preview on the right — with a formatting toolbar, word/character counts, and one-click export to Markdown, Word, or PDF. Everything runs entirely in your browser.

## Features

- **Live Preview** — Instantly rendered HTML preview as you type, powered by [`marked`](https://marked.js.org/)
- **Formatting Toolbar** — One-click buttons for **Bold**, *Italic*, headings, lists, links, inline code, code blocks, blockquotes, and horizontal rules
- **Smart Selection Wrapping** — Select text and wrap it in formatting (e.g. `**bold**`) without losing your place
- **Export Options** — Download your document as:
  - **Markdown** (`.md`)
  - **Word** (`.doc`, styled HTML document)
  - **PDF** (via browser print)
- **Copy to Clipboard** — Instantly copy your raw Markdown
- **Word & Character Count** — Live counters in the footer
- **Fully Client-Side** — No server, no uploads; your content never leaves the browser
- **Responsive Design** — Split-pane editor on desktop, stacked on mobile

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Markdown Parser:** marked
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## How It Works

- **`lib/markdown.ts`** — Core logic: parses Markdown to HTML (`renderMarkdown`), wraps selected text (`wrapSelection`), inserts snippets at the cursor (`insertAtCursor`), counts words (`countWords`), and builds downloadable Markdown / Word blobs (plus PDF via `window.print()`).
- **`page.tsx`** — The split-pane UI: a `<textarea>` editor, a live preview pane, the formatting toolbar, and the export/copy controls. State is kept in sync with `useMemo` for efficient re-rendering.

The editor ships with a built-in sample document so you can see every supported feature in action immediately.

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── globals.css       # Global styles with Tailwind
│       ├── layout.tsx        # Root layout with metadata
│       ├── page.tsx          # Main editor UI (split-pane + toolbar)
│       └── lib/
│           └── markdown.ts   # Markdown rendering, editing & export helpers
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## License

MIT

<!-- [2024-07-02] feat: initialize markdown editor interface with split-pane view -->
