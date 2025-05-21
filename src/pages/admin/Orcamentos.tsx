
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Download, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface BudgetRequest {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  project_type: string;
  project_description: string | null;
  estimated_value: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const Orcamentos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBudgetRequests();
  }, []);

  async function fetchBudgetRequests() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('budget_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setBudgetRequests(data || []);
    } catch (error) {
      console.error('Error fetching budget requests:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar orçamentos",
        description: "Não foi possível carregar os orçamentos. Tente novamente mais tarde."
      });
    } finally {
      setLoading(false);
    }
  }

  async function createBudgetRequest(formData: any) {
    try {
      const { error } = await supabase
        .from('budget_requests')
        .insert([{
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          project_type: formData.project_type,
          project_description: formData.description,
          estimated_value: formData.estimated_value ? parseFloat(formData.estimated_value) : null,
          status: 'pendente'
        }]);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Orçamento criado",
        description: "O orçamento foi criado com sucesso."
      });
      
      fetchBudgetRequests();
    } catch (error) {
      console.error('Error creating budget request:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar orçamento",
        description: "Não foi possível criar o orçamento. Tente novamente mais tarde."
      });
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'em_analise': return 'bg-blue-100 text-blue-800';
      case 'negado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBudgetRequests = budgetRequests.filter(request => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      request.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.project_description && request.project_description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === '' || request.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === '' || request.project_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Extract unique project types for filter dropdown
  const projectTypes = Array.from(new Set(budgetRequests.map(request => request.project_type)));

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    project_type: '',
    description: '',
    estimated_value: '',
    validity_date: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBudgetRequest(formData);
    setDialogOpen(false);
    // Reset form
    setFormData({
      client_name: '',
      client_email: '',
      client_phone: '',
      project_type: '',
      description: '',
      estimated_value: '',
      validity_date: ''
    });
  };

  return (
    <DashboardLayout activeTab="orcamentos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Orçamentos</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blueDark hover:bg-[#0f2435] text-white">
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
            </DialogHeader>
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
                <Button type="button" variant="outline" className="mr-2" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" className="bg-blueDark hover:bg-[#0f2435] text-white">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Buscar orçamentos..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="em_analise">Em análise</option>
              <option value="aprovado">Aprovado</option>
              <option value="negado">Negado</option>
            </select>
            <select 
              className="h-10 rounded-md border border-input bg-background px-3 py-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'drywall' ? 'Drywall' :
                   type === 'steel-frame' ? 'Steel Frame' :
                   type === 'madeira' ? 'Madeira' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabela de orçamentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-blueDark" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Projeto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBudgetRequests.length > 0 ? (
                  filteredBudgetRequests.map((request, index) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{request.client_name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {request.project_type === 'drywall' ? 'Drywall' :
                         request.project_type === 'steel-frame' ? 'Steel Frame' :
                         request.project_type === 'madeira' ? 'Estrutura em Madeira' : request.project_type}
                      </TableCell>
                      <TableCell>
                        {request.estimated_value ? formatCurrency(request.estimated_value) : 'Não definido'}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status === 'pendente' ? 'Pendente' :
                           request.status === 'em_analise' ? 'Em análise' :
                           request.status === 'aprovado' ? 'Aprovado' :
                           request.status === 'negado' ? 'Negado' : request.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(request.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver Detalhes">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Baixar PDF">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      Nenhum orçamento encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {filteredBudgetRequests.length} de {budgetRequests.length} orçamentos
          </p>
          {/* Pagination can be added here when needed */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orcamentos;
