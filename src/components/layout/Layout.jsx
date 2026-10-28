import { Outlet } from 'react-router-dom';
import Header from './Header';
import ToastViewport from '../Toast/ToastViewport';

/**
 * Estrutura comum a todas as páginas: cabeçalho, conteúdo da rota
 * (via <Outlet />), rodapé e a área de notificações.
 */
export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="shell">
        <Header />
        <main id="conteudo" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="site-footer">
          <p>
            Previsões de um modelo simplificado, feitas para estudo. Para navegar, use a Tábua de Marés da
            Marinha do Brasil.
          </p>
          <p>Projeto acadêmico, Engenharia de Software, UCSal.</p>
        </footer>
      </div>
      <ToastViewport />
    </>
  );
}
