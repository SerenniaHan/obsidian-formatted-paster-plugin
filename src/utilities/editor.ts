import { Editor } from 'obsidian';

/**
 * Inserts text at the current cursor position and moves cursor to the end of inserted text
 * @param editor - The Obsidian editor instance
 * @param text - The text to insert
 */
export function insertAtCursor(editor: Editor, text: string): void {
    const cursor = editor.getCursor();
    editor.replaceRange(text, cursor);
    editor.setCursor({ line: cursor.line, ch: cursor.ch + text.length });
}