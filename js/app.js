window.onload = function () {
  var hostName = window.location.host;
  var hostDev;
  if(hostName == "uxdev.etribe.co.kr") {
    hostDev = "https://uxdev.etribe.co.kr/uxg-dev";
  } else {
    hostDev = '..';
  }
  // init();
  codeMirror();
  // setCopyrightYear();
  gnbActiveStyle();
  setGnb(`${hostDev}/js/menu.json`, '.uid-nav-dev');
  // setGnb('../js/menu_usability.json', '.uid-nav-usability');
  setGnb(`${hostDev}/js/menu_a11y.json`, '.uid-nav-a11y');
  setGnb(`${hostDev}/js/menu_showroom.json`, '.uid-nav-showroom');
  setGnb(`${hostDev}/js/menu_components.json`, '.uid-nav-components');
  setTimeout(() => {
    sliderComponent();
    detailsComponent();
    datalistComponent();
    clipboardWriteText();
  }, 2000);
	lnbActive();
	test();
}

const setCopyrightYear = function() {
  const date = new Date();
  const year = date.getFullYear();
  const copyright = document.querySelector('.ui-copyright');
  copyright.textContent = year;
}
const setGnb = async function(jsonFile, navClass) {
  const response = await fetch(jsonFile);
  const results = await response.json()
  const navigation = document.querySelector(navClass);
  if(navigation === null) {
    return false;
  }
  const url = window.location.pathname;
  const filename = url.substring(url.lastIndexOf('/')+1).slice(0, -5);
	let divEl = document.createElement('div')
	divEl.classList.add('uid-nav-scroll')
  let ulEl = document.createElement('ul');

  results.forEach(item => {
    let li = document.createElement('li')
    li.innerHTML = `<strong>${item.depth1}</strong>`;
		
    if(item.subDepth) {
      let ul = document.createElement('ul')
      ul.classList.add('submenu');
      /* No need to sort menus
      item.subDepth.sort((a, b) => {
        let fa = a.depth2.toLowerCase(),
        fb = b.depth2.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      */

      item.subDepth.forEach(smenu => {
        let sli = document.createElement('li')
        sli.innerHTML = `<a href="${smenu.link}.html" class="${smenu.status ? smenu.status : ''}">${smenu.depth2}</a>`;
        let smenuLinks = smenu.link.split('/')
        if(smenuLinks[smenuLinks.length - 1] === filename) {
          sli.innerHTML = `<a href="${smenu.link}.html" aria-current="page">${smenu.depth2} ${smenu.status ? `<span class="status">${smenu.status}</span>` : ''}</a>`;
        }
        ul.appendChild(sli)
      })
      li.appendChild(ul)
    }
		if(item.depth1 !== 'Showroom') {
			li.classList.add('hide')
			const strong = li.querySelector('strong')
			const span = document.createElement('span')
			span.classList.add('toggle-btn')
			strong.appendChild(span)

			strong.addEventListener('click', (e) => {
				const targetSubmenu = e.target.closest('li')
				const subMenus = Array.from(e.target.closest('ul').children);

				subMenus.forEach(menu => {
					if(menu.textContent === 'Showroom현황판') return
					if(menu === targetSubmenu) {
						menu.classList.toggle('show')
						menu.classList.toggle('hide')
					}else {
						menu.classList.add('hide')
						menu.classList.remove('show')
					}
				})
			})
		}

    ulEl.appendChild(li);
    // console.log(navigation)
  })
  navigation.appendChild(divEl).appendChild(ulEl);
	// navigation.appendChild(ulEl);
}
const codeMirror = function() {
  if(document.querySelectorAll('.ui_code_content').length === 0) return;
  $('.ui_btnCodeCopy').on('click', function(){
    var el = $(this);
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      el.data("text-original", el.text());
      el.text($(this).data("text-swap"));
      el.addClass('active');

      $(this).parent().next().css({
      'position': 'absolute',
      'opacity': 0,
      'display': 'block'
    })
    el.parent().next().focus();
    el.parent().next().select();
    document.execCommand('copy');

      setTimeout(function(){
        if (el.text() == "Copy!") {
          el.text("Copy to clipboard");
          el.removeClass('active');
        }
      }, 1000);
    } catch(err) {
      console.log('Oops, unable to copy');
    }

    window.getSelection().removeAllRanges();
  })
  $('.ui_code_content').each(function(index, elem){
    var $this = $(this);
    if($(this).hasClass('css') === true){
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/css',
        tabMode: 'indent'
      });
    } else if($(this).hasClass('javascript') === true) {
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/javascript',
        tabMode: 'indent'
      });
    } else if($(this).hasClass('markup') === true) {
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/html',
        tabMode: 'indent'
      });
    } else if($(this).hasClass('html') === true) {
      var delay;
      var editor = CodeMirror.fromTextArea(elem, {
        mode: 'text/html',
        tabMode: 'indent'
      });
      editor.on("change", function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
      });
      function updatePreview() {
        var preview = $this.prev().prev();
        preview.html(editor.getValue());
      }
      setTimeout(updatePreview, 300);
    }
  });
}

