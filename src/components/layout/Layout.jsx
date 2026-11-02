import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <div className="main-column">
          <Breadcrumbs />
          <main className="content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}