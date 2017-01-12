module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration.
        clean: {
            files: ['dist']
        },
        sass: {
            dist: {
                files: {
                    'dist/style.css': 'src/Sass/main.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'dist/style.css': 'dist/style.css'
                }
            }
        },
        cssmin: {
            options: {
                advanced: false
            },
            build: {
                files: {
                    'dist/style.min.css': 'dist/style.css'
                }
            }
        },
        concat: {
          options: {
            banner: '/*jshint esversion: 6 */\n',
            stripBanners: true
          },
          dist: {
            src: ['src/js/render.js','src/js/filter.js','src/js/select.js','src/js/app.js'],
            dest: 'src/js/script.js'
          },
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015'],
            },
            dist: {
                files: {
                    'dist/script.js': 'src/js/script.js'
                }
            }
        },
        uglify: {
            dist: {
                src: 'dist/script.js',
                dest: 'dist/script.min.js'
            },
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/js/*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            srcjs: {
                files: ['src/js/render.js','src/js/filter.js','src/js/select.js','src/js/app.js'],
                tasks: ['concat', 'babel', 'jshint:src', 'uglify']
            },
            srccss: {
                files: ['src/Sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    // Default task.
    grunt.registerTask('default', ['concat', 'babel', 'jshint', 'qunit', 'clean', 'sass', 'autoprefixer', 'cssmin', 'uglify']);

};
