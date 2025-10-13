import { defaultTheme } from 'react-admin';
import { createTheme } from '@mui/material/styles';

// Tema personalizado para la plataforma
export const customTheme = createTheme({
  ...defaultTheme,

  // Paleta de colores
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Azul principal
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e', // Rosa/Rojo secundario
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f5f5f5', // Fondo general
      paper: '#ffffff', // Fondo de cards/papers
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },

  // Tipografía
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Botones sin mayúsculas automáticas
      fontWeight: 500,
    },
  },

  // Forma de componentes
  shape: {
    borderRadius: 8, // Bordes más redondeados
  },

  // Espaciado
  spacing: 8,

  // Sombras personalizadas
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    '0px 12px 24px rgba(0,0,0,0.12)',
    '0px 16px 32px rgba(0,0,0,0.15)',
    ...Array(19).fill('0px 16px 32px rgba(0,0,0,0.15)'),
  ] as any,

  // Personalización de componentes
  components: {
    // Sidebar
    RaSidebar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          paddingTop: '16px',
          '& .RaMenuItemLink-active': {
            backgroundColor: '#334155',
            borderLeft: '4px solid #3b82f6',
            color: '#fff',
          },
        },
      },
    },

    // Drawer (sidebar en móvil)
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F5F5F5',
        },
      },
    },

    // AppBar
    RaAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#212121',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
        },
      },
    },

    // Botones
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,

          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },

    // Cards
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0,0,0,0.12)',
          },
        },
      },
    },

    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.08)',
        },
      },
    },

    // TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },

    // Chips
    MuiChip: {
      styleOverrides: {
        root: {
          marginTop: '4px',
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },

    // DataGrid
    MuiDataGrid: {
      styleOverrides: {
        root: {

          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',
            borderBottom: '2px solid #e2e8f0',
          },
        },
      },
    },

    // List
    RaList: {
      styleOverrides: {
        root: {
          paddingTop: '4px',
          '& .RaList-content': {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '16px',
          },
        },
      },
    },

    // Datagrid
    RaDatagrid: {
      styleOverrides: {
        root: {
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#f8fafc',
            fontWeight: 600,

            color: '#475569',
          },
          '& .RaDatagrid-rowCell': {
            padding: '12px 16px',
          },
          '& tbody tr:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
  },
});

// Tema oscuro (opcional)
export const darkTheme = createTheme({
  ...customTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
  },
});
