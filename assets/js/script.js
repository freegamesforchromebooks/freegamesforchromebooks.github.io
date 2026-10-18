window.addEventListener('load', () => {
  fetchRepos().then(data => {
    if (!data || data.length === 0) return;
    
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
      
      // Dynamically use the repo's real default branch from the GitHub API (falls back to 'main')
      const branch = ver?.default_branch || 'main';
      const imageUrl = `https://raw.githubusercontent.com/freegamesforchromebooks/${ver?.name}/${branch}/mainmenu.png`;
      
      // Your exact requested placeholder image URL
      const placeholderUrl = 'https://raw.githubusercontent.com/freegamesforchromebooks/placeholder/refs/heads/main/placeholder.png';

      img.src = imageUrl;

      // Automatically fallback to your placeholder if the image returns a 404
      img.onerror = () => {
        img.src = placeholderUrl;
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
