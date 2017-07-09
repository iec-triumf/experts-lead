module.exports = function(grunt){
	var gc = {
		imageNotyfy: __dirname+'\\src\\notify.png',
		minifyHtml: false,
		minifyCss: true
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		modernizr: {
			dist: {
				"crawl": false,
				"customTests": [],
				"dest": "assets/templates/studionions/js/modernizr.js",
				"tests": [
					"customelements",
					"customevent",
					"history",
					"inputtypes",
					"json",
					"svg",
					"video",
					"animation",
					"adownload",
					"csscalc",
					"flexbox",
					"objectfit",
					"csspointerevents",
					"filereader",
					"filesystem"
				],
				"options": [
					"domPrefixes",
					"prefixes",
					"addTest",
					"atRule",
					"hasEvent",
					"mq",
					"prefixed",
					"prefixedCSS",
					"prefixedCSSValue",
					"testAllProps",
					"testProp",
					"testStyles",
					"html5printshiv",
					"html5shiv",
					"setClasses"
				],
				"uglify": true
			}
		},
		less: {
			css: {
				files : {
					'test/css/main.css' : [
						'src/less/main.less'
					]
				},
				options : {
					compress: gc.minifyCss,
					ieCompat: false
				}
			},
		},
		autoprefixer:{
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox 16.0', 'Opera 12.1', "Chrome 26.0"],
				cascade: false
			},
			css: {
				expand: true,
				flatten: true,
				src: [
					'test/css/main.css'
				],
				dest: 'assets/templates/studionions/css/'
			}
		},
		requirejs: {
			ui: {
				options: {
					baseUrl: __dirname+"/bower_components/jquery-ui/ui/widgets/",//"./",
					paths: {
						jquery: __dirname+'/bower_components/jquery/dist/jquery'
					},
					preserveLicenseComments: false,
					optimize: "none",
					findNestedDependencies: true,
					skipModuleInsertion: true,
					exclude: [ "jquery" ],
					include: [ 
								"../disable-selection.js",
								"slider.js",
							],
					out: "test/js/jquery.custom-ui.js",
					done: function(done, output) {
						grunt.log.writeln(output.magenta);
						grunt.log.writeln("jQueryUI Custom Build ".cyan + "done!\n");
						grunt.log.writeln("File " + (__dirname +"/test/js/jquery.custom-ui.js").cyan + " created.\n");
						done();
					},
					error: function(done, err) {
						grunt.log.warn(err);
						done();
					}
				}
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true,
				//beautify: true
			},
			main: {
				files: {
					'assets/templates/studionions/js/main.js': [
						'src/js/main.js'
					]
				}
			},
			app: {
				files: {
					'assets/templates/studionions/js/app.js' : [
						'src/js/utilites.js',
						'bower_components/jquery/dist/jquery.js',
						'test/js/jquery.custom-ui.js',
						'bower_components/jquery-mousewheel/jquery.mousewheel.js',
						'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
						'bower_components/jquery_lazyload/jquery.lazyload.js',
						'bower_components/jquery.maskedinput/dist/jquery.maskedinput.js',
						'bower_components/fancybox/dist/jquery.fancybox.js',
						'bower_components/slick-carousel/slick/slick.js',
						'bower_components/jarallax/jarallax/jarallax.js',
						'bower_components/jarallax/jarallax/jarallax-video.js',
						'bower_components/arcticModal/arcticmodal/jquery.arcticmodal.js',
						'bower_components/mixitup/dist/mixitup.js',
					]
				}
			},
			hypher: {
				files: {
					'assets/templates/studionions/js/hypher.js' : [
						'bower_components/hyphernationRUru/dist/jquery.hypher.js',
						'bower_components/hyphernationRUru/dist/ru-ru.js',
					]
				}
			},
		},
		imagemin: {
			base: {
				options: {
					optimizationLevel: 5,
					//progressive: true,
					//interlaced: true,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/*.{png,jpg,gif,svg}'
						],
						dest: 'assets/templates/studionions/images/',
						filter: 'isFile'
					}
				]
			},
			css: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'src/images/css/*.{png,jpg,gif,svg}'
						],
						dest: 'src/images/bin/',
						filter: 'isFile'
					}
				]
			}
		},
		jade: {
			index: {
				options: {
					pretty: !gc.minifyHtml,
					data: {
						debug: false
					}
				},
				files: [
					{
						expand: true,
						cwd: 'src/jade',
						src: ['index.jade'],
						dest: '',
						ext: '.html'
					}
				]
			},
			templates: {
				options: {
					pretty: !gc.minifyHtml,
					data: {
						debug: false
					}
				},
				files: [
					{
						expand: true,
						cwd: 'src/jade/includes',
						src: ['*.jade'],
						dest: 'test/html/chunks/',
						ext: '.tpl'
					}
				]
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: 'src/fonts',
				src: '**',
				dest: 'assets/templates/studionions/fonts/',
			},
			bootstrap: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/fonts',
				src: '**',
				dest: 'assets/templates/studionions/fonts/',
			},
			slick: {
				expand: true,
				cwd: 'bower_components/slick-carousel/slick/fonts',
				src: '**',
				dest: 'assets/templates/studionions/fonts/',
			},
			tpl: {
				expand: true,
				cwd: 'test/html/chunks',
				src: '**',
				dest: 'assets/templates/studionions/chunks/',
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: [
					'src/jade/**/*.jade',
				],
				tasks: ["jade","copy:tpl","notify:done"]
			},
			font: {
				files: [
					'src/fonts/**/*.*',
				],
				tasks: ["copy:main","notify:done"]
			},
			js: {
				files: [
					'src/js/**/*.js'
				],
				tasks: ['notify:watch', 'uglify:main', 'notify:done']
			},
			css: {
				files: [
					'src/less/**/*.{css,less}',
				],
				tasks: ['notify:watch', 'less', 'autoprefixer','notify:done']
			},
			images: {
				files: [
					'src/images/*.{png,jpg,gif,svg}',
					'src/images/css/*.{png,jpg,gif,svg}'
				],
				tasks: ['notify:watch', 'newer:imagemin', 'less', 'autoprefixer', 'notify:done']
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: '<%= globalConfig.imageNotyfy %>'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: '<%= globalConfig.imageNotyfy %>'
				}
			}
		}
	});
	grunt.registerTask('default', 	['notify:watch','imagemin','less','autoprefixer','jade','copy','modernizr','requirejs','uglify','notify:done']);
	grunt.registerTask('dev', 		['watch']);
}