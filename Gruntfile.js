module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			jsPath: 'src/javascripts/',
			cssPath: 'src/stylesheets/',
			jsDist: 'dist/js/',
			cssDist: 'dist/css/'
		},
		sass: {
			dist: {
				files: {
					'<%= path.cssDist %>sui.nav.css': '<%= path.cssPath %>sui.nav.scss'
				}
			}
		},
		cssmin: {
			dist: {
				src: '<%= path.cssDist %>sui.nav.css',
				dest: '<%= path.cssDist %>sui.nav.min.css'
			}
		},
		uglify: {
			dist: {
				files: {
					'<%= path.jsDist %>sui.nav.min.js': '<%= path.jsPath %>sui.nav.js'
				}
			}
		},
		watch: {
			build: {
				files: ['src/stylesheets/*.scss', 'dist/css/sui.nav.css', 'src/javascripts/*.js'],
				tasks: ['sass', 'cssmin', 'uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'watch']);
};