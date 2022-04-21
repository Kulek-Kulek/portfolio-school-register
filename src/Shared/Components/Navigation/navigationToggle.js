let scrollPosition = 0;

export const navigationToggle = () => {

    const position = document.body.getBoundingClientRect().top;
    const nav = document.querySelector('.navigation');

    nav.classList.add('navigation--active');
    if (position === 0) {

        nav.classList.add('navigation--active');
        scrollPosition = 0;
    }
    if (position >= scrollPosition) {
        nav.classList.add('navigation--active');
        scrollPosition = position;
    } else {

        nav.classList.remove('navigation--active');
        scrollPosition = position;
    }
}

window.addEventListener('scroll', navigationToggle);