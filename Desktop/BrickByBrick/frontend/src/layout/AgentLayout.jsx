import { Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { SideBar } from '../components/NavbarAgent';



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