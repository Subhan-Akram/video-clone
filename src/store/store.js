import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/reducer-slice/auth'
import { combineReducers } from 'redux';
import logger from "redux-logger"
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";
// const persistConfig = {
//   key: 'root',
//   storage,
// }
const rootReducer = combineReducers({ 
  auth: counterReducer,
})
// const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer:rootReducer
,middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(logger,thunkMiddleware),

}
)

// export const persistor = persistStore(store)