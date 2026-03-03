const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a book title"],
            trim: true
        },
        author: {
            type: String,
            required: [true, "Please add an author"],
            trim: true
        },
        tags: [
            {
                type: String,
                trim: true
            }
        ],
        status: {
            type: String,
            enum: ["Want to Read", "Reading", "Completed"],
            default: "Want to Read"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
