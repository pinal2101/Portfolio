"use client";
import { useState } from "react";
import Link from "next/link";
import Input from "../../components/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const defaultData = { name: "", username: "", password: "" };

const Register = () => {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (!data.name || !data.username || !data.password) {
      alert(" Please fill all mandatory fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", data);
      // const response = await axios.post(
      //   "http://localhost:3000/api/users/register",data)
      setData(defaultData);

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(" Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white px-16 pt-8 pb-12 mb-4">
        <h1 className="text-3xl mb-4 text-center">Register</h1>
        <form onSubmit={onRegister}>
          <Input label="Name" id="name" type="text" value={data.name} onChange={onValueChange} />
          <Input label="Username" id="username" type="text" value={data.username} onChange={onValueChange} />
          <Input label="Password" id="password" type="password" value={data.password} onChange={onValueChange} />

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full">
            Submit
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
