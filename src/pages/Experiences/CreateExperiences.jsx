import { useState } from "react"
import { useSidebar } from "../../components/Context/SidebarContext"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import axios from "axios"
import API_BASE_URL from "../../utils/api"
import { useNavigate } from "react-router-dom"

function CreateExperiences() {
    const navigate = useNavigate()
    const {isOpen} = useSidebar()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleTitleChange = (e) => {
        const { value } = e.target;
        if (value.length <= 100) {
            setTitle(value);
        }
    };

    const handleImageChange = (e) => {
      const imageFile = e.target.files[0];
      if (imageFile) {
        setSelectedImage(imageFile);
        setPreviewImage(URL.createObjectURL(imageFile));
      }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()

        formData.append('title', title)
        formData.append('desc', desc)
        formData.append('image', selectedImage)

        try {
            const response = await axios.post(`${API_BASE_URL}/experience`, formData,{
                headers:{
                    Authorization : 'Bearer '+ localStorage.getItem('token'),
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log('Response :' + response.data);
            navigate('/experiences')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={`content p-4  ${isOpen ? "" : "close"} `}>
                <div className="p-4 shadow rounded bg-white borde">
                    <h1 className="fs-20 fw-bold text-primary">Add New Certificate</h1>
                    <form className='mt-4 fs-14' encType="multipart/form-data" onSubmit={handleSubmit}>
                        <div className=" col-md-8">
                            <label htmlFor="title" className="fw-bold form-label">Title</label>
                            <input type="text" className="form-control fs-14" value={title} onChange={handleTitleChange} id="title" required/>
                            <div className={`fs-10 mt-1 text-end ${title.length == 100 ? 'text-danger' : ''} `}>{title.length}/100</div>
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="desc" className="fw-bold form-label">Description</label>
                            <input type="text" className="form-control fs-14" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" required/>
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
                        <button type="submit" className="btn bg-primary  text-white mt-4">Submit Experience</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateExperiences
