import { Plugin } from 'obsidian';
import {
	FormattedPasterPluginSettings,
	DEFAULT_SETTINGS,
	FormattedPasterPluginSettingTab
} from '../settings';
import { registerCommands } from '../commands';

export default class FormattedPasterPlugin extends Plugin {
	settings: FormattedPasterPluginSettings;

	async onload() {
		await this.loadSettings();

		// Register all commands
		registerCommands(this, {
			app: this.app,
			plugin: this,
			settings: this.settings
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

