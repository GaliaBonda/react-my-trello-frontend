/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from 'src/api';
import config from 'src/common/constants/api';
import { Dispatch } from 'redux';

export const getBoard =
  (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const data = await api.get(`/board/${id}`);
      console.log('data', data);
      await dispatch({ type: 'GET_BOARD', payload: data });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'ERROR_ACTION_TYPE' });
    }
  };
