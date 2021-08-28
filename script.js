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
  const key = evt.key || evt.keyCode;
  if (key === 'Escape' || key === 'Esc' || key === ESC_KEY) {
    evt.preventDefault();
    closeModal();
  }
});

// Validate Form
const validateUrl = (nameValue, urlValue) => {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields');
    return false;
  }

  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address');
    return false;
  }

  // Valid
  return true;
}

const storeBookmark = (evt) => {
  evt.preventDefault();
  const nameValue = websiteNameElement.value;
  let urlValue = websiteUrlElement.value;
  if (!urlValue.includes('http://') || !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }
  
  if (!validateUrl(nameValue, urlValue)) {
    return false;
  }
}
// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
