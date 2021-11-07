import * as React from 'react';
import { createContext } from 'react';
import { userStore, postStore } from './store'

export const storeContext = createContext({
	userStore,
	postStore,
});

/*
  StoreProvider 아래에 있는 모든 컴포넌트에서
  value에 지정한 store에 접근할 수 있게 된다.
*/
export const StoreProvider = ({ children }) => {
	return (
		<storeContext.Provider value={{ userStore, postStore }}>
			{children}
		</storeContext.Provider>
	);
};
