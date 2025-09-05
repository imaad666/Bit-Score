const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
});

export function formatCurrency(value?: number | null): string {
    if (value === undefined || value === null || Number.isNaN(value)) return '-';
    return currencyFormatter.format(value);
}

export function formatCompactNumber(value?: number | null): string {
    if (value === undefined || value === null || Number.isNaN(value)) return '-';
    return compactFormatter.format(value);
}


