const { Schema, Types, model } = require('mongoose');
// Schema for reaction assets
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);
const ThoughtSchema = new Schema(
  {
    // Schema for thoughts, with length requirements
    thoughText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    // 
    createdAt: {
      type: Date,
      default: Date.now,
      // get: ***format timestamp on query
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
  );
  
  // virtual to retrieve the length of the thought reactions
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;