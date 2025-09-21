import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import {
	FormattedPasterPluginSettings,
	DEFAULT_SETTINGS,
	FormattedPasterPluginSettingTab
} from '../settings';
import { getClipboardText, insertAtCursor } from '../utilities';
import { SelectLanguageModal } from '../modals';

export default class FormattedPasterPlugin extends Plugin {
	settings: FormattedPasterPluginSettings;

	async onload() {
		await this.loadSettings();

		// paste as a Header command
		this.addCommand({
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
		});

		// paste as inline code command
		this.addCommand({
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
		})

		// paste as code block command
		this.addCommand({
			id: 'paste-as-code-block',
			name: 'Paste As Code Block',
			editorCallback: async (editor: Editor, _view: MarkdownView) => {
				const clipboardText = await getClipboardText();
				if (!clipboardText) {
					return;
				}

				new SelectLanguageModal(this.app, this.settings.code_language, (language) => {
					if (language === undefined) {
						return;
					}

					const codeBlock = `\`\`\`${language}\n${clipboardText}\n\`\`\``;
					insertAtCursor(editor, codeBlock);
					new Notice('Pasted code block!');
				}).open();
			}
		});



		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FormattedPasterPluginSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		console.log('Loaded settings:', this.settings);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

