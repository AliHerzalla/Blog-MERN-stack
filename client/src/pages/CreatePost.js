import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [files, setFiles] = useState("");
    const [content, setContent] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    async function handelCreateNewPost(ev) {
        const postInfo = new FormData();
        postInfo.set("title", title);
        postInfo.set("summary", summary);
        postInfo.set("content", content);
        postInfo.set("file", files[0]);
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/create_new_post", {
            method: "POST",
            body: postInfo,
            credentials: "include"
        });
        await response.json().then(res => {
            setIsSubmit(pre => !pre);
        });
    }

    if (isSubmit) {
        return <Navigate to={ "/" } />;
    } else {
        return (
            <form
                className="flex flex-col gap-5 mb-12 p-4 md:p-0"
                onSubmit={ handelCreateNewPost }
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
                <button className='w-full bg-[#333] px-2 py-3 rounded-md text-white'>Create A Post</button>
            </form>
        );
    }
};

export default CreatePost;