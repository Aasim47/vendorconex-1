// frontend/src/components/CartPage.js

import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function CartPage() {
    const { cart, loadingCart, cartError, updateItemQuantity, removeItemFromCart, checkout, totalItemsInCart, totalCartAmount } = useContext(CartContext);

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 0) return;
        await updateItemQuantity(productId, newQuantity);
    };

    const handleRemoveItem = async (productId) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            await removeItemFromCart(productId);
        }
    };

    const handleCheckout = async () => {
        if (window.confirm(`Proceed to checkout with ${totalItemsInCart} items totaling $${totalCartAmount.toFixed(2)}?`)) {
            await checkout(); // Checkout function handles alerts
        }
    };

    if (loadingCart) return <p className="text-center">Loading cart...</p>;
    if (cartError) return <p className="text-center text-red-500">Error: {cartError}</p>;
    if (!cart || !cart.items || cart.items.length === 0) return <p className="text-center">Your cart is empty.</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Shopping Cart</h2>

            <div className="space-y-4">
                {cart.items.map(item => (
                    <div key={item.product._id} className="flex items-center justify-between border-b border-slate-200 py-4">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{item.product.name}</h3>
                                <p className="text-sm text-slate-600">Price: ${item.product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="text-sm text-slate-700">Qty:</label>
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                className="w-16 p-1 border border-slate-300 rounded-md text-center"
                            />
                            <button
                                onClick={() => handleRemoveItem(item.product._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-300 text-right">
                <p className="text-xl font-semibold text-slate-900 mb-2">Total Items: {totalItemsInCart}</p>
                <p className="text-2xl font-bold text-blue-600 mb-6">Total Amount: ${totalCartAmount.toFixed(2)}</p>
                <button
                    onClick={handleCheckout}
                    className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
                    disabled={totalItemsInCart === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartPage;