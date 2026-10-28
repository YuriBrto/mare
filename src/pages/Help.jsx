import Accordion from '../components/Accordion/Accordion';
import { FAQ_ITEMS } from '../data/faq';

export default function Help() {
  return (
    <div className="page page--narrow">
      <header className="page__intro">
        <h1 className="page__title">Perguntas sobre a maré</h1>
        <p className="page__lead">Toque numa pergunta para ver a resposta. Só uma fica aberta por vez.</p>
      </header>

      <Accordion items={FAQ_ITEMS} defaultOpenId={FAQ_ITEMS[0].id} />
    </div>
  );
}
