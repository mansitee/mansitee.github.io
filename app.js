// Generating content based on the template
const template = `<article>
<div class='newsfeedbg'>
<div class='card'> <div class='content'> <div class='header'>
 <div class='profile-pic'></div> <div class='detail'> <p class='name'><h3>NAME</h3> </p>
            <p class='posted'><strong>AUTHOR</strong> - <a href='http://WEBSITE/'>WEBSITE</a> </p>
          </div>
        </div> <div class='desc'> 
           
        KORAN </div>
        <div class='tags'>
          <span><a href='https://mansitee.github.io/page/SLUG'>App://entries/SLUG</a> </span> </div>
        <div class='footer'>
          <div class='like'>
            <span><a href='https://twitter.com/TWITTER'>@TWITTER</a></span>
          </div>
          <div class='comment'>
            <span> ----</span>
          </div>
          <div class='share'>
          <span><a href='WEBSITE'>✓lihat</a></span>
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
    .replace(/WEBA/g, bookmark[i].WEBA)
    .replace(/GITHUB/g, bookmark[i]. github)
.replace(/KORAN/g, bookmark[i]. koran);
  entry = entry.replace('<a href=\'http:///\'></a>', '-');
  content += entry;
}
document.getElementById('content').innerHTML = content;

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
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
 