import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("Colors", colorSchema);