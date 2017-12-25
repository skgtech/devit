// Maybe use a ready module? https://github.com/markgoodyear/headhesive.js

function stickyMenu(className) {
  const classNameWithDot = '.' + className + '';
  const header = document.querySelector(classNameWithDot);

  if (!header) {
    return;
  }

  const header_height = getComputedStyle(header).height.split('px')[0];
  const fix_class = className + '--sticky';

  function stickyScroll(e) {
    if (window.pageYOffset > header_height) {
      header.classList.add(fix_class);
    }

    if (window.pageYOffset < header_height) {
      header.classList.remove(fix_class);
    }
  }

  window.addEventListener('scroll', stickyScroll, false);

}

module.exports = stickyMenu;
