"use client";

import { useParams } from "next/navigation";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

export default function EditNotePage() {

    const params = useParams();

    const [title, setTitle] = useState("");

    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleUpdateNote = async () => {

        if (!title) {

            setMessage("Title is required");

            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/notes/${params.id}`,
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

        } catch (error) {

            setMessage(error.response.data.message);
        }
    };

    return (

        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "500px",height: "100vh" }}>

            <h1 className="mb-4">
                Edit Note
            </h1>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter updated title"
                value={title}
                onChange={(event) =>
                    setTitle(event.target.value)
                }
            />

            <button
                className="btn btn-warning w-100"
                onClick={handleUpdateNote}
            >
                Update Note
            </button>

            <p className="mt-3">
                {message}
            </p>

        </div>
    );
}