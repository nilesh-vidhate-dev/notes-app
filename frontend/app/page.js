import Link from "next/link";

export default function HomePage() {

    return (

        <div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >

            <h1 className="mb-5">
                Notes Application
            </h1>

            <div className="d-flex gap-3">

                <Link
                    href="/login"
                    className="btn btn-primary"
                >
                    Login
                </Link>

                <Link
                    href="/register"
                    className="btn btn-success"
                >
                    Register
                </Link>

            </div>

        </div>
    );
}