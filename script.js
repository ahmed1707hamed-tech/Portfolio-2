document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // 2. Navbar Scroll Effect + Timeline Progress
    const navbar = document.getElementById('navbar');
    const journeyTimeline = document.querySelector('#journey .timeline');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update DevOps Journey timeline progress
        if (journeyTimeline) {
            const rect = journeyTimeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            const start = rect.top - viewportHeight * 0.2;
            const end = rect.bottom - viewportHeight * 0.2;
            const total = end - start;

            let progress = (viewportHeight * 0.2 - start) / total;
            progress = Math.min(1, Math.max(0, progress));

            journeyTimeline.style.setProperty('--timeline-progress', progress);
        }
    });

    // 3. Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .card, .timeline-item, .section-header, .cert-card, .skill-card');
    animateElements.forEach(el => revealOnScroll.observe(el));

    // 4. Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = navLinksList.classList.contains('active') ? 'hidden' : 'auto';
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinksList.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 5. Smooth Scroll for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Dynamic Background Glow Movement (Optimized)
    const glowSphere = document.querySelector('.glow-sphere');
    if (glowSphere && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 40;
                const y = (e.clientY / window.innerHeight - 0.5) * 40;
                glowSphere.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // 7. Initial Hero Animation trigger
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelectorAll('#hero .animate-up').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            });
        }, 300);
    });

    // 8. DevOps Terminal Typing Effect
    const modernTerminalEl = document.getElementById('modern-terminal-text');
    if (modernTerminalEl) {
        const terminalScript = [
            '~/cloud $ whoami',
            'Ahmed Hamed – Cloud & DevOps Engineer',
            '',
            '~/cloud $ cat skills.yml',
            'cloud: AWS (EC2, VPC, IAM, S3)',
            'containers: Docker, Kubernetes',
            'iac: Terraform',
            'cicd: Jenkins, GitHub Actions',
            'monitor: Prometheus, Grafana',
            '',
            '~/cloud $ kubectl get pods --all-namespaces',
            'NAMESPACE   STATUS   READY   AGE',
            'default     Running  3/3     24h',
            'monitoring  Running  2/2     24h',
            '',
            '~/cloud $ echo "Ready to deploy!"',
            'Ready to deploy!'
        ].join('\n');

        let charIdx = 0;
        const speed = 25;

        const type = () => {
            if (charIdx <= terminalScript.length) {
                modernTerminalEl.textContent = terminalScript.slice(0, charIdx);
                charIdx++;
                setTimeout(type, speed);
            }
        };

        // Trigger typing after a small delay
        setTimeout(type, 1000);
    }

    // 9. Floating Particles Generation
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const moveX = (Math.random() - 0.5) * 50;
            const moveY = (Math.random() - 0.5) * 50;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.setProperty('--x', `${moveX}px`);
            particle.style.setProperty('--y', `${moveY}px`);
            particle.style.setProperty('--duration', `${duration}s`);

            particlesContainer.appendChild(particle);
        }
    }

    // 10. Skills progress bars (Linear and Circular)
    const skillCards = document.querySelectorAll('.skill-card');
    const circularSkills = document.querySelectorAll('.circular-skill-item');

    if (skillCards.length || circularSkills.length) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const item = entry.target;

                // Handle linear progress bars (inside skill-cards)
                if (item.classList.contains('skill-card')) {
                    const bars = item.querySelectorAll('.skill-progress-bar');
                    bars.forEach(bar => {
                        const percent = parseFloat(bar.dataset.percent || '0');
                        bar.style.width = `${percent}%`;
                    });
                }
                // Handle circular progress rings
                else if (item.classList.contains('circular-skill-item')) {
                    const circle = item.querySelector('.progress-ring-circle');
                    const percent = parseFloat(item.dataset.percent || '0');
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;

                    const offset = circumference - (percent / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                }

                observer.unobserve(item);
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => skillsObserver.observe(card));
        circularSkills.forEach(skill => skillsObserver.observe(skill));
    }

    // 11. (Removed Projects Slider Logic)


    // 12. Scroll to Top Logic
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 12. Modern Contact Form Terminal Logic
    const devopsForm = document.getElementById('contact-form-internal');
    const logPanel = document.getElementById('terminal-log-panel');
    const logOutput = document.getElementById('log-output');
    const successMsg = document.getElementById('success-message');
    const statusText = document.querySelector('.status-text');

    if (devopsForm) {
        devopsForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Submit form to Netlify via AJAX
            const formData = new FormData(devopsForm);
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            }).catch(error => console.error('Form submission error:', error));

            // Start Terminal Simulation
            devopsForm.style.display = 'none';
            logPanel.classList.add('active');
            statusText.textContent = 'RUNNING...';
            statusText.style.color = 'var(--clr-yellow)';

            const logs = [
                { text: '$ initializing connection...', delay: 800 },
                { text: '$ validating input parameters...', delay: 1200 },
                { text: '$ establishing secure tunnel to mail server...', delay: 1000 },
                { text: '$ uploading payload (metadata + message)...', delay: 1500 },
                { text: '$ message delivered successfully ✔', delay: 800, class: 'success' },
                { text: '$ status: communication established', delay: 500, class: 'success' }
            ];

            let logIndex = 0;

            function typeLog() {
                if (logIndex < logs.length) {
                    const lineData = logs[logIndex];
                    const line = document.createElement('div');
                    line.className = 'log-line ' + (lineData.class || '');
                    line.textContent = lineData.text;
                    logOutput.appendChild(line);

                    logIndex++;
                    setTimeout(typeLog, lineData.delay);
                } else {
                    // Simulation finished
                    setTimeout(() => {
                        logOutput.style.display = 'none';
                        successMsg.classList.add('visible');
                        statusText.textContent = 'DEPLOYED';
                        statusText.style.color = '#27c93f';
                    }, 1000);
                }
            }

            typeLog();
        });
    }

    // Initial resize + timeline progress check
    // (Removed slider resize listener)

    if (journeyTimeline) {
        // Trigger initial progress after layout
        setTimeout(() => {
            const event = new Event('scroll');
            window.dispatchEvent(event);
        }, 400);
    }

    // 13. Projects Carousel Logic
    const track = document.getElementById('projects-track');
    const slides = Array.from(track ? track.children : []);
    const nextBtn = document.getElementById('next-project');
    const prevBtn = document.getElementById('prev-project');
    const dotsContainer = document.getElementById('carousel-dots');

    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // Create Dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateCarousel = () => {
            const containerWidth = track.parentElement.getBoundingClientRect().width;
            const slideWidth = slides[0].getBoundingClientRect().width;

            // Calculate center offset for the track
            // We want the active slide to be in the center of the track's parent
            const trackOffset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
            track.style.transform = `translateX(${trackOffset}px)`;

            // Update classes for scale and blur
            slides.forEach((slide, idx) => {
                slide.classList.remove('active', 'prev', 'next');
                if (idx === currentIndex) {
                    slide.classList.add('active');
                } else if (idx === currentIndex - 1) {
                    slide.classList.add('prev');
                } else if (idx === currentIndex + 1) {
                    slide.classList.add('next');
                }
            });

            // Update Dots
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        const goToSlide = (idx) => {
            currentIndex = idx;
            updateCarousel();
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Touch Swipe
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) {
                nextSlide();
                resetInterval();
            } else if (touchEndX > touchStartX + threshold) {
                prevSlide();
                resetInterval();
            }
        };

        // Initial Setup
        window.addEventListener('resize', updateCarousel);
        // Small delay to ensure layout is ready
        setTimeout(updateCarousel, 100);
        startInterval();
    }
});
