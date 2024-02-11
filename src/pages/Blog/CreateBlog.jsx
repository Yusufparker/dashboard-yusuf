import { useState, useEffect } from "react";
import { useSidebar } from "../../components/Context/SidebarContext";
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { getCategory } from "../../utils/getCategory";
import { Helmet, HelmetProvider } from "react-helmet-async";
import API_BASE_URL from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function CreateBlog() {
    const navigate = useNavigate()

    const {isOpen} = useSidebar()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [message, setMessage] =useState(null) 

    const [body, setBody] = useState('')

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategory();
                if (response) {
                    setCategories(response.data);
                } else {
                    console.error("Failed to fetch categories.");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        const editor = document.querySelector("trix-editor");
        if (editor) {
            editor.addEventListener("trix-change", handleBodyChange);
        }
        return () => {
            if (editor) {
                editor.removeEventListener("trix-change", handleBodyChange);
            }
        };
    }, []);

    function generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-");
    }
    const handleTitleChange  = (e) =>{
        const {value} = e.target
        if(value.length <= 125){
            setTitle(value)
            setSlug(generateSlug(value))
        }
        
    }

    const handleBodyChange = (e) =>{
        setBody(e.target.value)
    }

    const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
        if (imageFile) {
            setSelectedImage(imageFile);
            setPreviewImage(URL.createObjectURL(imageFile));
        }
    };

    const getExcerpt =  (html) =>{
        return html.replace(/<[^>]*>/g, "").split(/\s+/).slice(0, 15).join(" ");

    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const excerpt = getExcerpt(body)+'....';
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("excerpt", excerpt);
        formData.append("body", body);
        formData.append("image", selectedImage);
        formData.append("category_id", category);

        try {
            const response = await axios.post(`${API_BASE_URL}/post`,formData,{
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token'),
                    'Content-Type' : 'multipart/form-data'
                }
            })
            // Handle response
            console.log('Response:', response.data);
            setMessage("post successfully created");
            navigate("/blog", { state: { message } });
        } catch (error) {
            console.log(error);
        }
        
    }


    // console.log(categories)
    return (
        <HelmetProvider>

            <>
            <Helmet>
                <title>Create Post</title>
                <link rel="stylesheet" type="text/css" href="https://unpkg.com/trix@2.0.8/dist/trix.css"/>
                <script type="text/javascript" src="https://unpkg.com/trix@2.0.8/dist/trix.umd.min.js"></script>
            </Helmet>
            <Navbar />
            <Sidebar />
            <div className={`content p-4  ${isOpen ? "" : "close"} `}>
                <div className="p-4 shadow rounded bg-white borde">
                    <h1 className="fs-20 fw-bold text-primary">Create Post</h1>
                    
                    <form className="mt-4 fs-14" onSubmit={handleSubmit} encType="multipart/form-data" >
                        
                        <div className=" col-md-8">
                            <label htmlFor="title" className="fw-bold form-label">Title</label>
                            <input type="text" className="form-control fs-14" value={title} onChange={handleTitleChange} id="title" required/>
                            <div className={`fs-10 mt-1 text-end ${title.length == 125 ? 'text-danger' : ''} `}>{title.length}/125</div>
                        </div>
                        <div className=" mb-3 col-md-8">
                            <label htmlFor="slug" className="fw-bold form-label">slug</label>
                            <input type="text" className="form-control fs-14" value={slug} readOnly disabled  id="title" required/>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="category" className="fw-bold form-label">Category</label>
                            <select className="form-select fs-14" id="category" onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category..</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                
                            </select>
                        </div>
                        <div className="mb-2 col-md-8">
                            <label htmlFor="image" className="fw-bold form-label d-flex">
                                Image
                            </label>
                            {previewImage && (
                                <img
                                src={previewImage}
                                alt="Preview"
                                className="mt-2 mb-2 w-50"
                                />
                            )}
                            <input
                                type="file"
                                className="form-control fs-14"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="image"
                                required
                            />
                        </div>
                        <div className=" col-md-8 mb-3">
                            <label htmlFor="body" className="fw-bold form-label">Body</label>
                            <input id="body" type="hidden" name="body"/>
                            <trix-editor input="body" data-trix-accept-file-types="" value={body}></trix-editor>
                        </div>
                        <button type="submit" className="btn bg-primary  text-white mt-4">Submit Post</button>
                    </form>
                    
                </div>
            </div>
            </>
        </HelmetProvider>
    );
}

export default CreateBlog
