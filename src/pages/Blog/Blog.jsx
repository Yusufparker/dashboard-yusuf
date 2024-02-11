import { useEffect, useState, lazy, Suspense } from "react";
import { useSidebar } from "../../components/Context/SidebarContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

import Sidebar from "../../components/Sidebar";
import axios from "axios";
import API_BASE_URL from "../../utils/api";
const PostCard = lazy(()=> import('../../components/blog/PostCard'))


function SkeletonLoader() {
    return (
        <div className="col-md-4 p-2">
            <div className=" border rounded shadow-sm p-3">
                <div className="skeleton-loading" style={{ height: "150px" }}></div>
                <span className="placeholder col-6 mt-3"></span>
                <span className="placeholder w-75"></span>
                <span className="placeholder col-6 mt-3"></span>
                <span className="placeholder w-75"></span>
            </div>
        </div>
    );
}



function Blog() {
    const { isOpen } = useSidebar();
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/post`);
                setPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }finally {
                setLoading(false);
            }
        };

        fetchPosts()
    },[])

    // console.log(posts);

    return (
        <>
        <Navbar />
        <Sidebar />
        <div className={`content p-4  ${isOpen ? "" : "close"} `}>
            <div className="p-4 shadow rounded bg-white border position-relative">
                <Link to="/blog/create" className="btn bg-primary text-white position-absolute fs-12" style={{right: '20px', top:'20px'}}>+ Add Post</Link>
                <h1 className="fs-20 fw-bold text-primary">My Blog</h1>
                <div className="row mt-3">
                    <Suspense fallback={<SkeletonLoader />}>
                        <div className="container">

                            <div className="row ">
                            
                                {loading ? (
                                    <>
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </>
                                ) : (
                                    posts.map(post => (
                                        <PostCard key={post.id} post={post} />
                                    ))
                                )}
                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>
        </div>
        </>
    );
}

export default Blog;
