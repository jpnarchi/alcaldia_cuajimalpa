import { Navigation } from './Navigation';
import { Button } from './ui/Button';
import '../styles/global.css';
import { LogIn } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin');
  };

  return (
    <>
      <Navigation />
      <div className="w-full bg-white text-black">
        <div className={`grid ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'} h-screen`}>
          <div className="flex flex-col items-center justify-center p-4 md:p-8">
            <div className={`flex flex-col ${isDesktop ? 'pl-32' : ''} gap-2`}>
              <h1 className="text-5xl font-bold text-left">Alcaldía Cuajimalpa de Morelos</h1>
              <div className="text-2xl font-normal text-gray-600 text-left">Atención a Emergencias Urbanas</div>
               <Button
               className="self-start"
               variant="primary"
               size="large"
               onClick={handleLogin}
               >
                 <LogIn size={20} />
                 Iniciar Sesión
               </Button>
            </div>

          </div>
          {isDesktop && (
            <div className="flex items-center justify-center overflow-hidden">
              <img src="/cuajimalpa-banner.jpg" alt="Banner" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};  