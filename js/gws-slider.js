
const gwsSliders = document.querySelectorAll('.gws-slider,[gws-slider]');

window.addEventListener('load', () => {
	gwsSliders.forEach(slider => {
		slider.scrollLeft = 0;
		
		const slides = slider.querySelectorAll('&>*');
		const options = {};
		(slider.getAttribute('gws-slider')??"" + " " + slider.className).split(' ').forEach(option => {
			if(option.trim() === '') return;
			option = option.split('-');
			options[option[0]] = option[1] ?? true;
		});

		slider.slides = slides;
		slider.options = options;
		slider.current = 0;

		const pager = document.createElement('div');
		pager.classList.add('gws-pager');
		slider.pager = pager;

		slides.forEach((slide, index) => {
			const page = document.createElement('span');
			page.index = index;

			page.addEventListener('click', () => {
				slider.scrollTo({
					left: page.index * slides[0].clientWidth,
					behavior: 'smooth'
				});
				clearInterval(slider.sliderInterval);
			});
			if (index === 0) {
				page.classList.add('active');
			}
			pager.appendChild(page);
		});
		if(options.pager) slider.parentNode.insertBefore(pager, slider.nextSibling);

		const controls = document.createElement('div');
		controls.classList.add('gws-controls');
		slider.controls = controls;

		const prevButton = document.createElement('button');
		prevButton.classList.add('gws-prev');
		prevButton.addEventListener('click', () => {
			slider.current--;
			if (slider.current < 0) {
				slider.current = 0;
			}
			slider.scrollTo({
				left: slider.current * slides[0].clientWidth,
				behavior: 'smooth'
			});
			clearInterval(slider.sliderInterval);
		});
		const nextButton = document.createElement('button');
		nextButton.classList.add('gws-next');
		nextButton.addEventListener('click', () => {
			slider.current++;
			if (slider.current >= slides.length) {
				slider.current = slides.length - 1;
			}
			const slide = slides[slider.current];
			slider.scrollTo({
				left: slider.current * slides[0].clientWidth,
				behavior: 'smooth'
			});
			clearInterval(slider.sliderInterval);
		});
		controls.appendChild(prevButton);
		controls.appendChild(nextButton);
		if(options.controls) slider.parentNode.insertBefore(controls, slider.nextSibling);
		

		if (options.autoplay) {
			slider.sliderInterval = setInterval(() => {
				slider.current = (slider.current + 1) % slides.length;
				slider.scrollTo({
					left: slider.current * slides[0].clientWidth,
					behavior: 'smooth'
				});
			}, options.autoplay === true ? 3000 : parseInt(options.autoplay));
		}

		slider.addEventListener('scroll', () => {
			const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
			let closestSlide = null;
			let minDistance = Infinity;
			let closestIndex = 0;

			const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
			const tolerance = 5; 

			if (slider.scrollLeft <= tolerance) {
				closestIndex = 0;
			} else if (slider.scrollLeft >= maxScrollLeft - tolerance) {
				closestIndex = slides.length - 1;
			} else {
				slides.forEach((slide, index) => {
					const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
					const distance = Math.abs(sliderCenter - slideCenter);
					if (distance < minDistance) {
						minDistance = distance;
						closestSlide = slide;
						closestIndex = index;
					}
				});
			}

			slider.current = closestIndex;
			

			pager.querySelectorAll('span.active').forEach(ap => ap.classList.remove('active'));
			pager.children[closestIndex].classList.add('active');
		});
		
		slider.addEventListener('wheel', () => {
			clearInterval(slider.sliderInterval);
		});
		slider.addEventListener('touchstart', () => {
			clearInterval(slider.sliderInterval);
		});

	});
});