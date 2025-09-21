import { App, Modal, Setting } from "obsidian";


export class SelectHeaderModal extends Modal {
    constructor(
        app: App,
        private onSelect?: (headerLevel: string | null) => void
    ) {
        super(app);
    }

    onOpen(): void {
        const { contentEl } = this;
        contentEl.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.onSelect?.(null);
                this.close();
            }

            if (event.key === 'Enter') {
                const dropdown = contentEl.querySelector('select');
                if (dropdown) {
                    const value = (dropdown as HTMLSelectElement).value;
                    console.log('Chosen header level: ' + value);
                    this.onSelect?.(value);
                    this.close();
                }
            }
        });

        new Setting(contentEl)
            .setName('Header Level')
            .setDesc('Select a header level')
            .addDropdown((dropdown) =>
                dropdown
                    .addOption('#', 'Heading 1')
                    .addOption('##', 'Heading 2')
                    .addOption('###', 'Heading 3')
                    .addOption('####', 'Heading 4')
                    .addOption('#####', 'Heading 5')
                    .setValue('#')
                    .onChange((value) => {
                        console.log('Chosen header level: ' + value);
                        this.onSelect?.(value);
                        this.close();
                    })
            );
    }

    onClose(): void {
        super.onClose();
        const { contentEl } = this;
        contentEl.empty();
    }
}
