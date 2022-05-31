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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

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
    addJournal: async (parent, args, context) => {
      if (context.user) {
        const journal = await Journal.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { journals: journal._id } },
          { new: true }
        );

        return journal;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateJournal: async (parent, args, context) => {
      if (context.user) {
        const update = await Journal.findByIdAndUpdate(args._id, args, {
          new: true,
        });
        return update;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteJournal: async (parent, { _id }) => {
      return Journal.findByIdAndDelete({ _id });
    },
  },
};

module.exports = resolvers;
