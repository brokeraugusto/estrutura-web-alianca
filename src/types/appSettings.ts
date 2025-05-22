
export interface AppSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export interface AppSettingsData {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  logoUrl?: string;
  faviconUrl?: string;
}

export const defaultSettings: AppSettings = {
  primaryColor: '#15394f', // blueDark
  secondaryColor: '#ef4444', // red
  accentColor: '#3b82f6', // blue
  font: 'font-body',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico'
};
