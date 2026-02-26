/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '400' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.05em', fontWeight: '600' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '700' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '700' }],
                '9xl': ['8rem', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '700' }],
            },
            fontFamily: {
                heading: "playfair display",
                paragraph: "open sans"
            },
            colors: {
                // Primary base colors - Old money aesthetic
                'charcoal-deep': '#1C1C1C',
                'charcoal-light': '#2A2A2A',
                'ivory-warm': '#F4F1EA',
                'ivory-off': '#F8F5F0',
                'stone-soft': '#B8B5AE',
                'stone-light': '#D3CFC6',
                
                // Accent colors - Discreet wealth
                'gold-muted': '#A89968',
                'gold-subtle': '#9D8E5C',
                'navy-desaturated': '#1F2A36',
                'forest-dark': '#1E2B24',
                
                // Legacy mappings for compatibility
                'muted-gold-accent': '#A89968',
                stone: '#D3CFC6',
                charcoal: '#1C1C1C',
                ivory: '#F4F1EA',
                destructive: '#E53935',
                'destructive-foreground': '#FFFFFF',
                background: '#F4F1EA',
                secondary: '#1C1C1C',
                foreground: '#1C1C1C',
                'secondary-foreground': '#F4F1EA',
                'primary-foreground': '#F4F1EA',
                primary: '#A89968'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