const sliderComponent = function() {
  if(document.querySelectorAll('.slide-container').length === 0) return;
  // console.log('ddd');
  const slideContainer = document.querySelectorAll('.slide-container');
  // console.log(slideContainer)

  Array.from(slideContainer).forEach(el => {
    const rangeEl = el.querySelector('.js-slider');
    const numberEl = el.nextElementSibling;
    function initSetup() {
      rangeEl.style.backgroundSize = rangeEl.value + '% 100%';
    }

    function handleInputChange(e) {
      let min;
      let max;
      let val;
      min = rangeEl.min;
      max = rangeEl.max;
      val = rangeEl.value;

      rangeEl.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    }
    initSetup()
    rangeEl.addEventListener('input', handleInputChange);
  })
}

const detailsComponent = function() {

  function toggleHandler (event) {

    // Only run if accordion is open
    if (!event.target.hasAttribute('open')) return;

    // Only run on accordions inside our selector
    let parent = event.target.closest('[data-accordion]');
    if (!parent) return;

    // Get all open accordions inside parent
    let opened = parent.querySelectorAll('details[open]');

    // Close open ones that aren't current accordion
    for (let accordion of opened) {
      if (accordion === event.target) continue;
      accordion.removeAttribute('open');
    }

  }

  document.addEventListener('toggle', toggleHandler, true);
}

const datalistComponent = function() {
  if(document.querySelectorAll('#datalistInput').length === 0) return;
  datalistInput.onfocus = function () {
    browsers.style.display = 'block';
  };
  for (let option of browsers.options) {
    option.onclick = function () {
      datalistInput.value = option.value;
      browsers.style.display = 'none';
    }
  };

  datalistInput.oninput = function() {
    currentFocus = -1;
    var text = datalistInput.value.toUpperCase();
    for (let option of browsers.options) {
      if(option.value.toUpperCase().indexOf(text) > -1){
        option.style.display = "block";
    }else{
      option.style.display = "none";
      }
    };
  }
  var currentFocus = -1;
  datalistInput.onkeydown = function(e) {
    if(e.keyCode == 40){
      currentFocus++
      addActive(browsers.options);
    }
    else if(e.keyCode == 38){
      currentFocus--
      addActive(browsers.options);
    }
    else if(e.keyCode == 13){
      e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (browsers.options) browsers.options[currentFocus].click();
        }
    }
  }

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("active");
    }
  }
}

const clipboardWriteText = function() {
  if(document.querySelectorAll('.write-btn').length == 0) return;
  const writeBtn = document.querySelector('.write-btn');
  const textarea = document.querySelector('.to-copy');

  writeBtn.addEventListener('click', () => {
    const inputValue = textarea.value.trim();
    if (inputValue) {
      navigator.clipboard.writeText(inputValue).then(() => {
        textarea.value = '';
        if (writeBtn.innerText !== 'Copied!') {
          const originalText = writeBtn.innerText;
          writeBtn.innerText = 'Copied!';
          setTimeout(() => {
            writeBtn.innerText = originalText;
          }, 1500);
        }
      })
      .catch(err => {
        console.log('Something went wrong', err);
      })
    }
  });
}

const gnbActiveStyle = function() {
  const utillityMenu = document.querySelector('.utillity-menu');
  const menuLists = utillityMenu.querySelectorAll('li');
  const url = window.location.href;
  const urlLists = url.split("/");
  const activeMenu = urlLists.at(-2);
	// const activeMenu = `${urlLists.at(-2)}-${urlLists.at(-1)}`;
	
  menuLists.forEach(menuList => {
		// if(activeMenu.includes(menuList.className)) {
		// 	menuList.classList.add('active')
		// }
    if(menuList.className === activeMenu) {
      menuList.classList.add('active')
    }
  })
}

const lnbActive = () => {
	const toggleBtn = document.querySelector('.side-toggle')
	const sideBar = document.querySelector('.uid-sidebar')
	const footer = document.querySelector('footer')
	toggleBtn.addEventListener('click', () => {
		sideBar.classList.toggle('active')
		footer.classList.toggle('active')
	})
}

const test = () => {
	let url = window.location.href.toString()
	// console.log(typeof url)
	// console.log(url.split('/')[4].split('_')[0])
	if(url.split('/')[4].split('_')[0] === 'text') {
		
	}
}