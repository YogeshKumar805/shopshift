import React from 'react';
import { Link } from 'wouter';
import { calculateCartTotal } from '@/lib/cart';
import { CartProduct } from '@/lib/types';
import CartItem from './CartItem';
import { X } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartProduct[];
  onUpdate: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdate 
}) => {
  const cartTotal = calculateCartTotal(cartItems);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-6 sm:px-6 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Your Cart ({cartItems.length} items)</h2>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdate={onUpdate}
                      inSidebar={true}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <a 
                    className="block text-center bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-4 py-2 transition duration-200"
                    onClick={onClose}
                  >
                    Checkout
                  </a>
                </Link>
                <Link href="/cart">
                  <a 
                    className="block w-full text-center text-gray-600 hover:text-primary mt-2 text-sm"
                    onClick={onClose}
                  >
                    View Cart
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
