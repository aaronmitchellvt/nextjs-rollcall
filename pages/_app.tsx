import "./global.css";
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "./page";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; 

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
  },
});


function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {

  // Create a new supabase browser client on every first render.
const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
