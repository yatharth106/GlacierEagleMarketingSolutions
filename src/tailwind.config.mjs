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
                // Primary backgrounds - Private equity + AI lab aesthetic
                'navy-dark': '#0F1720',
                'slate-deep': '#1C2430',
                
                // Typography - Soft ivory
                'ivory-primary': '#F4F1EA',
                
                // Accents - Muted antique gold
                'gold-antique': '#C6A75E',
                
                // CTA buttons - Burnished bronze
                'bronze-burnished': '#A8843B',
                
                // Data visuals & strategic highlights - Deep forest emerald
                'emerald-forest': '#1F3A33',
                
                // Legacy mappings for compatibility
                stone: '#D3CFC6',
                charcoal: '#0F1720',
                ivory: '#F4F1EA',
                destructive: '#E53935',
                'destructive-foreground': '#FFFFFF',
                background: '#0F1720',
                secondary: '#1C2430',
                foreground: '#F4F1EA',
                'secondary-foreground': '#F4F1EA',
                'primary-foreground': '#F4F1EA',
                primary: '#A8843B'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
