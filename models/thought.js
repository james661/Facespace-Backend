const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
  {
    thoughText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
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

const Thoughts = model('Thoughts', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new.Types.ObjectId()
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
      // get: ***format timestamp on query
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

  module.exports = Thoughts;