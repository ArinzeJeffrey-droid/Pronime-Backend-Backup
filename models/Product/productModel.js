const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        required: [true, "Product name is required"],
        type: String
    },
    productDescription: String,
    productPrice: Number,
    image: String,
    availableColors: {
        type: Array,
        default: []
    },
    availableSizes: {
        type: Array,
        default: []
    }
},{
    timestamps: true
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product