module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'app.js',
        'controller/*.js',
        'controller/**/*.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'app.js',
          'controller/*.js',
          'controller/**/*.js'
        ],
        tasks: ['concat'],
        options: {
          livereload: 35729,
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
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
    open : {
    dev : {
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
      dist: {
        src: [
          "app.js",
          "controller/CommonCotroller/mainController.js",
          "controller/TenderController/TenderController.js",
          "controller/UserController/user_controller.js",
          "services/app_service.js"

        ],
        dest: 'built.js',
      },

    },

  //   notify: {
  //   task_name: {
  //     options: {
  //       // Task-specific options go here.
  //     }
  //   },
  //   watch: { options: { title: '"Watch"', message: '"Snipers on the roof, sir!"' } },
  //   server: {
  //     options: {
  //       message: 'Server is ready!'
  //     }
  //   }
  // }
  // notify_hooks: {
  //     options: {
  //       enabled: true,
  //       max_js_hint_notifications: 5,
  //       title: 'Notifications'
  //     }
  //   }

  });

  // loading tasks modules
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-notify');
  // grunt.loadNpmTasks("grunt-concurrent")
// grunt.task.run('notify_hooks');
  // registerTask
  // grunt.registerTask("default", ['concat','watch']);
  grunt.registerTask("default", ['concat','connect:server','open:dev','watch']);
  // grunt.registerTask("conn", ['concat','open:dev','watch']);

};
