
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Search, Phone, Mail, Eye } from 'lucide-react';

const Leads: React.FC = () => {
  // Dados simulados de leads
  const leads = [
    { 
      id: 1, 
      nome: "João Silva", 
      email: "joao.silva@email.com", 
      telefone: "(48) 99999-1111", 
      fonte: "Formulário de Contato",
      data: "22/05/2025",
      status: "Novo"
    },
    { 
      id: 2, 
      nome: "Maria Oliveira", 
      email: "maria.oliveira@email.com", 
      telefone: "(48) 99999-2222", 
      fonte: "WhatsApp",
      data: "20/05/2025",
      status: "Contatado"
    },
    { 
      id: 3, 
      nome: "Pedro Santos", 
      email: "pedro.santos@email.com", 
      telefone: "(48) 99999-3333", 
      fonte: "Formulário de Orçamento",
      data: "19/05/2025",
      status: "Qualificado"
    },
    { 
      id: 4, 
      nome: "Ana Costa", 
      email: "ana.costa@email.com", 
      telefone: "(48) 99999-4444", 
      fonte: "Instagram",
      data: "18/05/2025",
      status: "Contatado"
    },
    { 
      id: 5, 
      nome: "Carlos Souza", 
      email: "carlos.souza@email.com", 
      telefone: "(48) 99999-5555", 
      fonte: "Indicação",
      data: "17/05/2025",
      status: "Qualificado"
    },
    { 
      id: 6, 
      nome: "Juliana Lima", 
      email: "juliana.lima@email.com", 
      telefone: "(48) 99999-6666", 
      fonte: "Facebook",
      data: "15/05/2025",
      status: "Convertido"
    },
    { 
      id: 7, 
      nome: "Fernando Gomes", 
      email: "fernando.gomes@email.com", 
      telefone: "(48) 99999-7777", 
      fonte: "Formulário de Contato",
      data: "14/05/2025",
      status: "Perdido"
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Novo': return 'bg-purple-100 text-purple-800';
      case 'Contatado': return 'bg-blue-100 text-blue-800';
      case 'Qualificado': return 'bg-yellow-100 text-yellow-800';
      case 'Convertido': return 'bg-green-100 text-green-800';
      case 'Perdido': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout activeTab="leads">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blueDark">Gerenciar Leads</h1>
      </div>
      
      {/* Filtros e busca */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Buscar leads..." className="pl-10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todos os status</option>
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="qualificado">Qualificado</option>
              <option value="convertido">Convertido</option>
              <option value="perdido">Perdido</option>
            </select>
            <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
              <option value="">Todas as fontes</option>
              <option value="formulario-contato">Formulário de Contato</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="indicacao">Indicação</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabela de leads */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Fonte</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.id}</TableCell>
                  <TableCell>{lead.nome}</TableCell>
                  <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{lead.telefone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{lead.fonte}</TableCell>
                  <TableCell className="hidden md:table-cell">{lead.data}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Enviar Email">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Ligar">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver Detalhes">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Detalhes do Lead</DrawerTitle>
                          </DrawerHeader>
                          <div className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-lg">{lead.nome}</h3>
                                <p className="text-sm text-gray-500">ID: {lead.id} • Registrado em {lead.data}</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Email</p>
                                  <p>{lead.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Telefone</p>
                                  <p>{lead.telefone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Status</p>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Fonte</p>
                                  <p>{lead.fonte}</p>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <p className="text-sm font-medium text-gray-500 mb-2">Atualizar Status</p>
                                <div className="flex flex-wrap gap-2">
                                  <Button size="sm" variant="outline" className={lead.status === 'Novo' ? 'bg-purple-50' : ''}>
                                    Novo
                                  </Button>
                                  <Button size="sm" variant="outline" className={lead.status === 'Contatado' ? 'bg-blue-50' : ''}>
                                    Contatado
                                  </Button>
                                  <Button size="sm" variant="outline" className={lead.status === 'Qualificado' ? 'bg-yellow-50' : ''}>
                                    Qualificado
                                  </Button>
                                  <Button size="sm" variant="outline" className={lead.status === 'Convertido' ? 'bg-green-50' : ''}>
                                    Convertido
                                  </Button>
                                  <Button size="sm" variant="outline" className={lead.status === 'Perdido' ? 'bg-gray-50' : ''}>
                                    Perdido
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <p className="text-sm font-medium text-gray-500 mb-2">Histórico de Interações</p>
                                <div className="space-y-2">
                                  <div className="rounded-md bg-gray-50 p-3">
                                    <p className="text-sm">Email enviado: Proposta comercial</p>
                                    <p className="text-xs text-gray-500">21/05/2025, 14:30</p>
                                  </div>
                                  <div className="rounded-md bg-gray-50 p-3">
                                    <p className="text-sm">Ligação realizada: Cliente interessado em orçamento</p>
                                    <p className="text-xs text-gray-500">20/05/2025, 10:15</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="border-t pt-4">
                                <p className="text-sm font-medium text-gray-500 mb-2">Adicionar Nova Interação</p>
                                <textarea 
                                  className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 resize-y"
                                  placeholder="Descreva a interação..."
                                ></textarea>
                                <div className="mt-2">
                                  <Button size="sm" className="bg-blueDark hover:bg-[#0f2435] text-white">
                                    Salvar Interação
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Mostrando 7 de 7 leads</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" disabled>Próximo</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leads;
