import { TryCatch } from "../middlewares/error.js";
import { Post } from "../models/posts.js";
import { User } from "../models/user.js";
import {
    uploadFilesToCloudinary2,
} from "../utils/features.js";


const createPost = TryCatch(async (req, res) => {
    const { title, description, image, user, category } = req.body;
    const attachments = await uploadFilesToCloudinary2(image);
    console.log(attachments);
    const Myuser = await User.findById(user);
    const post = await Post.create({
        title,
        description,
        attachments: [...attachments],
        author: Myuser._id,
        category: category,
    });
    console.log(post);
    await post.save();

    return res.status(201).json({
        success: true,
        message: "Post Created Successfully",
    });
});




const getPostOnCategory = TryCatch(async (req, res) => {
    console.log("category", req.params.category);
    let posts;
    if (req.params.category === "all") {
        posts = await Post.find().populate("author", "name avatar _id");
    }
    else {
        posts = await Post.find({ category: req.params.category }).populate("author", "name avatar _id");
    }

    return res.status(200).json({
        success: true,
        data: posts,
    });
});



export {
    getPostOnCategory,
    createPost,
};
