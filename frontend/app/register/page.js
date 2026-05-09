"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleRegister = async () => {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error("Invalid email format");

            return;
        }

        if (password.length < 6) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/auth/register",
                {
                    email,
                    password
                }
            );

            setEmail("");

            setPassword("");

            router.push("/login");
            toast.success("Registered Succesfully");

        } catch (error) {

            setMessage(error.response.data.message);
            toast.error(message);
        }
    };

    return (

        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ maxWidth: "500px", height: "100vh" }}>

            <h1 className="mb-4">
                Register Page
            </h1>

            <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter email"
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter password"
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
            />

            <button
                className="btn btn-success w-100"
                onClick={handleRegister}
            >
                Register
            </button>

            {/* <p className="mt-3">
                {message}
            </p> */}

        </div>
    );
}