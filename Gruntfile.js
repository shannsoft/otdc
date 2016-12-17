module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'src/app.js',
        'src/controller/*.js',
        'src/controller/**/*.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'src/app.js',
          'src/constants.js',
          'src/**/*.js',
        ],
        tasks: ['concat'],
        // options: {
        //   livereload: 35729,
        //   spawn: false,
        // },
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
          "src/app.js",
          "src/constants.js",
          "src/**/*.js",
        ],
        dest: 'built.js',
      },

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



  });

  // loading tasks modules
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks("grunt-concurrent")
// grunt.task.run('notify_hooks');
  // registerTask
  // grunt.registerTask("default", ['concat','watch']);
  grunt.registerTask("default", ['concat','connect:server','open:dev','watch']);
  grunt.registerTask("concat", ['concat','watch']);
  grunt.registerTask("co", ['copy']);
  // grunt.registerTask("conn", ['concat','open:dev','watch']);
  grunt.registerTask('something', 'Do something interesting.', function(arg) {
    var msg = 'Doing something...';
    grunt.verbose.write(msg);
    try {
      // doSomethingThatThrowsAnExceptionOnError(arg);
      console.log(msg+" from console log");
      throw Error('Error grunt');
      // grunt.verbose.ok();
    } catch(e) {
      // Something went wrong.
      // grunt.verbose.or.write(msg).error().error(e.message);
      grunt.fail.warn('Something went wrong.');
      console.err(msg+" from console log");
    }
  });

};
