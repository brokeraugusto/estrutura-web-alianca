
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    // Normally would validate with backend, but for now just check hardcoded credentials
    if (data.email === "admin@aliancaestruturas.com.br" && data.password === "admin123") {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success("Login realizado com sucesso!");
      navigate('/admin/dashboard');
    } else {
      toast.error("Email ou senha incorretos");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <svg className="w-10 h-10 mr-2 text-blueDark" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
            </svg>
            <span className="text-blueDark font-bold text-xl tracking-tight">Aliança Estruturas</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6 text-blueDark">Área Administrativa</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="seu@email.com" 
                      {...field} 
                      required
                      className="border-gray-300 focus:border-blueDark focus:ring focus:ring-blueDark focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      required
                      className="border-gray-300 focus:border-blueDark focus:ring focus:ring-blueDark focus:ring-opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-blueDark hover:bg-[#0f2435] text-white"
            >
              Entrar
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Para fins de demonstração:</p>
          <p>Email: admin@aliancaestruturas.com.br</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
