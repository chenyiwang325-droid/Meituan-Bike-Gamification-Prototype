/* ===== Route Detail Page ===== */
Pages.routeDetail = function(routeId) {
    const route = Store.routes.find(r => r.id === parseInt(routeId)) || Store.routes[0];
    const estimatedTime = Math.round(route.distance / 10 * 60);

    return `
    <div class="page">
        ${Components.pageHeader(route.name)}

        <!-- Map -->
        ${Components.routeMap(250, { seed: route.id })}

        <!-- Route Info -->
        <div class="route-hero">
            <div class="route-title">
                <div class="route-icon-large">${route.icon}</div>
                <div>
                    <div class="route-name">${route.name}</div>
                    <div class="route-meta">
                        <span>⭐ ${route.rating}</span>
                        <span>${route.completions.toLocaleString()}人完成</span>
                    </div>
                </div>
            </div>
            <div class="route-tags">
                ${route.tags.map(tag => Components.badge(tag, tag === '轻松' ? 'green' : tag === '适中' ? 'orange' : tag.includes('km') ? 'blue' : 'gray')).join('')}
            </div>
        </div>

        <!-- Basic Data -->
        <div class="section">
            <div style="display:flex;justify-content:space-around">
                ${Components.statItem(route.distance + 'km', '距离')}
                ${Components.statItem(route.difficulty, '难度')}
                ${Components.statItem(estimatedTime + 'min', '预计时长')}
            </div>
        </div>

        <!-- Description -->
        <div class="section" style="padding-top:0">
            <div class="section-title">路线描述</div>
            <div class="card card-padded">
                <p style="font-size:var(--font-sm);color:var(--text-secondary);line-height:1.6">${route.description}</p>
            </div>
        </div>

        <!-- POIs -->
        <div class="section" style="padding-top:0">
            <div class="section-title">沿途兴趣点</div>
            <div class="card card-padded">
                <div class="route-poi-list">
                    ${route.pois.map((poi, index) => `
                        <div class="route-poi">${index === 0 ? '🟢 起点: ' : index === route.pois.length - 1 ? '🔴 终点: ' : '🟡 途经: '}${poi}</div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Rewards -->
        <div class="section" style="padding-top:0">
            <div class="section-title">完成奖励</div>
            <div class="card card-padded">
                <div style="font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">基础奖励:</div>
                <div style="display:flex;gap:var(--space-lg);margin-bottom:var(--space-md)">
                    ${Components.currency('energy', route.rewards.energy, true)}
                    ${Components.currency('xp', route.rewards.xp, true)}
                    ${Components.currency('star', route.rewards.starCoin, true)}
                </div>
                <div class="divider" style="margin:var(--space-sm) 0"></div>
                <div style="font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">首次完成额外奖励:</div>
                <div style="display:flex;flex-direction:column;gap:var(--space-xs);font-size:var(--font-sm);color:var(--text-secondary)">
                    <div>🏅 勋章: 美食探索者</div>
                    <div>⚡ 能量: +50 (首次奖励)</div>
                </div>
                <div class="divider" style="margin:var(--space-sm) 0"></div>
                <div style="font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">挑战目标:</div>
                <div style="display:flex;flex-direction:column;gap:var(--space-xs);font-size:var(--font-sm);color:var(--text-secondary)">
                    <div>⏱️ ${estimatedTime - 5}分钟内完成: +20⚡</div>
                    <div>📸 打卡${route.pois.length}个POI: +30⚡</div>
                </div>
            </div>
        </div>

        <!-- Reviews -->
        ${route.reviews.length > 0 ? `
            <div class="section" style="padding-top:0">
                <div class="section-title">用户打卡动态</div>
                <div class="card card-padded">
                    ${route.reviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-user">${review.user}</span>
                                <span class="review-rating">${Components.stars(review.rating)}</span>
                            </div>
                            <div class="review-comment">${review.comment}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <!-- Actions -->
        <div class="section" style="padding-top:0">
            <div style="display:flex;gap:var(--space-md)">
                <button class="btn btn-primary" style="flex:1" onclick="Router.navigate('ride')">开始骑行</button>
                <button class="btn btn-outline" style="flex:1">收藏路线 ♡</button>
            </div>
        </div>
    </div>`;
};
