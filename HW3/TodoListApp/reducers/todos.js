import * as types from '../constants/ActionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        items: state.items.concat([{ text: action.text, completed: false }]),
        addItemTextInputValue: ''
      };
    default:
      return state;
  }
};
