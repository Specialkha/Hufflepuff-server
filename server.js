var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

const USERS_COLLECTION = "users";
const BLOGS_COLLECTION = "blogs";
const NEWS_COLLECTION = "news";
const RESSOURCES_COLLECTION = "ressources";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Rest of server.js code below

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

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
    var updateDoc = req.body;
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
    var newBlog = req.body;
    newContact.createDate = new Date();

    if (!req.body.name) {
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
    var updateBlog = req.body;
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