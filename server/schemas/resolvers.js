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
            return await Project.find().populate('comments').populate('donations').lean({ getters: true, virtuals:true });
        },
        project: async (parent, { _id }) => {
            return await Project.findById(_id).populate('donations').populate('comments').lean({ getters: true, virtuals: true });
        },
        myProjects: async (parent, args, context) => {
            try{
                const user =  await User.findById(context.user._id).populate('projects');
                const myProjects = user?.projects || [];
                return myProjects;
            } catch(err) {
            console.error('server/utils/resolvers.js', err);
            };
        }
    },

    Mutation: {
        //Done!
        addUser: async (parent, { username, email, password }) => {
            try {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
            } catch(err) { 
                console.error(err)
            };
        },
        //Done!
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
    //Done!
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
                { new: true , runValidators: true}
            );
        }
        throw AuthenticationError;
    },

    addComment: async (parent, { projectId, commentText }, context) => {
        if(!context.user)  throw AuthenticationError;

        return await Project.findOneAndUpdate(
                { _id: projectId },
                {
                    $push: {
                        comments: { commentText}
                    }
                },
                { new: true, runValidators: true});
    },
    //Done!
    updateUser: async (parent, { username, email, password }, context) => {
        if (context.user) {
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                {   username: username || context.user.username, 
                    email: email || context.user.email, 
                    password: password || context.user.password },
                { new: true, runValidators: true }
            );
        }
        throw AuthenticationError;
    },
    /*Could serve as example to implement Stripe
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw AuthenticationError;
          },*/
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