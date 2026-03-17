import { useState, useEffect } from 'react'
import { data, Link } from 'react-router'
import '../../assets/css/bootstrap.min.css'
import '../../assets/font/css/all.min.css'
import '../../assets/css/style.css'
import { getAllDonations, deleteData } from '../../services/apiAllDonations'
import { useAdminContext } from '../../Context/AdminContext'

const Home = () => {
    const { isAdmin } = useAdminContext();
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const ambilData = async () => {
        setIsLoading(true);
        const data = await getAllDonations();
        setDonations(data)
        console.log(donations);
        setIsLoading(false);
    }



    useEffect(() => {
        console.log(isAdmin)
        try {
            ambilData();
        } catch (error) {
            console.log(error)
        }
    }, [])

    document.title = "Home - Donation App"
    return (
        <>
            {isLoading ? <p className=''>Loading...</p> :
                <>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Donation App </a>
                            {isAdmin && <h6 style={{marginLeft:"20rem"}} className='text-primary navbar-brand ml-10'>Selamat datang kembali Admin</h6>}

                            <div className="d-flex ms-auto align-items-center">
                                <Link className="nav-link" to="/create">Post Donation</Link>
                                {isAdmin ? <button style={{ margin: "0 1rem" }} className='btn btn-danger'>Log Out</button>
                                    : <Link className="nav-link" to="/login">Login</Link>}

                            </div>
                        </div>
                    </nav>

                    <main className="container py-4">

                        <h1>Daftar Donasi</h1>
                        {donations.map((item) => {
                            return (
                                <div key={item.id} className="donation-list">
                                    <div className="donation-card">
                                        <h5 className="donor-name">{item.name}</h5>
                                        <p className="donor-amount">Rp {item.amount}</p>
                                        <Link style={{ marginRight: "1rem" }} className="btn btn-primary btn-sm" to={`/detail/${item.id}`}>Detail</Link>
                                        {isAdmin &&
                                            <form className="inline-form" method="post">
                                                <button type="submit" onClick={()=>deleteData(item.id)} className="btn btn-danger">Hapus Donasi</button>
                                            </form>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </main>
                </>
            }
        </>
    )
}

export default Home