import { ADD_TO_COMPARE, DELETE_COMPARE, EMPTY_COMPARE } from './types';

export const addToCompare = (compare) => {
  return {
    type: ADD_TO_COMPARE,
    compare: compare
  }
};


export const deleteCompare = (id) => {
  return {
    type: DELETE_COMPARE,
    id: id
  }
}

export const emptyCompare = () => {
  return {
    type: EMPTY_COMPARE
  }
}

