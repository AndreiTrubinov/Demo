require("../styles/antd.less"); 
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { RecoilRoot } from 'recoil';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from 'next/head'


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <link rel="stylesheet" type="text/css" href="https://pagecdn.io/lib/flag-icon-css/3.5.0/css/flag-icon.min.css" />
        </Head>
        <div className="globalwrapper">
          <Component {...pageProps} />
          {/* <ReactQueryDevtools initialIsOpen /> */}
          <ReactQueryDevtools />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
