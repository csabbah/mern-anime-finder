const { User, Note } = require("../models");

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("notes");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    notes: async (parent, args) => {
      return Note.find();
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

    addNote: async (parent, { noteToSave }) => {
      const note = await Note.create(noteToSave);

      const updateUserArr = await User.findOneAndUpdate(
        { _id: noteToSave.userId },
        { $addToSet: { notes: note } },
        { new: true }
      ).populate("notes");

      return updateUserArr;
    },

    removeNote: async (parent, { Id, userId }) => {
      const updateUserArr = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { notes: Id } },
        { new: true }
      );
      return updateUserArr;
    },

    updateNote: async (parent, { _id, text }) => {
      return await Note.updateOne(
        { _id: _id },
        { $set: { text } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
