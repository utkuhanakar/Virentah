document.addEventListener('DOMContentLoaded', () => {
    // 1. Audio Initialization & Playback
    const btnInitAudio = document.getElementById('btn-init-audio');
    const audioOverlay = document.getElementById('audio-init');
    const ambientAudio = document.getElementById('ambient-audio');

    if (btnInitAudio) {
        btnInitAudio.addEventListener('click', () => {
            // Unhide the interface and hide the overlay
            audioOverlay.classList.add('hidden');
            
            // Start audio cleanly after explicit user interaction
            if (ambientAudio) {
                ambientAudio.volume = 0.4;
                ambientAudio.play().catch(e => console.warn("Audio play blocked: ", e));
            }
        });
    }

    // 2. Top Navbar Scroll Effect
    const topNav = document.querySelector('.top-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            topNav.classList.add('scrolled');
        } else {
            topNav.classList.remove('scrolled');
        }
    });

    // 3. Mega Menu (Inventory) Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const megaMenu = document.getElementById('mega-menu');

    const openInventory = () => {
        megaMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    };

    const closeInventory = () => {
        megaMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    };

    if(menuToggle && closeMenu) {
        menuToggle.addEventListener('click', openInventory);
        closeMenu.addEventListener('click', closeInventory);
    }

    if(megaMenu) {
        megaMenu.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.menu-bg')) {
                closeInventory();
            }
        });
    }

    // 4. Reveal Animations (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    let threatAnimated = false;

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Threat Bar logic
                if (entry.target.classList.contains('threat-module') && !threatAnimated) {
                    threatAnimated = true;
                    const threatFill = document.getElementById('threat-fill');
                    const threatPercent = document.getElementById('threat-percent');
                    if (threatFill) {
                        setTimeout(() => {
                            threatFill.style.width = '68%';
                            let count = 0;
                            const countInterval = setInterval(() => {
                                count++;
                                threatPercent.innerText = count + '%';
                                if(count >= 68) clearInterval(countInterval);
                            }, 40);
                        }, 500);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 5. Hero Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollOffset = window.scrollY;
        if (heroBg && scrollOffset < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollOffset * 0.4}px)`;
        }
    });
});
