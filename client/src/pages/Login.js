import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const handelLogin = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert("Wrong credentials");
        }
        setUsername("");
        setPassword("");
    };

    if (redirect) {
        return <Navigate to={ "/" } />;
    } else {
        return (
            <form
                className='flex flex-col gap-5 max-w-[400px] mx-auto justify-center min-h-[calc(100vh-110px)]'
                onSubmit={ handelLogin }
            >
                <h1 className='text-4xl font-bold'>Login</h1>
                <input
                    placeholder='username'
                    type='text'
                    className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
                    value={ username }
                    onChange={ e => setUsername(e.target.value) }
                />
                <input

                    placeholder='password'
                    type='password'
                    className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
                    value={ password }
                    onChange={ e => setPassword(e.target.value) }
                />
                <button className='w-full bg-[#333] px-2 py-3 rounded-md text-white'>Login</button>
            </form>
        );
    }
};

export default Login;