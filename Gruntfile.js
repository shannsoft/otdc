module.exports = function(grunt) {
    var skipConsole = false;
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // jshint: {
        //   all: [
        //     'src/app.js',
        //     'src/controller/*.js',
        //     'src/controller/**/*.js'
        //   ]
        // },
        watch: {
            scripts: {
                files: [
                    'src/modules/*.js',
                    'src/app.js',
                    'src/constants.js',
                    'src/controller/*.js',
                    'src/controller/**/*.js',
                    'src/directive/**/*.js',
                    'src/directive/*.js',
                    'src/filter/**/*.js',
                    'src/filter/*.js',
                    'src/services/**/*.js',
                    'src/services/*.js',
                ],
                tasks: ['concat:dist'],
                // options: {
                //   livereload: 35729,
                //   spawn: false,
                // },
            },
            css: {
                files: ['css/*.css','!css/built*.css'],
                tasks: ['buildCss'],
                options: {
                    livereload: true,
                }
            },
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    base: './',
                    port: 9009
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:9009',
                // app: 'Google Chrome'
            }

        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today() %> */\n',
            },
            lib: {
                src: [
                  "lib/angular/angular.js",
                  "lib/angular/ng-table.min.js",
                  "lib/angular/angular-ui-router.js",
                  "lib/angular/angular-resource.js",
                  "lib/angular/ng-animate.js",
                  "lib/angular/ui-bootstrap-tpls-0.14.3.min.js",
                  "lib/angular/ngStorage.min.js",
                  "lib/angular/angular-cookies.min.js",
                  "lib/angular/angular-messages.js",
                  "js/vendor.js",
                  "js/app.js",
                ],
                dest: 'lib.js',
            },
            dist: {
                src: [
                    "src/app.js",
                    "src/constants.js",
                    "src/**/*.js",
                ],
                dest: 'built.js',
            },

        },
        uglify: {
            options: {
                compress: {
                    drop_console: skipConsole
                }
            },
            my_target: {
                files: {
                    'built.min.js': ['built.js']
                }
            }
        },
        copy: {
            main: {
                cwd: '.',
                src: 'src/**',
                dest: 'ssapp',
                expand: true,
                // flatten: true,
                // filter: 'isFile',
            }
        },
        clean: {
            ssapp: {
                src: ['ssapp']
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['built.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: [
                  'css/bootstrap.min.css',
                  'css/vendor.css',
                  'css/app-seagreen.css',
                  'css/custom.css',
                  'css/ng-table.min.css',
                ],
                dest: "css/built.css"
            },
        },



    });

    // loading tasks modules
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    // grunt.loadNpmTasks("grunt-concurrent")
    // grunt.task.run('notify_hooks');
    // registerTask
    // grunt.registerTask("default", ['concat','watch']);
    grunt.registerTask("default", ['concat', 'connect:server', 'open:dev', 'watch']);
    grunt.registerTask("con", ['concat', 'watch']);
    grunt.registerTask("buildCss", ['concat_css','cssmin']);
    grunt.registerTask("co", ['copy']);
    // grunt.registerTask("conn", ['concat','open:dev','watch']);
    grunt.registerTask('something', 'Do something interesting.', function(arg) {
        var msg = 'Doing something...';
        grunt.verbose.write(msg);
        try {
            // doSomethingThatThrowsAnExceptionOnError(arg);
            console.log(msg + " from console log");
            throw Error('Error grunt');
            // grunt.verbose.ok();
        } catch (e) {
            // Something went wrong.
            // grunt.verbose.or.write(msg).error().error(e.message);
            grunt.fail.warn('Something went wrong.');
            console.err(msg + " from console log");
        }
    });

};
