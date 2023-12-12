const { User, Project } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('projects').lean({ getters: true, virtuals: true });
        },
        user: async (parent, { _id }) => {
            return await User.findById(_id).populate('donations').populate('comments').populate('projects').lean({ getters: true, virtuals: true });
        },
        projects: async () => {
            return await Project.find().populate('comments').populate('donations').lean({ getters: true, virtuals: true });
        },
        singleProject: async (parent, { _id }) => {
            return await Project.findById(_id).lean();
        },
        commentsPerProject: async (parent, { projectId }) => {
            const project = await Project.findById(projectId).populate('comments');
            return project.comments;
        },
        me: async (parent, { _id }) => {
            try {
                return await User.findById(_id).populate('projects').populate('comments').populate('donations');
                
            } catch (err) {
                console.error('server/utils/resolvers.js', err);
            };
        },
        allMyComments: async (parent, { _id }) => {
            try{
                const me = User.findById(_id).populate('comments');
                const myComments = me;
                const projectIds = myComments.map((comment) => comment.projectId);
                const projectNames = [];
                for(let i=0; i < myComments.length; i++){
                    const project= await Project.findById(projectIds[i]);
                    const projectName= project.projectName;
                    projectNames.push(projectName);
                };
                const commentedProjects = [];
                for(let i = 0; i < myComments.length; i++){
                    const commentedProject = { comment: myComments[i], projectName: projectNames[i] };
                    commentedProjects(commentedProject);
                };
                return commentedProjects;
            } catch(err) {
                throw err;
            }
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password });
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                console.error(err)
            };
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
                const newProject = await Project.create({ projectName: projectName, projectDescription: projectDescription, expiresIn: expiresIn, goalAmount: goalAmount, userId: context.user._id });

                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            projects: newProject._id
                        }
                    },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { projectId, commentText, commentAuthor }) => {
            try {
                
                const newComment= { projectId, commentText, commentAuthor };
                await User.findOneAndUpdate(
                    { _id: commentAuthor },
                    {
                        $push: {
                            comments: newComment
                        }
                    },
                    { new: true, runValidators: true }
                );
                return await Project.findOneAndUpdate(
                    { _id: projectId },
                    {
                        $push: {
                            comments: newComment
                        }
                    },
                    { new: true });
            } catch (err) {
                throw err;
            }
        },
        updateUser: async (parent, { username, email, password }, context) => {
            if (context.user) {
                let newPassword;
                if(password){

                newPassword= bcrypt.hash(password, 10)
                };
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        username: username || context.user.username,
                        email: email || context.user.email,
                        password: newPassword || context.user.password
                    },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },
        makeDonation: async (parent, { projectId, amount, donorId }) => {
            try {
                const newDonation = { projectId, amount, donorId };
                await Project.findOneAndUpdate(
                    { _id: projectId },
                    {
                        $push: {
                            donations: newDonation
                        }
                    }, {
                    new: true
                });
                return await User.findOneAndUpdate(
                    { _id: donorId },
                    {
                        $push: {
                            donations: newDonation
                        }
                    },
                    { new: true, runValidators: true });
            }
            catch (err) { throw err; }
        }
    }
}

module.exports = resolvers;