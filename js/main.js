'use strict';

/* eslint-disable no-unused-vars */

var $window = $(window);
var $document = $(document);
var $html = $(document.documentElement);
var $body = $(document.body);

// load
var $jsLoad = $('.js-load');
window.onload = function() {
	$jsLoad.fadeOut(300);
};

// fixed header 
$window.scroll(function() {
	var $boxFix = $('.js-fix');
	if ($(window).scrollTop() > 25) {
		$boxFix.addClass('fix');
	} else {
		$boxFix.removeClass('fix');
	}
});

// btn menu
var $btnMenu = $('.js-btn-menu');
var $boxMenu = $('.js-box-menu');
$btnMenu.click(function() {
	$(this).toggleClass('is-open');
	$boxMenu.fadeToggle(600);
});

// modal
$('.js-modal').fancybox({
	toolbar: true,
	smallBtn: false,
	arrows: false,
	animationEffect: 'zoom-in-out',
	touch: false,
	autoFocus: false,
	btnTpl: {
		arrowLeft: ' ',
		arrowRight: ' ',
		close: '<button type="button" data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' + "</button>"
	}
});

$('.b-page--home .js-modal').fancybox({
	toolbar: true,
	smallBtn: false,
	arrows: false,
	animationEffect: 'zoom-in-out',
	touch: false,
	autoFocus: false,
	btnTpl: {
		arrowLeft: ' ',
		arrowRight: ' ',
		close: '<button type="button" data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' + "</button>"
	},
	beforeLoad: function beforeLoad(instance, current) {
		fullpage_api.setAutoScrolling(false);
	},
	beforeClose: function beforeClose(instance, current) {
		fullpage_api.setAutoScrolling(true);
	}
});

$('.js-modal-gallery').fancybox({
	toolbar: true,
	smallBtn: false,
	animationEffect: 'zoom-in-out',
	transitionEffect: 'tube',
	touch: false,
	autoFocus: false,
	btnTpl: {
		arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + '</button><button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + "</button>",
		arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + "</button>",
		close: '<button type="button" data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' + "</button>"
	}
});

// form styler
var $jsFormStyle = $('.js-select, .js-input');
$jsFormStyle.styler();

// grid
var $jsFillterOpen = $('.js-open-filter');
$jsFillterOpen.click(function() {
	$(this).toggleClass('open');
	$(this).parents('.js-filter').toggleClass('open');
});

var $jsGrid = $('.js-grid');

function isotopeFilters(gallery) {
	var $gallery = $(gallery);
	if ($gallery.length) {
		var container = $gallery;
		var optionSets = $('.js-filter'),
			optionLinks = optionSets.find('a');
		optionLinks.on('click', function(e) {
			var thisLink = $(this);
			if (thisLink.hasClass('active')) return false;
			var optionSet = thisLink.parents('.js-filter');
			optionSet.find('.active').removeClass('active');
			thisLink.addClass('active');
			var options = {},
				key = optionSet.attr('data-option-key'),
				value = thisLink.attr('data-option-value');
			value = value === 'false' ? false : value;
			options[key] = value;
			if (key === 'layoutMode' && typeof changeLayoutMode === 'function') changeLayoutMode($this, options);
			else {
				container.isotope(options);
			}
			return false;
		});
	}
}
$jsGrid.imagesLoaded(function() {
	$jsGrid.isotope({
		percentPosition: true,
		itemSelector: '.js-grid-item',
		masonry: {
			columnWidth: '.js-grid-item'
		}
	});
});
isotopeFilters($jsGrid);

// scroll
//var s = skrollr.init();

// category menu
var $jsCatMenu = $('.js-cat-menu');
$jsCatMenu.on('click', '.init', function() {
	$jsCatMenu.removeClass('is-open');
	$jsCatMenu.toggleClass('is-open');
	$(this).toggleClass('is-open');
	//$(this).closest($jsCatMenu).children('li:not(.init)').toggle();
});

var $allOptions = $jsCatMenu.children('li:not(.init)');
$jsCatMenu.on('click', 'li:not(.init)', function() {
	$allOptions.removeClass('is-active');
	$(this).addClass('is-active');
	$jsCatMenu.children('.init').html($(this).html());
	$('.init').removeClass('is-open');
	$jsCatMenu.removeClass('is-open');
	//$allOptions.toggle();
});

// full page
var $fullPage = $('#js-fullpage');
$fullPage.fullpage({
	licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	sectionSelector: '.b-screen',
	navigation: true,
	navigationPosition: 'right',
	scrollingSpeed: 800,
	scrollOverflow: true,
	onLeave: function onLeave(origin, destination, direction) {
		var $leavingSection = $('.js-fix');
		if (destination.index == 0 && direction == 'up') {
			$leavingSection.removeClass('fix');
		} else if (origin.index !== 1 && direction == 'down') {
			$leavingSection.addClass('fix');
		}
	}
});
