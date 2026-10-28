import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StationProvider } from './context/StationContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Species from './pages/Species';
import Buoys from './pages/Buoys';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

/**
 * Componente principal: monta os provedores de estado global (Context API)
 * e as rotas da aplicação (React Router). Cada rota renderiza uma página
 * dentro do <Layout />, que contém cabeçalho, rodapé e notificações.
 */
export default function App() {
  return (
    <ToastProvider>
      <StationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="vida-marinha" element={<Species />} />
              <Route path="boias" element={<Buoys />} />
              <Route path="ajuda" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StationProvider>
    </ToastProvider>
  );
}
