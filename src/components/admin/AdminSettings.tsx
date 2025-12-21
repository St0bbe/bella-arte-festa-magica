import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { Settings, Upload, Trash2, Save, ImageIcon } from "lucide-react";

export function AdminSettings() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: settings, isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    logo_url: "",
    about_title: "",
    about_description: "",
    about_mission: "",
    footer_text: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        logo_url: settings.logo_url || "",
        about_title: settings.about_title || "",
        about_description: settings.about_description || "",
        about_mission: settings.about_mission || "",
        footer_text: settings.footer_text || "",
      });
    }
  }, [settings]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      setFormData({ ...formData, logo_url: publicUrl.publicUrl });

      toast({
        title: "Logo enviada!",
        description: "A imagem foi carregada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(formData).map(([key, value]) => 
        updateSetting.mutateAsync({ key, value })
      );
      
      await Promise.all(updates);
      
      toast({
        title: "Configurações salvas!",
        description: "Todas as alterações foram salvas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Logo Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Logo do Site
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {formData.logo_url ? (
              <div className="relative w-48 h-24 rounded-lg overflow-hidden border-2 border-border bg-muted">
                <img
                  src={formData.logo_url}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-48 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Logo
                  </>
                )}
              </Button>
              {formData.logo_url && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setFormData({ ...formData, logo_url: "" })}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remover
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A logo será exibida no cabeçalho e no rodapé do site.
          </p>
        </CardContent>
      </Card>

      {/* About Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Sobre Nós
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about_title">Título</Label>
            <Input
              id="about_title"
              value={formData.about_title}
              onChange={(e) =>
                setFormData({ ...formData, about_title: e.target.value })
              }
              placeholder="Ex: Sobre a Bella Arte"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about_description">Descrição Principal</Label>
            <Textarea
              id="about_description"
              value={formData.about_description}
              onChange={(e) =>
                setFormData({ ...formData, about_description: e.target.value })
              }
              rows={4}
              placeholder="Conte um pouco sobre a empresa..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about_mission">Missão / Segunda Descrição</Label>
            <Textarea
              id="about_mission"
              value={formData.about_mission}
              onChange={(e) =>
                setFormData({ ...formData, about_mission: e.target.value })
              }
              rows={3}
              placeholder="Nossa missão é..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Rodapé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footer_text">Texto do Rodapé</Label>
            <Input
              id="footer_text"
              value={formData.footer_text}
              onChange={(e) =>
                setFormData({ ...formData, footer_text: e.target.value })
              }
              placeholder="© 2024 Bella Arte. Todos os direitos reservados."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
