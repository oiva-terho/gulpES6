import news from "../../data/news.json";
import footerLinks from "../../data/footer-links.json";
import process from "process";

const isProd = process.argv.includes('--prod');
const isDev = !process.argv.includes('--prod');

export const app = {
    isProd: isProd,
    isDev: isDev,
    htmlmin: {
        collapseWhitespace: isProd
    },
    pug: {
        pretty: isDev,
        data: {
            news: news,
            footerLinks: footerLinks
        }
    },
    webpack: {
        mode: isProd ? "production" : "development" 
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ["ttf", "woff", "svg"]
    },
    svgSprite: {
        mode: {
            stack: {
                sprite: `../img/icons.svg`,
                example: true
            }
        }
    }
};