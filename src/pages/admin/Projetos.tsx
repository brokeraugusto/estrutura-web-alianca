
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, FileText } from 'lucide-react';

const Projetos: React.FC = () => {
  // Dados simulados de projetos
  const projetos = [
    { 
      id: 1, 
      titulo: "Residência Moderna", 
      localizacao: "Garopaba, SC", 
      categoria: "steel-frame", 
      status: "Concluído", 
      data: "15/04/2025"
    },
    { 
      id: 2, 
      titulo: "Deck para Restaurante", 
      localizacao: "Imbituba, SC", 
      categoria: "madeira", 
      status: "Em andamento", 
      data: "03/05/2025"
    },
    { 
      id: 3, 
      titulo: "Home Office", 
      localizacao: "Garopaba, SC", 
      categoria: "drywall", 
      status: "Concluído", 
      data: "28/03/2025"
    },
    { 
      id: 4, 
      titulo: "Chalé de Montanha", 
      localizacao: "Serra Catarinense", 
      categoria: "madeira", 
      status: "Em andamento", 
      data: "10/05/2025"
    },
    { 
      id: 5, 
      titulo: "Loft Moderno", 
      localizacao: "Florianópolis, SC", 
      categoria: "drywall", 
      status: "Planejamento", 
      data: "22/05/2025"
    },
    { 
      id: 6, 
      titulo: "Casa de Praia", 
      localizacao: "Garopaba, SC", 
      categoria: "steel-frame", 
      status: "Concluído", 
      data: "02/04/2025"
    }
  ];

  return (
    <DashboardLayout activeTab="projetos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Projetos</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orangeAccent hover:bg-[#ff9000] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Projeto</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto</label>
                <Input placeholder="Nome do projeto" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                <Input placeholder="Cidade, Estado" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                  <option value="">Selecione uma categoria</option>
                  <option value="steel-frame">Steel Frame</option>
                  <option value="drywall">Drywall</option>
                  <option value="madeira">Madeira</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                  <option value="">Selecione o status</option>
                  <option value="planejamento">Planejamento</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
                <Input type="file" className="py-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 resize-y"
                  placeholder="Descreva o projeto..."
                ></textarea>
              </div>
              <div className="flex justify-end">
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
            <Input 
              placeholder="Buscar projetos..." 
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todas as categorias</option>
              <option value="steel-frame">Steel Frame</option>
              <option value="drywall">Drywall</option>
              <option value="madeira">Madeira</option>
            </select>
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todos os status</option>
              <option value="planejamento">Planejamento</option>
              <option value="em-andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabela de projetos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projetos.map((projeto) => (
                <TableRow key={projeto.id}>
                  <TableCell className="font-medium">{projeto.id}</TableCell>
                  <TableCell>{projeto.titulo}</TableCell>
                  <TableCell className="hidden md:table-cell">{projeto.localizacao}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={
                      projeto.categoria === 'steel-frame' 
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                        : projeto.categoria === 'drywall'
                        ? 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                    }>
                      {projeto.categoria === 'steel-frame' 
                        ? 'Steel Frame' 
                        : projeto.categoria === 'drywall' 
                        ? 'Drywall' 
                        : 'Madeira'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      projeto.status === 'Concluído'
                        ? 'bg-green-100 text-green-800'
                        : projeto.status === 'Em andamento'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {projeto.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{projeto.data}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Mostrando 6 de 6 projetos</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projetos;
