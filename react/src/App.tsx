import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CssPage from './react-css/CssPage';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <CssPage />
            </RecoilRoot>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default App;
