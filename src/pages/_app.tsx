import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ErrorBoundary>
  );
}