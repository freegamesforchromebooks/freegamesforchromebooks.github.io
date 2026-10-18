window.addEventListener('load', () => {
  fetchRepos().then(data => {
    if (!data || data.length === 0) {
      throw new Error("No repositories found! Check if 'mcwp' topic is set on GitHub.");
    }
    
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
      
      const branch = ver?.default_branch || 'main';
      const imageUrl = `https://raw.githubusercontent.com/freegamesforchromebooks/${ver?.name}/${branch}/mainmenu.png`;
      const placeholderUrl = 'https://raw.githubusercontent.com/freegamesforchromebooks/placeholder/refs/heads/main/placeholder.png';

      img.src = imageUrl;

      // If the game's mainmenu.png fails to load, use your placeholder
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
    // This will print any error message directly onto your phone screen in red text:
    const h1 = document.querySelector('h1.preload') || document.createElement('h1');
    h1.className = 'preload';
    h1.textContent = "Error: " + err.message;
    h1.style.color = 'red';
    h1.style.fontSize = '18px';
    h1.style.padding = '20px';
    if (!document.body.contains(h1)) {
      document.body.appendChild(h1);
    }
    document.body.classList.remove('preload');
  });
});
