const { User, Journal } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("journals");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    journals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Journal.find(params).sort({ createdAt: -1 });
    },
    journal: async (parent, { _id }) => {
      return Journal.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate("journals");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("journals");
    },
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
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    addJournal: async (parent, args, context) => {
      if (context.user) {
        const journal = await Journal.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              savedJournal: { journalId: args.journalId },
            },
          },
          { new: true }
        );

        return journal;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteJournal: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedJournal: { journalId: args.journalId },
            },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
