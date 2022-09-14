import gulp from "gulp";

// Configuration
import { path } from "../config/path.js";
import { app } from "../config/app.js";
import { plug } from "../config/plugins.js";

// plugins
import concat from "gulp-concat";
import cssimport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
import groupMedia from "gulp-group-css-media-queries";
import webpCss from "gulp-webp-css";

// css processing
const css = () => {
    return gulp.src(path.css.src, { sourcemaps: app.isDev })
        .pipe(plug.plumber(plug.notify.onError({
            title: "CSS",
            message: "Error <%= error.message %>"
        })))
        .pipe(concat("style.css"))
        .pipe(cssimport())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupMedia())
        .pipe(size({ title: "style.css" }))
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "style.min.css" }))
        .pipe(gulp.dest(path.css.dest, { sourcemaps: app.isDev }));
};

export { css };
