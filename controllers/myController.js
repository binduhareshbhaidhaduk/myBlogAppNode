const userModel = require('../model/signUp-model')
const Blog = require('../model/blog-Model');
const Topic = require('../model/Topic/Topic');
const SubTopic = require('../model/subTopic/subTopicModel');
const Comment  = require('../model/comments/comments')


const defaultCon = async (req, res) => {
    // const user = await userModel.findOne();
    // console.log(userModel, 'user model')
    if (req.isAuthenticated()) {
        console.log(req.user, '<<<<<user in home')
        const blogs = await Blog.find().populate('author', 'username'); // Populate author username
        
        const comments = await Comment.find().populate('blog')

        // Passport adds the authenticated user to req.user
        res.render('home', { user : req.user, blogs, comments  });
    } else {
        res.redirect('/logInForm');
        console.log('form')
    }
};


const profileCon = async (req, res) => {
    let user = await userModel.findOne();
    console.log('User found:', user);
    res.render('profile', { user });

}

const topicCon = async (req, res) => {
    const topics = await Topic.find();
    console.log(topics, 'topics') // Fetch all topics from the database
    res.render('Topic', { topics: topics, user: req.user });
}

const topicSubCon = async (req, res) => {

    const newTopic = await new Topic({
        topic: req.body.topic,
        owner: req.user._id,
    });

    if (newTopic.name !== '') {
        await newTopic.save();  // Save the new topic to the database
        res.redirect('/topic');
    } else {
        res.status(400).send('Please enter a topic');
    }
};


const topicDelete = async (req, res) => {
    const id = req.params.id;
    const topic = await Topic.findOne({ _id: id });

    if (topic && topic.owner.toString() == req.user._id.toString()) {
        await Topic.deleteOne({ _id: id });
        res.redirect('/topic');
    } else {
        res.status(403).send('You are not authorized to remove this topic');
    }
};

const subTopic = async (req, res) => {
    const topics = await Topic.find();
    console.log(topics, 'topics in sub') // Fetch all topics from the database
    res.render('subTopic', { topics: topics, user: req.user })
}


const subTopicCon = async (req, res) => {
    const { subtopicName, subtopicDescription, topic } = req.body;

    console.log('Request Body:', req.body);

    const eTopic = await Topic.findById(topic);

    // const topicId = await Topic.findById(_id)
    console.log(eTopic, 'subTopic Con populate')

    if (!eTopic) {
        return res.status(400).send('Invalid Topic ID');
    }

    const newSubtopic =await new SubTopic({
        name: subtopicName,
        description: subtopicDescription,
        topic: eTopic._id
    });

    await newSubtopic.save();
    console.log('SUBTOPIC:', newSubtopic);

    const savedSubtopic = await SubTopic.findById(newSubtopic)
        .populate({
            path: 'topic',  // Populate the topic field
            populate: { path: 'owner' }  // Nested populate: populate owner inside topic
        });

    console.log(savedSubtopic, 'savedSubtopic')
    res.redirect(`/`);
};

const commentCon=async(req,res)=>{
    const comment=req.body.comment;

console.log(req.params,"paramiter")

    const newComments = await new Comment({
        comment,
        users : req.user._id,
        blog : req.params.id
    })

    const comments = await newComments.save();
    console.log(comments,'comments');

    const savedComments = await Comment.findById(comments).populate({path:'users'}).populate('blog');
    console.log(savedComments,'savedComments')

    res.redirect('/');
}



module.exports = { defaultCon, profileCon, topicCon, topicSubCon, topicDelete, subTopic, subTopicCon, commentCon }




                            