import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getCurrentLocale } from './i18n/currentLocale';

const locale = getCurrentLocale();

const client = new ApolloClient({
  uri: `http://localhost:4040/${locale}/graphql/`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
