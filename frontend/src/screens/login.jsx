import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../context/slices/auth.slice";

export default function Login() {
    const dispatch = useDispatch();
    const { loginLoading, loginError, isAuthenticated } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); 
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (loginError) {
            setError(loginError);
        }
    }, [loginError]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-black">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:text-blue-800">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
