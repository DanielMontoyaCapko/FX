import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Home from "@/pages/home";
import Inversiones from "@/pages/inversiones";
import Nosotros from "@/pages/nosotros";
import Calculadora from "@/pages/calculadora";
import Contacto from "@/pages/contacto";
import Login from "@/pages/login";
import DashboardRouter from "@/pages/dashboard-router";
import AvisoLegal from "@/pages/aviso-legal";
import PoliticaUso from "@/pages/politica-uso";
import PoliticaCookies from "@/pages/politica-cookies";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inversiones" component={Inversiones} />
      <Route path="/nosotros" component={Nosotros} />
      <Route path="/calculadora" component={Calculadora} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={DashboardRouter} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/politica-uso" component={PoliticaUso} />
      <Route path="/politica-cookies" component={PoliticaCookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
