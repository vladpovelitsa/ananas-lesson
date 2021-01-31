function modalControls(e) {
	var body = document.querySelector('body');
	if (e.target.classList.contains('modal_btn')) {
		event.preventDefault();
		if (document.querySelector('.modal.active')) {
			var modal = document.querySelector('.modal.active');
			modal.classList.remove('active');
		}
		var modal = document.getElementById(e.target.getAttribute('data-target'));
		modal.classList.add('active');
		body.classList.add('overlay');
	}
	if (
		e.target.classList.contains('overlay') ||
		e.target.classList.contains('close') ||
		e.target == document.querySelector('.modal.active')
	) {
		var modal = document.querySelector('.modal.active');
		modal.classList.remove('active');
		body.classList.remove('overlay');
	}
}

document.addEventListener('click', modalControls);

$('.tabs .tab_toggler').on('click', function (event) {
	event.preventDefault();
	$(this).closest('.tabs').find('.tab_toggler').removeClass('active');
	$(this).addClass('active');
	$(this).closest('.tabs').find('.tab_content').removeClass('active');
	$(this).closest('.tabs').find($(this).data('target')).addClass('active');
});

// document.addEventListener('click', tabs);

$(function ($) {
	$('[type="tel"]').mask('+7 (999) 999-99-99');
});

// $('.statusbar').marquee({
// 	speed: 10000,
// 	gap: 50,
// 	delayBeforeStart: 0,
// 	direction: 'left',
// 	duplicated: true,
// 	pauseOnHover: true,
// });

$('.show_nav').on('click', function (event) {
	$(this).toggleClass('active');
	$('.nav').toggleClass('active');
});

$('.inner_nav__toggler').on('click', function (event) {
	$('.inner_nav__links').toggleClass('active');
});

$('.select__item').on('click', function () {
	select($(this));
});

function select(el) {
	el.closest('.select').toggleClass('active'); // showing selects list

	var selected = el.closest('.select').find('.select__selected'); // set wich node will be selected
	// click item in list
	if (el.parent().hasClass('select__selected') == false) {
		var icon = selected.find('.select__item__icon img'); // current selected item icon
		var name = selected.find('.select__item__name'); // current selected item name

		console.log(el);
		icon.attr('src', el.find('img').attr('src')); // set new icon
		name.text(el.find('.select__item__name').text()); // set new name
	}
}

// $('.wallets__list_item_remove').on('click', function () {
// 	$(this).closest('.wallets__list_item').remove();
// });

$('.create__info_input__suggestion_btn').on('click', function () {
	$(this)
		.closest('.create__info_input')
		.find('.create__info_input__value')
		.val($(this).val());
});

$('.deposits__filters_btn').on('click', function () {
	var button = $(this);
	$('.deposits__filters_btn').each(function (index) {
		$(this).removeClass('deposits__filters_btn--active');
	});
	$(this).addClass('deposits__filters_btn--active');

	$(button.attr('data-filter'))
		.find('.deposits__item')
		.each(function (index) {
			if (button.val() == 'all') {
				$(this).removeClass('hidden');
			} else if ($(this).hasClass(button.val()) == false) {
				$(this).addClass('hidden');
			} else {
				$(this).removeClass('hidden');
			}
		});
});

function copytext(el) {
	console.log('test');
	var $tmp = $('<textarea>');
	$('body').append($tmp);
	$tmp.val($(el).val()).select();
	document.execCommand('copy');
	$tmp.remove();
}

function copystart() {
	if (event.target.classList.contains('copy_item-btn')) {
		event.preventDefault();
		copytext(event.target.previousElementSibling);
	}
}

document.addEventListener('click', copystart);

$('.lang_wrap__item').on('click', function () {
	$('.lang_wrap__list').toggleClass('active');
});

