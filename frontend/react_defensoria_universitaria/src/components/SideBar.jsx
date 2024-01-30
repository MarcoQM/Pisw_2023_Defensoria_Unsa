import { useState, useEffect } from 'react';
import { FaTimes, FaHome, FaFileAlt, FaChartBar, FaUsers, FaCaretRight }
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
        <div className={`sticky top-0 lef-0 h-screen transition-all duration-200 bg-granate-claro text-white ${isOpen ? 'w-64' : 'w-14'}`}>
            <div className="flex flex-col justify-center items-center h-full">
                <ul className=" py-4 w-full ">
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate-900 cursor-pointer">
                        <Link to="/admin" className='flex space-x-4 text-s'>
                            <FaHome className='text-2xl' />
                            {isOpen && <span>Dashboard</span>}
                        </Link>
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate-900 cursor-pointer ">
                        <Link to="/reportes" className='flex space-x-4 text-s'>
                            <FaFileAlt className='text-2xl' />
                            {isOpen && <span>Reportes</span>}
                        </Link>
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate-900 cursor-pointer">
                        <Link to="/reportesg" className='flex space-x-4 text-s'>
                            <FaChartBar className='text-2xl' />
                            {isOpen && <span>Reportes Gráficos</span>}
                        </Link>
                    </li>
                    <li className="flex items-center space-x-4 p-4 hover:bg-granate-900 cursor-pointer">
                        <Link to="/usuarios" className='flex space-x-4 text-s'>
                            <FaUsers className='text-2xl' />
                            {isOpen && <span>Usuarios registrados</span>}
                        </Link>
                    </li>
                </ul>

                <div className="flex p-4 justify-center hover:bg-granate-900 w-full items-end">
                    <button onClick={toggleSidebar}>
                        {isOpen ? <FaTimes className='text-2xl' /> : <FaCaretRight />}
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;