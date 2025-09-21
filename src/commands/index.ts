import { Plugin, Command } from 'obsidian';
import { CommandContext } from './types';
import { createPasteAsHeaderCommand } from './pasteAsHeader';
import { createPasteAsInlineCodeCommand } from './pasteAsInlineCode';
import { createPasteAsCodeBlockCommand } from './pasteAsCodeBlock';

/**
 * Register all commands with the plugin
 */
export function registerCommands(plugin: Plugin, context: CommandContext): void {
    const commands = getAllCommands(context);

    commands.forEach(command => {
        plugin.addCommand(command);
    });
}

/**
 * Get all command definitions
 */
export function getAllCommands(context: CommandContext): Command[] {
    return [
        createPasteAsHeaderCommand(context),
        createPasteAsInlineCodeCommand(context),
        createPasteAsCodeBlockCommand(context),
    ];
}