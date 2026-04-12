document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 2. Dynamic Log Streamer
    const logList = document.getElementById('log-list');
    const messages = [
        "> SUBJECT 001 STATUS: VITAL",
        "> SECTOR 3: PREDATOR DETECTED",
        "> TEMPERATURE DROP IN LOWLANDS",
        "> ANOMALY: BLACK KINGDOM VOID",
        "> CACHE SYNC: OTUKAN-OKA-X99",
        "> DECRYPTION COMPLETE: SIYAH KRALLIK",
        "> HYDRATION STATUS: CRITICAL",
        "> BIOMETRIC LINK STABLE",
        "> SYSTEM OVERRIDE ATTEMPT..."
    ];

    if (logList) {
        setInterval(() => {
            const li = document.createElement('li');
            li.innerText = messages[Math.floor(Math.random() * messages.length)];
            logList.appendChild(li);
            if (logList.children.length > 5) {
                logList.removeChild(logList.children[0]);
            }
        }, 4000);
    }

    // 3. Radar Blip Movement
    const blip = document.querySelector('.blip');
    if (blip) {
        setInterval(() => {
            blip.style.top = Math.random() * 80 + 10 + '%';
            blip.style.left = Math.random() * 80 + 10 + '%';
        }, 2000);
    }

    // 4. Redacted Section Glitch
    const redactedSection = document.getElementById('sector-7');
    if (redactedSection) {
        const glitchText = redactedSection.querySelector('.glitch-text-hidden');
        redactedSection.addEventListener('mouseenter', () => {
            let count = 0;
            const interval = setInterval(() => {
                redactedSection.style.background = count % 2 === 0 ? 'rgba(255, 51, 51, 0.1)' : '#111';
                glitchText.style.display = 'block';
                count++;
                if (count > 6) {
                    clearInterval(interval);
                    glitchText.style.display = 'block';
                    redactedSection.style.background = 'rgba(255, 51, 51, 0.2)';
                }
            }, 100);
        });
        redactedSection.addEventListener('mouseleave', () => {
            glitchText.style.display = 'none';
            redactedSection.style.background = '#111';
        });
    }

    // 5. Typewriter Effect
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        const text = typewriter.innerText;
        typewriter.innerText = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                typewriter.innerText += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        setTimeout(type, 500);
    }

    // 6. Final Gate selection logging
    document.querySelectorAll('.gate').forEach(gate => {
        gate.addEventListener('click', () => {
            const gateName = gate.innerText;
            if (logList) {
                const li = document.createElement('li');
                li.style.color = '#ffcc00';
                li.innerText = `> ACCESSING ${gateName}...`;
                logList.appendChild(li);
            }
        });
    });

    // 7. Parallax Effect
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        const feed = document.querySelector('.hero-feed');
        if (feed) {
            feed.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(1.1)`;
        }
    });
});
