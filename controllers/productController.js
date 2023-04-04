import Product from '../models/productsSchema.js';
import { createError } from '../utils/createError.js';

export const getProducts = async (req, res, next) => {

    const { limit, page, categoryId } = req.query;

    try {

        if (categoryId) {
            const products = await Product.find({ isDeleted: false, category: { $in: categoryId } }).populate('category')
                // .populate({
                //     path: 'colors',
                //     select: 'name code'
                // })
                .limit(Number(limit))
                .skip(Number(limit) * (Number(page) - 1));

            res.status(200).json(products);
        } else {
            const products = await Product.find({ isDeleted: false }).populate('category')
                .limit(Number(limit))
                .skip(Number(limit) * (Number(page) - 1));

            res.status(200).json(products);
        }

    } catch (error) {
        next(createError(error.message, 500));
    }
}


export const getProductById = async (req, res, next) => {

    const { id } = req.params;

    try {

        const product = await Product.findById(id).populate('category').populate({
            path: 'colors',
            select: 'name code'
        });

        if (!product) return next(createError('Product not found', 404));

        res.status(200).json(product);

    } catch (error) {
        next(createError(error.message, 500));
    }

}

export const createProduct = async (req, res, next) => {

    try {
        const newProduct = new Product({ category: req.body.categoryId, ...req.body });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        next(createError(error.message, 500));
    }

}