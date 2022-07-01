const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    user: {
      type: String,
      unique: true,
      required: true
    },
  }
);

const User = model('user', userSchema);

async function _purge_(){
  console.log('Users Purged');
  await User.deleteMany()
}

module.exports = {User, userSchema, _purge_};