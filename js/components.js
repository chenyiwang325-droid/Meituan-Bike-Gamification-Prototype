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

    // SVG Icon Library
    svgIcon(name, size = 20) {
        const icons = {
            trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`,
            leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
            fire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
            route: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>`,
            camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
            checkin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
            carbon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"></path><path d="M12 6v12"></path><path d="M8 8l8 8"></path><path d="M16 8l-8 8"></path></svg>`,
            medal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>`,
            check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="${size}" height="${size}"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
            clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
            heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
            'heart-filled': `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" width="${size}" height="${size}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
            comment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="${size}" height="${size}"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
        };
        return icons[name] || '';
    },

    // Route Map with SVG paths
    routeMap(height = 180, options = {}) {
        const seed = options.seed || 0;
        const paths = [
            'M 10,50 Q 30,20 50,40 T 90,50',
            'M 15,60 Q 25,30 45,50 Q 65,70 85,45',
            'M 10,45 Q 40,25 60,55 Q 75,70 90,50',
            'M 15,55 Q 35,35 55,45 Q 70,55 85,40',
            'M 10,40 Q 30,60 50,45 Q 70,30 90,55'
        ];
        const path = paths[seed % paths.length];

        return `
        <div class="route-map" style="height: ${height}px">
            <svg class="route-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="${path}" fill="none" stroke="var(--meituan-yellow)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div class="route-map-poi route-map-poi-start" style="left:10%;top:${40 + seed * 3}%"></div>
            <div class="route-map-poi route-map-poi-mid" style="left:50%;top:${45 + seed * 2}%"></div>
            <div class="route-map-poi route-map-poi-end" style="left:90%;top:${48 + seed * 4}%"></div>
        </div>`;
    },

    // Mock map (compatibility wrapper)
    mockMap(height = 180) {
        return Components.routeMap(height, { seed: 0 });
    },

    // User Avatar
    userAvatar(user, size = 40) {
        const initial = (user.name || '骑').charAt(0);
        const hasEmojiAvatar = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u.test(user.avatar || '');
        const colorSets = [
            { bg: 'linear-gradient(135deg, #FFD54F 0%, #FFB300 100%)', accent: '#5D4037' },
            { bg: 'linear-gradient(135deg, #4FC3F7 0%, #1976D2 100%)', accent: '#FFFFFF' },
            { bg: 'linear-gradient(135deg, #81C784 0%, #2E7D32 100%)', accent: '#FFFFFF' },
            { bg: 'linear-gradient(135deg, #FF8A65 0%, #E64A19 100%)', accent: '#FFFFFF' },
            { bg: 'linear-gradient(135deg, #BA68C8 0%, #7B1FA2 100%)', accent: '#FFFFFF' }
        ];
        const colorIndex = (user.name.charCodeAt(0) + user.level) % colorSets.length;
        const palette = colorSets[colorIndex];

        return `
        <div class="user-avatar-badge" style="width:${size}px;height:${size}px;background:${palette.bg};--avatar-accent:${palette.accent}">
            <div class="user-avatar-ring"></div>
            <div class="user-avatar-core ${hasEmojiAvatar ? 'has-emoji' : ''}" style="font-size:${hasEmojiAvatar ? size * 0.48 : size * 0.34}px">
                ${hasEmojiAvatar ? user.avatar : initial}
            </div>
            <div class="user-avatar-spark user-avatar-spark-a"></div>
            <div class="user-avatar-spark user-avatar-spark-b"></div>
        </div>`;
    },

    // Photo Grid with labels
    photoGrid(photos) {
        const presets = {
            'sunset': { gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)', label: '黄昏天际线', hint: '晚风与落日' },
            'city-night': { gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)', label: '城市夜景', hint: '灯光渐亮' },
            'warm-road': { gradient: 'linear-gradient(135deg, #F8B500 0%, #FFC837 100%)', label: '街角骑行', hint: '沿路风景' },
            'amber-food': { gradient: 'linear-gradient(135deg, #FF9A56 0%, #FFD56F 100%)', label: '补给小店', hint: '面包与咖啡' },
            'pink-store': { gradient: 'linear-gradient(135deg, #FF6B9D 0%, #FFC1E3 100%)', label: '街区橱窗', hint: '打卡店铺' },
            'golden-hour': { gradient: 'linear-gradient(135deg, #F9D423 0%, #FF4E50 100%)', label: '金色时刻', hint: '适合停留' },
            'tech-blue': { gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', label: '科技园区', hint: '楼宇与光带' },
            'purple-grid': { gradient: 'linear-gradient(135deg, #3A4DFF 0%, #8B5CF6 100%)', label: '夜间通勤', hint: '赛博氛围' }
        };

        return `
        <div class="photo-grid photo-grid-labeled">
            ${photos.map(key => {
                const photo = presets[key] || { gradient: 'linear-gradient(135deg, #E0E0E0, #BDBDBD)', label: '路线片段', hint: '沿途记录' };
                return `
                    <div class="photo-thumb photo-thumb-labeled" style="background:${photo.gradient}">
                        <div class="photo-thumb-overlay"></div>
                        <div class="photo-thumb-content">
                            <div class="photo-thumb-label">${photo.label}</div>
                            <div class="photo-thumb-hint">${photo.hint}</div>
                        </div>
                    </div>`;
            }).join('')}
        </div>`;
    },

    // Challenge Banner
    challengeBanner(challenge) {
        return `
        <div class="challenge-banner" style="background:${challenge.bannerGradient}">
            <div class="challenge-banner-header">
                <div class="challenge-banner-icon">${Components.svgIcon(challenge.iconName, 28)}</div>
                <div class="challenge-banner-info">
                    <div class="challenge-banner-title">${challenge.name}</div>
                    ${challenge.subtitle ? `<div class="challenge-banner-subtitle">${challenge.subtitle}</div>` : ''}
                </div>
            </div>
            <div class="challenge-banner-stats">
                <div class="challenge-banner-stat">
                    <div class="challenge-banner-stat-value">${challenge.participants.toLocaleString()}</div>
                    <div class="challenge-banner-stat-label">参与人数</div>
                </div>
                <div class="challenge-banner-stat">
                    ${Components.carbonStats(challenge.carbonSaved, challenge.carbonTarget)}
                </div>
            </div>
        </div>`;
    },

    // Carbon Stats
    carbonStats(saved, target) {
        const percent = Math.min(Math.round(saved / target * 100), 100);
        return `
        <div class="carbon-stats">
            <div class="carbon-stats-icon">${Components.svgIcon('leaf', 16)}</div>
            <div class="carbon-stats-text">
                <div class="carbon-stats-value">${saved}kg / ${target}kg</div>
                <div class="carbon-stats-label">减碳贡献</div>
            </div>
            <div class="carbon-stats-bar">
                <div class="carbon-stats-fill" style="width:${percent}%"></div>
            </div>
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
