// JavaScript untuk Mieayam1315 Website - Versi Responsif (FIXED)
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Ganti ikon menu
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Tutup mobile menu ketika link diklik
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });

        // Tutup mobile menu ketika klik di luar
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }

    // Fallback untuk gambar menu
    document.querySelectorAll('#menu img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('hidden')) {
                placeholder.classList.remove('hidden');
                placeholder.style.display = 'flex';
            }
        });
    });

    // Animasi saat scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll untuk navigasi (FIXED)
    document.querySelectorAll('nav a, .mobile-nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Fungsi untuk tombol pesan
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Pesan Sekarang')) {
            button.addEventListener('click', function() {
                const menuItem = this.closest('.bg-gray-800');
                const menuName = menuItem.querySelector('h3').textContent;
                const menuPrice = menuItem.querySelector('.text-lg, .text-xl').textContent;
                
                const message = `Halo Mieayam1315, saya ingin memesan:\n\n${menuName} - ${menuPrice}\n\nApakah masih tersedia?`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/6289668904437?text=${encodedMessage}`, '_blank');
            });
        }
    });
    
    // Animasi untuk logo (SIMPLE VERSION)
    const logo = document.querySelector('header img');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Counter untuk statistik
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // Inisialisasi counter saat section testimoni terlihat
    const testimoniSection = document.getElementById('testimoni');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter, target, 2000);
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    if (testimoniSection) {
        counterObserver.observe(testimoniSection);
    }
    
    // Animasi hover untuk card tim
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animasi hover untuk card testimoni
    document.querySelectorAll('.testimoni-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Loading state untuk tombol
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Pesan Sekarang')) {
                const originalText = this.textContent;
                this.textContent = 'Memproses...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Perbaikan untuk navigation active state
    const navLinks = document.querySelectorAll('nav a, .mobile-nav-link');
    const sectionsWithNav = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let current = '';
        sectionsWithNav.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    const style = document.createElement('style');
    style.textContent = `
        nav a.active, .mobile-nav-link.active {
            color: #ff6b35;
            background-color: rgba(255, 107, 53, 0.1);
        }
        
        header {
            transform: none !important;
        }
        
        /* Animasi untuk mobile menu */
        #mobileMenu {
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});