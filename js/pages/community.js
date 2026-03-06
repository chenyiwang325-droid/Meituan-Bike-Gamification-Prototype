/* ===== Community Page ===== */
Pages.community = function() {
    return `
    <div class="page">
        <div class="section" style="padding-top:var(--space-2xl)">
            <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-bold);margin-bottom:var(--space-lg)">社区动态</div>
        </div>

        <div class="filter-tabs">
            <button class="filter-tab active">全部</button>
            <button class="filter-tab">路线分享</button>
            <button class="filter-tab">打卡动态</button>
            <button class="filter-tab">挑战赛</button>
        </div>

        <div class="section">
            ${Store.communityPosts.map(post => `
                <div class="card card-padded stagger-item" style="margin-bottom:var(--space-md)">
                    <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md)">
                        <div class="avatar">${post.user.avatar}</div>
                        <div style="flex:1">
                            <div style="font-weight:var(--font-weight-bold)">${post.user.name}</div>
                            <div style="font-size:var(--font-xs);color:var(--text-tertiary)">Lv.${post.user.level} · ${post.time}</div>
                        </div>
                    </div>
                    <div style="margin-bottom:var(--space-md)">${post.content}</div>
                    ${post.route ? `<div style="margin-bottom:var(--space-md)">${Components.badge('📍 ' + post.route, 'blue')}</div>` : ''}
                    <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-md);font-size:32px">
                        ${post.images.join(' ')}
                    </div>
                    <div style="display:flex;gap:var(--space-lg);font-size:var(--font-sm);color:var(--text-tertiary)">
                        <span class="like-btn ${post.liked ? 'liked' : ''}" onclick="Animations.toggleLike(this, ${post.id})">
                            ${post.liked ? '❤️' : '🤍'} ${post.likes}
                        </span>
                        <span>💬 ${post.comments}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
};
