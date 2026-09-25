document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('active', isOpen);
            mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. IntersectionObserver for Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // 3. Work Experience Timeline Rendering
    // Edit or add your work experiences in this list:
    const experiences = [
        {
            role: 'Network Engineer',
            company: 'GreenCube Technologies Pvt. Ltd.',
            period: '2025 - Present',
            isCurrent: true,
            location: 'Kathmandu, Nepal (Hybrid)',
            description: '• Configure, maintain, and troubleshoot enterprise network infrastructure including routers, switches, wireless access points, and network services.\n• Deploy and support network solutions for colleges, universities, and other organizational clients, including LAN, fiber, Wi-Fi, CCTV, and related infrastructure.\n• Perform network troubleshooting, device configuration, monitoring, and on-site technical support to maintain reliable connectivity and system availability.\n• Work with Linux, Docker, Git, and cloud/DevOps technologies as part of ongoing infrastructure and automation development.',
            technologies: ['Networking', 'Routers & Switches', 'Ruijie', 'Wi-Fi', 'Fiber Optics', 'Linux', 'Docker', 'Git', 'AWS']
        },
    ];

    const renderExperiences = () => {
        const timelineEl = document.getElementById('experience-timeline');
        if (!timelineEl) return;

        timelineEl.innerHTML = experiences.map((exp, idx) => {
            const isCurrent = exp.isCurrent || (exp.period && exp.period.toLowerCase().includes('present'));

            // Format bullet points into list items
            const descriptionLines = exp.description
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0);

            const detailsHtml = descriptionLines.map(line => {
                const cleanedLine = line.startsWith('•') || line.startsWith('-') ? line.substring(1).trim() : line;
                return `<li>${cleanedLine}</li>`;
            }).join('');

            const techBadgesHtml = (exp.technologies || []).map(tech =>
                `<span class="timeline-tech-tag">${tech.trim()}</span>`
            ).join('');

            return `
                <div class="timeline-item" style="animation-delay: ${idx * 0.1}s;">
                    <div class="timeline-dot ${isCurrent ? 'current' : ''}"></div>
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <div>
                                <h3 class="timeline-role">${exp.role}</h3>
                                <div class="timeline-company">
                                    <span>🏢</span> ${exp.company}
                                </div>
                            </div>
                            <div class="timeline-meta">
                                <span class="timeline-period ${isCurrent ? 'current' : ''}">
                                    ${isCurrent ? '⚡ ' : ''}${exp.period}
                                </span>
                                ${exp.location ? `<span class="timeline-location">📍 ${exp.location}</span>` : ''}
                            </div>
                        </div>
                        <div class="timeline-details">
                            <ul>${detailsHtml}</ul>
                        </div>
                        ${techBadgesHtml ? `
                            <div class="timeline-tech">
                                ${techBadgesHtml}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    };

    renderExperiences();

    // 4. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status';

            setTimeout(() => {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.className = 'form-status success';
                contactForm.reset();

                if (submitBtn) submitBtn.disabled = false;

                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            }, 800);
        });
    }
});
