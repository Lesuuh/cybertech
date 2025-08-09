export type ProductCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  price: number;
  onBuy: () => void;
  onSave: () => void;
  save: boolean;
};


export type Product = {
  id: number;
  imageSrc: string;
  name: string;
  price: number;
};