import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { useSidebar } from "../../components/Context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import API_BASE_URL from "../../utils/api";


const ProjectCard = lazy(()=> import('../../components/projects/ProjectCard'))





function Projects() {
    const { isOpen } = useSidebar();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Dapatkan pesan dari lokasi state jika tersedia
    const message = location.state?.message;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/project`);
                setProjects(response.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={`content p-4  ${isOpen ? "" : "close"} `}>
                <div className="p-4 shadow rounded bg-white border position-relative">
                    <Link to="/projects/create" className="btn bg-primary text-white position-absolute fs-12" style={{right: '20px', top:'20px'}}>+ Add New</Link>
                    <h1 className="fs-20 fw-bold text-primary">My Projects</h1>
                    {
                        message &&
                        <div class="alert alert-success alert-dismissible fade show fs-12 mt-3" role="alert">
                            {message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    }
                    <div className="container mt-5">
                        <Suspense fallback={<Spinner />}>
                            <div className="row">
                                {loading ? (
                                    <>
                                        <Spinner/>
                                    </>
                                ) : (
                                    projects.map(project => (        
                                        <ProjectCard key={project.id} project={project} />
                                    ))
                                )}
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Projects;

