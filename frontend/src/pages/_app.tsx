import { Provider } from "react-redux";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../Redux/store";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
