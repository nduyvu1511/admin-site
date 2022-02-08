export interface ItemDropdown {
  title: string | number;
  value?: any;
  id: number;
}

export interface IDropdown {
  list: ItemDropdown[];
  handleClick: Function;
  heading?: string;
}
