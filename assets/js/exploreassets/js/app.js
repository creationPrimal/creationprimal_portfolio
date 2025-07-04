
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

 
  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

 

})()


// going back
document.addEventListener("DOMContentLoaded", () => {
  let goBackBtns = document.querySelectorAll(".goback")
  
  // history back
  goBackBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.history.back();
    })
  })

  // see password
  let codeInputs = document.querySelectorAll('input[type="password"]')
  let seeIcons = document.querySelectorAll('.see');
  let hideIcons = document.querySelectorAll('.hide');
  let isSeen = false;


  seeIcons.forEach(btn => {
    btn.addEventListener("click", () => {
      isSeen = true;
      // show code
      codeInputs.forEach(input => {input.type = "text";})
      updateIcons();
    });
  });
  
  hideIcons.forEach(btn => {
    btn.addEventListener("click", () => {
      isSeen = false;
      // hide code
      codeInputs.forEach(input => {input.type = "password";})
      updateIcons();
    });
  });

  function updateIcons() {
    if (isSeen) {
      // hide all see icons
      seeIcons.forEach(see => {
        see.style.display = "none";
      })
      // show all see icons
      hideIcons.forEach(hide => {
        hide.style.display = "flex";
      }); 
    }
    else {
      // show all see icons
      seeIcons.forEach(see => {
        see.style.display = "flex";
      })
      // hide all see icons
      hideIcons.forEach(hide => {
        hide.style.display = "none";
      }); 
    }
  }

  // Check if the input value starts with '0' and ensure it is not just the zero
  function validateNumber(input) {
    let phoneInputs = document.querySelectorAll(".phoneInput")

    phoneInputs.forEach(input => {
      
      input.addEventListener("input", () => {
        if (input.value.startsWith('0') && input.value.length > 1) {
          alert("Starting with 0 isn't allowed, please enter a valid country code. ☺️");
          input.value = input.value.slice(1);  // Remove the leading '0'
        }
      })

    })
    
  }
  validateNumber();

})



// loading screen shimmer loader
document.addEventListener("DOMContentLoaded", () => {
  let loader = document.querySelector(".shimmerloader")

  if (loader) {
    setTimeout(() => {
      loader.classList.add("removeloader"); // apply fading effect after 250 ms
    }, 250)
    setTimeout(() => {
      loader.remove(); // remove loader after 500ms
    }, 500)
  }
})

// loading screen index loader
document.addEventListener("DOMContentLoaded", () => {
  let loader = document.querySelector(".indexloader")

  if (loader) {
    setTimeout(() => {
      loader.classList.add("removeindexloader"); // apply fading effect after 2000 ms
    }, 200)
    setTimeout(() => {
      loader.remove(); // remove loader after 2500ms
    }, 400)
  }
})

// prevent right click
// document.addEventListener("contextmenu", (event) => {
//   event.preventDefault();
//   alert("Sorry! You can not access context menu! 🙄");
// })

//prevent short cut clicks
document.addEventListener("keydown", (e) => {
  // Block F12 key
  if (e.key === "F12") {
    e.preventDefault();
    alert("Sorry! Developer tools are disabled! 🙄");
  }

  // Block Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
    e.preventDefault();
    alert("Sorry! Developer tools are disabled! 🙄");
  }

  // Block Ctrl+U (view source)
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    alert("Sorry! Viewing source is disabled! 🙄");
  }
});

