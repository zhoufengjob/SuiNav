(function($) {
	'use strict';
	$.fn.SuiNav = function(options) {
		var menu = this,
			that = this,
			isHiding = false,
			_event = 0, // 这个临时变量是处理多级树事件判断的，很重要
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
		var _init = function() {
				if($(that).hasClass('horizontal')) {
					$(that).find('li').hover(function() {
						$(this).children('ul').stop().show(defaultOptions.openingSpeed);
					}, function() {
						$(this).children('ul').stop().hide(defaultOptions.closingSpeed);
					});
				} else {
					// 这里加入float可以让宽度自适应，但是会有其它的布局问题，视情况去除注释
					// $(that).css({
					//		'float': 'left',
					//		'margin-right': '10px'
					//	});
					if(defaultOptions.trigger == 'click') {
						$(that).find('li').click(function() {
							if(_event != 0) {
								// 这里很重要，处理事件回调
								if($(this).parent().parent().parent().hasClass('sui-nav')) {
									_event = 0;
									console.log('parent');
								}
								return;
							}
							if("none" == $(this).children('ul').css('display'))
								$(this).children('ul').slideDown(defaultOptions.openingSpeed);
							else {
								if(defaultOptions.closingCascade) {
									$(this).find('ul').slideUp(defaultOptions.closingSpeed);
								} else {
									$(this).children('ul').slideUp(defaultOptions.closingSpeed);
								}
							}
							_event++;
							if($(this).parent().parent().parent().hasClass('sui-nav')) {
								_event = 0;
								console.log('parent');
							}
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
				$(window).resize(_resize);
			},
			_show = function() {
				if(isHiding)
					return;
				$(document.body).append('<div class="sui-nav slide-nav"></div>');
				$(document.body).append('<div class="sui-nav nav-mask"></div>');
				$('.slide-nav').html($(that).html());
				$('.slide-nav').find('li').click(function() {
					if(_event != 0) {
						// 这里很重要，处理事件回调
						if($(this).parent().parent().parent().hasClass('sui-nav')) {
							_event = 0;
							console.log('parent');
						}
						return;
					}
					if("none" == $(this).children('ul').css('display'))
						$(this).children('ul').slideDown(defaultOptions.openingSpeed);
					else {
						if(defaultOptions.closingCascade) {
							$(this).find('ul').slideUp(defaultOptions.closingSpeed);
						} else {
							$(this).children('ul').slideUp(defaultOptions.closingSpeed);
						}
					}
					_event++;
					if($(this).parent().parent().parent().hasClass('sui-nav')) {
						_event = 0;
						console.log('parent');
					}
				});
				$('.nav-mask').click(function() {
					_hide();
				});
				// 某些浏览器有毒，加个小小的延迟让动画完整展示
				setTimeout(function() {
					$('.slide-nav').toggleClass('active');
					$('.nav-mask').toggleClass('active');
				}, 20);
			},
			_hide = function() {
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
			_toggle = function() {
				($('.slide-nav').length > 0) ? _hide(): _show();
			},
			_resize = function() {
				// 窗口改变时需要完成的事情，预留着吧
			},
			_create = function(id, configs, options) {
				var menuHtml,
					menuId = configs.menuId || 'idSuiNav',
					menuType = configs.menuType || 'default';
				if(menuType == 'horizontal') {
					menuHtml = '<div id="' + menuId + '" class="sui-nav horizontal">';
				} else {
					menuHtml = '<div id="' + menuId + '" class="sui-nav">';
				}
				menuHtml = menuHtml + $(that).html() + '</div>';
				$('#' + id).html(menuHtml);
				return $('#' + id).SuiNav(options);
			},
			_destroy = function() {
				$('.' + defaultOptions.toggleName).unbind();
			};
		_resize();
		_init();
		return {
			show: _show,
			hide: _hide,
			toggle: _toggle,
			create: _create,
			destroy: _destroy
		};
	};
})($);