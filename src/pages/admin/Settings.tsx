
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Type, Image, Smartphone } from 'lucide-react';
import ServiceCategoriesManager from '@/components/admin/settings/ServiceCategoriesManager';
import UserManager from '@/components/admin/settings/UserManager';

const Settings = () => {
  const { 
    settings, 
    updateSettings,
    uploadLogo,
    uploadFavicon,
    uploading
  } = useAppSettings();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSettings({ ...settings, [name]: value });
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ ...settings, font: e.target.value });
  };

  const handleWhatsAppChange = (field: 'whatsappNumber' | 'whatsappMessage', value: string) => {
    updateSettings({ ...settings, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'light' | 'dark') => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogo(file, type);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFavicon(file);
    }
  };

  return (
    <DashboardLayout activeTab="settings">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: settings.primaryColor }}>
            Configurações
          </h1>
          <p className="text-gray-500">Personalize a aparência e comportamento do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="branding">Marca</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cores do Sistema</CardTitle>
                <CardDescription>
                  Personalize as cores utilizadas em todo o sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex">
                      <Input 
                        id="primaryColor"
                        name="primaryColor"
                        type="color" 
                        value={settings.primaryColor}
                        onChange={handleColorChange}
                        className="w-full h-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{settings.primaryColor}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex">
                      <Input 
                        id="secondaryColor" 
                        name="secondaryColor"
                        type="color" 
                        value={settings.secondaryColor}
                        onChange={handleColorChange}
                        className="w-full h-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{settings.secondaryColor}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="flex">
                      <Input 
                        id="accentColor" 
                        name="accentColor"
                        type="color" 
                        value={settings.accentColor}
                        onChange={handleColorChange}
                        className="w-full h-10"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{settings.accentColor}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font">Fonte</Label>
                  <div className="flex gap-2 items-center">
                    <Type className="h-5 w-5 text-gray-500" />
                    <select
                      id="font"
                      value={settings.font}
                      onChange={handleFontChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="font-body">Padrão (Open Sans)</option>
                      <option value="font-sans">Sans-serif</option>
                      <option value="font-serif">Serif</option>
                      <option value="font-mono">Monospace</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prévia das Cores</CardTitle>
                <CardDescription>
                  Veja como as cores selecionadas ficam em diferentes elementos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg text-white" style={{ backgroundColor: settings.primaryColor }}>
                    <h3 className="font-bold mb-2">Cor Primária</h3>
                    <p className="opacity-90">Utilizada em títulos, botões principais e elementos de destaque.</p>
                  </div>
                  <div className="p-4 rounded-lg text-white" style={{ backgroundColor: settings.secondaryColor }}>
                    <h3 className="font-bold mb-2">Cor Secundária</h3>
                    <p className="opacity-90">Utilizada em elementos secundários e detalhes.</p>
                  </div>
                  <div className="p-4 rounded-lg text-white" style={{ backgroundColor: settings.accentColor }}>
                    <h3 className="font-bold mb-2">Cor de Destaque</h3>
                    <p className="opacity-90">Utilizada em links, hovers e chamadas para ação.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className={`font-bold mb-2 ${settings.font}`}>Exemplo de Título</h3>
                    <p className={settings.font}>
                      Este é um exemplo de texto com a fonte selecionada. Observe como a tipografia afeta a legibilidade e aparência geral.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button style={{ backgroundColor: settings.primaryColor, borderColor: settings.primaryColor }}>
                      Botão Primário
                    </Button>
                    <Button variant="outline" style={{ borderColor: settings.secondaryColor, color: settings.secondaryColor }}>
                      Botão Secundário
                    </Button>
                    <Button variant="ghost" style={{ color: settings.accentColor }}>
                      Botão de Destaque
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Logotipos
                </CardTitle>
                <CardDescription>
                  Faça o upload dos logotipos para diferentes contextos
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="logoLight">Logotipo (Fundo Claro)</Label>
                    <div className="flex flex-col gap-4">
                      {settings.logoLightUrl && (
                        <div className="max-w-xs p-4 border rounded-md bg-white">
                          <img 
                            src={settings.logoLightUrl} 
                            alt="Logo para fundo claro" 
                            className="max-h-20 w-auto"
                          />
                        </div>
                      )}
                      <Input 
                        id="logoLight" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'light')}
                        disabled={uploading}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Usado no header e áreas com fundo claro</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logoDark">Logotipo (Fundo Escuro)</Label>
                    <div className="flex flex-col gap-4">
                      {settings.logoDarkUrl && (
                        <div className="max-w-xs p-4 border rounded-md bg-gray-900">
                          <img 
                            src={settings.logoDarkUrl} 
                            alt="Logo para fundo escuro" 
                            className="max-h-20 w-auto"
                          />
                        </div>
                      )}
                      <Input 
                        id="logoDark" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, 'dark')}
                        disabled={uploading}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Usado em seções com fundo escuro</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="flex flex-col gap-4">
                    {settings.faviconUrl && (
                      <div className="max-w-xs p-4 border rounded-md bg-gray-50 flex items-center justify-center">
                        <img 
                          src={settings.faviconUrl} 
                          alt="Favicon atual" 
                          className="max-h-10 w-auto"
                        />
                      </div>
                    )}
                    <Input 
                      id="favicon" 
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload} 
                      disabled={uploading}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Ícone exibido na aba do navegador (32x32px recomendado)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Configurações do WhatsApp
              </CardTitle>
              <CardDescription>
                Configure o botão flutuante do WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => handleWhatsAppChange('whatsappNumber', e.target.value)}
                  placeholder="+55 48 9999-9999"
                />
                <p className="text-xs text-gray-500">
                  Formato: +55 48 99999-9999 (inclua o código do país)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappMessage">Mensagem Padrão</Label>
                <Textarea
                  id="whatsappMessage"
                  value={settings.whatsappMessage || ''}
                  onChange={(e) => handleWhatsAppChange('whatsappMessage', e.target.value)}
                  placeholder="Olá! Gostaria de solicitar um orçamento."
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  Mensagem que será enviada automaticamente quando o usuário clicar no botão
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Prévia</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Link que será aberto: 
                </p>
                <code className="text-xs bg-white p-2 rounded border block">
                  https://wa.me/{settings.whatsappNumber?.replace(/\D/g, '')}?text={encodeURIComponent(settings.whatsappMessage || '')}
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid gap-6">
            <ServiceCategoriesManager />
            <UserManager />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
