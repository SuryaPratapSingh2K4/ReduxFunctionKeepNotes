import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="container-narrow py-4 flex items-center justify-center">
                <Link to="/" className="text-2xl font-bold text-indigo-700">
                    Trip Expenser
                </Link>

            </div>
        </header>
    );
}
