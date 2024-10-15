const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topic: { type: String, required: true },
  owner: { 
    type: Schema.Types.ObjectId,  
    ref: 'Users', 
    required: true 
  }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
