
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BudgetFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  projectTypes: string[];
}

export const BudgetFilters: React.FC<BudgetFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  projectTypes,
}) => {
  return (
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
  );
};
