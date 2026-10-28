import { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Pagination from '../components/Pagination/Pagination';
import SpeciesRow from '../components/SpeciesRow/SpeciesRow';
import { useToast } from '../context/ToastContext';
import { useStation } from '../context/StationContext';
import { SPECIES, SPECIES_GROUPS } from '../data/species';

const PAGE_SIZE = 6;

export default function Species() {
  const [group, setGroup] = useState('todos');
  const [page, setPage] = useState(1);
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);
  const { showToast } = useToast();
  const { station } = useStation();

  const filtered = useMemo(
    () => (group === 'todos' ? SPECIES : SPECIES.filter((species) => species.group === group)),
    [group],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Ao trocar de página, leva o foco ao título da lista (bom para teclado e leitor de tela).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [page]);

  const handleGroupChange = (value) => {
    setGroup(value);
    setPage(1); // novo filtro sempre começa na primeira página
  };

  const handleLogSighting = (species) => {
    showToast({
      type: 'success',
      title: 'Avistamento registrado',
      message: `${species.name} em ${station.name}. Obrigado por contribuir!`,
    });
  };

  const groupLabel = SPECIES_GROUPS.find((option) => option.value === group)?.label;

  return (
    <div className="page">
      <header className="page__intro">
        <h1 className="page__title">Vida marinha</h1>
        <p className="page__lead">
          Espécies que vivem no litoral de Salvador. A régua mostra a faixa de profundidade em que cada uma costuma
          ser vista, da superfície aos 60 metros.
        </p>
      </header>

      <div className="toolbar">
        <Dropdown label="Filtrar por grupo" options={SPECIES_GROUPS} value={group} onChange={handleGroupChange} />
        <p className="toolbar__count" aria-live="polite">
          {filtered.length} espécies{group !== 'todos' && ` em ${groupLabel.toLowerCase()}`}
        </p>
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="visually-hidden">
        Página {page} de {totalPages}
      </h2>
      <ul className="species-list">
        {visible.map((species) => (
          <SpeciesRow key={species.id} species={species} onLogSighting={handleLogSighting} />
        ))}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        label="Páginas do catálogo de espécies"
      />
    </div>
  );
}
