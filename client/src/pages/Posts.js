import { useEffect, useState } from 'react';
import Post from '../components/Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/posts", {
            method: 'GET',
        })
            .then(response => response.json()
                .then(result => setPosts(result))
                .catch(error => console.log(error)))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className='flex flex-col gap-10 mb-5'>
            { posts.length > 0 && posts.map(post => <Post { ...post } />) }
        </div>
    );
};

export default Posts;