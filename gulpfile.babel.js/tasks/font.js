import gulp from "gulp";
import fs from "fs";
// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// Plugins
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

// Fonts processing
const otfToTtf = () => {
    return gulp.src(`${path.pathSrc}/font/*.otf`)
        .pipe(fonter({ formats: ['ttf'] }))
        .pipe(gulp.dest(`${path.pathSrc}/font/`)); 
};

const ttfToWoff = () => {
    return gulp.src(path.font.src)
        .pipe(plug.plumber(plug.notify.onError({
            title: "Font",
            message: "Error <%= error.message %>"
        })))
        .pipe(fonter(app.fonter))
        .pipe(plug.newer(path.font.dest))
        .pipe(gulp.dest(path.font.dest))
        .pipe(gulp.src(path.font.src))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.font.dest));
};

const fontStyle = () => {
    const fontsFile = `${path.pathSrc}/sass/parts/_fonts.scss`;
    fs.readdir(path.font.src, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else { fontWeight = 400; }
                        fs.appendFile(fontsFile,
                            `@font-face {
                                \n\tfont-family: ${fontName};
                                \n\tfont-display: swap;
                                \n\tsrc: url("../fonts/${fontFileName}.woff2") format ("woff2"),
                                url("../fonts/${fontFileName}.woff") format ("woff"),
                                url("../fonts/${fontFileName}.ttf") format ("ttf");
                                \n\tfont-weight: ${fontWeight};
                                \n\tfont-style: normal;\n
                            }\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log('File scss/fonts.scss already exists. Remove it to update.');
            }
        }
    });
    return gulp.src(`${path.pathSrc}`);
    function cb() {}
};
export const font = gulp.series(otfToTtf, ttfToWoff, fontStyle);