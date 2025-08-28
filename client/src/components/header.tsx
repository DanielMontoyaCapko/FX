import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logoImg from "@/assets/Logo-removeBG_1752488347081.png";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const [, setLocation] = useLocation();

  const goToContact = () => {
    setLocation("/contacto");
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-silver-500/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={logoImg} alt="Nakama&Partners" className="w-10 h-10" />
            <span className="font-cormorant text-xl font-semibold text-gray-900 dark:text-white">Nakama&Partners</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`transition-colors ${isActive("/") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
          >
            Inicio
          </Link>
          <Link
            href="/inversiones"
            className={`transition-colors ${isActive("/inversiones") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
          >
            Inversiones
          </Link>
          <Link
            href="/nosotros"
            className={`transition-colors ${isActive("/nosotros") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
          >
            Nosotros
          </Link>
          <Link
            href="/calculadora"
            className={`transition-colors ${isActive("/calculadora") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
          >
            Calculadora
          </Link>
          <Link
            href="/contacto"
            className={`transition-colors ${isActive("/contacto") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
          >
            Contacto
          </Link>
          <Link
            href="/login"
            className="bg-[#344e41] hover:bg-[#2d4235] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Partners
          </Link>
          <ThemeToggle />
        </div>

        {/* Botón desktop con nuevo color */}
        <Button
          onClick={goToContact}
          className="hidden md:block bg-[#3f8358] hover:bg-[#356e4a] px-6 py-3 text-white font-semibold"
        >
          Quiero más información
        </Button>

        {/* Mobile controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-900 dark:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-black border-gray-200/20 dark:border-silver-500/20">
            <div className="flex flex-col space-y-6 mt-8">
              <Link
                href="/"
                className={`text-left transition-colors ${isActive("/") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/inversiones"
                className={`text-left transition-colors ${isActive("/inversiones") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
                onClick={() => setIsOpen(false)}
              >
                Inversiones
              </Link>
              <Link
                href="/nosotros"
                className={`text-left transition-colors ${isActive("/nosotros") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/calculadora"
                className={`text-left transition-colors ${isActive("/calculadora") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
                onClick={() => setIsOpen(false)}
              >
                Calculadora
              </Link>
              <Link
                href="/contacto"
                className={`text-left transition-colors ${isActive("/contacto") ? "text-green" : "text-gray-600 dark:text-silver-100 hover:text-green"}`}
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/login"
                className="bg-[#344e41] hover:bg-[#2d4235] text-white px-4 py-2 rounded-lg transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </Link>

              {/* Theme Toggle for mobile */}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              {/* Botón móvil con nuevo color */}
              <Button
                onClick={goToContact}
                className="bg-[#3f8358] hover:bg-[#356e4a] text-white font-semibold"
              >
                Quiero más información
              </Button>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
