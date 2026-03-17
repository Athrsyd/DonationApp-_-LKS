import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import '../../assets/css/bootstrap.min.css'
import '../../assets/font/css/all.min.css'
import '../../assets/css/style.css'
import { getDonationById } from '../../services/apiAllDonations'
import { useAdminContext } from '../../Context/AdminContext'

const Detail = () => {
    const { id } = useParams();
    const [donation, setDonation] = useState({});
    const { isAdmin } = useAdminContext();
    const [isLoading, setIsloading] = useState(false);

    const ambilData = async (id) => {
        setIsloading(true);
        const data = await getDonationById(id);
        setDonation(data.data);
        setIsloading(false)
    }
    if (!isLoading) console.log(donation)

    useEffect(() => {
        ambilData(id);
    }, [id])

    document.title = `${donation?.name || "Detail"} - Donation App`
    return (
        <>
            {isLoading ? <h1>Loading...</h1> : <>
                {isAdmin &&
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Donation App </a>
                            {isAdmin && <h6 style={{ marginLeft: "20rem" }} className='text-primary navbar-brand ml-10'>Selamat datang kembali Admin</h6>}

                            <div className="d-flex ms-auto align-items-center">
                                {/* <Link className="nav-link" to="/create">Post Donation</Link> */}
                                {isAdmin && <button style={{ margin: "0 1rem" }} className='btn btn-danger'>Log Out</button>}

                            </div>
                        </div>
                    </nav>
                }
                <main className="container py-4">
                    <Link to="/" className="btn btn-secondary mb-3">&larr; Kembali</Link>

                    <section className="donation-detail">
                        <h2 className="donor-name">{donation?.name}</h2>
                        <p><strong>Email:</strong> {donation?.email} </p>
                        <p><strong>Amount:</strong> Rp {donation?.amount}</p>
                        <p className="meta"><small>Dibuat: {donation?.created_at} </small></p>
                        {/* <p className="meta"><small>Dibuat: 2023-10-25 10:00:00</small></p> */}
                        {isAdmin &&
                            <form className="inline-form" method="post">
                                <button type="submit" className="btn btn-danger">Hapus Donasi</button>
                            </form>
                        }
                    </section>
                </main>
            </>}
        </>
    )
}

export default Detail