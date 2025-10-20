export interface Product {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  category: ProductCategory;
}

export enum ProductCategory {
  All = 'all',
  TShirt = 't-shirt',
  Hoodie = 'hoodie',
  Jacket = 'jacket',
  Shoe = 'shoe',
  Accessory = 'accessory',
  Dress = 'dress',
}

export interface ProductSelection {
  size: string;
  color: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Adidas CoreFit T-Shirt',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 39.9,
    sizes: ['s', 'm', 'l', 'xl', 'xxl'],
    colors: ['gray', 'purple', 'green'],
    images: {
      gray: '/products/1g.png',
      purple: '/products/1p.png',
      green: '/products/1gr.png',
    },
    category: ProductCategory.TShirt,
  },
  {
    id: 2,
    name: 'Puma Ultra Warm Zip',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['gray', 'green'],
    images: { gray: '/products/2g.png', green: '/products/2gr.png' },
    category: ProductCategory.Hoodie,
  },
  {
    id: 3,
    name: 'Nike Air Essentials Pullover',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['s', 'm', 'l'],
    colors: ['green', 'blue', 'black'],
    images: {
      green: '/products/3gr.png',
      blue: '/products/3b.png',
      black: '/products/3bl.png',
    },
    category: ProductCategory.Hoodie,
  },
  {
    id: 4,
    name: 'Nike Dri Flex T-Shirt',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 29.9,
    sizes: ['s', 'm', 'l'],
    colors: ['white', 'pink'],
    images: { white: '/products/4w.png', pink: '/products/4p.png' },
    category: ProductCategory.TShirt,
  },
  {
    id: 5,
    name: 'Under Armour StormFleece',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 49.9,
    sizes: ['s', 'm', 'l'],
    colors: ['red', 'orange', 'black'],
    images: {
      red: '/products/5r.png',
      orange: '/products/5o.png',
      black: '/products/5bl.png',
    },
    category: ProductCategory.Hoodie,
  },
  {
    id: 6,
    name: 'Nike Air Max 270',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['40', '42', '43', '44'],
    colors: ['gray', 'white'],
    images: { gray: '/products/6g.png', white: '/products/6w.png' },
    category: ProductCategory.Shoe,
  },
  {
    id: 7,
    name: 'Nike Ultraboost Pulse ',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 69.9,
    sizes: ['40', '42', '43'],
    colors: ['gray', 'pink'],
    images: { gray: '/products/7g.png', pink: '/products/7p.png' },
    category: ProductCategory.Shoe,
  },
  {
    id: 8,
    name: 'Levi’s Classic Denim',
    shortDescription: 'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    description:
      'Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.',
    price: 59.9,
    sizes: ['s', 'm', 'l'],
    colors: ['blue', 'green'],
    images: { blue: '/products/8b.png', green: '/products/8gr.png' },
    category: ProductCategory.Jacket,
  },
];
