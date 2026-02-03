WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// History slider
	const historySliders = [],
		history = document.querySelectorAll('.history .swiper')

	history.forEach((el, i) => {
		el.classList.add('history_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 2,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			slidesPerView: 'auto',
			spaceBetween: 24,
		}

		historySliders.push(new Swiper('.history_s' + i, options))
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	$('.mob_menu .head .close_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('lock')
		$('.mob_menu').removeClass('show')

		$('.overlay').fadeOut(200)
	})


	$('.mob_menu .menu .item > a.sub_link').click(function(e) {
		e.preventDefault()

		$(this).next('.sub').addClass('show')
	})


	$('.mob_menu .menu .sub .back_btn').click(function(e) {
		e.preventDefault()

		$(this).closest('.sub').removeClass('show')
	})


	$('.mob_menu .search_btn').click(function(e) {
		e.preventDefault()

		$('.mob_menu .mob_search').addClass('show')
	})


	$('.mob_menu .mob_search .back_btn').click(function(e) {
		e.preventDefault()

		$('.mob_menu .mob_search').removeClass('show')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub')

		// Submenu on the touch screen
		$('header .menu .item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Solutions
	setHeight(document.querySelectorAll('.solutions .item .name'))
	setHeight(document.querySelectorAll('.solutions .item .solution .desc'))
	setHeight(document.querySelectorAll('.solutions .item .result .desc'))


	// Mob. footer
	$('footer .data .title').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	// Search
	$('header .search_btn').click(function(e) {
		e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('lock')

		$(this).hasClass('active')
			? $('.search').fadeIn(300)
			: $('.search').fadeOut(200)
	})


	$('.search .close_btn').click(function(e) {
		e.preventDefault()

		$('header .search_btn').removeClass('active')
		$('body').removeClass('lock')

		$('.search').fadeOut(200)
	})


	$(document).on('click', function (e) {
		if (
			$(e.target).closest('.search').length &&
			!$(e.target).closest('.cont').length
		) {
			$('header .search_btn').removeClass('active')
			$('body').removeClass('lock')

			$('.search').fadeOut(200)
		}
	})


	// Fix. header
	headerInit = true,
	headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Fix. mob. header
	mobHeaderInit = true,
	mobHeaderHeight = $('.mob_header').outerHeight()

	$('.mob_header').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header_wrap').height(mobHeaderHeight)

	mobHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



window.addEventListener('scroll', () => {
	// Fix. header
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')

	// Fix. mob. header
	typeof mobHeaderInit !== 'undefined' && mobHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Solutions
		setHeight(document.querySelectorAll('.solutions .item .name'))
		setHeight(document.querySelectorAll('.solutions .item .solution .desc'))
		setHeight(document.querySelectorAll('.solutions .item .result .desc'))


		// Fix. header
		headerInit = false
		$('.header_wrap').height('auto')

		setTimeout(() => {
			headerInit = true
			headerHeight = $('header').outerHeight()

			$('.header_wrap').height(headerHeight)

			headerInit && $(window).scrollTop() > 0
				? $('header').addClass('fixed')
				: $('header').removeClass('fixed')
		}, 100)


		// Fix. mob. header
		mobHeaderInit = false
		$('.mob_header_wrap').height('auto')

		setTimeout(() => {
			mobHeaderInit = true
			mobHeaderHeight = $('.mob_header').outerHeight()

			$('.mob_header_wrap').height(mobHeaderHeight)

			mobHeaderInit && $(window).scrollTop() > 0
				? $('.mob_header').addClass('fixed')
				: $('.mob_header').removeClass('fixed')
		}, 100)
	}
})