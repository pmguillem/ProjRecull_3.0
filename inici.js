document.addEventListener('DOMContentLoaded', function() {
    var backToTopBtn = document.getElementById('back-to-top-btn');

    if (backToTopBtn) {
        // Afegim un esdeveniment de clic al botó
        backToTopBtn.addEventListener('click', function() {
            // Anem a la part superior de la pàgina amb una animació suau
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Afegir animacions en fer clic en els apartats del menú
    document.querySelectorAll('nav ul li a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            var href = this.getAttribute('href');
            
            if (href.startsWith("#")) {
                event.preventDefault();
                var targetId = href.substring(1);
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });

                    // Afegir classe per animació
                    targetElement.classList.add('clicked');
                    setTimeout(function() {
                        targetElement.classList.remove('clicked');
                    }, 1000);
                }
            }
        });
    });

    // Afegir classe CSS per l'animació
    var style = document.createElement('style');
    style.innerHTML = `
    .clicked {
        animation: highlight 1s ease-out;
    }

    @keyframes highlight {
        from { background-color: yellow; }
        to { background-color: transparent; }
    }
    `;
    document.head.appendChild(style);

    // Afegir la classe "active" al menú seleccionat
    function setActiveMenuItem() {
        var path = window.location.pathname.split('/').pop();
        if (path === '') {
            path = 'index.html';
        }
        document.querySelectorAll('nav ul li a').forEach(function(link) {
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveMenuItem();

    window.addEventListener('popstate', setActiveMenuItem);
});