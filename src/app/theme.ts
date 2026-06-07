import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{stone.50}',
      100: '{stone.100}',
      200: '{stone.200}',
      300: '{stone.300}',
      400: '{stone.400}',
      500: '{stone.500}',
      600: '{stone.600}',
      700: '{stone.700}',
      800: '{stone.800}',
      900: '{stone.900}',
      950: '{stone.950}',
    },
    colorScheme: {
      light: {
        stone: {
          color: '{stone.950}',
          inverseColor: '#ffffff',
          hoverColor: '{stone.900}',
          activeColor: '{stone.800}',
        },
        highlight: {
          background: '{stone.950}',
          focusBackground: '{stone.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        stone: {
          color: '{stone.50}',
          inverseColor: '{stone.950}',
          hoverColor: '{stone.100}',
          activeColor: '{stone.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});
