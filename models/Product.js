const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String},
        title: {type:String},
        // avatar: {type: String},
        // cloudinary_id:{type: String},
        // title: {type: String},
        // desc: {type: String},
        // // image: {type: String, required: true, unique:true},
        categories: {type: Array},
        size: {type: String},
        color: {type: String},
        price: {type: Number},
    },{timestamps:true, versionKey: false}
);

module.exports = mongoose.model("Product", ProductSchema);