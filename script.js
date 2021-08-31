const modal = document.getElementById('modal');
const showModalButton = document.getElementById('show-modal');
const closeModalButton = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteUrlElement = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

const ESC_KEY = 27;

let bookmarks = [];

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

// Build Bookmarks DOM
const buildBookmarks = () => {
  bookmarksContainer.textContent = '';
  bookmarks.forEach((bookmark) => {
    const {name, url} = bookmark;
    const item = document.createElement('li');
    item.classList.add('item');
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  })
};

const fetchBookmarks = () => {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    bookmarks = [
      {
        name: 'Anadea',
        url: 'https://anadea.info',
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// Delete Bookmark

const deleteBookmark = (url) => {
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url === url) {
      bookmarks.splice(index, 1);
    };
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
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

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',  JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameElement.focus();
}
// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
fetchBookmarks();
