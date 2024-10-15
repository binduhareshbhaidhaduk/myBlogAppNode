const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
}

});
const CommentsTopic = mongoose.model('comments', commentsSchema);

module.exports = CommentsTopic;
