import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Instant crew',
    description: '모임을 통해 새로운 친구를 만나보세요!',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='kr'>
            <body>
                <section>
                    <Header />
                    {children}
                </section>
            </body>
        </html>
    );
}
