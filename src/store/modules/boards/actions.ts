/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from 'src/api';
import config from 'src/common/constants/api';
import { Dispatch } from 'redux';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getBoards = () => async (dispatch: Dispatch) => {
  try {
    const data = await api.get('/board');
    // const data = await api.get('/todos');
    dispatch({ type: 'UPDATE_BOARDS', payload: data });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    dispatch({ type: 'ERROR_ACTION_TYPE' });
  }
};
