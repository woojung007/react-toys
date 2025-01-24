import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Register from 'one-bite/Register';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Register />
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default App;
