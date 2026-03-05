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
                heading: "Cormorant Garamond, serif",
                paragraph: "EB Garamond, serif",
                label: "Jost, sans-serif",
                mono: "Space Mono, monospace"
            },
            spacing: {
                section: '150px',
                'section-gap': '100px',
            },
            maxWidth: {
                'content': '1150px',
            },
            colors: {
                // Primary backgrounds - Private equity + AI lab aesthetic
                'navy-dark': '#0F1720',
                'slate-deep': '#1C2430',
                
                // Typography - Soft ivory
                'ivory-primary': '#F4F1EA',
                'ivory-body': 'rgba(244,241,234,0.75)',
                
                // Accents - Muted antique gold
                'gold-antique': '#A8843B',
                
                // Dividers
                'divider': 'rgba(255,255,255,0.08)',
                
                // Card background
                'card-bg': 'rgba(255,255,255,0.02)',
                
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
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(14px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
