import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AppRouter } from './providers/router';
import { theme } from '@/shared/config/theme';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@/shared/ui/styles/global.scss';

export const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark" forceColorScheme="dark">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  );
}; 