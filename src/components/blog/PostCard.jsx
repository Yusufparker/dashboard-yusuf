import { Link } from "react-router-dom"
const PostCard = ({post}) =>{

    return(
        <div className="col-md-4  p-2 position-relative post-card">
            <div className="position-absolute option">
                <Link to='' className="text-white button">Edit</Link>
                <Link to='' className="text-white button">Delete</Link>
            </div>
            <div className="p-3 border border-2 rounded shadow-sm">
                <div className="overflow-hidden" style={{height:'150px'}}>
                    <img src={post.image} alt="" className="w-100 " />
                </div>
                <span className="fs-12">{post.created_at}</span>
                <Link to='' className="p-0 text-dark text-decoration-none">
                    <h1 className="fs-16 fw-bold">{post.title}</h1>
                </Link>
                <p className="fs-14">{post.excerpt}</p>
                <span className="fs-12 text-primary">#{post.category.name}</span>
            </div>
        </div>
    )
}

export default PostCard