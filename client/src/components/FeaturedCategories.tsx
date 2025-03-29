import React from 'react';
import { Link } from 'wouter';
import { categories } from '@/lib/products';

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-12 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Categories</h2>
          <p className="mt-4 text-xl text-gray-600">Browse our top categories and find what you need</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link key={category.id} href="#">
              <a className="group">
                <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100">
                  <img 
                    src={category.imageUrl}
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
