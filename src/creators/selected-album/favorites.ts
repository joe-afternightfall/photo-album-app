import { ActionTypes } from '../actions';

export interface ToggleFavoritesAction {
  type: ActionTypes.TOGGLE_FAVORITES;
  displayFavorites: boolean;
}

export const displayFavorites = (): ToggleFavoritesAction => {
  return {
    type: ActionTypes.TOGGLE_FAVORITES,
    displayFavorites: true,
  };
};

export const clearFavorites = (): ToggleFavoritesAction => {
  return {
    type: ActionTypes.TOGGLE_FAVORITES,
    displayFavorites: false,
  };
};
