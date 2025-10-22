export const theme = {
  colors: {
    primary: {
      DEFAULT: 'hsl(160, 55%, 15%)',
      foreground: 'hsl(0, 0%, 100%)',
      light: 'hsl(160, 50%, 25%)',
      dark: 'hsl(160, 60%, 10%)',
    },
    secondary: {
      DEFAULT: 'hsl(0, 0%, 25%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    destructive: {
      DEFAULT: 'hsl(0, 84%, 60%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    success: {
      DEFAULT: 'hsl(142, 76%, 36%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    warning: {
      DEFAULT: 'hsl(38, 70%, 55%)',
      foreground: 'hsl(0, 0%, 15%)',
    },
    info: {
      DEFAULT: 'hsl(160, 55%, 20%)',
      foreground: 'hsl(0, 0%, 100%)',
    },
    muted: {
      DEFAULT: 'hsl(0, 0%, 96%)',
      foreground: 'hsl(0, 0%, 45%)',
    },
    accent: {
      DEFAULT: 'hsl(40, 50%, 55%)',
      foreground: 'hsl(0, 0%, 15%)',
    },
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(0, 0%, 15%)',
    card: {
      DEFAULT: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 15%)',
    },
    popover: {
      DEFAULT: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 15%)',
    },
    border: 'hsl(0, 0%, 90%)',
    input: 'hsl(0, 0%, 90%)',
    ring: 'hsl(160, 55%, 15%)',
    sidebar: {
      background: 'hsl(160, 55%, 15%)',
      foreground: 'hsl(0, 0%, 100%)',
      primary: 'hsl(40, 50%, 55%)',
      primaryForeground: 'hsl(160, 55%, 15%)',
      accent: 'hsl(160, 50%, 20%)',
      accentForeground: 'hsl(0, 0%, 100%)',
      border: 'hsl(160, 50%, 25%)',
      ring: 'hsl(40, 50%, 55%)',
    },
    status: {
      rascunho: 'hsl(40, 70%, 65%)',
      revisao: 'hsl(38, 70%, 55%)',
      aprovada: 'hsl(160, 55%, 20%)',
      arquivada: 'hsl(0, 0%, 45%)',
    },
    priority: {
      baixa: 'hsl(0, 0%, 45%)',
      media: 'hsl(38, 70%, 55%)',
      alta: 'hsl(25, 80%, 50%)',
      urgente: 'hsl(0, 84%, 60%)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
};

export type Theme = typeof theme;
