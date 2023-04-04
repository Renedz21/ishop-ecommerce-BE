import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: [String],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    colors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Colors",
    },
    available: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);