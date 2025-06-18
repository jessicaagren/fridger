import React, { createContext, useState, ReactNode } from 'react';

export type Product = {
  id: string;
  name: string;
  amount: string;
  bestBefore: string;
  type: 'fridge' | 'freezer';
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
