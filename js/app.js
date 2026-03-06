/* ===== App Entry ===== */
const App = {
    init() {
        Router.init();
    }
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
