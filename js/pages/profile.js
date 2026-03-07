/* ===== Profile Page ===== */
Pages.profile = function() {
    const u = Store.user;
    const stats = Store.cumulativeStats;

    return `
    <div class="page">
        <div class="section" style="padding-top:var(--space-2xl)">
            <div class="card card-padded text-center">
                <div style="margin:0 auto var(--space-md)">${Components.userAvatar(u, 80)}</div>
                <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-bold)">${u.name}</div>
                <div style="color:var(--text-secondary);margin-top:4px">${u.title}</div>
                <div style="margin-top:var(--space-md);display:flex;gap:var(--space-lg);justify-content:center">
                    ${Components.currency('energy', u.energy.toLocaleString())}
                    ${Components.currency('star', u.starCoin)}
                </div>
            </div>
        </div>

        <div class="section">
            <div class="card card-padded">
                <div style="display:flex;justify-content:space-around">
                    ${Components.statItem(u.level, '等级')}
                    ${Components.statItem(stats.totalRides, '骑行次数')}
                    ${Components.statItem(stats.totalDistance.toFixed(1) + 'km', '总里程')}
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">我的收藏</div>
            <div class="card card-padded" onclick="Router.navigate('medal-collection')" style="margin-bottom:var(--space-md);cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">🏅</div>
                        <div>
                            <div style="font-weight:var(--font-weight-bold)">勋章图鉴</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">已获得 ${Store.medals.filter(m => m.unlocked).length}/${Store.medals.length}</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="card card-padded" onclick="Router.navigate('companion-collection')" style="margin-bottom:var(--space-md);cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">🦘</div>
                        <div>
                            <div style="font-weight:var(--font-weight-bold)">伙伴图鉴</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">已获得 ${Store.companions.filter(c => c.unlocked).length}/${Store.companions.length}</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="card card-padded" onclick="Router.navigate('bike-collection')" style="cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">🚲</div>
                        <div>
                            <div style="font-weight:var(--font-weight-bold)">单车图鉴</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">已获得 ${Store.bikes.filter(b => b.unlocked).length}/${Store.bikes.length}</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">功能入口</div>
            <div class="card card-padded" onclick="Router.navigate('data-stats')" style="margin-bottom:var(--space-md);cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">📊</div>
                        <div style="font-weight:var(--font-weight-bold)">数据统计</div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="card card-padded" onclick="Router.navigate('challenges')" style="margin-bottom:var(--space-md);cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">🏆</div>
                        <div style="font-weight:var(--font-weight-bold)">我的挑战</div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>

            <div class="card card-padded" onclick="Router.navigate('star-coin')" style="cursor:pointer">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">🎁</div>
                        <div>
                            <div style="font-weight:var(--font-weight-bold)">星币兑换</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">当前: ${u.starCoin}星币</div>
                        </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            </div>
        </div>
    </div>`;
};
