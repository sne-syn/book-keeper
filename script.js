const modal = document.getElementById('modal');
const showModalButton = document.getElementById('show-modal');
const closeModalButton = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

const ESC_KEY = 27;

// Show Modal, Focus on Input
const showModal = () => {
  modal.classList.add('show-modal');
  websiteNameElement.focus();
};

const closeModal = () => {
  modal.classList.remove('show-modal');
};

// Modal Event Listener
showModalButton.addEventListener('click', showModal);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('click', (evt) => evt.target === modal ? closeModal() : false);
window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closeModal();
  }
});
