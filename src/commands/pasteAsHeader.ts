import { Editor, MarkdownView, Notice, Command } from 'obsidian';
import { CommandContext } from './types';
import { getClipboardText, insertAtCursor } from '../utilities';

/**
 * Create the paste as header command
 */
export function createPasteAsHeaderCommand(context: CommandContext): Command {
    return {
        id: 'paste-as-header',
        name: 'Paste As Header',
        editorCallback: async (editor: Editor, _view: MarkdownView) => {
            const clipboardText = await getClipboardText();
            if (!clipboardText) {
                return;
            }

            const headerText = `# ${clipboardText.trim()}\n`;
            console.log('Pasting header: ' + headerText);
            insertAtCursor(editor, headerText);
            new Notice(`Pasted as header! ${headerText}`);
        }
    };
}