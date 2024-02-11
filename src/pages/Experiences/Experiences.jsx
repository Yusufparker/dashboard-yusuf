import { useEffect, useState, lazy, Suspense } from "react"
import { useSidebar } from "../../components/Context/SidebarContext"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import Spinner from "../../components/Spinner"
import { Link } from "react-router-dom"
import axios from "axios"
import API_BASE_URL from "../../utils/api"
const ExperiencesCard = lazy(()=>import('../../components/experiences/ExperiencesCard'))



function Experiences() {
    const {isOpen} = useSidebar()
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] =useState(true)
    useEffect(()=>{
        const fetchProjects = async () =>{
            try {
                const response = await axios.get(`${API_BASE_URL}/experience`)
                setCertificates(response.data.data)

            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
        }

        fetchProjects()
    },[])

    // console.log(certificates);

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={`content p-4  ${isOpen ? "" : "close"} `}>
                <div className="p-4 shadow rounded bg-white border position-relative">
                    <Link to="/experiences/create" className="btn bg-primary text-white position-absolute fs-12" style={{right: '20px', top:'20px'}}>+ Add New</Link>
                    <h1 className="fs-20 fw-bold text-primary">My Certificates</h1>
                    <div className="container mt-5">
                        <Suspense fallback={<Spinner />}>
                            <div className="row">
                                {loading ? (
                                    <>
                                        <Spinner/>
                                    </>
                                ) : (
                                    certificates.map(c => (        
                                        <ExperiencesCard  c={c} key={c.id} />
                                    ))
                                )}
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experiences
