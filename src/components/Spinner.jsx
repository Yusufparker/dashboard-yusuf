
function Spinner() {
    return(
        <div className="text-center mt-5 mb-5 pt-5 pb-5">
            <div className="spinner-border text-primary" style={{width: "5rem", height: "5rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
    
}

export default Spinner