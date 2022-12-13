// Sticky
let stickyContainers = document.querySelectorAll('.stickyContainer')
let stickyContainersLeft = document.querySelectorAll('.stickyContainer.left')
let stickyContainersRight = document.querySelectorAll('.stickyContainer.right')
let stickyElements = document.querySelectorAll('.stickyElement')

stickyContainers.forEach((container) => {
	let stickyElement = container.querySelector('.stickyElement')
	if (container.classList.contains('left')) {	
		
		stickyElement.style.left = `-${parseFloat(stickyElement.getBoundingClientRect().left) - parseFloat(stickyElement.dataset.offset)}px`				
		setTimeout(() => {
		}, 100);
	} else {			
		setTimeout(() => {			
			let offsetStickyBy = `${parseFloat(stickyElement.getBoundingClientRect().right) + parseFloat(stickyElement.dataset.offset)}`
			stickyElement.style.right = `${parseFloat(stickyElement.getBoundingClientRect().right) - parseFloat(offsetStickyBy)}px`				
		}, 100);
	}
	//stickyElement.style.left = `-${stickyElement.getBoundingClientRect().left - offsetStickyBy}px`
})

positionStickyElements()

window.addEventListener('scroll', () => {	
	positionStickyElements()	
})

function positionStickyElements() { 

	stickyContainers.forEach((container) => {

		let stickyElement = container.querySelector('.stickyElement')

		let position = (window.innerHeight / 2) + container.getBoundingClientRect().height

		if (container.getBoundingClientRect().top < 0) {
			position = (window.innerHeight / 2) + Math.abs(container.getBoundingClientRect().top)
		}

		let parent = document.querySelector(`#${stickyElement.dataset.parent}`)
		let parentMarginTop = parseFloat(window.getComputedStyle(parent, null).getPropertyValue('margin-top'))
		let parentMarginBottom = parseFloat(window.getComputedStyle(parent, null).getPropertyValue('margin-bottom'))
		let parentPaddingTop = parseFloat(window.getComputedStyle(parent, null).getPropertyValue('padding-top'))
		let parentPaddingBottom = parseFloat(window.getComputedStyle(parent, null).getPropertyValue('padding-bottom'))
		
		let calculatedOffset = ((parent.getBoundingClientRect().height) - parentMarginTop - parentPaddingTop - parentMarginBottom - parentPaddingBottom) - (stickyElement.offsetWidth)
					
		if (position > calculatedOffset) {
			stickyElement.classList.add('stickyHidden')

			// At the end of each container there is an issue where "hidden" is added and removed fast. This "fixes" it.
			// PROBLEM: The issue occured due to hidden and getBoundingClientRect. When it was hidden the getBoundingClientRect was 0
			// SOLUTION: Used visibility: 0 instead
			/* if (parent.id == 'hero') {
				if (window.scrollY > 2000) {
					stickyElement.classList.add('hidden')
				}
			}
			if (parent.id == 'manifesto') {
				if (window.scrollY > 6000) {
					stickyElement.classList.add('hidden')
				}
			} 
			if (parent.id == 'team') {
				if (window.scrollY > 9000) {
					stickyElement.classList.add('hidden')
				}
			}  */			
			
		} else {
			stickyElement.classList.remove('stickyHidden')
			//stickyElement.classList.remove('hidden')
		}

		stickyElement.style.top = `${position}px`
	})
}
// // Sticky

// Marquee
function Marquee(selector, speed) {
	//TODO: if prefers-reduced-motion stop this
	const parentSelector = document.querySelectorAll(selector);

	parentSelector.forEach((el) => {
		let clone = el.innerHTML;
		let firstElement = el.children[0];
		let i = 0;

	/* 		el.insertAdjacentHTML('beforeend', clone);
		el.insertAdjacentHTML('beforeend', clone);
		el.insertAdjacentHTML('beforeend', clone);
		el.insertAdjacentHTML('beforeend', clone); */

		setInterval(function () {
			firstElement.style.marginLeft = `-${i}px`;
			if (i > firstElement.clientWidth) {
				//i = 0; // removed due to removed insertAdjacent because it lagged and skipped. Added as a long html. Not the best solution.
			}
			i = i + speed;
		}, 0);
	});
}

window.addEventListener('load', Marquee('.marquee', .5))
// // Marquee

// Fade ins
let observerOptions = {
	rootMargin: '0px',
	threshold: 0.2
}

var observer = new IntersectionObserver(observerCallback, observerOptions);

function observerCallback(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {

			let delay = entry.target.getAttribute('data-delay')
			if (!delay || delay == 'undefined') delay = 0

			setTimeout(() => {
				entry.target.classList.add('inView')
			}, delay);

		} else { 
			//entry.target.classList.remove('inView')
		}
	});
};

let target = '.animate';
document.querySelectorAll(target).forEach((i) => {
	if (i) {
		observer.observe(i);
	}
});
// // Fade ins







