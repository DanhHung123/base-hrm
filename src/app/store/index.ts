import {configureStore} from '@reduxjs/toolkit';
export { default as StoreProvider } from './Provider';
export { default as StoreContext } from './Context';
export * from './hooks';
export * as actions from './action'

const store = configureStore({
  reducer: { },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
