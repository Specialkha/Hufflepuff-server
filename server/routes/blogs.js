module.exports = function (app) {
    /*  "/api/blog"
 *    GET: finds all blogs
 *    POST: creates a new blog
 */

    authenticateJWT = require('../cors/auth');

    const BLOGS_COLLECTION = "blogs";

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

        db.collection(BLOGS_COLLECTION).findOneAndUpdate({ _id: new ObjectID(req.params.blogId) }, { $set: { "posts.$[index].title": updatePost.title, "posts.$[index].content": updatePost.content } }, { "arrayFilters": [{ "index._id": req.params.postId }] }, function (err, doc) {
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
}