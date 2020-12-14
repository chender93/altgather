const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: "You must include a username!",
      trim: true
    },
    email: {
      type: String,
      required: "You must include a valid email",
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Your email is not formatted correctly']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;
