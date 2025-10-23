import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppShell from "@/components/commons/AppShell";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // if change tab, do not refetch
      retry: false, // if fail, do not retry refetch
    },
  },
});

export default function App({
  Component, // page which is being rendered
  pageProps: { session, ...pageProps }, // props of the page
}: AppProps) {
  return (
    <SessionProvider session={session}> // provide session to the app
      <QueryClientProvider client={queryClient}> // provide react-query client to the app
        <HeroUIProvider>
         <AppShell>
            <Component {...pageProps} />
         </AppShell>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
