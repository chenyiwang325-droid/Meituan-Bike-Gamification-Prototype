/* ===== Shared Rendering Components ===== */
const Components = {

    // Page header with back button
    pageHeader(title) {
        return `
        <div class="page-header">
            <div class="page-header-back" onclick="Router.back()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <div class="page-header-title">${title}</div>
        </div>`;
    },

    // Progress bar
    progressBar(percent, type = 'energy', size = '') {
        const cls = size === 'lg' ? 'progress-bar progress-bar-lg' : 'progress-bar';
        return `
        <div class="${cls}">
            <div class="progress-fill progress-fill-${type}" style="width: ${percent}%"></div>
        </div>`;
    },

    // Stat block
    statItem(value, label, icon = '') {
        return `
        <div class="stat-item">
            <div class="stat-value">${icon}${value}</div>
            <div class="stat-label">${label}</div>
        </div>`;
    },

    // Currency display
    currency(type, value, showSign = false) {
        const sign = showSign && value > 0 ? '+' : '';
        if (type === 'energy') return `<span class="currency currency-energy">⚡ ${sign}${value}</span>`;
        if (type === 'star') return `<span class="currency currency-star">⭐ ${sign}${value}</span>`;
        if (type === 'xp') return `<span class="currency currency-xp">📈 ${sign}${value}</span>`;
        return '';
    },

    // Badge
    badge(text, color = 'yellow') {
        return `<span class="badge badge-${color}">${text}</span>`;
    },

    // Hearts display
    hearts(percent, total = 5) {
        const filled = Math.round(total * percent / 100);
        let html = '<div class="hearts">';
        for (let i = 0; i < total; i++) {
            html += i < filled
                ? '<span class="heart-filled">❤</span>'
                : '<span class="heart-empty">☆</span>';
        }
        html += '</div>';
        return html;
    },

    // Stars display
    stars(count, total = 5) {
        let html = '<div class="hearts">';
        for (let i = 0; i < total; i++) {
            html += i < count
                ? '<span class="heart-filled">⭐</span>'
                : '<span class="heart-empty">☆</span>';
        }
        html += '</div>';
        return html;
    },

    // Filter tabs
    filterTabs(tabs, activeIndex = 0, onClickFn = '') {
        return `
        <div class="filter-tabs">
            ${tabs.map((t, i) => `
                <button class="filter-tab ${i === activeIndex ? 'active' : ''}"
                    ${onClickFn ? `onclick="${onClickFn}(${i})"` : ''}>${t}</button>
            `).join('')}
        </div>`;
    },

    // Tab switcher
    tabSwitcher(tabs, activeIndex = 0, onClickFn = '') {
        return `
        <div class="tab-switcher">
            ${tabs.map((t, i) => `
                <div class="tab-switcher-item ${i === activeIndex ? 'active' : ''}"
                    ${onClickFn ? `onclick="${onClickFn}(${i})"` : ''}>${t}</div>
            `).join('')}
        </div>`;
    },

    // Card wrapper
    card(content, extraClass = '') {
        return `<div class="card card-padded ${extraClass}">${content}</div>`;
    },

    // Mock map
    mockMap(height = 180) {
        return `
        <div class="mock-map" style="height: ${height}px">
            <div class="mock-map-route" style="top: 40%; transform: rotate(-5deg)"></div>
            <div style="position:absolute;top:20%;left:20%;font-size:10px;color:rgba(0,0,0,0.3)">🏢</div>
            <div style="position:absolute;top:60%;left:50%;font-size:10px;color:rgba(0,0,0,0.3)">🌳</div>
            <div style="position:absolute;top:30%;left:70%;font-size:10px;color:rgba(0,0,0,0.3)">🏪</div>
        </div>`;
    },

    // Collection grid item
    collectionItem(item, type = 'medal') {
        const locked = !item.unlocked ? 'locked' : '';
        const rarity = item.rarity ? `rarity-${item.rarity}` : '';
        return `
        <div class="collection-item ${locked} ${rarity}" onclick="Components.showItemDetail('${type}', ${item.id})">
            <div class="collection-item-icon">${item.icon || item.emoji}</div>
            <div class="collection-item-name">${item.name}</div>
            ${item.level ? `<div style="font-size:10px;color:var(--text-tertiary)">Lv.${item.level}</div>` : ''}
        </div>`;
    },

    // Modal
    showModal(title, content) {
        const existing = document.querySelector('.modal-overlay');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-handle"></div>
                <h3 style="font-size:var(--font-xl);margin-bottom:var(--space-lg)">${title}</h3>
                ${content}
                <button class="btn btn-primary btn-block" style="margin-top:var(--space-xl)"
                    onclick="Components.closeModal()">关闭</button>
            </div>`;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) Components.closeModal();
        });
    },

    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    },

    // Show item detail in modal
    showItemDetail(type, id) {
        let item, title, content;
        if (type === 'medal') {
            item = Store.medals.find(m => m.id === id);
            title = item.name;
            content = `
                <div class="text-center" style="margin-bottom:var(--space-lg)">
                    <div style="font-size:64px">${item.icon}</div>
                </div>
                <p style="color:var(--text-secondary);margin-bottom:var(--space-md)">${item.description}</p>
                <div>${Components.badge(item.rarity === 'common' ? '普通' : item.rarity === 'uncommon' ? '稀有' : item.rarity === 'rare' ? '珍贵' : item.rarity === 'epic' ? '史诗' : '传奇', item.rarity === 'common' ? 'gray' : item.rarity === 'uncommon' ? 'green' : item.rarity === 'rare' ? 'blue' : item.rarity === 'epic' ? 'purple' : 'orange')}</div>
                <p style="margin-top:var(--space-md);color:var(--text-tertiary)">${item.unlocked ? '✓ 已解锁' : '🔒 未解锁'}</p>`;
        } else if (type === 'companion') {
            item = Store.companions.find(c => c.id === id);
            title = item.name;
            content = `
                <div class="text-center" style="margin-bottom:var(--space-lg)">
                    <div style="font-size:64px">${item.emoji}</div>
                </div>
                <p style="color:var(--text-secondary)">${item.series}</p>
                ${item.level ? `<p>等级: Lv.${item.level}</p>` : ''}
                <div style="margin-top:var(--space-sm)">${Components.badge(item.rarity === 'common' ? '普通' : item.rarity === 'uncommon' ? '稀有' : item.rarity === 'rare' ? '珍贵' : item.rarity === 'epic' ? '史诗' : '传奇', item.rarity === 'common' ? 'gray' : item.rarity === 'uncommon' ? 'green' : item.rarity === 'rare' ? 'blue' : item.rarity === 'epic' ? 'purple' : 'orange')}</div>`;
        } else if (type === 'bike') {
            item = Store.bikes.find(b => b.id === id);
            title = item.name;
            content = `
                <div class="text-center" style="margin-bottom:var(--space-lg)">
                    <div style="font-size:64px">${item.emoji}</div>
                </div>
                <p style="color:var(--text-secondary)">${item.series}</p>
                ${item.level ? `<p>等级: Lv.${item.level}</p>` : ''}
                <div style="margin-top:var(--space-sm)">${Components.badge(item.rarity === 'common' ? '普通' : item.rarity === 'uncommon' ? '稀有' : item.rarity === 'rare' ? '珍贵' : item.rarity === 'epic' ? '史诗' : '传奇', item.rarity === 'common' ? 'gray' : item.rarity === 'uncommon' ? 'green' : item.rarity === 'rare' ? 'blue' : item.rarity === 'epic' ? 'purple' : 'orange')}</div>`;
        }
        if (item) Components.showModal(title, content);
    },

    // Rarity label helper
    rarityLabel(rarity) {
        const map = { common: '普通', uncommon: '稀有', rare: '珍贵', epic: '史诗', legendary: '传奇' };
        return map[rarity] || rarity;
    },

    rarityColor(rarity) {
        const map = { common: 'gray', uncommon: 'green', rare: 'blue', epic: 'purple', legendary: 'orange' };
        return map[rarity] || 'gray';
    }
};
