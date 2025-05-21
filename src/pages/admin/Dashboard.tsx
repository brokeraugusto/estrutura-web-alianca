
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard: React.FC = () => {
  // Dados simulados para cards de estatísticas
  const stats = [
    { title: "Total de Projetos", value: "32", icon: "📋" },
    { title: "Orçamentos Pendentes", value: "7", icon: "📝" },
    { title: "Novos Leads", value: "12", icon: "👤" },
    { title: "Conversões", value: "24%", icon: "📈" },
  ];

  // Dados simulados para atividades recentes
  const activities = [
    { action: "Novo orçamento solicitado", name: "João Silva", date: "Hoje, 10:30", status: "Pendente" },
    { action: "Lead convertido em cliente", name: "Maria Oliveira", date: "Ontem, 15:45", status: "Concluído" },
    { action: "Projeto atualizado", name: "Carlos Santos", date: "Ontem, 09:15", status: "Atualizado" },
    { action: "Novo lead registrado", name: "Ana Costa", date: "26/05/2025, 14:20", status: "Novo" },
    { action: "Orçamento aprovado", name: "Paulo Mendes", date: "25/05/2025, 11:10", status: "Aprovado" },
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      <h1 className="text-2xl font-bold text-blueDark mb-6">Visão Geral</h1>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-semibold text-blueDark mt-1">{stat.value}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Atividades recentes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blueDark">Atividades Recentes</h2>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <li key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.name} • {activity.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'Pendente' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : activity.status === 'Concluído'
                      ? 'bg-green-100 text-green-800'
                      : activity.status === 'Atualizado'
                      ? 'bg-blue-100 text-blue-800'
                      : activity.status === 'Novo'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Gráfico simplificado */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blueDark">Desempenho Mensal</h2>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-end justify-around">
            {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((month, i) => {
              // Gerar altura aleatória para cada barra (entre 20% e 100%)
              const height = 20 + Math.floor(Math.random() * 80);
              return (
                <div key={i} className="flex flex-col items-center w-1/6">
                  <div 
                    className="bg-orangeAccent w-full rounded-t-sm" 
                    style={{height: `${height}%`}}
                  ></div>
                  <span className="text-xs mt-2 text-gray-600">{month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
