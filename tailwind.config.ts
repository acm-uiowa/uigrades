import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-dark-gray": "var(--primary-dark-gray)",
                "secondary-dark-gray": "var(--secondary-dark-gray)",
                "light-gray": "var(--light-gray)",
                "primary-medium-gray": "var(--primary-medium-gray)",
                "secondary-medium-gray": "var(--secondary-medium-gray)",
                "off-white": "var(--off-white)",
                "hawkeye-gold": "var(--hawkeye-gold)",
                "hawkeye-black": "var(--hawkeye-black)",
            },
            backgroundImage: {
                "action-border": "var(--action-border)",
            },
            fontSize: {
                "header-home-web": "clamp(2.25rem, 3.75vw, 3.5rem)",
                "header-home-mobile": "2rem",
                "header-1-web": "2.25rem",
                "header-1-mobile": "2rem",
                "header-2-web": "2rem",
                "header-2-mobile": "1.5rem",
                "subheader-web": "1.25rem",
                "subheader-mobile": "1.125rem",
                "content-normal": "1rem",
                "content-small": "0.875rem",
                "content-tiny": "0.8125rem",
            },
            fontWeight: {
                "header-home": "550",
                "header-1": "550",
                "header-2": "550",
                subheader: "500",
                content: "400",
            },
            spacing: {
                "nav-footer-web-x": "clamp(2rem, 5vw, 6rem)",
                "nav-footer-mobile-x": "2rem",
                "page-web-x": "clamp(5rem, 10vw, 8rem)",
                "page-web-y": "3.25rem",
                "page-mobile-x": "1.5rem",
                "page-mobile-y": "2rem",
                "header-page-gap": "0.75rem",
                "flex-gap-large": "2rem",
                "flex-gap-small": "1rem",
                "paragraph-gap": "0.5rem",
                "paragraph-gap-small": "0.25rem",
            },
            borderWidth: {
                "thin-1": "1px",
            },
            borderColor: {
                "primary-border-color": "var(--primary-medium-gray)",
                "primary-hover-border-color": "var(--medium-light-gray)",
            },
        },
    },
    plugins: [
        function ({ addComponents, theme }: PluginAPI) {
            addComponents({
                ".header-home-web": {
                    fontSize: theme("fontSize.header-home-web"),
                    fontWeight: theme("fontWeight.header-home"),
                },
                ".header-home-mobile": {
                    fontSize: theme("fontSize.header-home-mobile"),
                    fontWeight: theme("fontWeight.header-home"),
                },
                ".header-1-web": {
                    fontSize: theme("fontSize.header-1-web"),
                    fontWeight: theme("fontWeight.header-1"),
                },
                ".header-1-mobile": {
                    fontSize: theme("fontSize.header-1-mobile"),
                    fontWeight: theme("fontWeight.header-1"),
                },
                ".header-2-web": {
                    fontSize: theme("fontSize.header-2-web"),
                    fontWeight: theme("fontWeight.header-2"),
                },
                ".header-2-mobile": {
                    fontSize: theme("fontSize.header-2-mobile"),
                    fontWeight: theme("fontWeight.header-2"),
                },
                ".subheader-web": {
                    fontSize: theme("fontSize.subheader-web"),
                    fontWeight: theme("fontWeight.subheader"),
                },
                ".subheader-mobile": {
                    fontSize: theme("fontSize.subheader-mobile"),
                    fontWeight: theme("fontWeight.subheader"),
                },
                ".content-normal": {
                    fontSize: theme("fontSize.content-normal"),
                    fontWeight: theme("fontWeight.content"),
                },
                ".content-small": {
                    fontSize: theme("fontSize.content-small"),
                    fontWeight: theme("fontWeight.content"),
                },
                ".content-tiny": {
                    fontSize: theme("fontSize.content-tiny"),
                    fontWeight: theme("fontWegith.content"),
                },
            });
        },
    ],
} satisfies Config;
