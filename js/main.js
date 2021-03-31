import gallery from './default.js';

const galleryList = document.querySelector('.js-gallery');

gallery.forEach((el,index) => {
  const listRef = `<li class= gallery__item>
<a
  class=gallery__link
  href=${el.original}
>
  <img
    class=gallery__image
    src=${el.preview}
    data-source=${el.original}
    data-index=${index}
    alt=${el.description}
  />
</a>
</li>`;
  galleryList.insertAdjacentHTML('beforeend', listRef);
});
const galleryModal = document.querySelector('.js-lightbox');
const bigPicture = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');
const closeButton = document.querySelector('.lightbox__button');

const makeMarkupModal = (e) => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  bigPicture.src = e.target.dataset.source;
  bigPicture.alt = e.target.alt;
  onModalOpen();
};
const onModalOpen = () =>{
  window.addEventListener('keydown',onEscClick);
  window.addEventListener('keydown', onArrowClick)
  galleryModal.classList.add('is-open')
}

const closeModal = (e) =>{
  galleryModal.classList.remove('is-open')
  galleryModal.scr = "";
  galleryModal.alt = "";
  window.removeEventListener('keydown', onEscClick)
  window.removeEventListener('keydown', onArrowClick)
}

const onEscClick = e =>{
  if (e.key === "Escape"){
    closeModal();
  }
}
// const onOverlayClick = e => {
//   if(e.target === "overlay"){
//     closeModal();
//   }
// }


const onArrowClick = e =>{
  let i = +e.target.firstElementChild.dataset.index;
  if (e.key === "ArrowLeft" &&  i> 0){
    i-=1 
    slider(e, i)
  }
  else if (e.key === "ArrowLeft" &&  i === 0){
    i = gallery.length -1
    slider(e, i)
  }

  if (e.key === "ArrowRight" && i < gallery.length -1){
    i+=1 
    slider(e, i)
  }
  else if (e.key === "ArrowRight" &&  i === gallery.length -1){
    i = 0
    slider(e, i)
  }
}

const slider = (e, index)=>{
  e.target.firstElementChild.dataset.index = index;
  bigPicture.src = gallery[index].original
}



galleryList.addEventListener('click', makeMarkupModal);
closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal)