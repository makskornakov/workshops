const colors = createColors({
  dark: {
    'background-color': '#111',
    'main-color': '#efefef',
    'secondary-color': '#b1b1b1',
    'tertiary-color': '#5d5d5d',
    'border-color': '#333',
  },
  light: {
    'background-color': '#e9e9e9',
    'main-color': '#111',
    'secondary-color': '#666',
    'tertiary-color': '#999',
    'border-color': '#999',
  },
});

type Color = keyof (typeof colors)['dark'];
export function colorVar(color: Color) {
  return `var(--${color}, ${colors.light[color]})` as const;
}

export function injectColorsIntoStyles(theme: keyof typeof colors) {
  return Object.entries(colors[theme])
    .map(([key, value]) => {
      return `--${key}: ${value};`;
    })
    .join('\n');
}

function createColors<T>({ dark, light }: { dark: T; light: T }) {
  return {
    dark,
    light,
  };
}
