"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null); // Variable de estado para el mensaje de error
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://todolist-ltolaba.up.railway.app/api/auth/login",
        { email, password }
      );
      const { token } = response.data;
      // Almacenar el token en el estado o en una cookie para futuras solicitudes
      localStorage.setItem('x-token', token);
      console.log(response.data.user.uid)
      router.push(`/user/${response.data.user.uid}`);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Extraer los mensajes de error del objeto de respuesta
        const errorMessages = data.errors;
        // Mostrar los mensajes de error en la interfaz de usuario
        console.error("Error:", errorMessages);
        // Actualizar el estado o la variable temporal con los mensajes de error
        // para mostrarlos en la interfaz de usuario
        setErrors(errorMessages);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-400 w-[100%] h-[80vh]">
      <h2 className="font-extrabold text-5xl">Login</h2>

      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <label className="text-xl font-semibold mb-1">Email</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={handleEmailChange}
        />
        <label className="text-xl font-semibold mb-1">Password</label>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg mb-4"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" type="submit">
          Login
        </button>

        {errors && Array.isArray(errors) && (
          <div className="text-red-500 mt-4">
            {errors.map((errorMessage, index) => (
              <p key={index}>{errorMessage}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;

