import ID from './ID';
import IList from './IList';
import IUser from './IUser';

export default interface IBoard {
  id: ID;
  title: string;
  lists: IList[];
  user: IUser[];
}
