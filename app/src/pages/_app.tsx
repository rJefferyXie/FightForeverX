// React + Next
import type { AppProps } from 'next/app';

// Components
import Navbar from '@/components/navbar';

// Tailwind
import '@/styles/globals.scss';

// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper, store, persistor } from "../store/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex">
          <Navbar></Navbar>
          <Component {...pageProps}/>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);