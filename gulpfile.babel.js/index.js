import gulp from "gulp";

// Configuration
import { path } from "./config/path.js";
import { app } from "./config/app.js";
import { plug } from "./config/plugins.js";

// Tasks
import { clear } from "./tasks/clear.js";
import { pug } from "./tasks/pug.js";
import { sass } from "./tasks/sass.js";
import { js } from "./tasks/js.js";
import { img } from "./tasks/img.js";
import { font } from "./tasks/font.js";
import { svg } from "./tasks/svg.js";

// Server
const server= () => {
    plug.browserSync
    .init({
        server: {
            baseDir: path.root
        }
    });
};

// Watcher
const watcher = () => {
    gulp.watch(path.pug.watch, pug).on("all", plug.browserSync.reload);
    gulp.watch(path.sass.watch, sass).on("all", plug.browserSync.reload);
    gulp.watch(path.js.watch, js).on("all", plug.browserSync.reload);
    gulp.watch(path.img.watch, img).on("all", plug.browserSync.reload);
};

const build = gulp.series(
    // font,
    clear,
    gulp.parallel(pug, sass, js, img)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

// Tasks
export { pug };
export { sass };
export { watcher };
export { js };
export { img };
export { font };
export { svg };

// Compile
export { build };
export { dev };
export default dev;
