// src/data/products.js

// -------------------------------
// PRODUCT LIST
// -------------------------------
export const products = [
  {
    id: 'prod_1',
    slug: 'peptide-glazing-fluid',
    name: 'Peptide Glazing Fluid',
    price: 29.0,
    image:
      'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/PGF_PDP_Primary_1000x.jpg',
    hoverImage:
      'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-1_1000x.jpg',
    images: [
      // optional extra images
    ],
    description: 'The dewy hydration layer...',
    howToUse: 'After cleansing...',
    ingredients: [
      'Niacinamide',
      'Peptides',
      'Hyaluronic Acid',
      'Squalane',
      'Glycerin',
    ],
    tags: ['featured', 'hero', 'hydration'],
    concerns: ['dryness', 'dullness', 'sensitivity'],
  },

  {
    id: 'prod_2',
    slug: 'barrier-restore-cream',
    name: 'Barrier Restore Cream',
    price: 29.0,
    image:
      'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/BRC_PDP_Primary_21bc391a-7b56-4b0a-8692-0b162aaa9522_1000x.jpg',
    hoverImage:
      'https://cdn.shopify.com/s/files/1/0617/3998/1814/files/rhode-pdp-brc-secondary-carousel-2_1000x.jpg',
    images: [],
    description: 'A rich yet lightweight moisturizer...',
    ingredients: ['Peptides', 'Ceramides', 'Shea Butter', 'Squalane'],
    tags: ['featured', 'bestseller', 'moisturizer'],
    concerns: ['dryness', 'anti-aging', 'sensitivity'],
  },

  {
    id: 'prod_3',
    slug: 'peptide-lip-treatment',
    name: 'Peptide Lip Treatment',
    price: 16.0,
    image: '',
    hoverImage: '',
    images: [],
    description: '',
    ingredients: [],
    tags: ['lips', 'bestseller', 'featured'],
    concerns: ['dryness', 'sensitivity'],
  },
];

// -------------------------------
// HELPER FUNCTIONS
// -------------------------------

// Get product by ID (string)
export const getProductById = (id) =>
  products.find((p) => p.id === id);

// All featured products
export const getFeaturedProducts = () =>
  products.filter((p) => p.tags?.includes('featured'));

// Top N bestsellers (default 4)
export const getBestSellers = (n = 4) =>
  products.filter((p) => p.tags?.includes('bestseller')).slice(0, n);

// Smart hero product selector:
// → Prefer hero → else "new" → else featured → else fallback first product
export const getHeroProduct = () =>
  products.find((p) => p.tags?.includes('hero') || p.tags?.includes('new')) ||
  products.find((p) => p.tags?.includes('featured')) ||
  products[0];
