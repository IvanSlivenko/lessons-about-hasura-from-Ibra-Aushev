export interface Sneakers {
  id: string;
  title: string;
  price: number;
  imange_url: string;
}

export interface Items {
  items: Sneakers[];
}
