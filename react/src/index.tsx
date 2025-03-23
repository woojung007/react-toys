import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './i18n';
import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <App />
            </RecoilRoot>

            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </BrowserRouter>,
);
