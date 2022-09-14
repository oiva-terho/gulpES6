import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// Plugins
import fileInclude from "gulp-file-include"; 
import htmlmin from "gulp-htmlmin"; 
import size from "gulp-size";
import webpHtml from "gulp-webp-html";

// html processing
const html = () => {
    return gulp.src(path.html.src)
        .pipe(plug.plumber(plug.notify.onError({
            title: "Html",
            message: "Error <%= error.message %>"
        })))
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(size({ title: 'Before compression' }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: 'After compression' }))
        .pipe(gulp.dest(path.html.dest));
};

export { html };