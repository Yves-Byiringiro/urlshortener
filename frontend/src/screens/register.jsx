import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../context/slices/auth.slice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerError, registerSuccess } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", username: "", password: "" });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrors({ email: "", username: "", password: "" });

    let formValid = true;
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required." }));
      formValid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Please enter a valid email address." }));
      formValid = false;
    }

    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "Username is required." }));
      formValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password is required." }));
      formValid = false;
    } else if (!validatePassword(password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 6 characters long." }));
      formValid = false;
    }

    if (formValid) {
      dispatch(register({ email, username, password }));
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/home");
    }
  }, [registerSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
        {registerError && <p className="text-red-500 text-sm text-center">{registerError}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 text-gray-700"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {registerLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
