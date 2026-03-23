// Freelancer Theme JavaScript - Bootstrap 5 (no jQuery)

(function() {
    "use strict";

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link, .navbar-brand').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var offset = target.getBoundingClientRect().top + window.pageYOffset - 50;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Close mobile nav on link click
    var navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        var bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
                    bsCollapse.hide();
                }
            });
        });
    }

    // Navbar shrink on scroll
    var mainNav = document.getElementById('mainNav');
    function navbarShrink() {
        if (window.scrollY > 100) {
            mainNav.classList.add('navbar-shrink');
        } else {
            mainNav.classList.remove('navbar-shrink');
        }
    }
    window.addEventListener('scroll', navbarShrink);
    navbarShrink();

})();
