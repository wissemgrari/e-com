import { ProductCategory } from '../../../features/products/models/product.model';

export type Category = {
  name: string;
  icon: string;
  slug: ProductCategory;
};

export const data: Category[] = [
  {
    name: 'All',
    icon: 'hugeShoppingBag03',
    slug: ProductCategory.All,
  },
  {
    name: 'T-shirts',
    icon: 'hugeShirt01',
    slug: ProductCategory.TShirt,
  },
  {
    name: 'Hoodies',
    icon: 'hugeHoodie',
    slug: ProductCategory.Hoodie,
  },
  {
    name: 'Jackets',
    icon: 'hugeLongSleeveShirt',
    slug: ProductCategory.Jacket,
  },
  {
    name: 'Shoes',
    icon: 'hugeRunningShoes',
    slug: ProductCategory.Shoe,
  },
  {
    name: 'Accessories',
    icon: 'hugeGlasses',
    slug: ProductCategory.Accessory,
  },
  {
    name: 'Dresses',
    icon: 'hugeDress01',
    slug: ProductCategory.Dress,
  },
];
