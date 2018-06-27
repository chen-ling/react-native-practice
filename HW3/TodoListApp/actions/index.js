import * as types from '../constants/ActionTypes';

export const addTodo = todo => ({
    type: types.ADD_TODO,
    todo
  });