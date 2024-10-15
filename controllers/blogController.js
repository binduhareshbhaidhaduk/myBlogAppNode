// controllers/blogController.js

const Blog = require('../model/blog-Model');
const path = require('path');


// GET Add Blog Form
exports.getAddBlogForm = (req, res) => {
    res.render('addBlogs', { user: req.user, error: null });
};

// POST Add Blog
exports.postAddBlog = async (req, res) => {
    const { title, description } = req.body;
    let imagePath = null;

    if (req.file) {
        imagePath = req.file.path; // Path where the image is stored
    }

    try {
        const newBlog = new Blog({
            title,
            description,
            image: imagePath,
            author: req.user._id
        });

        await newBlog.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('addBlog', { user: req.user, error: 'Error adding blog. Please try again.' });
    }
};

// GET My Blogs
exports.getMyBlogs = async (req, res) => {
    try {
        const myBlogs = await Blog.find({ author: req.user._id });
        res.render('myBlogs', { user: req.user, blogs: myBlogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// GET Edit Blog Form
exports.getEditBlogForm = async (req, res) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        // Check if the blog belongs to the current user
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }

        res.render('editBlog', { user: req.user, blog, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// POST Edit Blog
exports.postEditBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, description } = req.body;
    let imagePath = null;

    if (req.file) {
        imagePath = req.file.path;
    }

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }

        // Update fields
        blog.title = title;
        blog.description = description;

        if (imagePath) {
            blog.image = imagePath;
        }

        await blog.save();
        res.redirect('/myblogs');
    } catch (err) {
        console.error(err);
        res.render('editBlog', { user: req.user, blog: req.body, error: 'Error editing blog. Please try again.' });
    }
};

// POST Delete Blog
exports.postDeleteBlog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).send('Unauthorized');
        }

        await Blog.findByIdAndDelete(blogId);
        res.redirect('/myblogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
