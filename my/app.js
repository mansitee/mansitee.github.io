// Generating content based on the template
const template = `<article>
 <h3> <b class='profil'>#POS.</b> NAME</h3>  <img src='data/img/placeholder.png' data-src='data/img/SLUG.jpg' alt='NAME'>
  
  
  <ul><li><span>Cat:</span> <a href='http://js13kgames.com/entries/SLUG'>entries/SLUG</a></li> <li><span>Oleh:</span> <a href='http://WEBSITE/'> <b>AUTHOR</b> - WEBSITE</a></li>
  <li><span>Author:</span> <strong>AUTHOR</strong></li>
   
  </ul>
  
  <ul class="col">
  <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>
  
  <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>
 </ul>
 
</article>`;
let blog = '';
for (let i = 0; i < games.length; i++) {
  let entry = template.replace(/POS/g, (i + 1))
    .replace(/SLUG/g, games[i].slug)
    .replace(/NAME/g, games[i].name)
    .replace(/AUTHOR/g, games[i].author)
    .replace(/TWITTER/g, games[i].twitter)
    .replace(/WEBSITE/g, games[i].website)
    .replace(/GITHUB/g, games[i].github);
     entry = entry.replace('<a href=\'http:///\'></a>', '-');
  blog += entry;
}
document.getElementById('blog').innerHTML = blog;

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sima/sw.js');
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
  const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = games[randomItem].name;
  const notifBody = `Created by ${games[randomItem].author}.`;
  const notifImg = `data/img/${games[randomItem].slug}.jpg`;
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
