import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Instant crew',
    description: '모임을 통해 새로운 친구를 만나보세요!',
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_KEY}&autoload=false`;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                <Script src={KAKAO_SDK_URL} strategy='beforeInteractive' />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
