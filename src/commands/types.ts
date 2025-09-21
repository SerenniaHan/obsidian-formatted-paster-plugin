import { App, Plugin } from 'obsidian';
import { FormattedPasterPluginSettings } from '../settings';

/**
 * Interface for command context
 */
export interface CommandContext {
    app: App;
    plugin: Plugin;
    settings: FormattedPasterPluginSettings;
}