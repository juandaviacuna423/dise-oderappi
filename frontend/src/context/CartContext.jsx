import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('cart_items');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.productoId === product.productoId);
      if (existing) {
        return current.map((item) =>
          item.productoId === product.productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...current, { ...product, cantidad: 1 }];
    });

    return { success: true };
  };

  const updateQuantity = (productoId, cantidad) => {
    setItems((current) =>
      current
        .map((item) => (item.productoId === productoId ? { ...item, cantidad } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
