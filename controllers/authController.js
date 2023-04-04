import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash
        })

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' })
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESK_SECRET_KEY, { expiresIn: '7d' })

        const { password: _, ...data } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).send({
            token,
            refreshToken,
            data
        })

    } catch (error) {
        next(error)
    }

}

export const login = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email })

        if (!user) return res.status(400).send("Email or password is wrong")

        const isCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isCorrect) return res.status(400).send("Email or password is wrong")

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const { password: _, ...data } = user._doc

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).send({
            token,
            data
        })

    } catch (error) {
        next(error)
    }

}