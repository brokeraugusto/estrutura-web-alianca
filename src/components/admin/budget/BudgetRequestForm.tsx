
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabaseWrapper } from '@/lib/supabase-wrapper';
import { useToast } from '@/hooks/use-toast';

interface BudgetRequestFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  client_name: string;
  client_email: string;
  client_phone: string;
  project_type: string;
  description: string;
  estimated_value: string;
  validity_date: string;
}

export const BudgetRequestForm: React.FC<BudgetRequestFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    client_name: '',
    client_email: '',
    client_phone: '',
    project_type: '',
    description: '',
    estimated_value: '',
    validity_date: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Creating budget request:', formData);
      const { error } = await supabaseWrapper.budgetRequests.create({
        client_name: formData.client_name,
        client_email: formData.client_email,
        client_phone: formData.client_phone,
        project_type: formData.project_type,
        project_description: formData.description,
        estimated_value: formData.estimated_value ? parseFloat(formData.estimated_value) : null,
        status: 'pendente'
      });
      
      if (error) {
        console.error('Error creating budget request:', error);
        throw error;
      }
      
      toast({
        title: "Orçamento criado",
        description: "O orçamento foi criado com sucesso."
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating budget request:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar orçamento",
        description: "Não foi possível criar o orçamento. Tente novamente mais tarde."
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
          <Input 
            name="client_name" 
            value={formData.client_name} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email do Cliente</label>
          <Input 
            name="client_email" 
            type="email" 
            value={formData.client_email} 
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <Input 
          name="client_phone" 
          value={formData.client_phone} 
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Projeto</label>
        <select 
          name="project_type" 
          value={formData.project_type} 
          onChange={handleInputChange} 
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="drywall">Drywall</option>
          <option value="steel-frame">Steel Frame</option>
          <option value="madeira">Estrutura em Madeira</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Projeto</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange}
          className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 resize-y"
          placeholder="Descreva os detalhes do orçamento, materiais, mão de obra, etc."
        ></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado (R$)</label>
          <Input 
            name="estimated_value" 
            placeholder="0,00" 
            value={formData.estimated_value} 
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Validade</label>
          <Input 
            name="validity_date" 
            type="date" 
            value={formData.validity_date} 
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="button" variant="outline" className="mr-2" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-blueDark hover:bg-[#0f2435] text-white">Salvar</Button>
      </div>
    </form>
  );
};
