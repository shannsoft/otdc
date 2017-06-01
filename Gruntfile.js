module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: [
                    "js/vendor.js",
                    "js/app.js",
                ],
                dest: 'libs.js'
            },
            custom: {
                src: [
                    "src/app.js",
                    "src/**/*.js",
                ],
                dest: 'built.js'
            },
            angular: {
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
                    "lib/dist/moment.min.js",
                    "lib/dist/uiSwitch/angular-ui-switch.js",
                ],
                dest: 'ng-libs.js'
            },
        },
        connect: {
          server: {
            options: {
              protocol:'http',
              livereload: true,
              hostname:'localhost',
              open:{
                target:'http://localhost:3006', // target url to open
                appName:'Chrome', // name of the app that opens, ie: open, start, xdg-open
                callback: function() {} // called when the app has opened
              },
              port: 3006
            }
          }
        },
        uglify: {
            options: {
                mangle: true,
            },
            my_target: {
                files: {
                    'built.js': ['built.js'],
                    'libs.js': ['libs.js'],
                    'ng-libs.js': ['ng-libs.js'],
                }
            }
        },
        comments: {
            my_target: {
                // Target-specific file lists and/or options go here.
                options: {
                    singleline: true,
                    multiline: true
                },
                src: ['built.js','libs.js'] // files to remove comments from
            },
        },
        ngAnnotate: {
            options: {

            },
            appannotate: {
                files: {
                    'built.js': ['built.js']
                },
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            debug: {
                files: ['src/*.js', 'src/**/*.js','*.html','**/*.html','!**/build/**'],
                tasks: ['concat', 'comments:my_target', 'ngAnnotate:appannotate',"cssmin:combine",'copy:main','htmlmin:dist'],
                options: {
                    livereload: true
                }
            },
            built: {
                files: ['css/**','src/*.js', 'src/**/*.js','*.html','**/*.html','!**/build/**'],
                tasks: ['concat', 'comments:my_target', 'ngAnnotate:appannotate', 'uglify:my_target', "cssmin:combine",'copy:main','htmlmin:dist'],
                options: {
                    livereload: true
                }
            }
        },
        clean: ["built.js","libs.js","ng-libs.js","css/all.css","build"],
        cssmin: {
            combine: {
                files: {
                    'css/all.css': [
                        'css/bootstrap.min.css',
                        'css/bootstrap-toggle.min.css',
                        'css/vendor.css',
                        'css/app-seagreen.css',
                        'css/custom.css',
                        'css/ng-table.min.css',
                        'lib/dist/uiSwitch/angular-ui-switch.css',
                    ],
                }
            }
        },
        copy:{
          main: {
            files:[
              {
                expand: true,
                cwd:'',
                src: ['css/all.css','lib/**','fonts/**','assets/**','built.js','ng-libs.js','js/**'],
                dest: 'build/'
              }
            ]
          }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{
                expand: true,
                cwd: '',
                src: ['src/**/*.html', '*.html'],
                dest: 'build'
              }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Default task(s).
    grunt.registerTask('default', ['clean','concat','ngAnnotate:appannotate','cssmin:combine','copy:main','htmlmin:dist','connect','comments:my_target','watch:debug']);
    grunt.registerTask('built', ['clean','concat','ngAnnotate:appannotate','uglify:my_target','cssmin:combine','copy:main','htmlmin:dist','connect','comments:my_target','watch:built']);

};
