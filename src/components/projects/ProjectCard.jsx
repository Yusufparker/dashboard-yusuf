import { Link } from "react-router-dom"


function ProjectCard({project}) {
  return (
    <div className="row mb-5" >
        <div className="col-md-6 mb-3">
            <img src={project.image1} alt={project.title} className="img-fluid " />
        </div>
        <div className="col-md-6">
            <h2 className="fw-bold">{project.title}</h2>
            <p className="fs-14">{project.desc}</p>
            <span className="fs-14 d-block mb-3">Url : <Link to={project.url} target="_blank">{project.url}</Link></span>
            {
                project.tags.map(tag=>(
                    <span className="fs-12 text-primary me-2" key={tag.id}>#{tag.tag}</span>
                ))
            }
        </div>
    </div>
  )
}

export default ProjectCard
