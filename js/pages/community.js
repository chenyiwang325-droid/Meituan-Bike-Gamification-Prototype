/* ===== Community Page ===== */
Pages.community = function() {
    const tabs = ['全部', '路线分享', '打卡动态', '挑战赛'];
    const active = window.communityTab || 0;

    let posts = Store.communityPosts;
    if (active === 1) posts = posts.filter(p => p.type === 'route');
    else if (active === 2) posts = posts.filter(p => p.type === 'checkin');
    else if (active === 3) posts = posts.filter(p => p.type === 'challenge');

    // Challenge banners for the challenge tab
    const challengeBanners = active === 3 ? Store.challenges.available.slice(0, 2) : [];

    return `
    <div class="page">
        <div class="section" style="padding-top:var(--space-2xl)">
            <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-bold);margin-bottom:var(--space-lg)">社区动态</div>
        </div>

        ${Components.filterTabs(tabs, active, 'Pages.switchCommunityTab')}

        <div class="section">
            ${challengeBanners.map(c => Components.challengeBanner(c)).join('')}

            ${posts.map(post => Pages._communityPost(post)).join('')}

            ${posts.length === 0 ? `
                <div class="empty-state">
                    <div class="empty-state-icon">${Components.svgIcon('route', 48)}</div>
                    <div>暂无相关动态</div>
                </div>
            ` : ''}
        </div>
    </div>`;
};

Pages.switchCommunityTab = function(index) {
    window.communityTab = index;
    Router.renderPage('community');
};

Pages._communityPost = function(post) {
    const typeLabels = { route: '路线分享', checkin: '打卡动态', challenge: '挑战赛' };
    const typeClass = 'type-' + post.type;

    let extras = '';

    if (post.type === 'route') {
        extras = `
            ${post.routeStats ? `
                <div class="community-post-stats">
                    <span>${Components.svgIcon('route', 14)} ${post.routeStats.distance}</span>
                    <span>${Components.svgIcon('clock', 14)} ${post.routeStats.duration}</span>
                    <span>${Components.svgIcon('fire', 14)} ${post.routeStats.energy}</span>
                </div>
            ` : ''}
            ${post.route ? `<div style="margin-bottom:var(--space-md)">${Components.badge(Components.svgIcon('route', 12) + ' ' + post.route, 'blue')}</div>` : ''}
            ${post.mapSeed !== undefined ? Components.routeMap(120, { seed: post.mapSeed }) : ''}
            ${post.photos ? `
                <div class="community-route-media">
                    <div class="community-route-media-title">
                        ${Components.svgIcon('camera', 14)}
                        <span>沿途骑行片段</span>
                    </div>
                    ${Components.photoGrid(post.photos)}
                </div>
            ` : ''}
        `;
    } else if (post.type === 'checkin') {
        extras = `
            <div class="community-checkin-row">
                ${post.location ? Components.badge(Components.svgIcon('checkin', 12) + ' ' + post.location, 'green') : ''}
                ${post.mood ? Components.badge(post.mood, 'yellow') : ''}
                ${post.achievement ? Components.badge(Components.svgIcon('medal', 12) + ' ' + post.achievement, 'purple') : ''}
            </div>
        `;
    } else if (post.type === 'challenge') {
        const isOfficial = post.isOfficial;
        extras = `
            <div class="community-challenge-meta ${isOfficial ? 'official' : ''}">
                ${isOfficial ? '<span class="official-badge">官方</span>' : ''}
                ${Components.svgIcon('leaf', 14)}
                <span>减碳 ${post.carbonSaved}kg</span>
            </div>
        `;
    }

    return `
        <div class="community-post stagger-item">
            <div class="community-post-header">
                ${Components.userAvatar(post.user)}
                <div class="community-post-header-info">
                    <div class="community-post-header-name">
                        ${post.user.name}
                        <span class="post-type-indicator ${typeClass}">${typeLabels[post.type]}</span>
                    </div>
                    <div class="community-post-header-meta">Lv.${post.user.level} · ${post.time}</div>
                </div>
            </div>
            <div class="community-post-content">${post.content}</div>
            ${extras}
            <div class="community-post-actions">
                <span class="like-btn ${post.liked ? 'liked' : ''}" onclick="Animations.toggleLike(this, ${post.id})">
                    ${Components.svgIcon(post.liked ? 'heart-filled' : 'heart', 14)} ${post.likes}
                </span>
                <span>${Components.svgIcon('comment', 14)} ${post.comments}</span>
            </div>
        </div>
    `;
};
