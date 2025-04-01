"use client";
import { useState } from "react";
import Link from "next/link";
import Input from "../../components/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { username: "", password: "" };

const Login = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false); // Track loading state for submit button
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    // Set loading to true while making the API call
    setLoading(true);

    // API CALL
    try {
      const response = await axios.post("/api/users/login", data);
      setData(defaultData);

      // Check for a successful login response
      if (response.status === 200) {
        // Redirect to TopicList page on successful login
        router.push("/TopicList");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Login</h1>
        <form>
          <Input
            label="Username"
            id="username"
            type="text"
            value={data.username}
            onChange={(e) => onValueChange(e)}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onValueChange(e)}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full"
            onClick={(e) => onLogin(e)}
            disabled={loading} // Disable button while loading
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
