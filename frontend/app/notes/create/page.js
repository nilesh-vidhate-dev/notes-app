"use client";

import {useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function CreateNotePage() {

    const [title, setTitle] = useState("");

    const router = useRouter();

    const [message, setMessage] = useState("");

    const handleCreateNote = async () => {

        if (!title) {

            setMessage("Title is required");

            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/notes",
                {
                    title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            router.push("/notes");

            setTitle("");

        } catch (error) {

            setMessage(error.response.data.message);
        }
    };

    return (

        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "500px",height: "100vh" }}>

            <h1 className="mb-4">
                Add Note
            </h1>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter note title"
                value={title}
                onChange={(event) =>
                    setTitle(event.target.value)
                }
            />

            <button
                className="btn btn-success w-100"
                onClick={handleCreateNote}
            >
                Add Note
            </button>

            <p className="mt-3">
                {message}
            </p>
            
        </div>
    );
}