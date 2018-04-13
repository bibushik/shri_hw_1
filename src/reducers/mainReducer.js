import {combineReducers} from 'redux';
import {gallery} from './gallery';

export const mainReducer = combineReducers({
    gallery: gallery
});