import React, { useState } from "react";
import axios from "axios";

const CreateTask = ({ userId, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("x-token");
      const response = await axios.post(
        "https://todolist-ltolaba.up.railway.app/api/tasks",
        {
          name: taskName,
          description: taskDescription,
        },
        {
          headers: {
            "x-token": token,
          },
        }
      );

      setShowSuccessMessage(true);
      setShowConfirmation(true);
      setTaskName('');
      setTaskDescription('');
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };
  const handleCreateAnotherTask = () => {
    setShowConfirmation(false);
    onConfirm(); // Ejecutar la función de confirmación para crear otra tarea
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {showSuccessMessage ? (
        <div className="mb-4">
          <p className="text-green-500 font-bold mb-2">Tarea creada exitosamente</p>
          {showConfirmation ? (
            <>
              <p className="mb-2">¿Desea crear otra tarea?</p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={handleCreateAnotherTask}
              >
                Sí
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                No
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Nombre de la tarea:</label>
            <input
              className="border border-gray-400 p-2 rounded w-full"
              type="text"
              value={taskName}
              onChange={handleTaskNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Descripción de la tarea:</label>
            <textarea
              className="border border-gray-400 p-2 rounded w-full"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
              type="submit"
            >
              Crear
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTask;