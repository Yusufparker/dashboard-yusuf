import axios from "axios"
import API_BASE_URL from "../utils/api";
const HandleLogout = async () =>{
    try {
        const token = localStorage.getItem('token'); // Misalnya, token disimpan di localStorage
        const headers = {
            Authorization: `Bearer ${token}`
        };

        // Mengirim permintaan POST ke endpoint logout dengan header yang benar
        await axios.post(`${API_BASE_URL}/logout`, null, { headers })
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        return true
        
    } catch (error) {
        console.log(error);
        return false
    }
}

export default HandleLogout
