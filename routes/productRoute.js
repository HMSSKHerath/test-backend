import express from 'express';
import {createProducts,getProducts,getProductById,deleteProducts,updateProducts} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/', createProducts);
productRouter.put('/:productId', updateProducts);
productRouter.delete('/:productId', deleteProducts);

export default productRouter;