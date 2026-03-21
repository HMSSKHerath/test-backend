import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productId:
        {
            type: String,
            required: true,
            unique: true
        },
        name:
        {
            type: String,
            required: true
        },
        altName:
        {
            type: [String],
            default: [],
            required: true
        },  
        description:
        {
            type: String,
            required: true
        },
        imageUrl:
        {
            type: [String],
            default: [],
            required: true
        },
        price:
        {
            type: Number,
            required: true
        },
        labeledPrice:
        {
            type: Number,
            required: true
        },
        category:
        { 
            type: String,
            required: true
        }
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;