import React, { useState } from 'react';
import { updateCartItemQuantity, removeFromCart } from '@/lib/cart';
import { CartProduct } from '@/lib/types';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartProduct;
  onUpdate: () => void;
  inSidebar?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate, inSidebar = false }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemove = () => {
    removeFromCart(item.id);
    onUpdate();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setQuantity(newQuantity);
    updateCartItemQuantity(item.id, newQuantity);
    onUpdate();
  };

  const totalPrice = (item.salePrice || item.price) * quantity;

  if (inSidebar) {
    return (
      <div className="flex items-center space-x-3 animate-in fade-in">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h4 className="text-sm font-medium">{item.name}</h4>
          <p className="text-xs text-gray-500">{quantity} × ${(item.salePrice || item.price).toFixed(2)}</p>
          <div className="flex items-center mt-1">
            <button 
              className="text-gray-500 hover:text-primary text-xs flex items-center"
              onClick={handleRemove}
            >
              <Trash2 className="h-3 w-3 mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col sm:flex-row sm:items-center hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center flex-1">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded mr-4"
        />
        <div>
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.category}</p>
          <div className="mt-2">
            <button 
              className="text-sm text-red-500 hover:text-red-700 flex items-center"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-1" /> 
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 flex items-center justify-between sm:w-2/5">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            className="p-2 hover:bg-gray-100"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <input 
            type="number" 
            className="w-12 text-center border-x border-gray-300 py-1 focus:outline-none" 
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
          />
          <button 
            className="p-2 hover:bg-gray-100"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
          {item.salePrice && (
            <p className="text-xs text-gray-500 line-through">${(item.price * quantity).toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
