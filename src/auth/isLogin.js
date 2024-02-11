import axios from "axios";
import API_BASE_URL from "../utils/api";

const isLogin = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`,{
            headers:{
                Authorization :'Bearer '+localStorage.getItem('token')
            }
        });
        
        return true; 
    } catch (error) {
        // console.error('Error during login check:', error);
        return false; 
    }
}

export { isLogin };
