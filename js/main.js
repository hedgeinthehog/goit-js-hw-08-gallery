import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');

const galleryMarkup = galleryItems.reduce((gallery, item) => 
	gallery + `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/></a></li>`, ''
);

galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