var notifyHeight = 80;
var notifyCounter = 0;
function notifications(e) {
	if (e.target.classList.contains('show-notify')) {
		if (e.target.classList.contains('show-success')) {
			document
				.querySelector('.notification-success')
				.classList.add('notification-active');
		}
		if (e.target.classList.contains('show-error')) {
			document
				.querySelector('.notification-error')
				.classList.add('notification-active');
		}
		if (e.target.classList.contains('show-warning')) {
			document
				.querySelector('.notification-warning')
				.classList.add('notification-active');
		}
		document.querySelectorAll('.notification')[notifyCounter].style.top =
			notifyHeight * notifyCounter + 20 + 'px';
		notifyCounter++;
	} else if (e.target.classList.contains('notification')) {
		for (
			var i = 0;
			i < document.querySelectorAll('.notification-active').length;
			i++
		) {}
		notifyCounter--;
		e.target.style.top = '-300px';
	}
}

document.addEventListener('click', notifications);

$('.payments__slider').slick({
	prevArrow: '.payments__arrow-prev',
	nextArrow: '.payments__arrow-next',
	variableWidth: true,
	infinite: false,
});

$('.team__slider').slick({
	prevArrow: '.team__arrow-prev',
	nextArrow: '.team__arrow-next',
	variableWidth: true,
});

if (document.getElementById('canvas')) {
	var ctx = document.getElementById('canvas').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'Withdrawals',
					backgroundColor: '#1F78B4',
					borderColor: '#1F78B4',
					data: [1, 25, 65, 33, 57, 21, 10],
					fill: false,
				},
				{
					label: 'Investments',
					fill: false,
					backgroundColor: '#B2DF8A',
					borderColor: '#B2DF8A',
					data: [10, 15, 12, 14, 17, 25, 56],
				},
			],
		},
		options: {
			title: {
				display: 'true',
				text: 'Finances',
				fontSize: 30,
				fontFamily: "'Proba Pro', sans-serif",
				fontColor: '#1A204B',
				padding: 40,
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
			legend: {
				display: true,
				position: 'bottom',
				align: 'start',
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 20,
				},
			},
		},
	});
}
if (document.getElementById('canvas2')) {
	var ctx2 = document.getElementById('canvas2').getContext('2d');
	var myChart = new Chart(ctx2, {
		type: 'line',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'Customers',
					backgroundColor: '#1B904E',
					borderColor: '#1B904E',
					data: [10, 15, 35, 43, 57, 61, 90],
					fill: false,
				},
			],
		},
		options: {
			title: {
				display: 'true',
				text: 'Customers',
				fontSize: 30,
				fontFamily: "'Proba Pro', sans-serif",
				fontColor: '#1A204B',
				padding: 40,
			},
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
			legend: {
				display: true,
				position: 'bottom',
				align: 'start',
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 20,
				},
			},
		},
	});
}

function circleCreate() {
	var targets = $('.circle_value');

	targets.each(function () {
		value = parseInt($(this).attr('data-value'));
		cLength = parseInt($(this).next().children('.c2').attr('r')) * 2 * Math.PI;
		percent = value * (Math.round(cLength) / 100);

		dasharray = Math.round(percent) + 'px ' + Math.round(cLength) + 'px';
		$(this).next().children('.c2').attr('stroke-dasharray', dasharray);
	});
}

circleCreate();

$('.deposits_active__slider').slick({
	dots: true,
	rows: 2,
});

$('.deposits_active__slider--single').slick({
	dots: true,
});

$('.sidebar__nav_dropdown').on('click', function () {
	$(this).toggleClass('active');
	$('.sidebar__nav').toggleClass('active');
});

$('.input__toggle_pass').on('click', function () {
	event.preventDefault();
	$(this).toggleClass('active');
	if ($(this).hasClass('active')) {
		$(this).closest('.input').find('.input__field').attr('type', 'text');
	} else {
		$(this).closest('.input').find('.input__field').attr('type', 'password');
	}
});

$('.select__list_search').on('input', function () {
	var list = $(this).parent().find('.select__item');
	var str = $(this).val().toLowerCase();
	console.log($(this).val().indexOf(str));
	list.each(function (index) {
		if ($(this).val().toLowerCase().indexOf(str) >= 0) {
			$(this).removeClass('hidden');
		} else {
			$(this).addClass('hidden');
		}
	});
	var hiddenElems = $(this).parent().find('.select__item.hidden');

	list.length == hiddenElems.length
		? list.parent().find('.not_results').removeClass('hidden')
		: list.parent().find('.not_results').addClass('hidden');
});
