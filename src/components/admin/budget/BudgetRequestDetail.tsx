
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatCurrency, formatDate, formatStatus, formatProjectType } from '@/lib/formatters';
import { BudgetRequest } from '@/components/admin/budget/BudgetRequestList';
import { Loader2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BudgetRequestDetailProps {
  budgetRequest: BudgetRequest | null;
  onClose: () => void;
  onSave: () => void;
}

export const BudgetRequestDetail: React.FC<BudgetRequestDetailProps> = ({
  budgetRequest,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<BudgetRequest>>(
    budgetRequest || {}
  );

  if (!budgetRequest) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!budgetRequest?.id) return;
    
    try {
      setSaving(true);
      
      // Only update the fields that have been changed
      const { data, error } = await supabase
        .from('budget_requests')
        .update({
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          project_type: formData.project_type,
          project_description: formData.project_description,
          estimated_value: formData.estimated_value ? Number(formData.estimated_value) : null,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', budgetRequest.id);
      
      if (error) throw error;
      
      toast({
        title: "Orçamento atualizado",
        description: "As informações do orçamento foram atualizadas com sucesso.",
      });
      
      setIsEditing(false);
      onSave();
    } catch (error) {
      console.error('Error updating budget request:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar orçamento",
        description: "Não foi possível atualizar as informações. Tente novamente.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Orçamento #{budgetRequest.id.substring(0, 8)}
          </h2>
          <p className="text-muted-foreground">
            Criado em {formatDate(budgetRequest.created_at)}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(budgetRequest);
                }}
                disabled={saving}
              >
                <X className="mr-1 h-4 w-4" /> Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1 h-4 w-4" />
                )}
                Salvar
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Informações do Cliente</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="client_name">Nome</Label>
              {isEditing ? (
                <Input
                  id="client_name"
                  name="client_name"
                  value={formData.client_name || ''}
                  onChange={handleChange}
                />
              ) : (
                <div className="mt-1">{budgetRequest.client_name}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="client_email">Email</Label>
              {isEditing ? (
                <Input
                  id="client_email"
                  name="client_email"
                  type="email"
                  value={formData.client_email || ''}
                  onChange={handleChange}
                />
              ) : (
                <div className="mt-1">{budgetRequest.client_email}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="client_phone">Telefone</Label>
              {isEditing ? (
                <Input
                  id="client_phone"
                  name="client_phone"
                  value={formData.client_phone || ''}
                  onChange={handleChange}
                />
              ) : (
                <div className="mt-1">{budgetRequest.client_phone || 'Não informado'}</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Detalhes do Projeto</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project_type">Tipo de Projeto</Label>
              {isEditing ? (
                <select
                  id="project_type"
                  name="project_type"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.project_type || ''}
                  onChange={handleChange}
                >
                  <option value="drywall">Drywall</option>
                  <option value="steel-frame">Steel Frame</option>
                  <option value="madeira">Estrutura em Madeira</option>
                </select>
              ) : (
                <div className="mt-1">{formatProjectType(budgetRequest.project_type)}</div>
              )}
            </div>
            
            <div>
              <Label htmlFor="estimated_value">Valor Estimado</Label>
              {isEditing ? (
                <Input
                  id="estimated_value"
                  name="estimated_value"
                  type="number"
                  value={formData.estimated_value || ''}
                  onChange={handleChange}
                />
              ) : (
                <div className="mt-1">
                  {budgetRequest.estimated_value 
                    ? formatCurrency(budgetRequest.estimated_value) 
                    : 'Não definido'}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              {isEditing ? (
                <select
                  id="status"
                  name="status"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  value={formData.status || ''}
                  onChange={handleChange}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_analise">Em análise</option>
                  <option value="aprovado">Aprovado</option>
                  <option value="negado">Negado</option>
                </select>
              ) : (
                <div className="mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    budgetRequest.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                    budgetRequest.status === 'aprovado' ? 'bg-green-100 text-green-800' :
                    budgetRequest.status === 'em_analise' ? 'bg-blue-100 text-blue-800' :
                    budgetRequest.status === 'negado' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {formatStatus(budgetRequest.status)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="project_description">Descrição do Projeto</Label>
        {isEditing ? (
          <Textarea
            id="project_description"
            name="project_description"
            className="mt-1"
            rows={5}
            value={formData.project_description || ''}
            onChange={handleChange}
          />
        ) : (
          <div className="mt-1 p-3 border rounded-md">
            {budgetRequest.project_description || 'Sem descrição'}
          </div>
        )}
      </div>
    </div>
  );
};
