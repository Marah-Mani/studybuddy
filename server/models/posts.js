import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["notes", "summary", "books", "tools"],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Posts || model("Posts", schema);
