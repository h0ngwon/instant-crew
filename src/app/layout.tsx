'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './globals.css';
import Header from '@/components/Header';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <html lang='kr'>
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
