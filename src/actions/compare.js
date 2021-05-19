import { FETCH_COMPARE, ADD_TO_COMPARE, REMOVE_COMPARE } from './types';

export const addToCompare = (product) => {
  return {
    type: ADD_TO_COMPARE,
    product: product
  }
};

export const fetchCompare = (product) => {
  return {
    type: FETCH_COMPARE,
    product: product
  }
};

export const deleteCompare = (id) => {
  return {
    type: REMOVE_COMPARE,
    id: id
  }
}
