import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

const EmptyLayout = ({ children }) => <>{children}</>;