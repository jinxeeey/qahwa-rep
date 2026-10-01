export type MenuItem = {
  id: string;
  name: string;
  category: "Matcha" | "Coffee" | "Fresh" | "Brunch" | "Dessert";
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  matcha?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Matcha",
    price: 900,
    description: "Stone-milled matcha, your choice of milk, hot or iced.",
    image: "/images/matcha-grades.png",
    featured: true,
    matcha: true,
  },
  {
    id: "strawberry-matcha",
    name: "Strawberry Matcha",
    category: "Matcha",
    price: 1100,
    description: "Matcha layered with strawberry and fresh milk.",
    image: "/images/qahwa-drink.png",
    matcha: true,
  },
  {
    id: "cloud-matcha",
    name: "Cloud Matcha",
    category: "Matcha",
    price: 950,
    description: "Iced matcha finished with a soft vanilla cloud.",
    image: "/images/qahwa-ice.png",
    matcha: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Coffee",
    price: 650,
    description: "Double espresso with carefully textured milk.",
    image: "/images/qahwa-cup.png",
    featured: true,
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    category: "Coffee",
    price: 600,
    description: "Espresso, milk and a restrained touch of sweetness.",
    image: "/images/qahwa-paper.png",
  },
  {
    id: "orange-tonic",
    name: "Orange Espresso Tonic",
    category: "Coffee",
    price: 800,
    description: "Bright citrus, tonic and a clean espresso finish.",
    image: "/images/qahwa-drink.png",
  },
  {
    id: "qahwa-clean",
    name: "Qahwa Clean",
    category: "Fresh",
    price: 800,
    description: "A crisp house juice pressed for the day.",
    image: "/images/qahwa-ice.png",
  },
  {
    id: "blue-glow",
    name: "Blue Glow",
    category: "Fresh",
    price: 1000,
    description: "A cooling wellness blend with a citrus lift.",
    image: "/images/qahwa-paper.png",
  },
  {
    id: "salmon-croissant",
    name: "Salmon Cream Croissant",
    category: "Brunch",
    price: 2000,
    description: "Buttery croissant, smoked salmon and herb cream.",
    image: "/images/qahwa-cup.png",
  },
  {
    id: "egg-toast",
    name: "Egg and Cheese Toast",
    category: "Brunch",
    price: 1400,
    description: "Egg, melted cheese and toasted country bread.",
    image: "/images/qahwa-paper.png",
  },
  {
    id: "matcha-fondant",
    name: "Matcha Fondant",
    category: "Dessert",
    price: 800,
    description: "Warm matcha centre with a delicate baked shell.",
    image: "/images/matcha-grades.png",
  },
  {
    id: "sea-salt-cookie",
    name: "Chocolate Sea Salt Cookie",
    category: "Dessert",
    price: 650,
    description: "Dark chocolate, soft centre and sea salt.",
    image: "/images/qahwa-cup.png",
  },
];

export const merchItems = [
  { id: "orange-cup", name: "Orange Latte Cup", price: 4500, image: "/images/qahwa-cup.png", note: "QAHWA mark, 280 ml" },
  { id: "jute-tote", name: "Jute Tote Bag", price: 2800, image: "/images/qahwa-paper.png", note: "Natural jute, reinforced handle" },
  { id: "discovery-box", name: "Discovery Box", price: 6900, image: "/images/qahwa-drink.png", note: "Three house coffee profiles" },
  { id: "matcha-kit", name: "Matcha Ritual Kit", price: 8200, image: "/images/matcha-grades.png", note: "Bowl, whisk and ceremonial matcha" },
];

export const formatDzd = (value: number) => `${value.toLocaleString("fr-DZ")} DZD`;
