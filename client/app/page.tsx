"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";

const App = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Doctors Appointment",
            dueDate: "Feb 5th at 2:30pm",
            status: "pending",
        },
        {
            id: 2,
            title: "Meeting at School",
            dueDate: "Feb 6th at 1:30pm",
            status: "done",
        },
        {
            id: 3,
            title: "Food Shopping",
            dueDate: "Feb 5th at 2:30pm",
            status: "pending",
        },
    ]);

    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask.trim()) return;

        setTasks([
            ...tasks,
            {
                id: Date.now(),
                title: newTask,
                dueDate: "Today",
                status: "pending",
            },
        ]);

        setNewTask("");
    };

    const deleteTask = (id:number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(storedTasks);
    }, []);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);




    return (
        <div className="bg-blue-200 min-h-screen">
            <div className="bg-blue-400 text-white p-4 text-center">
                <p className="font-bold text-3xl">
                    React Task Tracker App
                </p>
                <p>Focus! Master your day, one task at a time.</p>
            </div>

            <div className="p-4 bg-white m-4 rounded shadow-md max-w-2xl mx-auto">
                <p className="p-2 text-center text-3xl font-bold text-blue-500">Tasks</p>
                <div className="w-full h-px bg-gray-300 my-2"></div>

                {/* Legend */}
                <div className="flex justify-between p-2 gap-x-4 text-sm">
                    <div className="relative w-full">
                        <input
                            className="border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all pl-5 w-full h-15 rounded-3xl"
                            type="text"
                            placeholder="What's your next move?"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />

                        <button
                            onClick={addTask}
                            className="absolute right-2 top-2 bg-green-400 text-white px-5 py-2 rounded cursor-pointer hover:bg-green-500 rounded-3xl text-lg"
                        >
                            + Add
                        </button>

                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-x-1">
                            <span className="inline-block w-4 h-4 rounded-full bg-green-200 border"></span>
                            <p>Done</p>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <span className="inline-block w-4 h-4 rounded-full bg-yellow-200 border"></span>
                            <p>Pending</p>
                        </div>
                    </div>
                </div>

                {/* Filter tasks by status: */}
                <div>
                    <hr className="my-2 border-gray-300" />
                    <p className="text-sm text-gray-600">Filter tasks by status:</p>
                    <div className="flex gap-x-2 mt-2">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 text-sm">
                            All
                        </button>
                        <button className="bg-green-100 text-green-700 px-4 py-2 rounded cursor-pointer hover:bg-green-200 text-sm">
                            Done
                        </button>
                        <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded cursor-pointer hover:bg-yellow-200 text-sm">
                            Pending
                        </button>
                    </div>
                    <hr className="my-2 border-gray-300" />
                </div>

                {/* Task List */}
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-3 m-2 rounded shadow-sm flex justify-between items-center transition-transform duration-200 ease-out hover:scale-105 ${task.status === "done" ? "bg-green-100 hover:bg-green-200" : "bg-yellow-100 hover:bg-yellow-200"
                            }`}
                    >
                        <div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="text-sm text-gray-600">{task.dueDate}</p>
                        </div>

                        <div>
                            <span className="flex gap-x-2">
                                <button
                                    className="bg-blue-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
                                    
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
