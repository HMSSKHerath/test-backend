import Product from '../models/productModel.js';
import { isAdmin } from './userController.js';

export async function createProducts(req, res) 
{ 
    if(!isAdmin(req))
    {
        res.status(403).json({ message: "Unauthorized Access !" });
        return;
    }

    try
    {
        const productData = req.body;

        const product = new Product(productData);

        await product.save();

        res.status(201).json(
        { 
            message: 'Product created successfully' ,
            product: product
        }); 
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
}

export async function getProducts(req, res)
{
    try
    {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

export async function getProductById(req, res)
{
    try
    {
        const productId = req.params.productId;
        const product = await Product.findOne({ productId: productId });

        if(!product)
        {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch product' });

    }
}

export async function deleteProducts(req, res)
{
        if(!isAdmin(req))
        {
            res.status(403).json({ message: "Unauthorized Access !" });
            return;
        }

        try
        {
            const productId = req.params.productId;
            if(!productId)
            {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            await Product.deleteOne({ productId: productId });
            res.status(200).json({ message: 'Product deleted successfully' });
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({ error: 'Failed to delete product' });
        }

}

export async function updateProducts(req, res)
{
    if(!isAdmin(req))
    {
        res.status(403).json({ message: "Unauthorized Access !" });
        return;
    }

    try
    {
        const productId = req.params.productId;
        const updateData = req.body;

        await Product.updateOne({ productId: productId }, updateData);
        res.status(200).json({ message: 'Product updated successfully' });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}