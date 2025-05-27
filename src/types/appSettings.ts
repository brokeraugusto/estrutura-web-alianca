
export interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string; // Mantido por compatibilidade
  logoLightUrl?: string; // Logo para fundos claros
  logoDarkUrl?: string; // Logo para fundos escuros
  faviconUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export interface AppSettingsData {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
  faviconUrl?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export const defaultSettings: AppSettings = {
  primaryColor: '#15394f', // blueDark
  secondaryColor: '#ef4444', // red
  accentColor: '#ffa72a', // orangeAccent
  font: 'font-body',
  logoUrl: '/logo.svg',
  logoLightUrl: '/logo.svg',
  logoDarkUrl: '/logo-dark.svg',
  faviconUrl: '/favicon.ico',
  whatsappNumber: '+5548000000000',
  whatsappMessage: 'Olá! Gostaria de solicitar um orçamento.'
};
