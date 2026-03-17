import { useState } from 'react'
import { Link } from 'react-router'
import '../../assets/css/bootstrap.min.css'
import '../../assets/font/css/all.min.css'
import '../../assets/css/style.css'
import axios from 'axios'

const Create = () => {
    const API_URL_POST = "http://localhost:8000/api/v1/donation";
    document.title = "Post Donation - Donation App"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") return setName(value);
        if (name === "email") return setEmail(value);
        if (name === "amount") return setAmount(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        try {
            const response = await axios.post(API_URL_POST, {
                name, email, amount: parseInt(amount)
            })
            setSuccess("Donasi berhasil dikirim!");
            console.log(response.data);
            setName("");
            setEmail("");
            setAmount("");
        } catch (error) {
            if (error.response?.status === 422) {
                setError("Data tidak valid: " + JSON.stringify(error.response.data.errors || error.response.data.message));
            } else {
                setError("Error: " + (error.response?.data?.message || error.message));
            }
            console.log(error.response?.data);
        }
    }
    
    return (
        <>
            <Link to="/" className="btn btn-secondary m-3">&larr; Kembali</Link>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Donation App</a>
                </div>
            </nav>

            <main className="container py-4">
                <h1>Submit Donasi</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form id="postForm" className="mt-3">
                    <div className="mb-3">
                        <label className="form-label">Nama</label>
                        <input id="name" name='name' className="form-control"
                            required onChange={handleChange} value={name} /> 
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input id="email" name='email' type="email" className="form-control"
                            required onChange={handleChange} value={email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Jumlah (Rp)</label>
                        <input id="amount" name='amount' type="number" className="form-control"
                            required onChange={handleChange} value={amount} />
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Kirim Donasi</button>
                </form>
            </main>
        </>
    )
}

export default Create