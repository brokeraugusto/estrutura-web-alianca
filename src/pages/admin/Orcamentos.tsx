
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Download, FileText } from 'lucide-react';

const Orcamentos: React.FC = () => {
  // Dados simulados de orçamentos
  const orcamentos = [
    { 
      id: 1, 
      cliente: "João Silva", 
      projeto: "Construção Drywall", 
      valor: "R$ 12.500,00", 
      data: "22/05/2025",
      status: "Pendente"
    },
    { 
      id: 2, 
      cliente: "Maria Oliveira", 
      projeto: "Deck Madeira", 
      valor: "R$ 8.200,00", 
      data: "20/05/2025",
      status: "Aprovado"
    },
    { 
      id: 3, 
      cliente: "Carlos Santos", 
      projeto: "Steel Frame Residencial", 
      valor: "R$ 145.000,00", 
      data: "19/05/2025",
      status: "Em análise"
    },
    { 
      id: 4, 
      cliente: "Ana Costa", 
      projeto: "Pergolado", 
      valor: "R$ 5.800,00", 
      data: "18/05/2025",
      status: "Negado"
    },
    { 
      id: 5, 
      cliente: "Paulo Mendes", 
      projeto: "Divisórias Drywall", 
      valor: "R$ 4.300,00", 
      data: "17/05/2025",
      status: "Aprovado"
    },
    { 
      id: 6, 
      cliente: "Juliana Lima", 
      projeto: "Chalé em Madeira", 
      valor: "R$ 78.500,00", 
      data: "15/05/2025",
      status: "Em análise"
    },
    { 
      id: 7, 
      cliente: "Roberto Alves", 
      projeto: "Forro Drywall", 
      valor: "R$ 3.200,00", 
      data: "14/05/2025",
      status: "Pendente"
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Aprovado': return 'bg-green-100 text-green-800';
      case 'Em análise': return 'bg-blue-100 text-blue-800';
      case 'Negado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout activeTab="orcamentos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Orçamentos</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blueDark hover:bg-[#0f2435] text-white">
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="">Selecione um cliente</option>
                    <option value="1">João Silva</option>
                    <option value="2">Maria Oliveira</option>
                    <option value="3">Carlos Santos</option>
                    <option value="4">Ana Costa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Projeto</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option value="">Selecione o tipo</option>
                    <option value="drywall">Drywall</option>
                    <option value="steel-frame">Steel Frame</option>
                    <option value="madeira">Estrutura em Madeira</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Projeto</label>
                <Input placeholder="Nome/descrição do projeto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado (R$)</label>
                  <Input placeholder="0,00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Validade</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detalhes do Orçamento</label>
                <textarea 
                  className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 resize-y"
                  placeholder="Descreva os detalhes do orçamento, materiais, mão de obra, etc."
                ></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <Button type="button" variant="outline" className="mr-2">Cancelar</Button>
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
            <Input placeholder="Buscar orçamentos..." className="pl-10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="em-analise">Em análise</option>
              <option value="aprovado">Aprovado</option>
              <option value="negado">Negado</option>
            </select>
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todos os tipos</option>
              <option value="drywall">Drywall</option>
              <option value="steel-frame">Steel Frame</option>
              <option value="madeira">Madeira</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabela de orçamentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
              {orcamentos.map((orcamento) => (
                <TableRow key={orcamento.id}>
                  <TableCell className="font-medium">{orcamento.id}</TableCell>
                  <TableCell>{orcamento.cliente}</TableCell>
                  <TableCell className="hidden md:table-cell">{orcamento.projeto}</TableCell>
                  <TableCell>{orcamento.valor}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(orcamento.status)}`}>
                      {orcamento.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{orcamento.data}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Mostrando 7 de 7 orçamentos</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orcamentos;
