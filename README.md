# Formatted Paster Plugin for Obsidian

A simple and efficient Obsidian plugin that allows you to paste clipboard content with proper formatting in different contexts.

## Features

This plugin provides three convenient commands to format your pasted content:

- **Paste As Header** - Converts clipboard text into a markdown header (# format)
- **Paste As Inline Code** - Wraps clipboard text in inline code formatting (`code`)
- **Paste As Code Block** - Creates a formatted code block with language selection (```language)

## Installation

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/SerenniaHan/obsidian-formatted-paster-plugin/releases)
2. Extract the files to your vault's plugins directory: `<VaultFolder>/.obsidian/plugins/obsidian-formatted-paster-plugin/`
3. Reload Obsidian
4. Enable the plugin in **Settings → Community plugins**

### From Obsidian Community Plugins

> **Note:** Plugin is pending approval for the community plugin store

## Usage

### Available Commands

The plugin adds three commands to your command palette (`Ctrl/Cmd + P`) until now:

1. **Paste As Header**
   - Pastes clipboard content as a level 1 header
   - Example: `Hello World` becomes `# Hello World`

2. **Paste As Inline Code**
   - Wraps clipboard content in backticks for inline code
   - Example: `console.log()` becomes `` `console.log()` ``

3. **Paste As Code Block**
   - Creates a code block with language selection
   - Opens a modal to select the programming language
   - Example:

     ```javascript
     console.log('Hello World');
     ```

### How to Use

1. Copy text to your clipboard
2. Open the command palette (`Ctrl/Cmd + P`)
3. Search for one of the paste commands
4. For code blocks, select the appropriate language from the modal
5. The formatted content will be inserted at your cursor position

## Settings

The plugin includes configurable settings for:

- Default code language for code blocks
- Access settings via **Settings → Plugin Options → Formatted Paster**

## Compatibility

- **Obsidian Version**: Requires Obsidian 0.15.0 or higher
- **Platform**: Desktop only (Windows, macOS, Linux)
- **Mobile**: Not supported

## Development

### Building the Plugin

```bash
# Install dependencies
npm install

# Development build with watch mode
npm run dev

# Production build
npm run build
```

### Project Structure

```text
src/
├── commands/          # Command implementations
├── modals/           # UI modals and dialogs
├── settings/         # Plugin settings and configuration
└── utilities/        # Helper functions and utilities
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have feature requests, please [create an issue](https://github.com/SerenniaHan/obsidian-formatted-paster-plugin/issues) on GitHub.

## Author

Created by [Yihoo.Kan](https://github.com/SerenniaHan)
