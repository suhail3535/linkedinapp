const express = require("express");
const { PostModel } = require("../model/post.model");
const PostRouter = express.Router();


///CREATE POST
PostRouter.post("/add", async (req, res) => {
  const data = req.body;
  try {
    const post = new PostModel(data);
    await post.save();
    res.status(200).send({ msg: "post added" });
  } catch (error) {
    res.status(400).send({ msg: "not added" });
  }
});


///GET POST
PostRouter.get("/", async(req, res) => {
  try {
      const post = await PostModel.find()
      res.status(200).send(post)
  } catch (error) {
    res.status(400).send({ msg: "post not found" });
  }  
})


////DELETE POST
PostRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const note = await PostModel.findOne({ "_id": id })
    const UserID_post = note.UserID
    const UserMaking=req.body.UserID
try {
    if (UserMaking != UserID_post) {
        res.status(200).send({"msg":"not able to delete"})
    } else {
        await PostModel.findByIdAndDelete({ "_id": id })
        res.status(200).send({"msg":"deleted"})
    }
} catch (error) {
     res.status(400).send({ msg: "not able to delete" });
}
})


////Update POST
PostRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const data=req.body
  const note = await PostModel.findOne({ "_id": id });
  const UserID_post = note.UserID;
  const UserMaking = req.body.UserID;
  try {
    if (UserMaking != UserID_post) {
      res.status(200).send({ msg: "not able to update" });
    } else {
      await PostModel.findByIdAndUpdate({ "_id": id },data);
      res.status(200).send({ msg: "updated" });
    }
  } catch (error) {
    res.status(400).send({ msg: "not able to update" });
  }
});




module.exports = {
    PostRouter
}