import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { compareAsc, format } from 'date-fns';

const Post = ({
    _id,
    title,
    summary,
    content,
    cover,
    createdAt,
    updatedAt,
    author
}) => {

    const date = format(new Date(createdAt), "yyyy/MMM/dd hh:mm aa");
    return (
        <div className='grid gap-4 sm:max-h-[200px] overflow-hidden sm:grid-cols-[0.9fr,1.1fr] p-4'>
            <Link to={ `/post/${_id}` } className=''>
                <img src={ "http://localhost:4000/" + cover } alt='blog post'
                    className='max-w-full object-contain w-[100%]'
                />
            </Link>
            <div className='w-[100%]'>
                <Link to={ `/post/${_id}` }>
                    <h2 className='font-bold text-4xl mb-2'>{ title }</h2>
                </Link>
                <p className='text-[#888] text-xs font-bold'>
                    <Link to='' className='mr-2 text-[#333]'>{ author.username }</Link>
                    <time>{ date }</time>
                </p>
                <p className='m-0'>{ summary }</p>
            </div>
        </div>
    );
};

export default Post;