export function createPageUrl(path: string): string {
    if (path === 'Home') return '/ai';
    if (path.startsWith('CoinDetails')) return `/ai/coin-details${path.includes('?') ? '?' + path.split('?')[1] : ''}`;
    return '/ai';
}


