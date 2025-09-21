import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { FormattedPasterPluginSettings } from './settings';

export interface SettingsManager extends Plugin {
    settings: FormattedPasterPluginSettings;
    saveSettings(): Promise<void>;
}

export class FormattedPasterPluginSettingTab extends PluginSettingTab {
    plugin: SettingsManager;

    constructor(app: App, plugin: SettingsManager) {
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