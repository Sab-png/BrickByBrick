/**
 * @fileoverview Layout principale per il pannello amministratore.
 * Include sidebar di navigazione e area contenuto con Outlet.
 * 
 * @module AdminLayout
 * @requires react-router-dom
 * @requires ../components/NavbarAdmin
 */

import { Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { SideBar } from '../components/NavbarAdmin';



/**
 * Componente Layout Amministratore
 * 
 * Struttura:
 * - SideBar con menu navigazione admin
 * - Area contenuto principale con Outlet per route figlie
 * - Layout a due colonne (sidebar + contenuto)
 * 
 * Route protette che usano questo layout:
 * - /admin (statistiche)
 * - /admin/agenti
 * - /admin/utenti
 * - /admin/contratti
 * - /admin/immobili
 * 
 * @component
 * @returns {JSX.Element} Layout con sidebar e outlet
 * 
 * @example
 * // In routes
 * <Route path="/admin" element={<AdminLayout />}>
 *   <Route index element={<Statistiche />} />
 *   <Route path="agenti" element={<AdminAgenti />} />
 * </Route>
 */
export default function AdminLayout() {
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