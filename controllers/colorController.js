import Color from '../models/colorsSchema.js';
import { createError } from '../utils/createError.js';

export const getColors = async (req, res, next) => {
    try {

        const colors = await Color.find({ isDeleted: false });

        res.status(200).json(colors);

    } catch (error) {
        next(createError(error.message, 500));
    }
}

export const createColor = async (req, res, next) => {
    try {

        const newColor = new Color(req.body);
        const color = await newColor.save();

        res.status(201).json(color);

    } catch (error) {
        next(createError(error.message, 500));
    }
}

export const updateColor = async (req, res, next) => { }

export const deleteColor = async (req, res, next) => { }