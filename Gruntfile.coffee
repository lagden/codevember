# coffeelint: disable=no_backticks

'use strict'

path = require 'path'
fixtures = require './dev/data/fixtures.json'

module.exports = (grunt) ->
  grunt.file.defaultEncoding = 'utf8'

  require('jit-grunt') grunt
  require('time-grunt') grunt

  grunt.initConfig
    xo:
      options:
        quiet: true
        ignores: []
      target: ['es6/**/*.js']

    babel:
      base:
        options:
          sourceMap: true
        files: [
          expand: true
          flatten: false
          cwd: 'dev/es6'
          src: ['*.js']
          dest: 'dist/js'
          ext: '.js'
        ]
      app:
        options:
          sourceMap: true
          modules: 'umd'
        files: [
          expand: true
          flatten: false
          cwd: 'dev/es6'
          src: [
            'app/**/*.js'
            'component/**/*.js'
            'data/**/*.js'
          ]
          dest: 'dist/js'
          ext: '.js'
        ]

    stylus:
      dist:
        options:
          compress: true
          paths: [
            'node_modules/jeet/stylus'
            'node_modules/rupture'
            'node_modules/nib'
          ]
          import: [
            'jeet'
            'rupture'
            'nib/normalize'
            'nib/image'
          ]
        files: [
          expand: true
          flatten: false
          cwd: 'dev/stylus'
          src: ['*.styl']
          dest: 'dist/css'
          ext: '.css'
        ]

    postcss:
      dev:
        options:
          processors: [
            require('autoprefixer')(browsers: 'last 2 versions')
          ]
        files: [
          expand: true
          flatten: false
          cwd: 'dist/css'
          src: ['*.css']
          dest: 'dist/css'
          ext: '.css'
        ]

    jade:
      html:
        options:
          pretty: false
          data: fixtures
        files: [
          expand: true
          flatten: false
          cwd: 'dev/jade/html'
          src: ['*.jade']
          dest: 'dist'
          ext: '.html'
        ]

    watch:
      script:
        files: ['dev/es6/**/*.js' ]
        tasks: ['scripts']
      css:
        files: ['dev/stylus/**/*.styl']
        tasks: ['styles']
      jade:
        files: ['dev/jade/**/*.jade']
        tasks: ['jade']

    critical:
      dist:
        options:
          base: './'
          inline: false
          minify: true
          css: ['dist/css/static.css']
        files: [
          expand: true
          flatten: false
          cwd: 'dist'
          src: ['*.html']
          dest: 'dist/critical'
          ext: '.css'
        ]

    clean:
      build: ['build']
      dist: [
        'dist/*.*'
        'dist/assets'
        'dist/css'
        'dist/js/*'
        '!dist/js/lib/**'
      ]

    concurrent:
      all: [
        'scripts'
        'styles'
        'jade'
      ]

    copy:
      dist:
        files: [
          expand: true
          flatten: false
          cwd: 'dev'
          src: [
            'assets/**'
          ]
          dest: 'dist'
        ]
      build:
        files: [
          expand: true
          flatten: false
          cwd: 'dist'
          src: [
            'assets/**'
            'css/**'
            'js/**'
          ]
          dest: 'build'
        ]
      icon:
        src: 'dev/favicon.ico'
        dest: 'build/favicon.ico'

    browserSync:
      dev:
        bsFiles:
          src: 'dist/css/*.css'
        options:
          notify: true
          watchTask: true
          port: 8183
          server:
            baseDir: ['dist']

    replace:
      dist:
        options:
          path: 'dist/critical'
        files: [
          expand: true
          flatten: false
          cwd: 'dist'
          src: ['*.html']
          dest: 'build/'
          ext: '.html'
        ]

  grunt.registerMultiTask 'replace', 'Replace critical stuff.', ->
    options = @options
      pattern: /\/\*\{(.*?)\}\*\//g
      path: ''
    for file in @files
      src = grunt.file.read file.src, 'utf8'
      parsed = src.replace options.pattern, (a, b) ->
        css = path.join options.path, b
        grunt.file.read css, 'utf8'
      grunt.file.write file.dest, parsed, 'utf8'
    return

  grunt.registerTask 'default', [
    'clean'
    'copy:dist'
    'concurrent'
  ]

  grunt.registerTask 'scripts', [
    'xo'
    'babel'
  ]

  grunt.registerTask 'build', [
    'default'
    'critical'
    'replace'
    'copy:build'
    'copy:icon'
  ]

  grunt.registerTask 'serve', [
    'default'
    'browserSync'
    'watch'
  ]

  grunt.registerTask 'styles', [
    'stylus'
    'postcss'
  ]

  return
