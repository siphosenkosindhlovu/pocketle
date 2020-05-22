(function () {
  //Module to update list of stories as infinite loading

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
      attr.forEach(function (attribute) {
        element.setAttribute(attribute, attributes[attribute])
      })
    }
    if (children && typeof children !== 'string') {
      children.forEach(function (child) {
        if (typeof child !== 'string' && typeof child !== 'number' && Boolean(child)) {
          element.appendChild(child)
        } else {
          element.appendChild(document.createTextNode(child))
        }
      })
    } else {
      element.appendChild(document.createTextNode(children))
    }
    return element
  }

  function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  //Uses the fetch API to get the stories from a JSON file
  function getStories() {
    return fetch(`assets/js/stories.${lang}.json`).then(function (res) {
      return res.json()
    }
    ).then(function (data) { return data.slice(offset, offset + limit) })
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
      createElement('div', { class: 'deck' }, body.map(function (paragraph) {
        return createElement('p', {}, paragraph)
      }
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
    getStories().then(function (stories) {
      //Timeout so that the elements don't immediately load when the user hits the bottom of the page.
      setTimeout(function () {
        stories.forEach(function (story) {
          $plansContainer.appendChild(segment(story))
        })
        $loading.classList.add('t-hidden')
        $loading.classList.remove('t-block')
        $error.classList.add('t-hidden')
        $error.classList.remove('t-block')
        offset += limit
      }, 600)
    }).catch(function (error) {
      $loading.classList.add('t-hidden')
      $loading.classList.remove('t-block')
      $error.classList.add('t-block')
      $error.classList.remove('t-hidden')
    })
  }
  $retry.addEventListener('click', function (e) {
    e.preventDefault();
    addSegments()
  })
  window.addEventListener('scroll', function () {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) {
      return
    }
    addSegments()
  })
})()