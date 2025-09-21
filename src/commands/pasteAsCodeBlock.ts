import { Editor, MarkdownView, Notice, Command } from 'obsidian';
import { CommandContext } from './types';
import { getClipboardText, insertAtCursor } from '../utilities';
import { SelectLanguageModal } from '../modals';

/**
 * Create the paste as code block command
 */
export function createPasteAsCodeBlockCommand(context: CommandContext): Command {
    return {
        id: 'paste-as-code-block',
        name: 'Paste As Code Block',
        editorCallback: async (editor: Editor, _view: MarkdownView) => {
            const clipboardText = await getClipboardText();
            if (!clipboardText) {
                return;
            }

            new SelectLanguageModal(context.app, context.settings.code_language, (language) => {
                if (language === undefined) {
                    return;
                }

                const codeBlock = `\`\`\`${language}\n${clipboardText}\n\`\`\``;
                insertAtCursor(editor, codeBlock);
                new Notice('Pasted code block!');
            }).open();
        }
    };
}