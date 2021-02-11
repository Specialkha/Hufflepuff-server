const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const jwt = require('jsonwebtoken');

const USERS_COLLECTION = "users";
const BLOGS_COLLECTION = "blogs";
const NEWS_COLLECTION = "news";
const RESSOURCES_COLLECTION = "ressources";

const accessTokenSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const app = express();
app.use(bodyParser.json());

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

app.post("/api/" + USERS_COLLECTION, function (req, res) {
    let newContact = req.body;
    newContact.createDate = new Date();

    if (!req.body.lastName) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(USERS_COLLECTION).insertOne(newContact, function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new contact.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.post("/api/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    let isConnected;

    // Filter user from the users array by username and password
    // const user = users.find(u => { return u.username === username && u.password === password });

    if (db.collection(USERS_COLLECTION).findOne({ email: username, password: password }) != undefined) {
        isConnected = true;

    } else {
        isConnected = false;
    }
    console.log(isConnected, 'isconnected');
    if (isConnected === true) {
        // Generate an access token
        const accessToken = jwt.sign({ email: username, password: password }, accessTokenSecret);
        console.log(accessToken, 'accessToken');
        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

/*  "/api/users/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/" + USERS_COLLECTION + "/:id", function (req, res) {
    db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get contact");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/" + USERS_COLLECTION + "/:id", function (req, res) {
    let updateDoc = req.body;
    delete updateDoc._id;

    db.collection(USERS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update contact");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/" + USERS_COLLECTION + "/:id", function (req, res) {
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

app.post("/api/" + BLOGS_COLLECTION, function (req, res) {
    let newBlog = req.body;
    newContact.createDate = new Date();

    if (!req.body.lastName) {
        handleError(res, "Invalid blog input", "Must provide a name.", 400);
    } else {
        db.collection(BLOGS_COLLECTION).insertOne(newContact, function (err, doc) {
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

app.put("/api/" + BLOGS_COLLECTION + "/:id", function (req, res) {
    let updateBlog = req.body;
    delete updateDoc._id;

    db.collection(BLOGS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update blog");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/" + BLOGS_COLLECTION + "/:id", function (req, res) {
    db.collection(BLOGS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete blog");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});