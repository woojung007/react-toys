import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainProducts from 'React-23/libraries/query/components/MainProducts';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <MainProducts />
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default App;
