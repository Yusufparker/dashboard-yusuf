

function ExperiencesCard({c}) {
    return (
        <div className="row mb-5" >
        <div className="col-md-6 mb-3">
            <img src={c.image} alt={c.title} className="w-100 " />
        </div>
        <div className="col-md-6">
            <h2 className="fw-bold">{c.title}</h2>
            <p className="fs-14">{c.desc}</p>
        </div>
    </div>
    )
}

export default ExperiencesCard
