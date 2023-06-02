import { useRouter } from 'next/navigation';
import React from 'react';


const NavbarUser = ({ username, userImage }) => {
    const router = useRouter();
  const handleLogout = () => {

  localStorage.removeItem('x-token');

  // Redirigir al usuario al home
  router.push('/');
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 py-4 px-6">
      <h1 className="text-white text-2xl font-bold">My App</h1>
      <div className="flex items-center">
        {username && (
          <div className="flex items-center mr-4">
            <p className="text-white mr-2">{username}</p>
            {userImage && <img src={userImage} alt={username} className="w-8 h-8 rounded-full" />}
          </div>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          Desconectarse
        </button>
      </div>
    </nav>
  );
};

export default NavbarUser;

