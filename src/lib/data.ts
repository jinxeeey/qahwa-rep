export const menuCategories = [
  "All",
  "Classics",
  "Signature",
  "Matcha",
  "Hojicha",
  "Non-coffee",
  "Smoothies",
  "Fresh juices",
  "Bakery",
  "Small plates",
] as const;

export type MenuCategory = Exclude<(typeof menuCategories)[number], "All">;

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  featured?: boolean;
  matcha?: boolean;
};

const coffeeImage = "/images/qahwa-cup.png";
const brightImage = "/images/qahwa-drink.png";
const icedImage = "/images/qahwa-ice.png";
const foodImage = "/images/qahwa-paper.png";
const matchaImage = "/images/matcha-grades.png";

export const menuItems: MenuItem[] = [
  { id: "espresso", name: "Espresso", category: "Classics", price: 350, description: "A concentrated shot of Ethiopian 100% Arabica with a clean, aromatic finish.", image: coffeeImage },
  { id: "double", name: "Double", category: "Classics", price: 500, description: "Two espresso shots for a fuller body and a longer coffee finish.", image: coffeeImage },
  { id: "americano", name: "Americano", category: "Classics", price: 450, description: "Espresso lengthened with hot water for a smooth, balanced cup.", image: coffeeImage },
  { id: "latte", name: "Latte", category: "Classics", price: 550, description: "Espresso with steamed milk and a light layer of microfoam.", image: coffeeImage },
  { id: "cappuccino", name: "Cappuccino", category: "Classics", price: 500, description: "Espresso, steamed milk and generous foam in equal balance.", image: coffeeImage },
  { id: "flat-white", name: "Flat White", category: "Classics", price: 650, description: "Double espresso with carefully textured milk and a velvety finish.", image: coffeeImage, featured: true },
  { id: "mocha", name: "Mocha", category: "Classics", price: 700, description: "Espresso and chocolate folded into steamed milk.", image: coffeeImage },
  { id: "cortado", name: "Cortado", category: "Classics", price: 550, description: "A short espresso softened with an equal pour of warm milk.", image: coffeeImage },
  { id: "v60", name: "Drip V60", category: "Classics", price: 600, description: "Hand-poured filter coffee with clarity, sweetness and a lighter body.", image: coffeeImage },
  { id: "spanish-latte", name: "Spanish Latte", category: "Classics", price: 650, description: "Espresso and milk with a restrained touch of sweetness.", image: coffeeImage },

  { id: "pistachio-spanish", name: "Pistachio Spanish Latte", category: "Signature", price: 900, description: "Sweet Spanish latte layered with roasted pistachio cream.", image: brightImage, featured: true },
  { id: "salted-caramel", name: "Salted Caramel Latte", category: "Signature", price: 750, description: "Espresso, milk and caramel balanced with a pinch of salt.", image: brightImage },
  { id: "iced-mint-chocolate", name: "Iced Mint Chocolate", category: "Signature", price: 750, description: "Chilled chocolate and milk with a cool mint finish.", image: icedImage },
  { id: "honey-rosemary", name: "Honey Rosemary Latte", category: "Signature", price: 700, description: "Espresso sweetened with honey and a soft rosemary aroma.", image: brightImage },
  { id: "tiramisu-latte", name: "Tiramisu Latte", category: "Signature", price: 900, description: "A creamy espresso drink inspired by cocoa-dusted tiramisu.", image: coffeeImage },
  { id: "orange-tonic", name: "Orange Espresso Tonic", category: "Signature", price: 750, description: "Bright orange, sparkling tonic and a clean espresso finish.", image: icedImage },
  { id: "white-chocolate-mocha", name: "White Chocolate Mocha", category: "Signature", price: 800, description: "Espresso and milk rounded with smooth white chocolate.", image: brightImage },
  { id: "tonka-latte", name: "Tonka Latte", category: "Signature", price: 900, description: "Espresso and milk with fragrant tonka bean notes.", image: coffeeImage },
  { id: "qahwa-affogato", name: "Qahwa Affogato", category: "Signature", price: 950, description: "Vanilla ice cream finished with a fresh espresso pour.", image: coffeeImage },
  { id: "speculoos-latte", name: "Speculoos Latte", category: "Signature", price: 750, description: "Espresso, milk and spiced biscuit cream.", image: brightImage },
  { id: "vanilla-maple", name: "Vanilla Maple Latte", category: "Signature", price: 900, description: "Vanilla and maple bring soft sweetness to espresso and milk.", image: coffeeImage },
  { id: "cookie-cinnamon", name: "Cookie Cinnamon Latte", category: "Signature", price: 750, description: "A warm cinnamon latte with a buttery cookie note.", image: brightImage },
  { id: "black-sesame-latte", name: "Black Sesame Latte", category: "Signature", price: 850, description: "Nutty black sesame blended with milk and espresso.", image: coffeeImage },
  { id: "peanut-mocha", name: "Peanut Mocha", category: "Signature", price: 850, description: "Chocolate espresso with roasted peanut richness.", image: brightImage },

  { id: "matcha-latte", name: "Matcha Latte", category: "Matcha", price: 900, description: "Uji ceremonial-grade matcha whisked with your choice of milk, hot or iced.", image: matchaImage, featured: true, matcha: true },
  { id: "vanilla-matcha", name: "Vanilla Matcha", category: "Matcha", price: 950, description: "Matcha and milk softened with aromatic vanilla.", image: matchaImage, matcha: true },
  { id: "strawberry-matcha", name: "Strawberry Matcha", category: "Matcha", price: 1000, description: "Ceremonial matcha layered with strawberry and fresh milk.", image: brightImage, matcha: true },
  { id: "rose-matcha", name: "Rose Matcha", category: "Matcha", price: 950, description: "Matcha latte with a delicate floral rose note.", image: matchaImage, matcha: true },
  { id: "pistachio-matcha", name: "Pistachio Matcha", category: "Matcha", price: 950, description: "Earthy matcha paired with roasted pistachio cream.", image: matchaImage, matcha: true },
  { id: "jasmin-matcha", name: "Jasmin Matcha", category: "Matcha", price: 950, description: "Ceremonial matcha with a fragrant jasmine finish.", image: matchaImage, matcha: true },
  { id: "affogato-matcha", name: "Affogato Matcha", category: "Matcha", price: 1100, description: "Vanilla ice cream topped with a concentrated matcha pour.", image: matchaImage, matcha: true },
  { id: "sparkling-yuzu-matcha", name: "Sparkling Yuzu Matcha", category: "Matcha", price: 1100, description: "Matcha, sparkling water and bright Japanese yuzu citrus.", image: icedImage, matcha: true },
  { id: "white-chocolate-matcha", name: "White Chocolate Matcha", category: "Matcha", price: 1100, description: "Matcha latte with a creamy white chocolate finish.", image: matchaImage, matcha: true },
  { id: "maple-matcha", name: "Maple or Agave Matcha", category: "Matcha", price: 1000, description: "Matcha sweetened to order with maple or agave.", image: matchaImage, matcha: true },
  { id: "tropical-matcha", name: "Iced Tropical Matcha", category: "Matcha", price: 1000, description: "Iced matcha lifted with a bright tropical fruit layer.", image: icedImage, matcha: true },
  { id: "cloud-matcha", name: "Cloud Matcha", category: "Matcha", price: 950, description: "Iced matcha finished with a soft vanilla milk cloud.", image: icedImage, matcha: true },
  { id: "dirty-matcha", name: "Dirty Matcha", category: "Matcha", price: 1200, description: "Matcha latte with an espresso shot for a deeper roasted edge.", image: coffeeImage, matcha: true },
  { id: "berry-matcha", name: "Raspberry or Blueberry Matcha", category: "Matcha", price: 1200, description: "Matcha layered with your choice of raspberry or blueberry.", image: brightImage, matcha: true },

  { id: "hojicha-latte", name: "Hojicha Latte", category: "Hojicha", price: 900, description: "Roasted Japanese green tea from Yame with milk and a nutty aroma.", image: coffeeImage, featured: true },
  { id: "vanilla-hojicha", name: "Vanilla Hojicha", category: "Hojicha", price: 950, description: "Roasted hojicha and milk with soft vanilla sweetness.", image: coffeeImage },
  { id: "strawberry-hojicha", name: "Strawberry Hojicha", category: "Hojicha", price: 1000, description: "Roasted tea layered with strawberry and chilled milk.", image: brightImage },
  { id: "sparkling-yuzu-hojicha", name: "Sparkling Yuzu Hojicha", category: "Hojicha", price: 1100, description: "Roasted green tea, sparkling water and yuzu citrus.", image: icedImage },
  { id: "tropical-hojicha", name: "Iced Tropical Hojicha", category: "Hojicha", price: 1000, description: "Chilled roasted tea with a tropical fruit finish.", image: icedImage },
  { id: "affogato-hojicha", name: "Affogato Hojicha", category: "Hojicha", price: 1100, description: "Vanilla ice cream topped with concentrated roasted hojicha.", image: coffeeImage },
  { id: "black-sesame-hojicha", name: "Black Sesame Hojicha", category: "Hojicha", price: 1200, description: "Roasted tea and milk with a deep black sesame note.", image: coffeeImage },

  { id: "ube-latte", name: "Organic Ube Latte", category: "Non-coffee", price: 900, description: "Creamy purple yam blended with milk, served hot or iced.", image: brightImage },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "Non-coffee", price: 700, description: "Rich chocolate steamed with milk for a smooth cup.", image: coffeeImage },
  { id: "chai-latte", name: "Chai Latte", category: "Non-coffee", price: 650, description: "Black tea, warm spices and steamed milk.", image: coffeeImage },
  { id: "black-tea", name: "Sri Lanka Black Tea", category: "Non-coffee", price: 500, description: "A clean, full-bodied black tea with a brisk finish.", image: coffeeImage },
  { id: "organic-infusion", name: "Organic Infusions", category: "Non-coffee", price: 450, description: "Ask the team for today’s caffeine-free herbal selection.", image: foodImage },
  { id: "dirty-chai", name: "Dirty Chai Latte", category: "Non-coffee", price: 750, description: "Spiced chai latte strengthened with one espresso shot.", image: coffeeImage },
  { id: "iced-tea", name: "Iced Tea", category: "Non-coffee", price: 700, description: "Cold-brewed tea in peach, berry or tropical fruit.", image: icedImage },
  { id: "classic-mojito", name: "Classic Mojito", category: "Non-coffee", price: 750, description: "Lime, mint and sparkling water served over ice.", image: icedImage },
  { id: "strawberry-mojito", name: "Strawberry Mojito", category: "Non-coffee", price: 800, description: "Strawberry, lime, mint and sparkling water.", image: brightImage },
  { id: "banana-milkshake", name: "Banana Milkshake", category: "Non-coffee", price: 800, description: "A thick, chilled banana and milk blend.", image: brightImage },
  { id: "flavoured-milkshake", name: "Chocolate or Strawberry Milkshake", category: "Non-coffee", price: 850, description: "A creamy milkshake in chocolate or strawberry.", image: brightImage },
  { id: "house-soda", name: "House Soda", category: "Non-coffee", price: 650, description: "Sparkling rose, lychee, berry or peach soda.", image: icedImage },

  { id: "mango-matcha-boost", name: "Mango Matcha Boost", category: "Smoothies", price: 1300, description: "Matcha, mango and banana blended until smooth.", image: matchaImage, matcha: true },
  { id: "peanut-espresso", name: "Peanut Espresso", category: "Smoothies", price: 1200, description: "Espresso, banana and roasted peanut blended with milk.", image: coffeeImage },
  { id: "green-boost", name: "Green Boost", category: "Smoothies", price: 1000, description: "Spinach, lemon and banana in a fresh green blend.", image: matchaImage },
  { id: "blue-glow", name: "Blue Glow", category: "Smoothies", price: 1000, description: "Banana, blueberry and vanilla blended cold.", image: brightImage },
  { id: "drink-your-salad", name: "Drink Your Salad", category: "Smoothies", price: 850, description: "Spinach, lemon, apple and mint in a crisp green blend.", image: matchaImage },
  { id: "strawberry-oat", name: "Strawberry Oat", category: "Smoothies", price: 1300, description: "Strawberry, oat and banana blended into a creamy smoothie.", image: brightImage },
  { id: "ginger-shot", name: "Ginger Shot", category: "Smoothies", price: 350, description: "A small, sharp pressed ginger shot.", image: icedImage },
  { id: "beetroot-shot", name: "Beetroot Shot", category: "Smoothies", price: 350, description: "A compact beetroot and citrus shot.", image: brightImage },

  { id: "qahwa-glow", name: "Qahwa Glow", category: "Fresh juices", price: 850, description: "Orange, carrot and ginger pressed fresh.", image: brightImage },
  { id: "back-to-root", name: "Back-To-Root", category: "Fresh juices", price: 850, description: "Beetroot, lemon and apple with a bright earthy finish.", image: brightImage },
  { id: "green-detox", name: "Green Detox", category: "Fresh juices", price: 850, description: "Cucumber, celery and lemon pressed to order.", image: matchaImage },
  { id: "qahwa-clean", name: "Qahwa Clean", category: "Fresh juices", price: 800, description: "Apple, lemon and cinnamon in a crisp house juice.", image: icedImage },
  { id: "citrus-burst", name: "Citrus Burst", category: "Fresh juices", price: 800, description: "Banana, orange and lemon blended for a sunny citrus finish.", image: brightImage },
  { id: "seasonal-juice", name: "Seasonal Juice", category: "Fresh juices", price: 700, description: "Today’s market fruit, prepared fresh by the bar team.", image: brightImage },

  { id: "pistachio-cookie", name: "Pistachio Cookie", category: "Bakery", price: 600, description: "Soft-baked cookie with roasted pistachio pieces.", image: foodImage },
  { id: "brookie", name: "Valrhona Sea Salt Brookie", category: "Bakery", price: 650, description: "Brownie-cookie with Valrhona chocolate and sea salt.", image: foodImage, featured: true },
  { id: "matcha-cookie", name: "White Chocolate Matcha Cookie", category: "Bakery", price: 700, description: "Matcha cookie with creamy white chocolate pieces.", image: matchaImage },
  { id: "black-sesame-cookie", name: "Black Sesame Cookie", category: "Bakery", price: 650, description: "Nutty black sesame baked into a soft-centred cookie.", image: foodImage },
  { id: "cinnamon-roll", name: "Cinnamon Roll", category: "Bakery", price: 450, description: "Soft rolled pastry with cinnamon sugar.", image: foodImage },
  { id: "warm-brownie", name: "Warm Brownie and Ice Cream", category: "Bakery", price: 900, description: "Warm brownie, vanilla ice cream and caramel drizzle.", image: foodImage },
  { id: "banana-bread", name: "Banana Bread", category: "Bakery", price: 600, description: "Moist banana loaf served by the slice.", image: foodImage },
  { id: "lemon-cake", name: "Lemon Cake", category: "Bakery", price: 450, description: "Tender lemon cake with a clean citrus finish.", image: foodImage },
  { id: "butter-croissant", name: "Croissant au Beurre", category: "Bakery", price: 300, description: "Classic flaky butter croissant baked for the day.", image: foodImage },
  { id: "almond-croissant", name: "Almond Croissant", category: "Bakery", price: 500, description: "Butter croissant filled and topped with almond cream.", image: foodImage },
  { id: "carrot-bread", name: "Carrot Bread", category: "Bakery", price: 550, description: "Soft spiced carrot loaf served by the slice.", image: foodImage },

  { id: "quiche", name: "Chicken or Spinach Quiche", category: "Small plates", price: 450, description: "Buttery savoury tart with chicken or spinach filling.", image: foodImage },
  { id: "chicken-croissant", name: "Crispy Chicken Croissant", category: "Small plates", price: 1100, description: "Crisp croissant filled with artisanal chicken and cheese.", image: foodImage },
  { id: "chicken-focaccia", name: "Chicken Focaccia", category: "Small plates", price: 1200, description: "Chicken, lemon, tomato and mozzarella in toasted focaccia.", image: foodImage },
  { id: "avocado-egg-toast", name: "Avocado, Cheese and Egg Toast", category: "Small plates", price: 1100, description: "Toasted bread layered with avocado, cheese and egg.", image: foodImage },
  { id: "granola-bowl", name: "Granola Bowl", category: "Small plates", price: 1000, description: "Crunchy granola with yoghurt and seasonal fruit.", image: foodImage },
];

