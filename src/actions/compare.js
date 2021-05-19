import { FETCH_COMPARE, ADD_COMPARE, REMOVE_COMPARE } from './types';

export const addCompare = (product) => {
  return {
    type: ADD_COMPARE,
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
