/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from 'src/api';
import config from 'src/common/constants/api';
import { Dispatch } from 'redux';
import IBoard from 'src/common/interfaces/IBoard';
import IUser from 'src/common/interfaces/IUser';

export const getBoards =
  () =>
  async (
    dispatch: Dispatch,
    getState: () => {
      boards: IBoard[];
    }
  ) => {
    try {
      const data = await api.get('/board');
      // const data = await api.get('/todos');
      // const { boards } = data.data;
      await dispatch({ type: 'UPDATE_BOARDS', payload: data });
      console.log('current state:', getState());
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };

export const postBoard = () => async (dispatch: Dispatch) => {
  try {
    const board = {
      title: 'notodos',
    };

    await api.post(`/board`, board);
    await dispatch({ type: 'POST_BOARD', payload: { ...board } });
  } catch (e) {
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
