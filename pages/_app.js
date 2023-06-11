import { ChakraProvider } from "@chakra-ui/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "../styles/globals.css";
import theme from "../theme/theme";
import ProtectedRoute from "../components/wrappers/ProtetctedRoute";
import AuthContextProvider from "../context/AuthContext";
import Layout from "../Layout/Layout";
import allReducers from "../redux/reducers";
import SEOTags from "../components/SEOTags";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const store = createStore(allReducers);
  const { pathname } = useRouter();

  const shouldBeAuth = pathname?.toLowerCase() !== "/login";
  const des =
    "Streamline healthcare with our centralized system. Connect with doctors, book appointments, access records, and receive personalized care. Experience efficient coordination, faster diagnosis, and improved outcomes. Join now!";

  return (
    <Provider store={store}>
      <SEOTags
        title="Med-Ethiopia Hospital"
        description={des}
        image="./logo.png"
        url="www.med-ethiopia.hospital.com"
        card="summary_large_image"
      />
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          {shouldBeAuth ? (
            <ProtectedRoute>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthContextProvider>
      </ChakraProvider>
    </Provider>
  );
}
