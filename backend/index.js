const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads' });
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "asd132alikmltderf";


//middleware's
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect('mongodb+srv://alihazemherzalla:ZSAHLBxgiXzx4fTw@cluster0.b4boaap.mongodb.net/MERN-BLOG').then((result) => {
    console.log("Connected to the server");
}).catch(err => console.log(err));

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        if (userDoc) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json("ok");
                res.redirect("/profile");
            });
        }
        res.status(200).json(userDoc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ username });
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (userDoc) {
            if (passOk) {
                jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
                    if (error) throw error;
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username
                    });
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post("/logout", (req, res) => {
    res.cookie("token", "", { maxAge: 10 }).json("ok");
});

app.post("/create_new_post", uploadMiddleware.single("file"), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    try {
        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, response) => {
            if (err) throw err;
            const { title, summary, content, } = req.body;
            const postDoc = await PostModel.create({
                title,
                summary,
                content,
                cover: newPath,
                author: response.id,
            });
            res.json(postDoc);
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/posts", async (req, res) => {
    res.json(await PostModel.find()
        .populate('author', ['username'])
        .sort({ "createdAt": -1 })
        .limit(20));
});

app.get("/post/:id", async (req, res) => {
    const id = req.params.id;
    const postDoc = await PostModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
});

app.put("/post/:id", uploadMiddleware.single("file"), async (req, res) => {
    const uId = req.params.id;
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;
    const { id, title, summary, content, } = req.body;

    jwt.verify(token, secret, {}, async (err, response) => {
        if (err) throw err;
        const postDoc = await PostModel.findById(id);
        isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(response.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }

        await PostModel.findByIdAndUpdate(id, {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        });
        res.json(postDoc);
    });
});

app.delete('/post/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
});

app.listen(4000, () => {
    console.log("connected");
});