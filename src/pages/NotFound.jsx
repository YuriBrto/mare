import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page page--narrow">
      <header className="page__intro">
        <h1 className="page__title">A maré levou esta página</h1>
        <p className="page__lead">O endereço não existe ou mudou de lugar.</p>
      </header>
      <Link to="/" className="button">
        Ver a maré agora
      </Link>
    </div>
  );
}
