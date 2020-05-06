/*! project-name v0.0.1 | (c) 2020 Siphosenkosi Ndhlovu | MIT License | http://link-to-your-git-repo.com */
var $plansContainer = document.querySelector('.our-plans')
var $loading = document.querySelector('#infinite-loading')
var $error = document.querySelector('#infinite-error')
var $retry = document.querySelector('#retry')
var lang = document.documentElement.attributes.lang.value
var offset = 0
var limit = 2

function getDocumentHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight
  );
};

function createElement(tag, attributes, children) {
  var element = document.createElement(tag)
  if (attributes) {
    var attr = Object.keys(attributes)
    attr.forEach((function (attribute) {
      element.setAttribute(attribute, attributes[attribute])
    }))
  }
  if (children && typeof children !== 'string') {
    console.log(typeof children)
    children.forEach((function (child) {
      console.log(typeof child + "F CONDITION")
      if (typeof child !== 'string' && typeof child !== 'number' && Boolean(child)) {
        console.log(child + "F CONDITION")
        element.appendChild(child)
      } else {
        element.appendChild(document.createTextNode(child))
      }
    }))
  } else {
    element.appendChild(document.createTextNode(children))
  }
  return element
}

function getScrollTop() {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getStories() {
  return fetch(`assets/js/stories.${lang}.json`).then(
    res => res.json()
  ).then(data => data.slice(offset, offset + limit))
}

function imageElement({ src, altText }) {
  return createElement('div', { class: 'our-plans__image' }, [
    createElement('div', { class: 'our-plans__image-container' }, [
      createElement('img', { src: src, alt: altText })
    ])
  ])
}

function textElement({ body, date, heading, picture }) {
  return createElement('div', { class: 'our-plans__text' }, [
    createElement('div', { class: 'our-plans__date' }, [date]),
    imageElement(picture),
    createElement('h2', {}, [
      heading
    ]),
    createElement('div', { class: 'deck' }, body.map(paragraph =>
      createElement('p', {}, paragraph)
    ))
  ])
}

function segment(story) {
  return createElement('div', { class: 'our-plans__segment' }, [
    imageElement(story.picture),
    textElement(story)
  ])
}

function addSegments() {
  $loading.classList.add('t-block')
  $loading.classList.remove('t-hidden')
  getStories().then(stories => {
    console.log(stories);
    setTimeout((function () {
      stories.forEach(story => {
        $plansContainer.appendChild(segment(story))
      })
      $loading.classList.add('t-hidden')
      $loading.classList.remove('t-block')
      $error.classList.add('t-hidden')
      $error.classList.remove('t-block')
      offset += limit
    }), 600)
  }).catch(error => {
    console.log(error)
    $loading.classList.add('t-hidden')
    $loading.classList.remove('t-block')
    $error.classList.add('t-block')
    $error.classList.remove('t-hidden')
  })
}
$retry.onclick = function (e) {
  e.preventDefault();
  addSegments()
}
window.onscroll = () => {
  if (getScrollTop() < getDocumentHeight() - window.innerHeight) {
    return
  }
  console.log(offset)
  addSegments()
}