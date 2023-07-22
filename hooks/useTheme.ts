import { getThemes, getDefaultTheme } from '@/lib/themes';

export function useTheme() {
    const defaultTheme = getDefaultTheme();
    const colors = getThemes();
    const mode = localStorage.getItem('prefers-color-scheme') || 'Dark';
    const color =
        localStorage.getItem(`${mode.toLowerCase()}-theme`) || defaultTheme;

    const theme = colors[mode].find(({ name }) => name === color);

    return theme;
}
