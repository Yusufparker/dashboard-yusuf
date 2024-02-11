import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useSidebar } from "../components/Context/SidebarContext";


function Dashboard() {
  const {isOpen} = useSidebar()
  
  
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className={`content p-4  ${isOpen ? '' : 'close'} `}>
        <div className="p-4 shadow-sm rounded bg-white border">
          <h1>Dahsboard Page</h1>
        </div>
      </div>
    </>
  );
}

export default Dashboard
