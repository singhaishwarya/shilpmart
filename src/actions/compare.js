import { ADD_TO_COMPARE, DELETE_COMPARE, EMPTY_COMPARE } from './types';

export const addToCompare = (compare) => {
  return {
    type: ADD_TO_COMPARE,
    compare: compare
  }
};


export const deleteCompare = (compare) => {
  return {
    type: DELETE_COMPARE,
    compare: compare
  }
}

export const emptyCompare = () => {
  return {
    type: EMPTY_COMPARE
  }
}

