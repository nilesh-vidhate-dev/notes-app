"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const router = useRouter();

    const [message, setMessage] = useState("");

    const handleLogin = async () => {

    if (!email || !password ) {

        setMessage("Email and Password required");

        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:5000/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        router.push("/notes");

    } catch (error) {

        setMessage(error.response.data.message);

    }
};

    return (

        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "500px",height: "100vh" }}>

            <h1 className="mb-4">
                Login Page
            </h1>

            <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
            >
                Login
            </button>

            <p className="mt-3">
                {message}
            </p>

        </div>
    );
}