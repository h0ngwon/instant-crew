import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-image': 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.55));'
            },
            colors: {
                'main-background': 'var(--main-background)',
                'main-color': 'var(--main-color)',
            },
            boxShadow: {
                'main-shadow': '7px 7px 10px 0px rgba(0,0,0,0.3)',
            },
        },
    },
    plugins: [],
};
export default config;
