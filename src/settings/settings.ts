export interface FormattedPasterPluginSettings {
    code_language: Record<string, string>;
}

export const DEFAULT_SETTINGS: FormattedPasterPluginSettings = {
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
};