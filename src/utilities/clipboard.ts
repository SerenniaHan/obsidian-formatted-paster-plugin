import { Notice } from 'obsidian';

/**
 * Reads text from clipboard and shows a notice if clipboard is empty
 * @returns Promise<string | null> - clipboard text or null if empty
 */
export async function getClipboardText(): Promise<string | null> {
    const clipboardText = await navigator.clipboard.readText();

    if (!clipboardText || clipboardText.trim() === '') {
        new Notice('Clipboard is empty!');
        return null;
    }

    return clipboardText;
}