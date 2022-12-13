const header = document.querySelector('header')
const hero = document.getElementById('hero')
const video = document.getElementById('videoBg')
const marquee = document.querySelector('.headerOffset')
const menuTitleTop = document.getElementById('menuTitleTop')
const menuTitleBottom = document.getElementById('menuTitleBottom')
const mobileMenuLogo = document.getElementById('mobileMenuLogo')

if (hero) hero.style.paddingTop = `${header.offsetHeight}px`;
if (video) video.style.marginTop = `${(header.offsetHeight / 2) + 1}px`; // +1 is there to cover a border
if (marquee) marquee.style.marginTop = `${header.offsetHeight}px`;
if (mobileMenuLogo)  mobileMenuLogo.style.top = `${window.innerHeight - mobileMenuLogo.offsetHeight}px`
if (menuTitleBottom)  menuTitleBottom.style.top = `${(window.innerHeight - menuTitleBottom.offsetHeight) - 10}px`

window.addEventListener("resize", function () {
	if (hero) hero.style.paddingTop = `${header.offsetHeight}px`;
	if (video) video.style.marginTop = `${(header.offsetHeight / 2) + 1}px`; // +1 is there to cover a border
	if (marquee) marquee.style.marginTop = `${header.offsetHeight}px`;
	if (mobileMenuLogo) mobileMenuLogo.style.top = `${window.innerHeight - mobileMenuLogo.offsetHeight}px`
	if (menuTitleBottom) menuTitleBottom.style.top = `${(window.innerHeight - menuTitleBottom.offsetHeight) - 10}px`	
});

let mobileMenu = document.getElementById('menu')
let mobileMenuItems = document.querySelectorAll('#menu li a')
let closeMobileMenu = document.querySelector('#menuToggle input')
const desktopMenuItems = document.querySelectorAll('#desktopMenu a')

setTimeout(() => {
	mobileMenu.classList.remove('hidden')	
}, 500);

mobileMenuItems.forEach((el) => { 
	el.addEventListener('click', () => { 
		closeMobileMenu.checked = false		
	})
})

openAccordionItem(desktopMenuItems)
openAccordionItem(mobileMenuItems)

function openAccordionItem(menuItems)
{ 
	menuItems.forEach(i => {
		i.addEventListener('click', () => {
			let itemToOpen = i.getAttribute("href")

			// Bad fix. This was added so that the HTML stays the same. 		
			if (itemToOpen == '#contact-info') {
				itemToOpen = '#contact'
			}

			let accordionBtn = document.querySelector(`${itemToOpen} button`)
			accordionBtn.click()
		})
	})
}


// Modal
const modalTriggers = document.querySelectorAll('.popup-trigger')
const modalCloseTrigger = document.querySelector('.popup-modal__close')
const bodyBlackout = document.querySelector('.body-blackout')

modalTriggers.forEach(trigger => {
	trigger.addEventListener('click', () => {
	
		let { popupTrigger } = trigger.dataset
		let { fileName } = trigger.dataset 
		
		showModal(popupTrigger, fileName)		
	})
})

function showModal(popupTrigger, fileName) { 
	let popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)

	popupModal.classList.add('is--visible')
	bodyBlackout.classList.add('is-blacked-out')

	popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
		popupModal.classList.remove('is--visible')
		bodyBlackout.classList.remove('is-blacked-out')
	})

	bodyBlackout.addEventListener('click', () => {
		popupModal.classList.remove('is--visible')
		bodyBlackout.classList.remove('is-blacked-out')
	})
	let passInput = popupModal.querySelector('input')
	let downloadBtn = popupModal.querySelector('button')
	passInput.focus()

	passInput.addEventListener('input', () => {

		if (passInput.value.length > 0) {
			downloadBtn.disabled = false
		} else {
			downloadBtn.disabled = true
		}

	})

	downloadBtn.addEventListener('click', () => {
		
		fetch("/site/downloads.php", {
			method: 'POST',
			//headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				file: fileName,
				password: passInput.value,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("HTTP error " + response.status);
				}
				return response.json(); // or .text(), .arrayBuffer(), ...
			})
			.then(data => {
				if (data.success) {

					passInput.value = ''; // ADD IN SUCCESS
					let modalContent = popupModal.querySelector('.modalContent')
					let dlInProgress = popupModal.querySelector('.dlInProgress')
					let dlCompleted = popupModal.querySelector('.dlCompleted')
					
					var base64str = data.pdf;
					// decode base64 string, remove space for IE compatibility
					var binary = atob(base64str.replace(/\s/g, ''));
					var len = binary.length;
					var buffer = new ArrayBuffer(len);
					var view = new Uint8Array(buffer);
					for (var i = 0; i < len; i++) {
						view[i] = binary.charCodeAt(i);
					}
					// create the blob object with content-type "application/pdf"               
					var blob = new Blob([view], { type: "application/pdf" });
					var url = URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.style.display = 'none';
					a.href = url;
					a.download = fileName;
					document.body.appendChild(a);
					a.click();
					window.URL.revokeObjectURL(url); 

					modalContent.classList.add('hidden')

					dlInProgress.classList.remove('hidden')

					setTimeout(() => {
						dlInProgress.classList.add('hidden')
						dlCompleted.classList.remove('hidden')
					}, 2300);

					setTimeout(() => {
						modalCloseTrigger.click()

						setTimeout(() => {
							dlInProgress.classList.add('hidden')
							dlCompleted.classList.add('hidden')
							modalContent.classList.remove('hidden')
						}, 1000);

					}, 3000);


				} else { 
					let modalTitle = document.querySelector('.modalContent h4')
					let responseContainer = document.getElementById('responseContainer')
					modalTitle.classList.add('hidden')
					responseContainer.innerHTML = data.msg
				}
				

				console.log(data.success)
				console.log(data)
				console.log(JSON.stringify(data));
			})
			.catch(error => {
				console.log(data)
				console.error(error.message);
			});
	})
}
// // Modal


// Accordion
const items = document.querySelectorAll(".accordion > button");

function toggleAccordion() {
	const itemToggle = this.getAttribute('aria-expanded');
	let closestSection = this.closest('section');
	let sectionsSticky = closestSection.querySelectorAll('.stickyContainer')

	for (i = 0; i < items.length; i++) {
		//items[i].setAttribute('aria-expanded', 'false');
	}
	this.setAttribute('aria-expanded', 'false');
	closestSection.classList.remove('accordionOpen')
	
	if (sectionsSticky) { 
		sectionsSticky.forEach((s) => {
			if (itemToggle == 'false') {
				s.classList.remove('stickyHidden')
			} else { 
				s.classList.add('stickyHidden')
			}
		});
	}
	
	if (itemToggle == 'false') {
		this.setAttribute('aria-expanded', 'true');
		closestSection.classList.add('accordionOpen')
	} 

	let teamMarquee = document.querySelector('.teamMarquee')
	if (closestSection.id == 'team' && teamMarquee) {
		teamMarquee.classList.toggle('hidden')
	}

	let contactMarquee = document.querySelector('.contactMarquee')
	if (closestSection.id == 'contact' && contactMarquee) {
		contactMarquee.classList.toggle('hidden')
	}

}

items.forEach(item => item.addEventListener('click', toggleAccordion));
// // Accordion



