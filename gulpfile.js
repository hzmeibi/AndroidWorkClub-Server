var path = require('path');
var gulp = require('gulp'),
    clean = require("gulp-clean"),//清空文件夹
    rename = require('gulp-rename'),//重命名文件
    uglify = require("gulp-uglify"),//压缩js
    minifyCss = require("gulp-minify-css"),//压缩css
    minifyHtml = require("gulp-minify-html"),//压缩html
    concat = require("gulp-concat"), //多文件合并为一个
    processhtml = require("gulp-processhtml"), //标记的内容,替换指定的文本
    replace = require("gulp-replace"), //文本替换
    rev = require('gulp-rev'),//- 对文件名加MD5后缀
    revColletor = require('gulp-rev-collector'), //生成md5后替换对应的文件名
    autoprefixer = require('gulp-autoprefixer'), //自动加前缀
    spriter_css = require('gulp-css-spriter'), //雪碧图
    spriter = require('gulp-spriter'), //雪碧图
    sftp = require('gulp-sftp'), //上传到sftp
    tap = require('gulp-tap'),//遍历所有找到的文件
    livereload = require('gulp-livereload');


var config = {
    buildPath: "pictureAir",
    revPathCSS: "static/rev/revCSS",
    revPathJS: "static/rev/revJS"
}

//构建目录清理
gulp.task("clean", function (done) {
    //return cache.clearAll(done);
    return gulp.src(config.buildPath, {
        read: false
    })
        .pipe(clean({force: true}));
})

//首先把不需要用到的先拷贝到文件夹内   需要用到的 通过后面的压缩 然后时制定到路径
gulp.task('filecopy', function () {
    gulp.src(['static/**/*.*', '!static/**/*.html', '!static/**/*.css', '!static/**/*.js', '!static/**/*.scss', '!static/**/*.less', '!static/**/*.map']) //,'!static/**/*.html'
        .pipe(gulp.dest(config.buildPath))

    gulp.src(['static/js/libs/jquery-airditor/jquery-airditor.js'], {base: 'static'}) //,'!static/**/*.html'
        .pipe(gulp.dest(config.buildPath))
})


gulp.task('minify-js', function () {
    gulp.src(['static/**/*.js']) // 要压缩的js文件 ,'!static/js/controller/root.js'
        .pipe(uglify({mangle: true})) //false 保留原始变量名
        .pipe(gulp.dest(config.buildPath)); //压缩后的路径
});


gulp.task('minify-md5-css', function () {                                //- 创建一个名为 concat 的 task
    gulp.src(['static/**/*.css'])                                 //- 需要处理的css文件，放到一个字符串数组里
        //.pipe(concat('wap.min.css'))                          //- 合并后的文件名
        // .pipe(uglify())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(minifyCss())
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(config.buildPath))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(config.revPathCSS));                              //- 将 rev-manifest.json 保存到 rev 目录内
});


gulp.task('minify-md5-js', function () {                                //- 创建一个名为 concat 的 task
    gulp.src(['static/**/*.js', '!static/js/libs/jquery-airditor/jquery-airditor.js'])                                 //- 需要处理的css文件，放到一个字符串数组里
        //.pipe(concat('wap.min.css'))                          //- 合并后的文件名
        .pipe(uglify())                                      //- 压缩处理成一行
        .pipe(rev())                                            //- 文件名加MD5后缀
        .pipe(gulp.dest(config.buildPath))                               //- 输出文件本地
        .pipe(rev.manifest())                                   //- 生成一个rev-manifest.json
        .pipe(gulp.dest(config.revPathJS));                              //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('replace-minify-html', function () {
    gulp.src(['static/rev/**/*.json', 'static/**/index.html'])      //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revColletor())                                   //- 执行文件内css名的替换
        .pipe(minifyHtml())                                     //使用gzip压缩是更好的方式
        .pipe(gulp.dest(config.buildPath));                     //- 替换后的文件输出的目录
});

gulp.task("processhtml", function () {
    var date = new Date().getTime();
    gulp.src('static/**/*.html')
        //.pipe(replace(/_VERSION_/gi, date))
        .pipe(processhtml())
        .pipe(minifyHtml()) //使用gzip压缩是更好的方式
        .pipe(gulp.dest(config.buildPath))
});

//雪碧图


gulp.task('spriter_css', function() {
    return gulp.src('./static/css/login.css')//比如recharge.css这个样式里面什么都不用改，是你想要合并的图就要引用这个样式。 很重要 注意(recharge.css)这个是我的项目。别傻到家抄我一样的。
        .pipe(spriter_css({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': './pictureAir/image/spritesheet.png', //这是雪碧图自动合成的图。 很重要
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../image/spritesheet.png' //这是在css引用的图片路径，很重要
        }))
        .pipe(gulp.dest(config.buildPath)); //最后生成出来
});


gulp.task('default', ['clean'], function () {

    gulp.start('filecopy','minify-md5-css','minify-md5-js',
        'replace-minify-html','spriter_css');
});


