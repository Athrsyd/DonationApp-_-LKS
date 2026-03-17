import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios';
const LoginHook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState("")
    const API_URI_LOGIN = "http://localhost:8000/api/v1/auth";


    useEffect(() => {

        const handleMe = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_URI_LOGIN}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = response.data.data;
                if (data && location.pathname == "/login") { navigate('/') }
                setUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        handleMe()
    }, [location, navigate])

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append("_method", "GET");
            formData.append("email", email);
            formData.append("password", password);

            const response = await axios.post(`${API_URI_LOGIN}/login`, formData)
            const token = response.data.token
            localStorage.setItem("token", token);
            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/");
            })
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            console.log(error.response?.data);
        }
    }

    const handleLogOut = async (params) => {
        try {
            const token = localStorage.getItem("token");
            const response = axios.get(`${API_URI_LOGIN}/logout`, {
                headers: {
                    Authorization: {
                        token: `Bearer ${token}`
                    }
                }
            })
            localStorage.removeItem("token");
            alert(response.data.message)

            setTimeout(() => {
                window.location.reload();
            }, 1000)

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") return setEmail(value);
        if (name === "password") return setPassword(value);
    }
    return {
        email,
        password,
        error,
        success,
        user,
        handleChange,
        handleLogOut,
        handleLogin
    }
}

export default LoginHook