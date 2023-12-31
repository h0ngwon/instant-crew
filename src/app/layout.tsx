'use client';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import './reset.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Instant crew',
//     description: '모임을 통해 새로운 친구를 만나보세요!',
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`;
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <html lang='kr'>
                    <head>
                        <head>
                            <Script src={KAKAO_SDK_URL} />
                        </head>
                    </head>
                    <body>
                        <section>
                            <Header />
                            {children}
                        </section>
                    </body>
                </html>
            </RecoilRoot>
        </QueryClientProvider>
    );
}
