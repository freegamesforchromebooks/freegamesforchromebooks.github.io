window.addEventListener('load', () => {
  fetchRepos().then(data => {
    const user = data[0]?.owner;
    document.querySelector('.header img').src = user?.avatar_url;
    document.querySelector('.header h1').textContent = user?.login;
    document.title = user?.login;

    data.forEach(ver => {
      const div = document.createElement('div');
      div.classList.add('version');
      div.classList.add(ver?.name);
      div.addEventListener('click', () => {
        window.open(ver?.homepage, '_self');
      });

      const img = document.createElement('img');
      img.draggable = false;
      
      // Try 'main' branch first[cite: 1]
      const mainUrl = `https://raw.githubusercontent.com/freegamesforchromebooks/${ver?.name}/refs/heads/main/mainmenu.png`;
      const masterUrl = `https://raw.githubusercontent.com/freegamesforchromebooks/${ver?.name}/refs/heads/master/mainmenu.png`;
      
      // Your custom placeholder image URL
      const placeholderUrl = 'https://raw.githubusercontent.com/freegamesforchromebooks/placeholder/refs/heads/main/placeholder.png';

      img.src = mainUrl;
      
      // Fallback chain: main -> master -> custom placeholder
      img.onerror = () => {
        img.onerror = () => {
          img.src = placeholderUrl;
        };
        img.src = masterUrl;
      };

      const a = document.createElement('a');
      a.textContent = ver?.name;

      div.appendChild(img);
      div.appendChild(a);

      document.querySelector('.container').appendChild(div);
      document.body.classList.remove('preload');
    });
  }).catch(err => {
    console.error(err);
    const h1 = document.querySelector('h1.preload');
    h1.textContent = err.stack;
    h1.style.color = 'red';
  });
});
