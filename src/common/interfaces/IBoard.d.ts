import ID from './ID';
import ICard from './ICard';

export default interface IBoard {
  id: ID;
  title: string;
  lists: { id: ID; title: string; cards: ICard[] }[];
}
