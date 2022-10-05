window.addEventListener('scroll', () => {
    let nav =document.querySelector('nav')
    nav.classList.toggle('window-scroll', window.scrollY > 0)
});
