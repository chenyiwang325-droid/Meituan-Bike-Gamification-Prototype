/* ===== Explorer Detail Page ===== */
Pages.explorerDetail = function() {
    const u = Store.user;
    const stats = Store.cumulativeStats;

    return `
    <div class="page">
        ${Components.pageHeader('探索者档案')}
        
        <div class="explorer-hero">
            <div class="avatar avatar-xl" style="margin:0 auto var(--space-md)">${u.avatar}</div>
            <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-heavy)">探索者 Lv.${u.level}</div>
            <div class="explorer-title-badge">${u.title}</div>
            <div style="margin-top:var(--space-lg)">
                <div style="font-size:var(--font-sm);color:var(--text-secondary);margin-bottom:4px">经验值</div>
                ${Components.progressBar(u.xp / u.xpMax * 100, 'xp', 'lg')}
                <div style="font-size:var(--font-xs);color:var(--text-tertiary);margin-top:4px">
                    ${u.xp.toLocaleString()}/${u.xpMax.toLocaleString()} · 距离下一级还需 ${(u.xpMax - u.xp).toLocaleString()} 经验
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">当前等级权益</div>
            <div class="card card-padded">
                <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
                    <div>✓ 能量获取效率 +25%</div>
                    <div>✓ 已解锁伙伴种类: 3种</div>
                    <div>✓ 已解锁技能: 8个</div>
                    <div>✓ 专属称号: ${u.title}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">下一等级权益 (Lv.30)</div>
            <div class="card card-padded">
                <div style="display:flex;flex-direction:column;gap:var(--space-sm);color:var(--text-tertiary)">
                    <div>🔒 能量获取效率 +30%</div>
                    <div>🔒 解锁新伙伴: 青龙</div>
                    <div>🔒 解锁新技能: 能量加成III</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">成长历程</div>
            <div class="card card-padded">
                <div class="explorer-stats-grid">
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${stats.totalRides}</div>
                        <div class="explorer-stat-label">累计骑行</div>
                    </div>
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${stats.totalDistance}km</div>
                        <div class="explorer-stat-label">累计里程</div>
                    </div>
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${stats.totalDuration}min</div>
                        <div class="explorer-stat-label">累计时长</div>
                    </div>
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${stats.totalEnergy.toLocaleString()}</div>
                        <div class="explorer-stat-label">累计能量</div>
                    </div>
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${stats.totalStarCoin.toLocaleString()}</div>
                        <div class="explorer-stat-label">累计星币</div>
                    </div>
                    <div class="explorer-stat-card">
                        <div class="explorer-stat-value">${u.registeredDays}天</div>
                        <div class="explorer-stat-label">注册天数</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">称号展示</div>
            <div class="card card-padded">
                <div style="margin-bottom:var(--space-md)">
                    当前称号: <span style="font-weight:var(--font-weight-bold)">${u.title}</span>
                </div>
                <div style="margin-bottom:var(--space-sm)">已获得称号: ${Store.titles.filter(t => t.unlocked).length}个</div>
                <div class="title-grid">
                    ${Store.titles.map(t => `
                        <div class="title-item ${t.current ? 'active' : t.unlocked ? 'unlocked' : ''}">${t.name}</div>
                    `).join('')}
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">排行榜</div>
            <div class="card card-padded">
                <div style="display:flex;justify-content:space-around;text-align:center">
                    <div>
                        <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-heavy);color:var(--meituan-yellow)">第${Store.rankings.city}名</div>
                        <div style="font-size:var(--font-sm);color:var(--text-tertiary);margin-top:4px">城市排名</div>
                    </div>
                    <div>
                        <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-heavy);color:var(--xp-blue)">第${Store.rankings.national.toLocaleString()}名</div>
                        <div style="font-size:var(--font-sm);color:var(--text-tertiary);margin-top:4px">全国排名</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};
