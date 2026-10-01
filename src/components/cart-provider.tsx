"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: string;
};

type AddLine = Omit<CartLine, "key" | "quantity"> & { quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addLine: (line: AddLine) => void;
  removeLine: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    drawerOpen,
    setDrawerOpen,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    addLine: (line) => {
      const key = `${line.id}-${line.options ?? "standard"}`;
      setLines((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + (line.quantity ?? 1) } : item);
        }
        return [...current, { ...line, key, quantity: line.quantity ?? 1 }];
      });
      setDrawerOpen(true);
    },
    removeLine: (key) => setLines((current) => current.filter((line) => line.key !== key)),
    updateQuantity: (key, quantity) => {
      if (quantity < 1) {
        setLines((current) => current.filter((line) => line.key !== key));
        return;
      }
      setLines((current) => current.map((line) => line.key === key ? { ...line, quantity } : line));
    },
    clearCart: () => setLines([]),
  }), [drawerOpen, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
