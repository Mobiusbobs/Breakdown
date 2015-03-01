/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var uglifyify = require('uglifyify');

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

      browserify: {
        dev: {
          src: ['./src/react-cursor.js'],
          dest: './dist/react-cursor.dev.js'
        },

        build: {
          src: ['./src/react-cursor.js'],
          dest: './dist/react-cursor.js',

          options: {
            external: ['react/addons', 'underscore']
          }
        },

        dist: {
          src: ['./src/react-cursor.js'],
          dest: './dist/react-cursor.min.js',

          options: {
            external: ['react/addons', 'underscore'],
            transform: [uglifyify]
          }
        },

        test: {
          src: './test/spec-runner.js',
          dest: './test/html/js/spec-runner.js'
        }
      },

      clean: ['dist'],

      karma: {
        unit: {
          configFile: 'karma.conf.js'
        }
      },

      mocha: {
        test: {
          options: {
            log: true,
            logErrors: true,
            reporter: 'Spec',
            run: true
          },

          mocha: {
            ignoreLeaks: true
          },

          src: ['./test/**/*.html']
        }
      },

      watch: {
        tests: {
          files: ['./test/**/*.*'],
          tasks: ['browserify:test', 'mocha:test'],
          options: {
            spawn: false
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['browserify:test', 'mocha:test', 'watch']);

    grunt.registerTask('default', ['clean', 'browserify:dev']);
    grunt.registerTask('release', ['clean', 'browserify:dev', 'browserify:build', 'browserify:dist']);
};
