import "./global.css";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools />
      </QueryClientProvider>
  );
}

export default MyApp;
