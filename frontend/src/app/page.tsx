'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { renderMarkdown, wrapSelection, insertAtCursor, countWords, downloadMarkdown, downloadWord, downloadPDF, SAMPLE } from './lib/markdown';

export default function HomePage() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const wordCount = useMemo(() => countWords(markdown), [markdown]);
  const charCount = markdown.length;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  }, []);

  const wrap = useCallback((before: string, after: string) => {
    if (textareaRef.current) wrapSelection(textareaRef.current, before, after);
  }, []);

  const insert = useCallback((text: string) => {
    if (textareaRef.current) insertAtCursor(textareaRef.current, text);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [markdown]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const btn = 'rounded-md bg-gray-700 px-2.5 py-1 text-xs text-gray-300 hover:bg-gray-600 transition-colors font-mono';

  return (
    <div className="flex h-screen flex-col bg-gray-900">
      <header className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <h1 className="text-lg font-bold text-white">Markdown Editor</h1>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="rounded-md bg-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-600 transition-colors">
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <div ref={menuRef} className="relative">
            <button onClick={() => setMenuOpen((v) => !v)} className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors">
              Download ▾
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={closeMenu} />
                <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
                  <button onClick={() => { downloadMarkdown(markdown); closeMenu(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 transition-colors">
                    <span className="text-blue-400">📄</span> Markdown (.md)
                  </button>
                  <button onClick={() => { downloadWord(html, 'Untitled'); closeMenu(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 transition-colors">
                    <span className="text-blue-400">📝</span> Word (.doc)
                  </button>
                  <button onClick={() => { downloadPDF(); closeMenu(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-700 transition-colors">
                    <span className="text-blue-400">📕</span> PDF
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div id="editor-toolbar" className="flex items-center gap-1 border-b border-gray-700 px-4 py-2 flex-wrap">
        <button onClick={() => wrap('**', '**')} className={btn} title="Bold">B</button>
        <button onClick={() => wrap('*', '*')} className={`${btn} italic`} title="Italic">I</button>
        <span className="h-4 w-px bg-gray-700 mx-1" />
        <button onClick={() => insert('# ')} className={btn} title="Heading">H1</button>
        <button onClick={() => insert('## ')} className={btn} title="Subheading">H2</button>
        <span className="h-4 w-px bg-gray-700 mx-1" />
        <button onClick={() => insert('- ')} className={btn} title="List">•</button>
        <button onClick={() => insert('1. ')} className={btn} title="Ordered list">1.</button>
        <span className="h-4 w-px bg-gray-700 mx-1" />
        <button onClick={() => wrap('[', '](url)')} className={btn} title="Link">🔗</button>
        <button onClick={() => wrap('`', '`')} className={btn} title="Inline code">&lt;/&gt;</button>
        <button onClick={() => insert('```\n\n```')} className={btn} title="Code block">{"{ }"}</button>
        <span className="h-4 w-px bg-gray-700 mx-1" />
        <button onClick={() => insert('> ')} className={btn} title="Blockquote">"</button>
        <button onClick={() => insert('---\n')} className={btn} title="Horizontal rule">—</button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={handleChange}
          className="flex-1 resize-none border-0 border-b border-gray-700 bg-gray-950 p-4 font-mono text-sm text-gray-200 outline-none placeholder-gray-500 md:border-b-0 md:border-r"
          spellCheck={false}
        />
        <div id="editor-preview" className="flex-1 overflow-auto p-4">
          <div
            className="prose prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-gray-700 px-4 py-2 text-xs text-gray-500">
        <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
        <span>{charCount} {charCount === 1 ? 'character' : 'characters'}</span>
      </footer>
    </div>
  );
}
