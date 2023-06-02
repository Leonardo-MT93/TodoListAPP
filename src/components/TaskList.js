import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTask from "./CreateTask";

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdTask, setCreatedTask] = useState(null);
  const handleEdit = (taskId) => {
    // Lógica para editar la tarea con el ID taskId
  };

  const handleDelete = (taskId) => {
    // Lógica para eliminar la tarea con el ID taskId
  };

  const handleComplete = (taskId) => {
    // Lógica para marcar como realizada la tarea con el ID taskId
  };

  const handleCreateTaskClick = () => {
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://todolist-ltolaba.up.railway.app/api/tasks/${userId}`
        );
        const { data } = response;
        setTasks(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTasks();
  }, [userId]);
  useEffect(() => {
    if (createdTask) {
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
    }
  }, [createdTask]);

  return (
    <div className="flex flex-col items-center h-[90vh] border-solid border p-10">
      {showCreateForm ? (
        <CreateTask userId={userId} onCancel={handleCancel} />
      ) : (
        <>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="bg-cyan-100 rounded-lg shadow p-4">
                <p className="text-gray-800">{task.name}</p>
                <div className="mt-2 flex justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleEdit(task._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(task._id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleComplete(task._id)}
                  >
                    Realizada
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-between items-center w-[90%]">
              <p className="text-red-500 mt-2">No hay tareas disponibles.</p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCreateTaskClick}>Crear tarea</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
