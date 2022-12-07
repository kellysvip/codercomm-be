import mongoose from "mongoose";
export interface IPost {
  _id: string;
  content: string;
  image: string;
  author: string;
  isDeleted: Boolean;
  commentCount?: {type: number, default:0};
  reactions?: {
    like: { type: Number; default: 0 };
    dislike: { type: Number; default: 0 };
  };
  toJSON: () => IPost;
  comment: {
  }
  
}

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    reactions: {
      like: { type: Number, default: 0 },
      dislike: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  const post = this._doc;
  delete post.isDeleted;
  return post;
};

export const Post = mongoose.model("Post", postSchema);
