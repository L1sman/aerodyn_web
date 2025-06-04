import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primaryContainer',
  colors: {
    // Material Design 3 Dark Theme colors
    primary: [
      '#21005D',
      '#381E72',
      '#4F378B',
      '#6750A4',
      '#7F67BE',
      '#9A82DB',
      '#B69DF8',
      '#D0BCFF',
      '#EADDFF',
      '#F6EDFF',
    ],
    primaryContainer: [
      '#0C0532',
      '#1D1B1E',
      '#2B2930',
      '#383742',
      '#4A4458',
      '#5C566E',
      '#6E6884',
      '#E8DEF8',
      '#F6EDFF',
      '#FFFFFF',
    ],
    secondary: [
      '#1D192B',
      '#332D41',
      '#4A4458',
      '#625B71',
      '#7A7289',
      '#958DA5',
      '#B0A7C0',
      '#CCC2DC',
      '#E8DEF8',
      '#F6EDFF',
    ],
    surface: [
      '#141218',
      '#1D1B1E',
      '#2B2930',
      '#383742',
      '#4A4458',
      '#5C566E',
      '#6E6884',
      '#80799B',
      '#938FB2',
      '#A5A4C9',
    ],
  },
  black: '#1D1B1E',
  white: '#E6E1E5',
  defaultRadius: 'md',
  fontFamily: 'Roboto, sans-serif',
  defaultGradient: {
    from: 'primaryContainer.7',
    to: 'primary.7',
    deg: 45,
  },
  components: {
    Paper: {
      defaultProps: {
        bg: 'surface.1',
      },
    },
    Button: {
      defaultProps: {
        variant: 'filled',
        color: 'primaryContainer.7',
      },
    },
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
    },
    PasswordInput: {
      defaultProps: {
        variant: 'filled',
      },
    },
    Select: {
      defaultProps: {
        variant: 'filled',
      },
    },
  },
}); 