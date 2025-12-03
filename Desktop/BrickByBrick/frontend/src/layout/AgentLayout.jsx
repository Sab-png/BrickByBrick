/**
 * @fileoverview Layout principale per il pannello agente.
 * Include sidebar di navigazione e area contenuto con Outlet.
 * 
 * @module AgentLayout
 * @requires react-router-dom
 * @requires ../components/NavbarAgent
 */

import { Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { SideBar } from '../components/NavbarAgent';



/**
 * Componente Layout Agente
 * 
 * Struttura:
 * - SideBar con menu navigazione agente (più semplice di admin)
 * - Area contenuto principale con Outlet per route figlie
 * - Layout a due colonne (sidebar + contenuto)
 * 
 * Route protette che usano questo layout:
 * - /agente (visite)
 * 
 * @component
 * @returns {JSX.Element} Layout con sidebar agente e outlet
 * 
 * @example
 * // In routes
 * <Route path="/agente" element={<AgenteLayout />}>
 *   <Route index element={<AgenteVisite />} />
 * </Route>
 */
export default function AgenteLayout() {
  return (
    <>

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