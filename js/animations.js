/* ===== Animations ===== */
const Animations = {

    init() {
        this.initProgressBars();
        this.initCountUp();
        this.initScrollReveal();
        this.initCharts();
    },

    // Animate progress bars on page load
    initProgressBars() {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const target = bar.style.width;
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    bar.style.width = target;
                }, 100);
            });
        });
    },

    // Count up animation for numbers
    initCountUp() {
        document.querySelectorAll('[data-count]').forEach(el => {
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const duration = 800;
            const start = performance.now();

            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                if (Number.isInteger(target)) {
                    el.textContent = Math.round(current).toLocaleString() + suffix;
                } else {
                    el.textContent = current.toFixed(1) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    },

    // Scroll reveal for stagger items
    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.stagger-item').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    },

    // Initialize charts after page render
    initCharts() {
        setTimeout(() => {
            if (document.getElementById('weekly-chart')) {
                Charts.weeklyTrend('weekly-chart');
            }
            if (document.getElementById('trend-chart')) {
                Charts.distanceTrend('trend-chart');
            }
            if (document.getElementById('area-chart')) {
                Charts.areaDistribution('area-chart');
            }
        }, 200);
    },

    // Like button animation
    toggleLike(btn, postId) {
        const post = Store.communityPosts.find(p => p.id === postId);
        if (!post) return;

        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;

        btn.classList.toggle('liked');
        btn.innerHTML = `${post.liked ? '❤️' : '🤍'} ${post.likes}`;

        if (post.liked) {
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = '', 200);
        }
    }
};
