import { useState, useCallback, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import movies from '../../data/movies.json';
import Icon from '../common/Icon';
import { SIDEBAR_SECTIONS } from '../../data/sidebar_sections';

const MOVIE_COUNTS = movies.reduce((acc, movie) => {
  if (movie.genre) acc[`genre_${movie.genre}`] = (acc[`genre_${movie.genre}`] || 0) + 1;
  if (movie.hall) acc[`hall_${movie.hall}`] = (acc[`hall_${movie.hall}`] || 0) + 1;
  if (movie.format) acc[`format_${movie.format}`] = (acc[`format_${movie.format}`] || 0) + 1;
  return acc;
}, {});

export default function Sidebar({ filters, toggleFilter, resetFilters }) {
  const [openGroups, setOpenGroups] = useState(
    SIDEBAR_SECTIONS.flatMap((s) => s.groups.map((g) => g.name))
  );

  const location = useLocation();
  const navigate = useNavigate();

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => prev.includes(groupName)
      ? prev.filter((name) => name !== groupName)
      : [...prev, groupName]);
  }

  const goToHomeIfNeeded = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleSelect = useCallback((key, value) => {
    toggleFilter(key, value);
    goToHomeIfNeeded();
  }, [toggleFilter, location.pathname]);

  const isAllMoviesActive =
    filters.genre.length === 0 && !filters.hall && !filters.format;

  return (
    <aside className="sidebar">
      <h3 className="sidebar-heading">Категорії та зали</h3>
      <button
        className={isAllMoviesActive ? 'sidebar-reset active' : 'sidebar-reset'}
        onClick={() => {
          resetFilters();
          goToHomeIfNeeded();
        }}
      >
        Усі фільми
      </button>

      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title} className="sidebar-section">
          <div className="sidebar-level-0">{section.title}</div>

          {section.groups.map((group) => {
            const isOpen = openGroups.includes(group.name);
            return (
              <div key={group.name} className="sidebar-group">
                <button
                  className={isOpen ? 'sidebar-level-1 open' : 'sidebar-level-1'}
                  onClick={() => toggleGroup(group.name)}
                >
                  <Icon name="chevron" size={14} />
                  <span>{group.name}</span>
                </button>

                {isOpen && (
                  <div className="sidebar-children">
                    {group.items.map((item) => {
                      const current = filters[item.countKey];
                      const isActive = Array.isArray(current)
                        ? current.includes(item.value)
                        : current === item.value;
                      const count = MOVIE_COUNTS[`${item.countKey}_${item.value}`] || 0;
                      return (
                        <FilterItemButton
                          key={item.label}
                          label={item.label}
                          count={count}
                          isActive={isActive}
                          countKey={item.countKey}
                          value={item.value}
                          onSelect={handleSelect}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
  )
}

const FilterItemButton = memo(function FilterItemButton({
  label,
  count,
  isActive,
  countKey,
  value,
  onSelect,
}) {
  return (
    <button
      onClick={() => onSelect(countKey, value)}
      className={isActive ? 'sidebar-level-2 active' : 'sidebar-level-2'}
    >
      <span>{label}</span>
      <span className="sidebar-badge">{count}</span>
    </button>
  );
});