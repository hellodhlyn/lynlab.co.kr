(function () {
  const theme = localStorage.getItem('lynlab.theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
}());
