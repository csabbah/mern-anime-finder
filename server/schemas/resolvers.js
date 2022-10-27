const { User, savedAnime } = require("../models");

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedAnime");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    savedAnime: async (parent, args) => {
      return savedAnime.find();
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

    addAnime: async (parent, { animeToSave }) => {
      const anime = await savedAnime.create({ animeToSave });
      const updateUserArr = await User.findOneAndUpdate(
        { _id: animeToSave.userId },
        { $addToSet: { savedAnime: anime } },
        { new: true }
      ).populate("savedAnime");
      return updateUserArr;
    },

    removeAnime: async (parent, { Id, userId }) => {
      const updateUserArr = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedAnime: Id } },
        { new: true }
      );
      return updateUserArr;
    },
  },
};

module.exports = resolvers;
