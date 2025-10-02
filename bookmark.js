javascript:(function(){
  fetch('https://raw.githubusercontent.com/bittt0/Cee/main/main.js')
    .then(response => response.text())
    .catch(err => console.error('Error loading script:', err));
})();
