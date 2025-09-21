import { App, Modal, Setting } from 'obsidian';

export class SelectLanguageModal extends Modal {
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
        super.onClose();
        const { contentEl } = this;
        contentEl.empty();
    }
}