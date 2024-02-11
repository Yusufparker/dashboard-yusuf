import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import HandleLogout from "../auth/HandleLogout";
import { useSidebar } from './Context/SidebarContext';

function Navbar() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : '';
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const navigate = useNavigate()

    const {toggleSidebar, isOpen} = useSidebar()


    const toggleDropDown = () =>{
        setIsDropDownOpen(!isDropDownOpen)
    }
    

    const handleLogout = () =>{
        const logout = HandleLogout()
        if(logout){
        navigate('/login')
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.navbar .profile div:first-child')) {
                setIsDropDownOpen(false)
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    return (
        <section className={`navbar shadow-sm p-3 ps-4 pe-4 bg-white fixed-top d-flex justify-content-between ${isOpen ? '' : 'close'}`} id="navbar">
            <div className="btn-hamburger" onClick={toggleSidebar}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.21875 20.25C4.21875 20.0262 4.30765 19.8116 4.46588 19.6534C4.62411 19.4951 4.83872 19.4062 5.0625 19.4062H21.9375C22.1613 19.4062 22.3759 19.4951 22.5341 19.6534C22.6924 19.8116 22.7812 20.0262 22.7812 20.25C22.7812 20.4738 22.6924 20.6884 22.5341 20.8466C22.3759 21.0049 22.1613 21.0938 21.9375 21.0938H5.0625C4.83872 21.0938 4.62411 21.0049 4.46588 20.8466C4.30765 20.6884 4.21875 20.4738 4.21875 20.25ZM4.21875 13.5C4.21875 13.2762 4.30765 13.0616 4.46588 12.9034C4.62411 12.7451 4.83872 12.6562 5.0625 12.6562H21.9375C22.1613 12.6562 22.3759 12.7451 22.5341 12.9034C22.6924 13.0616 22.7812 13.2762 22.7812 13.5C22.7812 13.7238 22.6924 13.9384 22.5341 14.0966C22.3759 14.2549 22.1613 14.3438 21.9375 14.3438H5.0625C4.83872 14.3438 4.62411 14.2549 4.46588 14.0966C4.30765 13.9384 4.21875 13.7238 4.21875 13.5ZM4.21875 6.75C4.21875 6.52622 4.30765 6.31161 4.46588 6.15338C4.62411 5.99515 4.83872 5.90625 5.0625 5.90625H21.9375C22.1613 5.90625 22.3759 5.99515 22.5341 6.15338C22.6924 6.31161 22.7812 6.52622 22.7812 6.75C22.7812 6.97378 22.6924 7.18839 22.5341 7.34662C22.3759 7.50486 22.1613 7.59375 21.9375 7.59375H5.0625C4.83872 7.59375 4.62411 7.50486 4.46588 7.34662C4.30765 7.18839 4.21875 6.97378 4.21875 6.75Z" fill="black" />
                </svg>
            </div>
            <div className="profile d-flex">
                <div className="position-relative">
                    <img src="/img/admin.jpg" alt="" className="me-3 rounded-circle" style={{ cursor: 'pointer' }} onClick={toggleDropDown} />
                    <div className={`drop position-absolute bg-white rounded border shadow-sm overflow-hidden ${isDropDownOpen ? 'active' : ''}`}>
                        <a onClick={handleLogout} className="d-block text-decoration-none fs-12 text-danger">
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-column align-self-center">
                    <span className="fw-bold">Admin</span>
                    <span>{user.name}</span>
                </div>
            </div>
        </section>
    );
}

export default Navbar;
