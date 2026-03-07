/* ===== Explore Page ===== */
Pages.explore = function() {
    const exploredCount = Store.areas.filter(a => a.explored).length;
    const totalAreas = Store.areas.length;
    const explorePercent = Math.round(exploredCount / totalAreas * 100);

    return `
    <div class="page">
        <div class="section" style="padding-top:var(--space-2xl)">
            <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">城市探索</div>
            <div style="font-size:var(--font-sm);color:var(--text-secondary);margin-bottom:var(--space-md)">
                探索进度: ${exploredCount}/${totalAreas}区域
            </div>
            ${Components.progressBar(explorePercent, 'energy', 'lg')}
        </div>

        <div class="section">
            ${Components.routeMap(200, { seed: 0 })}
        </div>

        <div class="section">
            <div class="section-title">区域列表</div>
            ${Store.areas.map(area => `
                <div class="card card-padded stagger-item" style="margin-bottom:var(--space-md)">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:40px">${area.icon}</div>
                        <div style="flex:1">
                            <div style="font-weight:var(--font-weight-bold);display:flex;align-items:center;gap:var(--space-sm)">
                                ${area.name}
                                ${area.explored ? '<span style="color:var(--success-green);font-size:var(--font-sm)">✓已探索</span>' : '<span style="color:var(--text-tertiary);font-size:var(--font-sm)">🔒未探索</span>'}
                            </div>
                            ${area.explored ? `
                                <div style="font-size:var(--font-sm);color:var(--text-secondary);margin-top:4px">
                                    骑行: ${area.distance}km | 路线: ${area.routesCompleted}/${area.routesTotal}
                                </div>
                                <div style="font-size:var(--font-sm);color:var(--text-secondary)">
                                    记忆: ${area.memoriesCollected}/${area.memoriesTotal} | 完成度: ${area.progress}%
                                </div>
                            ` : `
                                <div style="font-size:var(--font-sm);color:var(--text-secondary);margin-top:4px">
                                    首次进入奖励: ${Components.currency('energy', area.firstReward.energy, true)} ${Components.currency('xp', area.firstReward.xp, true)}
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <div class="section-title">特色路线推荐</div>
            ${Store.routes.map(route => `
                <div class="card stagger-item" style="margin-bottom:var(--space-md);cursor:pointer" onclick="Router.navigate('route-detail/${route.id}')">
                    ${Components.routeMap(150, { seed: route.id })}
                    <div class="card-padded">
                        <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                            <span style="font-size:20px">${route.icon}</span>
                            <span style="font-weight:var(--font-weight-bold)">${route.name}</span>
                        </div>
                        <div style="font-size:var(--font-sm);color:var(--text-secondary);margin-bottom:var(--space-sm)">
                            ⭐ ${route.rating} (${route.completions}人完成)
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:var(--space-sm)">
                            ${route.tags.map(tag => Components.badge(tag, 'gray')).join('')}
                        </div>
                        <div style="font-size:var(--font-sm)">
                            奖励: ${Components.currency('energy', route.rewards.energy, true)}
                            ${Components.currency('xp', route.rewards.xp, true)}
                            ${Components.currency('star', route.rewards.starCoin, true)}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
};
