import { AppState } from './store';
export const selectContentData = (state: AppState) => state.contentReducer;