import { useState, createContext, useContext } from 'react'

const AdminContext = createContext();

export const useAdminContext = () => {
    return useContext(AdminContext);
}

const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(true);
    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext