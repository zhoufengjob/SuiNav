(function($) {
	'use strict';
	$.fn.SuiNav = function(options) {
		var menu = this,
			that = this,
			isHiding = false,
			defaultOptions = {
				toggleName: '.MenuToggle', // 控制菜单开关类
				direction: 'left', // 菜单切换方向
				trigger: 'click', // 展开方式，单击展示下层或是悬浮展示
				openingSpeed: 400, // 打开菜单动画时间
				closingSpeed: 400, // 关闭菜单动画时间
				closingCascade: true, // 级联关闭所有菜单，仅对垂直导航菜单有效
				destroy: true // 切换菜单时是否释放控件占用资源
			};
		if(!$(that).hasClass('sui-nav')) {
			if($(this).find('.sui-nav').length < 1)
				return;
			that = $(this).find('.sui-nav')[0];
		}
		defaultOptions = $.extend({}, defaultOptions, options);
		var initMenu = function() {
				if($(that).hasClass('horizontal')) {
					$(that).find('li').hover(function() {
						$(this).children('ul').stop().show(defaultOptions.openingSpeed);
					}, function() {
						$(this).children('ul').stop().hide(defaultOptions.closingSpeed);
					});
				} else {
//					这里加入float可以让宽度自适应，但是会有其它的布局问题，视情况去除注释
//					$(that).css({
//						'float': 'left',
//						'margin-right': '10px'
//					});
					if(defaultOptions.trigger == 'click') {
						$(that).find('li').click(function() {
							if("none" == $(this).children('ul').css('display'))
								$(this).children('ul').slideDown(defaultOptions.openingSpeed);
							else {
								if(defaultOptions.closingCascade) {
									$(this).find('ul').slideUp(defaultOptions.closingSpeed);
								} else {
									$(this).children('ul').slideUp(defaultOptions.closingSpeed);
								}
							}
							return false;
						});
					} else if(defaultOptions.trigger == 'hover') {
						$(that).find('li').hover(function() {
							$(this).children('ul').slideDown(defaultOptions.openingSpeed);
						}, function() {
							if(defaultOptions.closingCascade) {
								$(this).find('ul').slideUp(defaultOptions.closingSpeed);
							} else {
								$(this).children('ul').slideUp(defaultOptions.closingSpeed);
							}

						});
					}
				}
				$(window).resize(resize);
			},
			showMenu = function() {
				if(isHiding)
					return;
				$(document.body).append('<div class="sui-nav slide-nav"></div>');
				$(document.body).append('<div class="sui-nav nav-mask"></div>');
				$('.slide-nav').html($(that).html());
				$('.slide-nav').find('li').click(function() {
					if("none" == $(this).children('ul').css('display'))
						$(this).children('ul').slideDown(defaultOptions.openingSpeed);
					else {
						if(defaultOptions.closingCascade) {
							$(this).find('ul').slideUp(defaultOptions.closingSpeed);
						} else {
							$(this).children('ul').slideUp(defaultOptions.closingSpeed);
						}
					}
					return false;
				});
				$('.nav-mask').click(function() {
					hideMenu();
				});
				setTimeout(function() {
					$('.slide-nav').toggleClass('active');
					$('.nav-mask').toggleClass('active');
				}, 20);
			},
			hideMenu = function() {
				if(isHiding)
					return;
				isHiding = true;
				$('.slide-nav').find('li').unbind();
				$('.slide-nav').removeClass('active');
				$('.nav-mask').removeClass('active');
				setTimeout(function() {
					$('.slide-nav').remove();
					$('.nav-mask').remove();
					isHiding = false;
				}, 600);
			},
			resize = function() {},
			destroyMenu = function() {
				$('.' + defaultOptions.toggleName).unbind();
			};
		resize();
		initMenu();
		return {
			show: showMenu,
			hide: hideMenu,
			toggle: function() {
				if($('.slide-nav').length > 0) {
					hideMenu();
				} else {
					showMenu();
				}
			},
			destroy: destroyMenu
		};
	};
})($);