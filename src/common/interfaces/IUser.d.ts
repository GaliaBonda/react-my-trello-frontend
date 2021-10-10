import ID from './ID';

export default interface IUser {
  id: ID;
  email: string;
  username: string = email.split('@')[0];
}
