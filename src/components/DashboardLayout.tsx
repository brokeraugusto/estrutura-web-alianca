
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User, LayoutDashboard, FileText, Mail, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 mr-2" />, path: '/admin/dashboard' },
    { name: 'Projetos', icon: <FileText className="w-5 h-5 mr-2" />, path: '/admin/projetos' },
    { name: 'Leads', icon: <User className="w-5 h-5 mr-2" />, path: '/admin/leads' },
    { name: 'Orçamentos', icon: <Mail className="w-5 h-5 mr-2" />, path: '/admin/orcamentos' },
    { name: 'Configurações', icon: <Settings className="w-5 h-5 mr-2" />, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-4 min-w-0">
            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="bg-blueDark text-white p-4 flex items-center">
                  <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                  </svg>
                  <span className="font-bold text-lg">Admin</span>
                </div>
                <nav className="flex flex-col p-4 space-y-1">
                  {menuItems.map(item => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={`justify-start ${activeTab === item.name.toLowerCase() || (activeTab === 'settings' && item.name === 'Configurações') ? 'bg-gray-100 text-blueDark font-medium' : 'text-gray-700'}`}
                      onClick={() => navigate(item.path)}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-700 mt-6"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sair
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <div className="flex items-center min-w-0">
              <svg className="w-8 h-8 mr-2 text-blueDark flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
              </svg>
              <span className="text-blueDark font-bold text-lg hidden sm:inline truncate">
                Aliança Estruturas Admin
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden sm:block text-sm text-gray-600 truncate max-w-32">
              {profile?.name || 'Usuário'}
            </div>
            <Button
              variant="ghost"
              className="text-gray-700 flex-shrink-0"
              onClick={() => signOut()}
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white flex-shrink-0">
          <div className="h-full flex flex-col">
            <div className="py-6 px-4">
              <h2 className="text-xl font-semibold text-blueDark">Painel Admin</h2>
              <p className="text-sm text-gray-600 mt-1 truncate">
                Olá, {profile?.name || 'Usuário'}
              </p>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {menuItems.map(item => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start ${activeTab === item.name.toLowerCase() || (activeTab === 'settings' && item.name === 'Configurações') ? 'bg-gray-100 text-blueDark font-medium' : 'text-gray-700'}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
