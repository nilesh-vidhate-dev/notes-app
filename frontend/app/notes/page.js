"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function NotesPage() {

    const [notes, setNotes] = useState([]);

    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleLogout = () => {

        localStorage.removeItem("token");

        router.push("/");
    };

    const handleDeleteNote = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotes(
                notes.filter(
                    (note) => note._id !== id
                )
            );

        } catch (error) {

            setMessage(error.response.data.message);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            router.push("/login");

            return;
        }

        const fetchNotes = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/notes",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setNotes(response.data.data);

            } catch (error) {

                console.log(error.response.data);
            }
        };

        fetchNotes();

    }, []);

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Notes Dashboard
                </h1>

                <div className="d-flex gap-2">

                    <Link
                        href="/notes/create"
                        className="btn btn-primary"
                    >
                        Add Note
                    </Link>

                    <button
                        className="btn btn-dark"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            {
                notes.length === 0 ? (

                    <h4 className="text-center mt-5">
                        No Notes Found
                    </h4>

                ) : (

                    notes.map((note) => (

                        <div
                            key={note._id}
                            className="card p-3 mt-3"
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <h5 className="m-0">
                                    {note.title}
                                </h5>

                                <div className="d-flex gap-2">

                                    <Link
                                        href={`/notes/edit/${note._id}`}
                                        className="btn btn-warning"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleDeleteNote(note._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                )
            }
        </div>
    );
}