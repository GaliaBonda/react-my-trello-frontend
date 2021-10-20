import ID from './ID';

export default interface IList {
  id: ID;
  title: string;
  cards: ICard[];
}
