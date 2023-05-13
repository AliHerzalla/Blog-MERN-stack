import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PostPage = () => {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const [isSubmited, setIsSubmited] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: "GET",
        })
            .then(response => response.json()
                .then(data => setPostInfo(data))
                .catch(error => console.log(error))
            ).catch(error => console.log(error));

    }, []);

    const handelDeletePost = async () => {
        await fetch(`http://localhost:4000/post/${id}`, {
            method: "DELETE",
        });
        setIsSubmited(true);
    };

    if (isSubmited) {
        return <Navigate to={ "/" } />;
    } else {
        if (!postInfo)
            return "";
        return (
            <div className='p-2'>
                { userInfo.id === postInfo.author._id && (
                    <div className='flex gap-4'>
                        <div>
                            <Link to={ `/edit/${postInfo._id}` } className='flex p-2 items-center w-fit bg-[#1f1f1f] text-white rounded-md gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                Edit Post
                            </Link>
                        </div>
                        <div>
                            <button onClick={ handelDeletePost } className='flex p-2 items-center w-fit bg-[#1f1f1f] text-white rounded-md gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                Delete Post
                            </button>
                        </div>
                    </div>
                ) }
                <h1 className='text-4xl font-bold my-4'>{ postInfo.title }</h1>
                <img src={ `http://localhost:4000/${postInfo.cover}` } alt='blog' />
                <div>
                    <p>{ format(new Date(postInfo.createdAt), "yyyy/MMM/dd | hh:mm aa") }</p>
                    <p>Created by @{ postInfo.author.username }</p>
                </div>
                <div dangerouslySetInnerHTML={ { __html: postInfo.content } } className='my-4' />
            </div>
        );
    }
};

export default PostPage;