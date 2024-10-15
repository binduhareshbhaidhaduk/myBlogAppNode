const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subtopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  }
});
const SubTopic=mongoose.model('Subtopic', subtopicSchema);

module.exports = SubTopic;
