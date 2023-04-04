import Category from '../models/categorySchema.js'
import { createError } from '../utils/createError.js'

export const getCategories = async (req, res, next) => {

    try {

        const categories = await Category.find({ isDeleted: false });
        res.status(200).json(categories);

    } catch (error) {
        next(createError(error.message, 500));
    }
}

export const getCategory = async (req, res, next) => { }

export const createCategory = async (req, res, next) => {

    try {
        const category = await Category.create(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);

    } catch (error) {
        next(createError(error.message, 500));
    }

}

export const updateCategory = async (req, res, next) => {

    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, {
            $set: req.body
        });

        if (!category) {
            throw new Error('Category not found');
        }
        return res.status(200).json(category);
    } catch (error) {
        next(createError(error.message, 500));
    }

}

export const deleteCategory = async (req, res, next) => { }