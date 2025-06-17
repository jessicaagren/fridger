import React, { createContext, useState, ReactNode } from 'react';

export type Product = {
  name: string;
  amount: string;
  bestBefore: string;
  type: 'fridge' | 'freezer';
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
