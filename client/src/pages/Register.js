import { useState } from "react";



const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const handelRegister = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/register',
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        },
      });
    if (response.status === 200) {
      alert("Register successfully");
    } else {
      alert("Something went wrong");
    }
    setUserName("");
    setPassword("");
  };


  return (
    <form
      className='flex flex-col gap-5 max-w-[400px] mx-auto justify-center min-h-[calc(100vh-110px)]'
      onSubmit={handelRegister}
    >
      <h1 className='text-4xl font-bold'>Register</h1>
      <input
        placeholder='username'
        type='text'
        className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
        value={username}
        onChange={event => setUserName(event.target.value)}
      />
      <input
        placeholder='password'
        type='password'
        className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button
        className='w-full bg-[#333] px-2 py-3 rounded-md text-white'
        type="submit"
      >Register</button>
    </form>
  );
};

export default Register;