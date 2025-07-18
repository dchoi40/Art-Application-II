// import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layouts';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
    return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          const res = await fetch(url);

          // If the status code is not in the range 200-299, throw an error
          if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            // Attach additional information to the error object
            error.info = await res.json();
            error.status = res.status;
            throw error;
          }

          // Return the parsed JSON response
          return res.json();
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
