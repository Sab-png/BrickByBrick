import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SideBar } from '../components/NavbarLateral';
import { AdminHeader } from '../pages/HeaderOffice';
import '../../styles/components/_adminLayout.scss';

export default function AdminLayout() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Admin Dashboard - Immobiliaris</title>
      </Helmet>

      <div className="admin-layout">
        <SideBar />
        <div className="admin-wrapper">
          <AdminHeader />
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}