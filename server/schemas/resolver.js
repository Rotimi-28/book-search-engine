const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");
 const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select("-_v -password")

                return userData
            }
            throw new AuthenticationError("No logged in");
        },
        //get all user
        user: async () => {
            return User.find()
              .select("-_ -password")
              .populate("saveBooks")
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");

            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        }
    },
    addUser: async (parent, args) => {
        const user = await User.Create(args);
        const token = signToken(user);
        console.log(token, user);
        return { token, user };
    },
    saveBook: async (parent, body, context) => {
        if (context.user) {

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToset: {saveBooks: body } },
                { new: true, runValidators: false}
            );
            return user;
        }
        throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, args, context) => {
        if (context.user) {

            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { saveBooks: args } },
                { new: true }
            );
            return user;
        }
        throw new AuthenticationError("You need to logged in!");
    }
 };

 module.exports = resolvers;