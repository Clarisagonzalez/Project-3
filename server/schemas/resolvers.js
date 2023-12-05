const { User, Project } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('projects').lean({ getters: true, virtuals:true });
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id).populate('donations').populate('comments').populate('projects').lean({ getters: true, virtuals:true });
        },
        projects: async () => {
            return await Project.find().populate('donations').populate('comments').lean({ getters: true, virtuals:true });
        },
        project: async (parent, { _id }) => {
            return await Project.findById(_id).populate('donations').populate('comments').lean({ getters: true, virtuals: true });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('donations').populate('comments').populate('projects').lean({ getters: true, virtuals:true });
            }

            throw AuthenticationError;
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const isUserNameTaken = await User.findOne({ username: username });
            if (isUserNameTaken) return AuthenticationError;

            const isEmailTaken = await User.findOne({ email: email });

            if (isEmailTaken) return AuthenticationError;

            const user = await User.create({ username, email, password });
            signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
    
   addProject: async (parent, { projectName, projectDescription, expiresIn, goalAmount }, context) => {
        if (context.user) {
            const newProject = await Project.create({ projectName, projectDescription, expiresIn, goalAmount });

            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $addToSet: {
                        projects: newProject._id
                    }
                },
                { new: true , runValidators: true}
            );
        }
        throw AuthenticationError;
    },

    addComment: async (parent, { commentText }, context) => {
        if(!context.user)  throw AuthenticationError;

        return await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $push: {
                        comments: { commentText, commentAuthor: context.user._id}
                    }
                },
                { new: true, runValidators: true});
    },
    updateUser: async (parent, { username, email, password }, context) => {
        if (context.user) {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { username, email, password },
                { new: true, runValidators: true }
            );
        }
        throw AuthenticationError;
    },
   /* makeDonation: async (parent, { projectId, amount }, context) => {
        if (context.user) {
            const newDonation = { projectId, amount };
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $push: {
                        donations: newDonation
                    }
                },
                { new: true, runValidators: true }
            );
            return updatedUser;
        };
        throw AuthenticationError;
    }*/
    }
}

module.exports = resolvers;