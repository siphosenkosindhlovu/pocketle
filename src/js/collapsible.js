(function () {
  'use strict';
  //Generic togglable collapsible component
  var elements = document.querySelectorAll('.collapsible')

  Array.prototype.forEach.call(elements, function (element) {
    var toggle = element.querySelector('.collapsible-header')
    toggle.onclick = function (event) {
      this.classList.toggle('t-font-bold')
      element.classList.toggle('collapsed')
    }
  })

  //Submenu for the category help page
  var categorie = document.querySelectorAll('.category-header')
  var categories = {}

  Array.prototype.forEach.call(categorie, function (category) {
    categories[category.id] = category.offsetTop;
  })

  //Updating navbar text and highlight active section on scroll
  window.addEventListener('scroll', function (e) {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i in categories) {
      if (categories[i] <= scrollPosition) {
        document.querySelector('.sub-menu__dropdown[for*=submenu]').innerHTML = (document.getElementById(i).textContent)
        console.log(document.querySelector('.sub-menu__dropdown'))
        document.querySelector('.sub-menu__link--selected').classList.remove('sub-menu__link--selected')
        document.querySelector('a[href*=' + i + ']').classList.add('sub-menu__link--selected')
      }
    }
  })
})()
