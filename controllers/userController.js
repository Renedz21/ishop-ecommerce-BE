import User from '../models/userSchema.js';
import Product from '../models/productsSchema.js';
import { createError } from '../utils/createError.js';

export const addToCart = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;
        const quantity = parseInt(req.body.quantity);

        // Encontrar el usuario y el producto en la base de datos
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        // Verificar si el producto está disponible
        if (!product.available) {
            return res.status(400).json({ message: 'El producto no está disponible' });
        }

        // Verificar si el producto ya está en el carrito del usuario
        const productInCartIndex = user.cart.findIndex(item => item.product.equals(productId));

        if (productInCartIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar su cantidad
            user.cart[productInCartIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            user.cart.push({ product: productId, quantity });
        }

        // Guardar los cambios en el carrito del usuario
        await user.save();

        return res.json(user.cart);
    } catch (error) {
        console.error(error);
        next(createError(error.message, 500));
    }
};
