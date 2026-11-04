import { useState } from 'react';
import { Link } from 'react-router-dom';
import movies from '../../data/movies.json';
import Icon from '../common/Icon';
import { SIDEBAR_SECTIONS } from '../../data/sidebar_sections'

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState(
    SIDEBAR_SECTIONS.flatMap((s) => s.groups.map((g) => g.name))
  );

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => prev.includes(groupName)
      ? prev.filter((name) => name !== groupName)
      : [...prev, groupName]);
  }

  return (
    <aside className="sidebar">
      <h3 className="sidebar-heading">Категорії та зали</h3>

      {SIDEBAR_SECTIONS.map((section) => (
        <div key={section.title} className="sidebar-section">
          <div className="sidebar-level-0">{section.title}</div>

          {section.groups.map((group) => {
            const isOpen = openGroups.includes(group.name);
            return (
              <div key={group.name} className="sidebar-group">
                <button
                  className="sidebar-level-1"
                  onClick={() => toggleGroup(group.name)}
                >
                  <Icon name="chevron" size={14} />
                  <span>{group.name}</span>
                </button>

                {isOpen && (
                  <div className="sidebar-children">
                    {group.items.map((item) => {
                      const count = movies.filter((m) => m[item.countKey] === item.value).length;
                      return (
                        <Link key={item.label} to={item.to} className="sidebar-level-2">
                          <span>{item.label}</span>
                          <span className="sidebar-badge">{count}</span>
                        </Link>
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