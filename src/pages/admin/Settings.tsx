
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSettings } from '@/contexts/AppSettingsContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileDown, Type } from 'lucide-react';

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogo(file);
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
          <h1 className="text-2xl font-bold text-blueDark">Configurações</h1>
          <p className="text-gray-500">Personalize a aparência e comportamento do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="branding">Marca</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cores</CardTitle>
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
                      <option value="font-body">Padrão (Inter)</option>
                      <option value="font-sans">Sans-serif</option>
                      <option value="font-serif">Serif</option>
                      <option value="font-mono">Monospace</option>
                    </select>
                  </div>
                  <p className="text-xs text-gray-500">Selecione a fonte utilizada em todo o sistema</p>
                </div>
                
                <Button onClick={() => updateSettings(settings)} disabled={uploading}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prévia</CardTitle>
                <CardDescription>
                  Veja como as cores e fontes selecionadas ficam em diferentes elementos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: settings.primaryColor }}>
                    <h3 className="text-white font-bold mb-2">Cor Primária</h3>
                    <p className="text-white opacity-90">Este é um exemplo de texto sobre a cor primária selecionada.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: settings.secondaryColor }}>
                    <h3 className="text-white font-bold mb-2">Cor Secundária</h3>
                    <p className="text-white opacity-90">Este é um exemplo de texto sobre a cor secundária selecionada.</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: settings.accentColor }}>
                    <h3 className="text-white font-bold mb-2">Cor de Destaque</h3>
                    <p className="text-white opacity-90">Este é um exemplo de texto sobre a cor de destaque selecionada.</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className={`font-bold mb-2 ${settings.font}`}>Exemplo de Título com a Fonte Selecionada</h3>
                    <p className={settings.font}>
                      Este é um exemplo de texto com a fonte selecionada. O objetivo é mostrar como o texto ficará em diferentes tamanhos e estilos.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button style={{ backgroundColor: settings.primaryColor }}>
                      Botão Primário
                    </Button>
                    <Button variant="outline" style={{ borderColor: settings.secondaryColor, color: settings.secondaryColor }}>
                      Botão Secundário
                    </Button>
                    <Button variant="ghost" style={{ color: settings.accentColor }}>
                      Botão Fantasma
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
                <CardTitle>Logotipo e Favicon</CardTitle>
                <CardDescription>
                  Faça o upload do logotipo e favicon da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logotipo</Label>
                  <div className="flex flex-col gap-4">
                    {settings.logoUrl && (
                      <div className="max-w-xs p-4 border rounded-md">
                        <img 
                          src={settings.logoUrl} 
                          alt="Logo atual" 
                          className="max-h-20 w-auto"
                        />
                      </div>
                    )}
                    <Input 
                      id="logo" 
                      type="file" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={uploading}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Tamanho recomendado: 200x50 pixels, formatos: JPG, PNG</p>
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
                  <p className="text-xs text-gray-500">Tamanho recomendado: 32x32 pixels, formatos: PNG, JPG</p>
                </div>
                
                <Button onClick={() => updateSettings(settings)} disabled={uploading}>
                  {uploading ? 'Processando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500">
                Configurações de notificação serão implementadas em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>
                Opções avançadas de configuração do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500">
                Configurações avançadas serão implementadas em breve.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Exportar Dados do Sistema
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
