import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useSidebar } from '../../components/Context/SidebarContext'
import { useState } from 'react'
import axios from 'axios'
import API_BASE_URL from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function CreateProject() {
    const navigate = useNavigate()
    const [message,setMessage] = useState('');
    const{isOpen} = useSidebar()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [url, setUrl]  = useState('')
    const [tag, setTag] = useState([])
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [previewImage1, setPreviewImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);
    const handleTitleChange = (e) =>{
        const { value } = e.target;
        if (value.length <= 100) {
            setTitle(value);
        }
    }

    const handleTagChange = (e) =>{
        const { value } = e.target;
        const tagsArray = value.split(",").map((tag) => tag.trim());
        setTag(tagsArray);
    }

    const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
        if (imageFile) {
            setSelectedImage1(imageFile);
            setPreviewImage1(URL.createObjectURL(imageFile));
        }
    };
    const handleImageChange2 = (e) => {
    const imageFile = e.target.files[0];
        if (imageFile) {
            setSelectedImage2(imageFile);
            setPreviewImage2(URL.createObjectURL(imageFile));
        }
    };

    const handleSubmit =async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("desc", desc)
        formData.append("url", url)
        formData.append("image1", selectedImage1)
        formData.append("image2", selectedImage2)
        tag.forEach((t) => {
          formData.append("tag[]", t); // Pastikan tag ditambahkan sebagai array dengan tag[]
        });


        try {
            const response = await axios.post(`${API_BASE_URL}/project`,formData,
            {
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token'),
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log("Response:", response.data);
            setMessage("projects successfully created");
            navigate("/projects", { state: { message } });
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={`content p-4  ${isOpen ? "" : "close"} `}>
                <div className="p-4 shadow rounded bg-white borde">
                    <h1 className="fs-20 fw-bold text-primary">Add New Project</h1>
                    <form className='mt-4 fs-14' encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className=" col-md-8">
                            <label htmlFor="title" className="fw-bold form-label">Project Name</label>
                            <input type="text" className="form-control fs-14" value={title} onChange={handleTitleChange} id="title" required/>
                            <div className={`fs-10 mt-1 text-end ${title.length == 100 ? 'text-danger' : ''} `}>{title.length}/100</div>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="desc" className="fw-bold form-label">Description</label>
                            <input type="text" className="form-control fs-14" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" required/>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="url" className="fw-bold form-label">Url</label>
                            <input type="text" className="form-control fs-14" value={url} onChange={(e) => setUrl(e.target.value)} id="url" required/>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="tag" className="fw-bold form-label">Tags <span className='fs-10'>(separate with commas " , ")</span></label>
                            <input type="text" className="form-control fs-14" value={tag.join(', ')} onChange={handleTagChange} id="url" required/>
                        </div>
                        <div className="mb-5 col-md-8">
                            <label htmlFor="image1" className="fw-bold form-label d-flex">
                                Image 1
                            </label>
                            {previewImage1 && (
                                <img
                                src={previewImage1}
                                alt="Preview"
                                className="mt-2 mb-3 w-50"
                                />
                            )}
                            <input
                                type="file"
                                className="form-control fs-14"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="image1"
                                required
                            />
                        </div>
                        <div className="mb-5 col-md-8">
                            <label htmlFor="image2" className="fw-bold form-label d-flex">
                                Image 2
                            </label>
                            {previewImage2 && (
                                <img
                                src={previewImage2}
                                alt="Preview"
                                className="mt-2 mb-3 w-50"
                                />
                            )}
                            <input
                                type="file"
                                className="form-control fs-14"
                                accept="image/*"
                                onChange={handleImageChange2}
                                id="image2"
                                required
                            />
                        </div>
                        <button type="submit" className="btn bg-primary  text-white mt-4">Submit Project</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProject


