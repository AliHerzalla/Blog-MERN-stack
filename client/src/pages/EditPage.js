import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const CreatePost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [files, setFiles] = useState("");
    const [content, setContent] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`, {
            method: "GET",
        }).then(response => response.json()
            .then(data => {
                setTitle(data.title);
                setSummary(data.summary);
                setFiles(data.cover);
                setContent(data.content);
            })).catch(error => console.log(error));

        return () => {
        };
    }, []);


    const handelUpdatePost = async (ev) => {
        const postInfo = new FormData();
        postInfo.set("title", title);
        postInfo.set("summary", summary);
        postInfo.set("content", content);
        postInfo.set("id", id);
        if (files?.[0]) {
            postInfo.set("file", files?.[0]);
        }
        ev.preventDefault();
        await fetch(`http://localhost:4000/post/${id}`, {
            method: "PUT",
            body: postInfo,
            credentials: "include",
        });
        setIsSubmit(true);
    };

    if (isSubmit) {
        return <Navigate to={ `/post/${id}` } />;
    } else {
        return (
            <form
                className="flex flex-col gap-5 mb-12"
                onSubmit={ handelUpdatePost }
            >
                <input
                    type="text"
                    placeholder="Title"
                    className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
                    value={ title }
                    onChange={ val => setTitle(val.target.value) }
                />
                <input
                    type="text"
                    placeholder="Summary"
                    className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
                    value={ summary }
                    onChange={ val => setSummary(val.target.value) }
                />
                <input
                    type="file"
                    placeholder="Pick an image"
                    className='outline-none border-[2px] px-2 py-3 rounded-md placeholder:text-[#666]'
                    onChange={ ev => setFiles(ev.target.files) }
                />
                <ReactQuill
                    theme="snow"
                    placeholder="Main Content"
                    value={ content }
                    onChange={ setContent }
                    modules={ modules }
                    formats={ formats }
                />
                <button className='w-full bg-[#333] px-2 py-3 rounded-md text-white'>Update Post</button>
            </form>
        );
    }
};

export default CreatePost;