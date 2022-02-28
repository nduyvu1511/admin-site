export interface ItemDropdown {
  name: string;
  id?: number | string;
  _id?: string;
}

export interface IDropdown {
  list: ItemDropdown[];
  handleClick: Function;
  heading?: string;
  reverse?: boolean;
  itemActive?: ItemDropdown | null;
  inForm?: boolean;
}
