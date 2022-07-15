const express = require("express");
const path = require("path");
const db = require("./config/connection");
//const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMidleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMidleware,
});
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)

      
    });
  });
};
//integrate our apollo server & with d Express application as middleware
//server.applyMiddleware({ app });

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
startServer();
