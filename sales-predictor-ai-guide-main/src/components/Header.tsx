
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold gradient-heading">Sales Predictor AI</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Simple Linear Regression Guide
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
