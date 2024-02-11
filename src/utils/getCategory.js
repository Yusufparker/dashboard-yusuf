import axios from "axios";
import API_BASE_URL from "../utils/api";

const getCategory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching categories:', error); 
        return false; 
    }
}

export { getCategory };
