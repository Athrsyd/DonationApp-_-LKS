import React from 'react'
import { Link } from 'react-router'
import '../../assets/css/bootstrap.min.css'
import '../../assets/font/css/all.min.css'
import '../../assets/css/style.css'
import LoginHook from '../../services/LoginHook'

const Login = () => {
    const { email, password, error, success, handleChange, handleLogin } = LoginHook();


    document.title = "Login - Donation App"
    return (
        <>
            <Link to="/" className="btn btn-secondary m-3">&larr; Kembali</Link>
            <main className="container py-5">
                <h1>Admin Login</h1>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form className="form-template mt-4" method="get">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={() => handleLogin()}>Login</button>
                </form>
            </main>
        </>
    )
}

export default Login