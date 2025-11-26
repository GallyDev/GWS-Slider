
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
					left: slides[0].clientWidth * (page.index + (options.infinite ? 1 : 0)),
					behavior: 'smooth'
				});
				clearInterval(slider.sliderInterval);
			});
			if (index === 0) {
				page.classList.add('active');
			}
			pager.appendChild(page);
		});
		if(options.pager
		&& slides.length > 1)
			slider.parentNode.insertBefore(pager, slider.nextSibling);

		const controls = document.createElement('div');
		controls.classList.add('gws-controls');
		slider.controls = controls;

		const prevButton = document.createElement('button');
		prevButton.classList.add('gws-prev');
		prevButton.addEventListener('click', () => {
			slider.current--;
			if (slider.current < 0) {
				if(options.infinite && options.carousel)
					slider.current = -1;
				else if(options.carousel)
					slider.current = slides.length - 1;
				else
					slider.current = 0;
			}
			slider.scrollTo({
				left: slides[0].clientWidth * (slider.current + (options.infinite ? 1 : 0)),
				behavior: 'smooth'
			});
			if(slider.current < 0){
				setTimeout(() => {
					slider.scrollTo({
						left: slides[0].clientWidth * (slides.length),
						behavior: 'instant'
					});
				}, 300);
			};
			clearInterval(slider.sliderInterval);
		});
		const nextButton = document.createElement('button');
		nextButton.classList.add('gws-next');
		nextButton.addEventListener('click', () => {
			slider.current++;
			if (slider.current >= slides.length) {
				if(options.infinite && options.carousel)
					slider.current = slides.length;
				else if(options.carousel)
					slider.current = 0;
				else
					slider.current = slides.length - 1;
			}
			const slide = slides[slider.current];
			slider.scrollTo({
				left: slides[0].clientWidth * (slider.current + (options.infinite ? 1 : 0)),
				behavior: 'smooth'
			});
			if(slider.current >= slides.length){
				setTimeout(() => {
					slider.scrollTo({
						left: slides[0].clientWidth * (0 + (options.infinite ? 1 : 0)),
						behavior: 'instant'
					});
				}, 300);
			};
			clearInterval(slider.sliderInterval);
		});
		controls.appendChild(prevButton);
		controls.appendChild(nextButton);
		if(options.controls
		&& slides.length > 1)
			slider.parentNode.insertBefore(controls, slider.nextSibling);
		

		if (options.autoplay) {
			slider.sliderInterval = setInterval(() => {
				slider.current++;
				if (slider.current >= slides.length) {
					if(options.infinite)
						slider.current = slides.length;
					else
						slider.current = 0;
				}
				slider.scrollTo({
					left: slides[0].clientWidth * (slider.current + (options.infinite ? 1 : 0)),
					behavior: 'smooth'
				});
				if(slider.current >= slides.length){
					setTimeout(() => {
						slider.scrollTo({
							left: slides[0].clientWidth * (0 + (options.infinite ? 1 : 0)),
							behavior: 'instant'
						});
					}, 300);
				};
			}, options.autoplay === true ? 3000 : parseInt(options.autoplay));
		}

		if (options.infinite) {
			const firstSlide = slides[0];
			const lastSlide = slides[slides.length - 1];
			const firstClone = firstSlide.cloneNode(true);
			const lastClone = lastSlide.cloneNode(true);
			slider.appendChild(firstClone);
			slider.insertBefore(lastClone, firstSlide);
			slider.scrollLeft = firstSlide.clientWidth;
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