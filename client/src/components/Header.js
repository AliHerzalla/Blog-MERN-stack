import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json()
            .then(userInfo => {
                setUserInfo(userInfo);
            })
            .catch((err) => console.log(err))
        ).catch(err => console.log(err));
    }, [setUserInfo]);

    const handelLogout = async (event) => {
        event.preventDefault();
        await fetch("http://localhost:4000/logout", {
            method: "POST",
            credentials: "include"
        });
        setUserInfo(null);
    };

    const username = userInfo?.username;

    return (
        <header className='flex justify-between items-center mb-12'>
            <Link to='/' className='p-2 font-bold text-2xl'>MyBlog</Link>
            <nav className='flex gap-3'>
                { username &&
                    <>
                        <Link
                            to={ "/create" }
                            className='p-2 text-lg'
                        >
                            Create New Post
                        </Link>
                        <Link
                            to={ "/logout" }
                            className='p-2 text-lg'
                            onClick={ handelLogout }
                        >
                            Logout
                        </Link>
                    </>
                } { !username && (
                    <>
                        <Link to='/login' className='p-2 text-lg'>Login</Link>
                        <Link to='/register' className='p-2 text-lg'>Register</Link>
                    </>
                ) }
            </nav>
        </header>
    );
};

export default Header;