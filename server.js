require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const jwt = require('jsonwebtoken');
const { verify } = require('./middleware');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const USERS_COLLECTION = "users";
const BLOGS_COLLECTION = "blogs";
const NEWS_COLLECTION = "news";
const RESSOURCES_COLLECTION = "ressources";

let refreshTokens = [];
let connectedUsers = [];

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Rest of server.js code below

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/CUBES", {
  useUnifiedTopology: true
}, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.get(/^(?!\/api).+/, function (req, res) {
  res.redirect('/');
});

// users API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

/*  "/api/users"
 *    GET: finds all users
 *    POST: creates a new contact
 */

app.get("/api/" + USERS_COLLECTION, function (req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/auth/signup", async function (req, res) {
  let newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.lastName) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {

    const email = await db.collection(USERS_COLLECTION).findOne({ email: req.body.email });
    if (email) {
      return res.status(404).json('Email déjà utilisé');
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.body.password = hash;
        db.collection(USERS_COLLECTION).insertOne(newContact, function (err, doc) {
          if (err) {
            handleError(res, err.message, "Failed to create new user.");
          } else {
            res.status(201).json(doc.ops[0]);
          }
        });
      });
    }
  }
});

app.post("/api/auth/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Filter user from the users array by username and password
  // const user = users.find(u => { return u.username === username && u.password === password });

  const user = await db.collection(USERS_COLLECTION).findOne({ email: username });

  if (!user) {
    return res.status(401).send();
  } else {
    await bcrypt.compare(password, user.password).then((result) => {
      if (result == true) {
        const accessToken = jwt.sign({ email: username, password: user.password }, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: process.env.ACCESS_TOKEN_LIFE });
        const refreshToken = jwt.sign({ email: username, password: user.password }, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS256", expiresIn: process.env.REFRESH_TOKEN_LIFE });

        refreshTokens.push(refreshToken);
        connectedUsers.push(username);
        res.json({
          accessToken,
          refreshToken
        });
      } else {
        res.send('Username or password incorrect');
      }
    }).catch((err) => console.error(err));
  }
});

app.post('/api/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ email: username, password: password }, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS256", expiresIn: process.env.ACCESS_TOKEN_LIFE });

    res.json({
      accessToken
    });
  });
});

app.post('/api/auth/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  connectedUsers = connectedUsers.filter(connectedUser => connectedUser !== req.body.email);
  res.status(200).send("Logout successful");
});

// Verify authenticity of authToken
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[0];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

/*  "/api/users/:id"
 *    GET: find contact by username
 */

app.get("/api/" + USERS_COLLECTION + "/:id", function (req, res) {
  db.collection(USERS_COLLECTION).findOne({ email: req.params.id }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

/*  "/api/users/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/" + 'single' + USERS_COLLECTION + "/:id", function (req, res) {
  db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/" + 'token/' + USERS_COLLECTION + "/:token", authenticateJWT, function (req, res) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[0],
      decoded;
    try {
      decoded = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    var userName = decoded.email;
    // Fetch the user by id
    db.collection(USERS_COLLECTION).findOne({ email: userName }).then(function (user) {
      // Do something with the user
      return res.status(200).json(user);
    });
  }
  return res.status(500);
});

app.put("/api/" + USERS_COLLECTION + "/:id", authenticateJWT, function (req, res) {
  let updateDoc = req.body;
  delete updateDoc._id;
  db.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateDoc }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/" + USERS_COLLECTION + "/:id", authenticateJWT, function (req, res) {
  db.collection(USERS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*  "/api/blog"
 *    GET: finds all blogs
 *    POST: creates a new blog
 */

app.get("/api/" + BLOGS_COLLECTION, function (req, res) {
  db.collection(BLOGS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get blogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/" + BLOGS_COLLECTION, authenticateJWT, function (req, res) {
  let newBlog = req.body;
  newBlog.createDate = new Date();

  if (!req.body.title) {
    handleError(res, "Invalid blog input", "Must provide a name.", 400);
  } else {
    db.collection(BLOGS_COLLECTION).insertOne(newBlog, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new blog.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/blog/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/" + BLOGS_COLLECTION + "/:id", function (req, res) {
  db.collection(BLOGS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/" + BLOGS_COLLECTION + "/:id", authenticateJWT, function (req, res) {
  let updateBlog = req.body;
  delete updateBlog._id;

  db.collection(BLOGS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, { $set: updateBlog }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update blog");
    } else {
      updateBlog._id = req.params.id;
      res.status(200).json(doc);
    }
  });
});

app.delete("/api/" + BLOGS_COLLECTION + "/:id", authenticateJWT, function (req, res) {
  db.collection(BLOGS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete blog");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.post("/api" + "/post" + "/:id", authenticateJWT, function (req, res) {
  let updatedBlog = req.body;
  db.collection(BLOGS_COLLECTION).findOneAndUpdate({ _id: new ObjectID(req.params.id) }, { $push: { posts: updatedBlog } }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Votre post n'a pas été créé");
    } else if (result) {
      res.status(200).json(updatedBlog);
    }
  });
});

app.get("/api/" + BLOGS_COLLECTION + "/:blogId" + "/post" + "/:postId", function (req, res) {
  // db.getCollection('blogs').findOne({_id:new ObjectId("6032c2088dd8c129d02b1c9f")}, {posts:{$elemMatch:{_id:req.params.postId}}});
  db.collection(BLOGS_COLLECTION).aggregate([
    { $match: { _id: new ObjectID(req.params.blogId) } }, {
      $project: {
        posts: {
          $filter: {
            input: "$posts",
            as: "posts",
            cond: { $eq: ["$$posts._id", req.params.postId] }
          }
        }
      }
    },
    { $unwind: "$posts" },
    { $replaceRoot: { newRoot: "$posts" } }
  ], function (err, cursor) {
    if (err) {
      handleError(res, err.message, "Failed to get post");
    } else {
      cursor.toArray((error, doc) => {
        if (error) { return handleError(res, error.message, "Failed to get post"); }
        res.status(200).send(doc);
      });
    }
  });
});

app.put("/api/" + BLOGS_COLLECTION + "/:blogId" + "/post" + "/:postId", authenticateJWT, function (req, res) {
  let updatePost = req.body;
  delete updatePost._id;

  db.collection(BLOGS_COLLECTION).findOneAndUpdate({ _id: new ObjectID(req.params.id) }, { $set: updatePost }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update blog");
    } else {
      updatePost._id = req.params.id;
      res.status(200).json(doc);
    }
  });
});

app.put("/api/" + BLOGS_COLLECTION + "/:blogId" + "/post" + "/:postId" + "/comment", authenticateJWT, function (req, res) {
  let comments = req.body;
  delete comments._id;

  db.collection(BLOGS_COLLECTION).findOneAndUpdate({ _id: new ObjectID(req.params.blogId), 'posts._id': req.params.postId }, { $push: { "posts.$.comments": { comments } } }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update blog");
    } else {
      comments._id = req.params.id;
      res.status(200).json(doc);
    }
  });
});
