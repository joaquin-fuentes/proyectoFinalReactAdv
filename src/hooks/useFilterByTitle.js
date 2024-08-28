import { useState } from 'react';

const useFilterByTitle = (novedadesFilter) => {
  const [titleFilter, setTitleFilter] = useState('');

  const filterNovedades = titleFilter
    ? novedadesFilter.filter(novedad =>
      novedad.titulo.toLowerCase().includes(titleFilter.toLowerCase())
    )
    : novedadesFilter;

  return { filterNovedades, setTitleFilter };
};

export default useFilterByTitle;