const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const  commentSchema  = require('./commentSchema');
const  donationSchema  = require('./donationSchema');

//Importing plug-ins in order to be able to compute virtual properties and use getters when retrieving 'lean' documents
const mongooseLeanGetters = require('mongoose-lean-getters');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minLen: 5,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //Regular expression to validate a user-entered email address
            match: /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },

        donations: [donationSchema],

        comments: [commentSchema],

        projects: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }] 
    }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
userSchema.plugin(mongooseLeanGetters);

const User = model('User', userSchema);

module.exports =  User ;