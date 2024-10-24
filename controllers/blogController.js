// controllers/blogController.js

const Blog = require('../model/blog-Model');
const Topic = require('../model/Topic/Topic');
const subTopic = require('../model/subTopic/subTopicModel');



// GET Add Blog Form
const getAddBlogForm = async (req, res) => {
    try {
        const topics = await Topic.find();
        
        console.log('Rendering addBlog view with topics:', topics);
        
        res.render('addBlogs', { user: req.user, topics: topics,  error: null });
    } catch (error) {
        console.error('Error fetching topics or subtopics:', error);
        res.render('addBlogs', { user: req.user, topics: [],  error: 'Failed to load topics or subtopics.' });
    }
};

// POST Add Blog
const postAddBlog = async (req, res) => {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : null; // Assuming you're using multer for file uploads

    try {
        const newBlog = new Blog({
            title,
            description,
            image: imagePath,
            author: req.user._id,
            topic:req.body.topic,
        });

        await newBlog.save();
        res.redirect('/'); // Redirect to the home page or wherever you want
    } catch (error) {
        console.error('Error saving the blog:', error);
        res.render('addBlogs', { user: req.user, topics: [], error: 'Failed to save the blog. Please try again.' });
    }
};


// GET My Blogs
const getMyBlogs = async (req, res) => {
    try {
        const myBlogs = await Blog.find({ author: req.user._id });
        res.render('myBlogs', { user: req.user, blogs: myBlogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// GET Edit Blog Form
const getEditBlogForm = async (req, res) => {
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
const postEditBlog = async (req, res) => {
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
const postDeleteBlog = async (req, res) => {
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


module.exports ={
    getAddBlogForm,
    postAddBlog,
    getMyBlogs,
    getEditBlogForm,
    postEditBlog,
    postDeleteBlog
}
