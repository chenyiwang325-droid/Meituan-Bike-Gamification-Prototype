/* ===== Ride Detail Page ===== */
Pages.rideDetail = function(rideId) {
    const ride = Store.rideHistory.find(r => r.id === parseInt(rideId)) || Store.rideHistory[0];
    const baseEnergy = ride.energyGained - ride.bonuses.reduce((sum, b) => sum + b.value, 0);

    return `
    <div class="page">
        ${Components.pageHeader('骑行详情')}

        <!-- Map -->
        <div class="section" style="padding-bottom:0">
            ${Components.routeMap(200, { seed: ride.id })}
        </div>

        <!-- Core Stats -->
        <div class="section">
            <div class="ride-detail-stats">
                <div class="ride-detail-stat">
                    <div class="ride-detail-stat-value">${ride.distance}km</div>
                    <div class="ride-detail-stat-label">骑行距离</div>
                </div>
                <div class="ride-detail-stat">
                    <div class="ride-detail-stat-value">${ride.duration}min</div>
                    <div class="ride-detail-stat-label">骑行时长</div>
                </div>
                <div class="ride-detail-stat">
                    <div class="ride-detail-stat-value">${ride.avgSpeed}km/h</div>
                    <div class="ride-detail-stat-label">平均速度</div>
                </div>
                <div class="ride-detail-stat">
                    <div class="ride-detail-stat-value">${ride.carbonSaved}kg</div>
                    <div class="ride-detail-stat-label">减少碳排</div>
                </div>
            </div>
        </div>

        <!-- Rewards Breakdown -->
        <div class="section" style="padding-top:0">
            <div class="section-title">奖励收获</div>
            <div class="card card-padded">
                <div class="reward-breakdown">
                    <div class="reward-line">
                        <span>⚡ 基础能量</span>
                        <span>+${baseEnergy}</span>
                    </div>
                    ${ride.bonuses.map(bonus => `
                        <div class="reward-line">
                            <span>${bonus.type === '伙伴加成' ? '🎁' : bonus.type === '单车加成' ? '🚲' : '🌟'} ${bonus.type}</span>
                            <span>+${bonus.value} ${bonus.percent ? '(' + bonus.percent + '%)' : bonus.days ? '(' + bonus.days + '天)' : ''}</span>
                        </div>
                    `).join('')}
                    <div class="reward-total">
                        <span>💰 总计</span>
                        <span>${Components.currency('energy', ride.energyGained, true)}</span>
                    </div>
                </div>

                <div style="margin-top:var(--space-lg);display:flex;flex-direction:column;gap:var(--space-sm)">
                    <div style="display:flex;justify-content:space-between">
                        <span>⭐ 获得经验</span>
                        <span>${Components.currency('xp', ride.xpGained, true)}</span>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span>💰 获得星币</span>
                        <span>${Components.currency('star', ride.starCoinGained, true)}</span>
                    </div>
                    ${ride.routeCompleted ? `
                        <div style="display:flex;justify-content:space-between">
                            <span>🏅 完成路线</span>
                            <span>${ride.routeCompleted}</span>
                        </div>
                    ` : ''}
                    ${ride.medalUnlocked ? `
                        <div style="display:flex;justify-content:space-between">
                            <span>🎖️ 解锁勋章</span>
                            <span style="color:var(--legendary-orange)">${ride.medalUnlocked}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <!-- Ride Info -->
        <div class="section" style="padding-top:0">
            <div class="section-title">骑行信息</div>
            <div class="card card-padded">
                <div class="ride-info-row">
                    <span class="ride-info-label">日期</span>
                    <span>${ride.date}</span>
                </div>
                <div class="ride-info-row">
                    <span class="ride-info-label">时间</span>
                    <span>${ride.time}</span>
                </div>
                <div class="ride-info-row">
                    <span class="ride-info-label">起点</span>
                    <span>${ride.startLocation}</span>
                </div>
                <div class="ride-info-row">
                    <span class="ride-info-label">终点</span>
                    <span>${ride.endLocation}</span>
                </div>
                <div class="ride-info-row">
                    <span class="ride-info-label">使用伙伴</span>
                    <span>${ride.companion}</span>
                </div>
                <div class="ride-info-row">
                    <span class="ride-info-label">使用单车</span>
                    <span>${ride.bike}</span>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="section" style="padding-top:0">
            <div style="display:flex;gap:var(--space-md)">
                <button class="btn btn-primary" style="flex:1">分享到社区</button>
                <button class="btn btn-outline" style="flex:1">保存为路线</button>
            </div>
        </div>
    </div>`;
};
