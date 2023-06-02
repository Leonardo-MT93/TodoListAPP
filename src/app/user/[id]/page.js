"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUser from "@/components/NavbarUser";
import TaskList from "@/components/TaskList";

const UserInterface = ({ params }) => {
  const { id } = params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("x-token"); // Obtén el token almacenado en el cliente
        const response = await axios.get(
          `https://todolist-ltolaba.up.railway.app/api/users/${id}`,
          {
            headers: { "x-token": token }, // Incluye el token en los encabezados de la solicitud
          }
        );
        const { data } = response;
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-auto bg-blue-950">
      <h2 className="text-cyan-300">User interface</h2>

      {userData && (
        <div>
          <NavbarUser username={userData.name} userImage={userData.img} />

          <TaskList userId={userData.uid}/>
        </div>
      )}
    </div>
  );
};

export default UserInterface;
