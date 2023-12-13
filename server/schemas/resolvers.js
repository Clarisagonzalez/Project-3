const { User, Project, Site} = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('projects').lean({ getters: true });
        },
        allProjects: async () => {
            try {
                const projects = await Project.find().populate('comments').populate('donations').lean({ getters: true });
                return projects;
            } catch (err) {
                console.error(err);
            }
        },
        singleProject: async (parent, { _id }) => {
            return await Project.findById(_id).lean({ getters: true });
        },
        commentsPerProject: async (parent, { projectId }) => {
            const project = await Project.findById(projectId).populate('comments').lean({ getters: true });
            return project.comments;
        },
        user: async (parent, { _id }) => {
            try {
                return await User.findById(_id).populate('projects').lean({ getters: true });

            } catch (err) {
                console.error(err);
            };
        },
        allMyComments: async (parent, { _id }) => {
            try {
                const me = await User.findById(_id).populate('comments').lean({ getters: true });
                const { comments } = me;
                if (!comments) {
                    const commentedProjects = [];
                    return commentedProjects;
                } else {
                    const myComments = comments;
                    if (!myComments.length) {
                        const commentedProjects = [];
                        return commentedProjects;
                    } else {
                        const projectIds = myComments.map((comment) => comment.projectId);
                        const projectNames = [];
                        for (let i = 0; i < myComments.length; i++) {
                            const project = await Project.findById(projectIds[i]);
                            const projectName = project.projectName;
                            projectNames.push(projectName);
                        };
                        const commentedProjects = [];
                        for (let i = 0; i < myComments.length; i++) {
                            const commentedProject = { comment: myComments[i], projectName: projectNames[i] };
                            commentedProjects.push(commentedProject);
                        };

                        return commentedProjects;
                    }
                }
            } catch (err) {
                throw err;
            }
        },
        allMyDonations: async (parent, { _id }) => {
            try {
                const me = await User.findById(_id).populate('donations').lean({ getters: true });
                const { donations } = me;
                if (!donations) {
                    const projectsDonatedTo = [];
                    return projectsDonatedTo;
                } else {
                    const myDonations = donations;
                    if (!myDonations.length) {
                        const projectsDonatedTo = [];
                        return projectsDonatedTo;
                    } else {
                        const projectIds = myDonations.map((donation) => donation.projectId);
                        const projectNames = [];
                        for (let i = 0; i < myDonations.length; i++) {
                            const project = await Project.findById(projectIds[i]);
                            const projectName = project.projectName;
                            projectNames.push(projectName);
                        };
                        const projectsDonatedTo = [];
                        for (let i = 0; i < myDonations.length; i++) {
                            const projectDonatedTo = { donation: myDonations[i], projectName: projectNames[i] };
                            projectsDonatedTo.push(projectDonatedTo);
                        };
                        return projectsDonatedTo;
                    };
                }
            } catch (err) {
                throw err;
            }
        },

        allSiteDonations: async () => {
            try {

                return await Site.find({}).lean({ getters:true });

            } catch (err) {
                
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

                const newComment = { projectId, commentText, commentAuthor };
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
                if (password) {

                    newPassword = bcrypt.hash(password, 10)
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
        },
        makeSiteDonation: async (parent, { donorId, donorName, donationAmount, paymentMethod}) => {
            try {
               const newDonation = await Site.create({ donorId, donorName, donationAmount, paymentMethod});
               return newDonation;
            }
            catch (err) { 
                throw err; 
            }
        },
        deleteComment: async (parent, { _id}) => {
            try {
                const user = await User.findOneAndUpdate(
                    {_id: _id},
                    {
                        $pull: {
                            comments: {commentAuthor: _id}
                        }
                    },
                    { new: true});
                return user; 
            } catch(err) {
                throw err;
            
        }
    },

        deleteProject: async (parent, { userId, projectId }) => {
            try {
                await Project.findByIdAndDelete(projectId)
                const user = await User.findOneAndUpdate(
                    {_id: userId},
                    {
                        $pull: {
                            projects: { _id: projectId}
                        }
                    },
                    { new: true });
                return user;
            } catch(err) {
                throw err;
            }
        }
    }
}

module.exports = resolvers;