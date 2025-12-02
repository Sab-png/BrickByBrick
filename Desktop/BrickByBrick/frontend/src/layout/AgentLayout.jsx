import { Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { SideBar } from '../components/NavbarAgent';



export default function AgenteLayout() {
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>Admin Dashboard - Immobiliaris</title>
      </Helmet> */}

      <div className="admin-layout">
        <SideBar />
        <div className="admin-wrapper">
      
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}