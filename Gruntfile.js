'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        newer: {
            options: {
                override: function(detail, include) {
                    include( false );
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'client/**/*.js'
            ]
        },

        less: {
            development: {
                options: {
                    //compress: true  //minifying the result
                },
                files: {
                    'server/public/css/application.css' : 'client/application.less'
                }
            }
        },

        jade: {
            static: {
                options: {
                    client: false,
                    pretty: true,
                    data: {
                        site: grunt.file.readJSON('site.json')
                    }
                },
                files: [{
                    cwd: 'client/static/',
                    src: '*.jade',
                    dest: 'server/public/static',
                    expand: true,
                    ext: '.html'
                }]
            }
        },

        concat: {
            options: {
                separator: '\n'
            },
            bower: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/js/modal.js'
                ],
                dest: 'server/public/js/bower.js'
            },
            application: {
                src: [
                    'server/public/js/bower.js',
                    'client/**/*.js'
                ],
                dest: 'server/public/js/application.js'
            }
        },

        copy: {
            fonts: {
                cwd: 'bower_components',
                src: [ 'font-awesome/fonts/*.{otf,eot,svg,ttf,woff,woff2}', 'bootstrap/fonts/*.{otf,eot,svg,ttf,woff,woff2}'],
                dest: 'server/public/fonts',
                expand: true,
                flatten: true
            },
            img: {
                cwd: 'client',
                src: ['WebComponents/**/*.{jpg,png,gif}'],
                expand: true,
                dest: 'server/public/img',
                flatten: true
            }
        },

        watch: {
            less: {
                files: 'client/**/*.less',
                tasks: 'less'
            },
            jade: {
                files: 'client/**/*.jade',
                tasks: 'jade:static',
                options: {
                    interrupt: true
                }
            },
            scripts: {
                files: 'client/**/*.js',
                tasks: ['concat:application','jshint:all'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less', 'jade', 'copy', 'concat']);
};