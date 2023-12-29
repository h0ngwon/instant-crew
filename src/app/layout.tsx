'use client';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { RecoilRoot } from 'recoil';
import './globals.css';
import './reset.css';

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
    return (
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
    );
}
