import { useState, useEffect } from 'react';
import { FaTimes, FaHome, FaFileAlt, FaChartBar, FaBell, FaUsers, FaCaretRight } 
from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', checkSize);

        return () => {
            window.removeEventListener('resize', checkSize);
        };
    }, []);

    return (
        <div className={`fixed top-10 left-0 h-screen transition-all duration-200 bg-granate-claro text-white ${isOpen ? 'w-64' : 'w-14'}`}>
            <div className="flex flex-col justify-center items-center h-full">
                <ul className=" py-4 w-full ">
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate cursor-pointer">
                        
                        <Link to="/admin" className='flex space-x-4'>
                        <FaHome className='text-2xl'/>
                        {isOpen && <span>Dashboard</span>}
                        </Link>
                        
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate cursor-pointer ">
                        <FaFileAlt className='text-2xl'/>
                        {isOpen && <span>Reportes</span>}
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate cursor-pointer">
                        <FaChartBar className='text-2xl'/>
                        {isOpen && <span>Reportes Gráficos</span>}
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate cursor-pointer">
                        <FaBell className='text-2xl'/>
                        {isOpen && <span>Notificaciones</span>}
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate cursor-pointer">
                        <FaUsers className='text-2xl'/>
                        {isOpen && <span>Usuarios</span>}
                    </li>
                </ul>

                <div className="flex p-4 justify-center hover:bg-granate w-full items-end">
                <button onClick={toggleSidebar}>
                    {isOpen ? <FaTimes className='text-2xl'/> : <FaCaretRight />}
                </button>
            </div>
            </div>
            
        </div>
    );
}

export default Sidebar;