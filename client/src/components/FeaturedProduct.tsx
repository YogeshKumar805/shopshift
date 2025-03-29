import React, { useState } from 'react';
import { getFeaturedProduct } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { useToast } from '@/hooks/use-toast';
import { CheckIcon, MinusIcon, PlusIcon, Heart } from 'lucide-react';
import { Link } from 'wouter';

const FeaturedProduct: React.FC = () => {
  const product = getFeaturedProduct();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const { toast } = useToast();

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      variant: "success",
      title: "Item added to cart",
      description: "You can review your cart at any time",
      action: (
        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
          <CheckIcon className="h-5 w-5 text-green-600" />
        </div>
      ),
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:gap-12">
          {/* Product Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">New Arrival</span>
              <div className="ml-4 flex items-center">
                {Array(5).fill(0).map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className="text-sm ml-2 text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Color</span>
                <Link href="#">
                  <a className="text-primary text-sm">Color Guide</a>
                </Link>
              </div>
              <div className="flex space-x-3">
                <button 
                  className={`w-8 h-8 rounded-full bg-black border-2 ${selectedColor === 'black' ? 'border-primary' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  onClick={() => setSelectedColor('black')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-blue-700 border-2 ${selectedColor === 'blue' ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  onClick={() => setSelectedColor('blue')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-green-700 border-2 ${selectedColor === 'green' ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  onClick={() => setSelectedColor('green')}
                ></button>
                <button 
                  className={`w-8 h-8 rounded-full bg-amber-700 border-2 ${selectedColor === 'amber' ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}
                  onClick={() => setSelectedColor('amber')}
                ></button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Quantity</span>
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button 
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 focus:outline-none"
                  onClick={decrementQuantity}
                >
                  <MinusIcon size={16} />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  min="1" 
                  className="w-full text-center focus:outline-none text-gray-700"
                  readOnly
                />
                <button 
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 focus:outline-none"
                  onClick={incrementQuantity}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
                </span>
                {product.salePrice && (
                  <>
                    <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                    <p className="text-amber-600 text-sm font-medium mt-1">
                      Save ${(product.price - product.salePrice).toFixed(2)} ({Math.round((1 - product.salePrice / product.price) * 100)}% off)
                    </p>
                  </>
                )}
              </div>
              <span className="text-gray-600 text-sm">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </button>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>30-day returns</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
