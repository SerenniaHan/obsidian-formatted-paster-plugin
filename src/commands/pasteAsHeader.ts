import { Editor, MarkdownView, Notice, Command } from 'obsidian';
import { CommandContext } from './types';
import { getClipboardText, insertAtCursor } from '../utilities';
import { SelectHeaderModal } from '../modals';

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

            new SelectHeaderModal(context.app, (headerLevel) => {
                if (headerLevel === null) {
                    return;
                }

                const headerText = `${headerLevel} ${clipboardText.trimStart().trimEnd()}\n`;
                insertAtCursor(editor, headerText);
                new Notice(`Pasted as header! ${headerText}`);
            }).open();
        }
    };
}