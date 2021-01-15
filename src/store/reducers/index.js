import { combineReducers } from 'redux';
import theme from './themeStore';
import board from "./boardStore";

export default combineReducers({ theme, board })
