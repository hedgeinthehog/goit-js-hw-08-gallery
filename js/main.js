import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImgRef = lightboxRef.querySelector('img');
const lightboxCloseBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const lightboxOverlayRef = document.querySelector('.js-lightbox__overlay');
let galleryItemsIndexCount; 
let activeItemIndex;


createGalleryMarkup();
galleryRef.addEventListener('click', onItemClick);
lightboxCloseBtnRef.addEventListener('click', onCloseLightbox);
lightboxOverlayRef.addEventListener('click', onOverlayClick);


function createGalleryMarkup() {
	galleryItemsIndexCount = galleryItems.length-1;
	const galleryMarkup = galleryItems.reduce((gallery, item, index) => 
	gallery + `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" data-index="${index}"/></a></li>`, ''
	);
	galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
};

function onItemClick (event) {
	event.preventDefault();
	
	if (event.target.nodeName != 'IMG') return;

	activeItemIndex = Number(event.target.dataset.index);
	lightboxImgRef.src = event.target.dataset.source;
	openLightbox();
};

function openLightbox() {
	window.addEventListener('keydown', onPressEscape);
	window.addEventListener('keydown', onPressArrow)
	
  lightboxRef.classList.add('is-open');
}; 

function onCloseLightbox() {
	window.removeEventListener('keydown', onPressEscape);
	window.removeEventListener('keydown', onPressArrow)

	lightboxRef.classList.remove('is-open');
	lightboxImgRef.src = "";
};

function onOverlayClick(event) {
	if (event.target === event.currentTarget) {
		onCloseLightbox();
	}
};

function onPressEscape(event) {
	if (event.code === 'Escape') {
		onCloseLightbox();
	};
};

function onPressArrow(event) {
	if (event.code === 'ArrowRight') {
		const nextIndex = (activeItemIndex + 1) > galleryItemsIndexCount ? 0 : activeItemIndex + 1;
		showNextItem(nextIndex);
	};

  if (event.code === 'ArrowLeft') {
		const nextIndex = (activeItemIndex - 1) < 0 ? galleryItemsIndexCount : activeItemIndex - 1;
		showNextItem(nextIndex);
	};	
};

function showNextItem(newIndex) {
	activeItemIndex = newIndex;
	const nextItemref = document.querySelector(`img[data-index="${newIndex}"]`);
	lightboxImgRef.src = nextItemref.dataset.source;
};