export const teaGuides = [
  {
    id: "matcha",
    title: "Matcha",
    subtitle: "Shaded Japanese green tea, stone-milled and whisked whole",
    notes: ["Vegetal, creamy and umami-led", "Usually the more caffeinated choice", "Whole-leaf preparation gives a fuller tea profile"],
  },
  {
    id: "hojicha",
    title: "Hojicha",
    subtitle: "Japanese green tea roasted at high heat",
    notes: ["Toasty, nutty and naturally less astringent", "Often lower in caffeine, depending on leaf and preparation", "A gentler-tasting alternative when matcha feels too grassy"],
  },
];

export const merchItems = [
  { id: "orange-cup", name: "Orange Latte Cup", price: 4500, image: coffeeImage, note: "QAHWA mark, 280 ml" },
  { id: "jute-tote", name: "Jute Tote Bag", price: 2800, image: foodImage, note: "Natural jute, reinforced handle" },
  { id: "discovery-box", name: "Discovery Box", price: 6900, image: brightImage, note: "Three house coffee profiles" },
  { id: "matcha-kit", name: "Matcha Ritual Kit", price: 8200, image: matchaImage, note: "Bowl, whisk and ceremonial matcha" },
];

export const formatDzd = (value: number) => `${value.toLocaleString("fr-DZ")} DZD`;
