import axios from 'axios'

const API_URL_ALL_DONATIONS = 'http://localhost:8000/api/v1/donation'

export const getAllDonations = async () => {
    try {        
        const response = await axios.get(API_URL_ALL_DONATIONS);
        const data = response.data.data;
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getDonationById = async (id) => {
    try {
        const response =await axios.get(`${API_URL_ALL_DONATIONS}/${id}`)
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteData = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_ALL_DONATIONS}/${id}`);
        console.log("Delete success:", response.data);
        alert("Donasi berhasil dihapus!");
        
        // Reload halaman home setelah 500ms
        setTimeout(()=>{
            window.location.href = "/";
        }, 500);
        
    } catch (error) {
        console.error("Delete failed:", error.response?.data);
        alert("Gagal menghapus donasi: " + (error.response?.data?.message || error.message));
    }
}
