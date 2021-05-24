import { ADD_TO_COMPARE, REMOVE_COMPARE, EMPTY_COMPARE } from './types';

export const addToCompare = (product) => {
  return {
    type: ADD_TO_COMPARE,
    product: product
  }
};


export const deleteCompare = (id) => {
  return {
    type: REMOVE_COMPARE,
    id: id
  }
}

export const emptyCompare = () => {
  return {
    type: EMPTY_COMPARE
  }
}

