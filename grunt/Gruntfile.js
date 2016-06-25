/*
shopify-grunt-workflow
Grunt based workflow for shopify theme projects. This workflow uses grunt-shopify as a dependency. 
*/
var jsFilesToConcat = [
    // bower.js need to come
    // first to settle dependencies
    '../src/js/bower.js',
    // everything else can go here, if you are a
    // decent human being you will alphabetize ie:
    //'../src/js/nav.js',
    // main.js needs to come last because it
    // initializes everything
    '../src/js/main.js'
];

module.exports = function(grunt) {

    /*
     * This build process isn't great. It only adds Postcss when you BUILD,
     * and that's pretty sketchy.
     */
    grunt.registerTask('build', ['bower_concat', 'concat:js', 'sass:dev', 'postcss']);
    grunt.registerTask('default', ['watch']);

    grunt.initConfig({
        settings : grunt.file.readJSON('dev-settings.json'),
        shopify : {
            options: {
              api_key: '<%= settings.api_key %>' ,
              password: '<%= settings.password %>',
              url: "<%= settings.url %>",
              base: "<%= settings.base %>"
            }
        },

        bower_concat: {
            all: {
                dest: '../src/js/bower.js',
                exclude: [
                    'jquery',
                    'modernizr'
                ]
            }
        },

        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: jsFilesToConcat,
                dest: '../assets/theme.js.liquid'
            }
        },

        sass: {
            dev: {
                options: {
                    outputStyle: 'nested',
                    sourceMap: false
                },
                files: {
                    "../assets/theme.scss.css": "../src/scss/theme.scss",
                }
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')(
                        {
                            browsers: 'last 2 versions, > 1%'
                        }
                    ),
                    require('cssnano')()
                ]
            },
            dist: {
                src: '../assets/theme.scss.css'
            }
        },

        watch: {
            files: ['Gruntfile.js'],
            liquid:{
                files: ['../**/*.liquid']
            },
            js: {
                files: jsFilesToConcat,
                tasks: ['concat:js'],
                options: {
                    interrupt: true
                }
            },
            bower: {
                files: ['../src/js/bower.js'],
                tasks: ['bower_concat'],
                options: {
                    interrupt: true
                }
            },
            css: {
                files: ['../src/scss/**'],
                tasks: ['sass:dev'],
                options: {
                    interrupt: true
                }
            },

            shopify: {
                files: [
                    '../assets/**',
                    '../config/**',
                    '../layout/**',
                    '../locales/**',
                    '../snippets/**',
                    '../templates/**'
                ],
                tasks: ['shopify'],
                options: {
                  livereload: true,
                  debounceDelay: 1000
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shopify');
    grunt.loadNpmTasks('grunt-postcss');
};
