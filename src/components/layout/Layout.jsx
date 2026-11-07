import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useCallback, useState } from 'react';

const INITIAL_FILTERS = {
  genre: [],
  hall: null,
  format: null,
};

export default function Layout() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const toggleFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const current = prev[key];

      if (Array.isArray(current)) {
        const newArray = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [key]: newArray };
      }
      return {
        ...prev,
        [key]: current === value ? null : value,
      };
    });
  }, []);

  const resetFilters = useCallback(() => setFilters(INITIAL_FILTERS), []);

  return (
    <div className="app-layout">
      <Header toggleFilter={toggleFilter} resetFilters={resetFilters} />
      <div className="layout-body">
        <Sidebar
          filters={filters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
        <div className="main-column">
          <Breadcrumbs />
          <main className="content">
            <Outlet context={{ filters, toggleFilter, resetFilters }} />
          </main>
        </div>
      </div>
    </div>
  );
}