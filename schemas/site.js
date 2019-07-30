const { gql } = require('apollo-server');

const typeDefs = gql`
  type MainPage {
    title: String!
    lines: [String!]!
    author: String!
    maintainer: String!
  }
  type Page {
    title: String!
    paragraphs: [String!]
    # image url as a string;
    image: String
  }
  type Query {
    mainPage: MainPage!
    page(title: String): Page!
    allPages: [Page!]!
  }
`;

const resolvers = {
  Query: {
    mainPage: (parent, args, context, info) => context.data.mainPage,
    page: (parent, args, context, info) => {
      const page = context.data.pages[args.title];
      page.title = args.title;
      return page;
    },
    allPages: (parent, args, context, info) => Object.entries(context.data.pages).map(([key, value]) => {
      value.title = key;
      return value;
    }),
  },
}

module.exports = {
  typeDefs,
  resolvers,
};
