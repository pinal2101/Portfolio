"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Input from "../../components/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { username: "", password: "" };

const Login = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect if already logged in
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     router.replace("/TopicList");
  //   }
  // }, []);

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", data, {
        withCredentials: true, // Ensure cookies are sent
      });

      if (response.status === 200 && response.data.success) {
        // Store token/session
        localStorage.setItem("token", response.data.token);

        setLoggedIn(true); // Update state
        router.replace("/TopicList"); // Redirect immediately after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      router.replace("/TopicList"); // Redirect after successful login
    }
  }, [loggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-16 pt-8 pb-12 mb-4 shadow-md rounded-lg">
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <form>
          <Input
            label="Username"
            id="username"
            type="text"
            name="username"
            value={data.username}
            onChange={onValueChange}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={onValueChange}
          />

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onLogin}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Submit"}
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
