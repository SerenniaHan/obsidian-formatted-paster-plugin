import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
interface FormattedPasterPluginSettings {
	code_language: Record<string, string>;
}

const DEFAULT_SETTINGS: FormattedPasterPluginSettings = {
	code_language: {
		'': 'Plain Text',
		'csharp': 'C#',
		'javascript': 'JavaScript',
		'python': 'Python',
		'java': 'Java',
		'ruby': 'Ruby',
		'go': 'Go',
		'php': 'PHP',
		'swift': 'Swift',
		'kotlin': 'Kotlin',
		'rust': 'Rust',
		'typescript': 'TypeScript',
		'json': 'JSON',
		'html': 'HTML',
		'css': 'CSS',
		'bash': 'Bash',
		'yaml': 'YAML',
	}
}

export default class FormattedPasterPlugin extends Plugin {
	settings: FormattedPasterPluginSettings;

	async onload() {
		await this.loadSettings();

		function insertAtCursor(editor: Editor, text: string) {
			const cursor = editor.getCursor();
			editor.replaceRange(text, cursor);
			editor.setCursor({ line: cursor.line, ch: cursor.ch + text.length });
		}

		// paste as a Header command
		this.addCommand({
			id: 'paste-as-header',
			name: 'Paste As Header',
			editorCallback: async (editor: Editor, _view: MarkdownView) => {

				const clipboardText = await navigator.clipboard.readText();
				if (!clipboardText) {
					new Notice('Clipboard is empty!');
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

				const clipboardText = await navigator.clipboard.readText();
				if (!clipboardText) {
					new Notice('Clipboard is empty!');
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

				const clipboardText = await navigator.clipboard.readText();
				if (!clipboardText) {
					new Notice('Clipboard is empty!');
					return;
				}

				new ChosenLanguageModal(this.app, this.settings.code_language, (language) => {
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

export class ChosenLanguageModal extends Modal {
	private onChoose?: (language?: string) => void;
	private code_language: Record<string, string>;
	constructor(app: App, code_language: Record<string, string>, onChoose?: (language?: string) => void) {
		super(app);
		this.onChoose = onChoose;
		this.code_language = code_language;
	}

	onOpen() {
		const { contentEl } = this;

		contentEl.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				this.onChoose?.(undefined);
				this.close();
			}

			if (event.key === 'Enter') {
				const dropdown = contentEl.querySelector('select');
				if (dropdown) {
					const value = (dropdown as HTMLSelectElement).value;
					console.log('Chosen language: ' + value);
					this.onChoose?.(value);
					this.close();
				}
			}
		})

		new Setting(contentEl)
			.setName('Choose Language')
			.setDesc('Select a programming language for the code block')
			.addDropdown(dropdown => {
				dropdown.addOptions(this.code_language)
					.setValue('csharp')
					.onChange((value) => {
						console.log('Chosen language: ' + value);
						this.onChoose?.(value);
						this.close();
					})
			})
	}

	onClose() {
	}
}
class FormattedPasterPluginSettingTab extends PluginSettingTab {
	plugin: FormattedPasterPlugin;

	constructor(app: App, plugin: FormattedPasterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Code Block Paster Setting')
			.setDesc('This is a setting for the Code Block Paster plugin')
			.addButton(button => {
				button.setButtonText('Click me')
					.onClick(async () => {
						const json = JSON.stringify(this.plugin.settings.code_language, null, 2);
						console.log(json);
						new Notice(json);
						await this.plugin.saveSettings();
					});
			});
	}
}
