// import { Provider } from "react-redux";
// import { useStore } from "../store";
import "src/styles/globals.scss";
import { AnimateSharedLayout } from "framer-motion";

export default function App({ Component, pageProps }) {
  // const store = useStore(pageProps.initialReduxState);
  return (
    // <Provider store={store}>
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
    // </Provider>
  );
}
