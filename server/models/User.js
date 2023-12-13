const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const  commentSchema  = require('./commentSchema');
const  donationSchema  = require('./donationSchema');

//Importing plug-ins in order to be able to compute virtual properties and use getters when retrieving 'lean' documents
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
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
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
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
//Defining a getter for the 'donationCount' virtual property.
userSchema
    .virtual('donationCount')
    .get(function() {
        return this.donations.length;
    });

userSchema
    .virtual('donationTotal')
    .get(function() {

        return this.donations.reduce((total, current) => total + current,0);//Total amount donated amongst all individual donations
    });

userSchema
    .virtual('numberOfProjects')
    .get(function() {
        return this.projects.length;
    })
//Attaching the plug-ins to the schema.
userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(mongooseLeanGetters);

const User = model('User', userSchema);

module.exports =  User ;