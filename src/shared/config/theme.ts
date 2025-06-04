import { createTheme } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'grape',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1C1B1F',
      '#141517',
      '#101113',
    ],
    grape: [
      '#F4ECFF',
      '#E6DBFF',
      '#D0BCFF',
      '#B69DF8',
      '#9A82DB',
      '#7F67BE',
      '#6750A4',
      '#4F378B',
      '#381E72',
      '#21005D',
    ],
  },
  fontFamily: 'Roboto, sans-serif',
  defaultRadius: 'md',
  components: {
    Paper: {
      defaultProps: {
        p: 'md',
        radius: 'md',
        withBorder: true,
      },
    },
    Button: {
      defaultProps: {
        size: 'md',
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.grape[6],
          '&:hover': {
            backgroundColor: theme.colors.grape[7],
          },
        },
      }),
    },
    TextInput: {
      defaultProps: {
        size: 'md',
      },
    },
    PasswordInput: {
      defaultProps: {
        size: 'md',
      },
    },
    Select: {
      defaultProps: {
        size: 'md',
      },
    },
    DatePickerInput: {
      defaultProps: {
        size: 'md',
      },
    },
  },
}); 