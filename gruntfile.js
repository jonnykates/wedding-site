module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      compile: {
        options: {
          style: 'compressed'
        },
        files: {
          'style/style.min.css' : 'style/style.scss'
        }
      }
    },

    // uglify: {
    //   my_target: {
    //     files: {
    //       'js/user-nav.min.js': 'js/user-nav.js'
    //     }
    //   }
    // },

    watch: {
      css: {
        files: ['style/*.scss', 'style/*/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          livereload: true
        }
      },
      // js: {
      //   files: 'js/user-nav.js',
      //   tasks: ['uglify'],
      //   options: {
      //     livereload: true
      //   }
      // }
    },

    express: {
      server: {
        options: {
          port: 3000,
          hostname: 'localhost',
          livereload: true,
          bases: '.'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: 'style/style.min.css'
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default',['express', 'watch']);
  grunt.registerTask('compile',['sass','postcss']);
}