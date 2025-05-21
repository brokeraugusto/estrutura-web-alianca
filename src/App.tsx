
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

// Admin Routes
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjetosAdmin from "./pages/admin/Projetos";
import Leads from "./pages/admin/Leads";
import Orcamentos from "./pages/admin/Orcamentos";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={
            <Layout>
              <QuemSomos />
            </Layout>
          } />
          <Route path="/servicos" element={
            <Layout>
              <Servicos />
            </Layout>
          } />
          <Route path="/projetos" element={
            <Layout>
              <Projetos />
            </Layout>
          } />
          <Route path="/contato" element={
            <Layout>
              <Contato />
            </Layout>
          } />
          
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/projetos" element={
            <ProtectedRoute>
              <ProjetosAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/leads" element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          } />
          <Route path="/admin/orcamentos" element={
            <ProtectedRoute>
              <Orcamentos />
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

