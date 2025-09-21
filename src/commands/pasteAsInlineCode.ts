import { Editor, MarkdownView, Notice, Command } from 'obsidian';
import { CommandContext } from './types';
import { getClipboardText, insertAtCursor } from '../utilities';

/**
 * Create the paste as inline code command
 */
export function createPasteAsInlineCodeCommand(context: CommandContext): Command {
    return {
        id: 'paste-as-inline-code',
        name: 'Paste As Inline Code',
        editorCallback: async (editor: Editor, _view: MarkdownView) => {
            const clipboardText = await getClipboardText();
            if (!clipboardText) {
                return;
            }

            const inlineCode = `\`${clipboardText.trim()}\``;
            console.log('Pasting inline code: ' + inlineCode);
            insertAtCursor(editor, inlineCode);
            new Notice(`Pasted as inline code! ${inlineCode}`);
        }
    };
}