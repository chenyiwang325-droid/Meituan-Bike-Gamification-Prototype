/* ===== Router ===== */
const Router = {
    currentPage: '',
    history: [],

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const [page, param] = hash.split('/');

        this.currentPage = page;

        // Show/hide tabbar based on page
        const mainPages = ['home', 'explore', 'ride', 'community', 'profile'];
        const tabbar = document.getElementById('tabbar');
        const container = document.getElementById('page-container');

        if (mainPages.includes(page)) {
            tabbar.classList.remove('hidden');
            container.classList.remove('no-tabbar');
            this.updateTabbar(page);
        } else {
            tabbar.classList.add('hidden');
            container.classList.add('no-tabbar');
        }

        // Render page
        this.renderPage(page, param);

        // Scroll to top
        window.scrollTo(0, 0);
    },

    renderPage(page, param) {
        const container = document.getElementById('page-container');

        // Page render functions
        const pages = {
            'home': Pages.home,
            'explore': Pages.explore,
            'ride': Pages.ride,
            'community': Pages.community,
            'profile': Pages.profile,
            'explorer-detail': Pages.explorerDetail,
            'companion-bike': Pages.companionBike,
            'skill-tree': Pages.skillTree,
            'challenges': Pages.challenges,
            'data-stats': Pages.dataStats,
            'ride-detail': () => Pages.rideDetail(param),
            'route-detail': () => Pages.routeDetail(param),
            'medal-collection': Pages.medalCollection,
            'bike-collection': Pages.bikeCollection,
            'companion-collection': Pages.companionCollection,
            'star-coin': Pages.starCoin
        };

        const renderFn = pages[page];
        if (renderFn) {
            container.innerHTML = renderFn();
            // Trigger animations after render
            requestAnimationFrame(() => Animations.init());
        } else {
            container.innerHTML = '<div class="page"><h2>页面未找到</h2></div>';
        }
    },

    updateTabbar(page) {
        document.querySelectorAll('.tabbar-item').forEach(item => {
            if (item.dataset.page === page) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    navigate(path) {
        window.location.hash = path;
    },

    back() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            this.navigate('home');
        }
    }
};
