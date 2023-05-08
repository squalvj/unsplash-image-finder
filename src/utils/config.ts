export function getConfig(name: string): string {
    return process.env[name] || '';
}