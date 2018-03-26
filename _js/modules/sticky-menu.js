// Maybe use a ready module? https://github.com/markgoodyear/headhesive.js

function stickyMenu(className) {
  const classNameWithDot = '.' + className + '';
  const header = document.querySelector(classNameWithDot);

  if (!header) {
    return;
  }

  const headerHeight = getComputedStyle(header).height.split('px')[0];
  const prepareClass = className + '--prepare';
  const stickyClass = className + '--stick';

  window.addEventListener('scroll', function stickyScroll(e) {

    // if (window.screen.width < 767) {
    //   return;
    // }

    const bottomLimit = parseInt(headerHeight / 2)
    const upperLimit = bottomLimit * 2

    if (window.pageYOffset > bottomLimit) {
      header.classList.add(prepareClass);
    }

    if (window.pageYOffset > upperLimit) {
      header.classList.add(stickyClass);
    }

    if (window.pageYOffset < upperLimit) {
      header.classList.remove(stickyClass);
    }

    if (window.pageYOffset < bottomLimit) {
      header.classList.remove(prepareClass);
    }
  }, false);

}

module.exports = stickyMenu;
