// Generating content based on the template
const template = `<article>
<div class='newsfeedbg'>
<div class='card'> <div class='content'> <div class='header'>
 <div class='profile-pic'></div> <div class='detail'> <p class='name'><h3>NAME</h3> </p>
            <p class='posted'> <a href='http://WEBSITE/'>AUTHOR</a> <a href='http://WEBSITE/'>RATING</a> <a href='https://WEBSITE/'>Website✓</a></p> 
          </div> 
        </div>
      </div>
    </div>
  </div> 
</article>`;
let content = '';
for (let i = 0; i < bookmark.length; i++) {
  let entry = template.replace(/POS/g, (i + 1))
    .replace(/SLUG/g, bookmark[i].slug)
    .replace(/NAME/g, bookmark[i].name)
    .replace(/AUTHOR/g, bookmark[i].author)
    .replace(/ITITLE/g, bookmark[i].ititle)
    .replace(/WEBSITE/g, bookmark[i].website)
    .replace(/RATING/g, bookmark[i].rating)
    .replace(/WILAYAH/g, bookmark[i]. wilayah)
.replace(/KORAN/g, bookmark[i]. koran);
  entry = entry.replace('<a href=\'http:///\'></a>', '-');
  content += entry;
}
document.getElementById('content').innerHTML = content;

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Requesting permission for Notifications after clicking on the button
const button = document.getElementById('notifications');
button.addEventListener('click', () => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      randomNotification();
    }
  });
});

// Setting up random Notification
function randomNotification() {
  const randomItem = Math.floor(Math.random() * bookmark.length);
  const notifTitle = bookmark[randomItem].name;
  const notifBody = `Created by ${bookmark[randomItem].author}.`;
  const notifImg = `data/img/${bookmark[randomItem].slug}.jpg`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

// Progressive loading images
const imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}
 