require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const JWT_SECRET = 'SECRET';

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const typeDefs = `#graphql
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author');
        return books;
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: { $in: author.id } }).populate('author');
        return books;
      }

      if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate('author');
        return books;
      }

      return await Book.find({}).populate('author');
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated');
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });

        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              invalidArgs: args,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author.id });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            invalidArgs: args,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Not authenticated');
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;

      try {
        author.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            invalidArgs: args,
          },
        });
      }
      return author;

      // const updatedAuthor = await Author.findOneAndUpdate(
      //   { name: args.name },
      //   { born: args.setBornTo },
      //   { new: true },
      // );
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      const returnedUser = await user.save()
        .catch(error => {
          throw new GraphQLError(error.message, {
            extensions: {
              invalidArgs: args,
            },
          });
        });

      return returnedUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Not authenticated');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(
  server,
  {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      console.log('auth:', auth);
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
  },
  { listen: { port: 4000 }})
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  }
);
