
import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppSettings, AppSettings } from '@/contexts/AppSettingsContext';
import { FilePdf, PaintBucket, Font, Image, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Settings: React.FC = () => {
  const { settings, updateSettings, loading } = useAppSettings();
  const [activeTab, setActiveTab] = useState("cores");
  
  const [localSettings, setLocalSettings] = useState<AppSettings>({
    ...settings
  });
  
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const faviconFileInputRef = useRef<HTMLInputElement>(null);
  
  // Atualizar as configurações locais quando as configurações globais mudarem
  useEffect(() => {
    setLocalSettings({...settings});
  }, [settings]);
  
  const handleChange = (key: keyof AppSettings, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSaveSettings = async () => {
    await updateSettings(localSettings);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `app-settings/${fileName}`;
    
    try {
      // Upload arquivo para o storage
      const { error: uploadError, data } = await supabase.storage
        .from('assets')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Obter URL pública
      const { data: publicUrlData } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath);
        
      if (publicUrlData) {
        const publicUrl = publicUrlData.publicUrl;
        
        // Atualizar as configurações locais
        setLocalSettings(prev => ({
          ...prev,
          [type]: publicUrl
        }));
        
        toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} atualizado com sucesso!`);
      }
    } catch (error: any) {
      toast.error(`Erro ao fazer upload: ${error.message}`);
      console.error('Upload error:', error);
    }
  };
  
  const fontOptions = [
    "Inter, sans-serif",
    "Roboto, sans-serif",
    "Poppins, sans-serif",
    "Montserrat, sans-serif",
    "Open Sans, sans-serif",
    "Lato, sans-serif",
    "Source Sans Pro, sans-serif",
    "Raleway, sans-serif"
  ];

  return (
    <DashboardLayout activeTab="settings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-blueDark">Configurações do Sistema</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="cores" className="flex items-center gap-2">
              <PaintBucket className="h-4 w-4" />
              <span>Cores</span>
            </TabsTrigger>
            <TabsTrigger value="fontes" className="flex items-center gap-2">
              <Font className="h-4 w-4" />
              <span>Fontes</span>
            </TabsTrigger>
            <TabsTrigger value="imagens" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span>Imagens</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cores">
            <Card>
              <CardHeader>
                <CardTitle>Personalização de Cores</CardTitle>
                <CardDescription>
                  Customize as cores da sua aplicação. As alterações serão aplicadas a todos os usuários.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Cor Primária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={localSettings.primaryColor}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={localSettings.primaryColor}
                        onChange={(e) => handleChange('primaryColor', e.target.value)}
                        className="flex-1"
                      />
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: localSettings.primaryColor }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Utilizada em cabeçalhos, botões principais e elementos de destaque.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={localSettings.secondaryColor}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={localSettings.secondaryColor}
                        onChange={(e) => handleChange('secondaryColor', e.target.value)}
                        className="flex-1"
                      />
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: localSettings.secondaryColor }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Utilizada em fundos, áreas de conteúdo e elementos secundários.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={localSettings.accentColor}
                        onChange={(e) => handleChange('accentColor', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={localSettings.accentColor}
                        onChange={(e) => handleChange('accentColor', e.target.value)}
                        className="flex-1"
                      />
                      <div 
                        className="w-8 h-8 rounded-md border" 
                        style={{ backgroundColor: localSettings.accentColor }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Utilizada em elementos que precisam de destaque, como ícones, links e botões de ação.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Visualização</h3>
                  <div className="border rounded-md p-4 space-y-4">
                    <div 
                      className="p-4 rounded-md text-white"
                      style={{ backgroundColor: localSettings.primaryColor }}
                    >
                      Área com cor primária
                    </div>
                    <div 
                      className="p-4 rounded-md border"
                      style={{ backgroundColor: localSettings.secondaryColor }}
                    >
                      Área com cor secundária
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="px-4 py-2 rounded-md text-white"
                        style={{ backgroundColor: localSettings.primaryColor }}
                      >
                        Botão Primário
                      </button>
                      <button 
                        className="px-4 py-2 rounded-md border"
                        style={{ 
                          backgroundColor: localSettings.secondaryColor, 
                          borderColor: localSettings.primaryColor,
                          color: localSettings.primaryColor 
                        }}
                      >
                        Botão Secundário
                      </button>
                      <button 
                        className="px-4 py-2 rounded-md text-white"
                        style={{ backgroundColor: localSettings.accentColor }}
                      >
                        Botão de Destaque
                      </button>
                    </div>
                    <div>
                      <span>Texto normal e </span>
                      <a href="#" style={{ color: localSettings.accentColor }}>link de destaque</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fontes">
            <Card>
              <CardHeader>
                <CardTitle>Personalização de Fontes</CardTitle>
                <CardDescription>
                  Escolha a fonte que será utilizada em toda a aplicação.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="font">Fonte Principal</Label>
                  <select
                    id="font"
                    value={localSettings.font}
                    onChange={(e) => handleChange('font', e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font} style={{ fontFamily: font }}>
                        {font.split(',')[0]} - Exemplo de texto
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Visualização</h3>
                  <div className="border rounded-md p-4 space-y-4">
                    <div style={{ fontFamily: localSettings.font }}>
                      <h1 className="text-2xl font-bold mb-2">Título de exemplo</h1>
                      <p className="mb-4">
                        Este é um texto de exemplo para visualizar como a fonte escolhida será exibida no site.
                        Textos em diferentes tamanhos ajudam a verificar a legibilidade da fonte em vários contextos.
                      </p>
                      <p className="text-sm">
                        Este é um texto menor para avaliar como a fonte se comporta em tamanhos reduzidos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="imagens">
            <Card>
              <CardHeader>
                <CardTitle>Personalização de Imagens</CardTitle>
                <CardDescription>
                  Atualize o logo e o favicon da aplicação.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo</h3>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                    {localSettings.logo ? (
                      <div className="mb-4">
                        <img 
                          src={localSettings.logo} 
                          alt="Logo atual" 
                          className="max-h-24 max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 bg-gray-100 rounded-md p-6 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                        </svg>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      ref={logoFileInputRef}
                      onChange={(e) => handleFileUpload(e, 'logo')}
                      accept="image/*" 
                      className="hidden" 
                    />
                    
                    <Button 
                      variant="outline"
                      onClick={() => logoFileInputRef.current?.click()}
                    >
                      Escolher novo logo
                    </Button>
                    
                    <p className="mt-2 text-sm text-gray-500">
                      Recomendação: Imagem em formato PNG ou SVG com fundo transparente, dimensões de 200x60 pixels.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Favicon</h3>
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center">
                    {localSettings.favicon ? (
                      <div className="mb-4">
                        <img 
                          src={localSettings.favicon} 
                          alt="Favicon atual" 
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 bg-gray-100 rounded-md p-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                        </svg>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      ref={faviconFileInputRef}
                      onChange={(e) => handleFileUpload(e, 'favicon')}
                      accept="image/*" 
                      className="hidden" 
                    />
                    
                    <Button 
                      variant="outline"
                      onClick={() => faviconFileInputRef.current?.click()}
                    >
                      Escolher novo favicon
                    </Button>
                    
                    <p className="mt-2 text-sm text-gray-500">
                      Recomendação: Imagem em formato PNG com dimensões de 32x32 ou 16x16 pixels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button 
            className="bg-blueDark hover:bg-[#0f2435] text-white"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
