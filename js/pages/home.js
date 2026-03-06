/* ===== Home Page ===== */
window.Pages = window.Pages || {};
const Pages = window.Pages;

Pages.home = function() {
    const u = Store.user;
    const t = Store.today;
    const c = Store.currentCompanion;
    const b = Store.currentBike;
    const weekTotal = Store.weeklyData.reduce((s, d) => s + d.distance, 0);
    const weekGoal = 50;
    const weekPercent = Math.min(Math.round(weekTotal / weekGoal * 100), 100);

    return `
    <div class="page home-page">
        <!-- Top Profile Bar -->
        <div class="home-profile-bar" onclick="Router.navigate('explorer-detail')">
            <div class="avatar">${u.avatar}</div>
            <div class="home-profile-info">
                <div class="home-profile-name">
                    ${u.name} <span class="home-level-badge">Lv.${u.level}</span>
                </div>
                <div class="home-currencies">
                    ${Components.currency('energy', u.energy.toLocaleString())}
                    ${Components.currency('star', u.starCoin)}
                </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>

        <!-- XP Bar -->
        <div class="home-xp-bar">
            <div class="home-xp-label">
                <span class="currency-xp">经验值</span>
                <span>${u.xp.toLocaleString()}/${u.xpMax.toLocaleString()}</span>
            </div>
            ${Components.progressBar(u.xp / u.xpMax * 100, 'xp')}
        </div>

        <!-- Today's Ride Card -->
        <div class="section">
            <div class="card card-padded">
                <div style="font-size:var(--font-lg);font-weight:var(--font-weight-bold);margin-bottom:var(--space-lg)">今日骑行</div>
                <div class="home-today-stats">
                    <div class="stat-item">
                        <div class="stat-value" data-count="${t.rides}">${t.rides}</div>
                        <div class="stat-label">次骑行</div>
                    </div>
                    <div class="home-stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-value" data-count="${t.distance}" data-suffix="km">${t.distance}km</div>
                        <div class="stat-label">里程</div>
                    </div>
                    <div class="home-stat-divider"></div>
                    <div class="stat-item">
                        <div class="stat-value" data-count="${t.duration}" data-suffix="min">${t.duration}min</div>
                        <div class="stat-label">时长</div>
                    </div>
                </div>

                <div class="divider"></div>

                <div>
                    <div class="home-today-rewards-title">今日收获</div>
                    <div class="home-rewards-row">
                        ${Components.currency('energy', t.energyGained, true)}
                        ${Components.currency('star', t.starCoinGained, true)}
                        ${Components.currency('xp', t.xpGained, true)}
                    </div>
                </div>

                <div class="divider"></div>

                <!-- Companion riding scene -->
                <div class="home-companion-scene" onclick="Router.navigate('companion-bike')">
                    <div class="home-companion-illustration">
                        <div class="home-companion-emoji animate-breathe">${c.emoji}</div>
                        <div class="home-bike-emoji">
                            ${b.emoji}
                            <div class="home-wheel animate-rotate"></div>
                        </div>
                    </div>
                    <div class="home-companion-info">
                        <div class="home-companion-name">${c.name} <span style="color:var(--text-tertiary)">Lv.${c.level}</span></div>
                        <div class="home-companion-bike">骑着 ${b.name} <span style="color:var(--text-tertiary)">Lv.${b.level}</span></div>
                        <div class="home-companion-intimacy">
                            亲密度 ${Components.hearts(c.intimacy)} ${c.intimacy}%
                        </div>
                        <div class="home-companion-bonus">
                            加成：⚡+${c.skills[0].bonus}% 📈+${c.skills[1].bonus}%
                        </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="16" height="16">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Weekly Trend -->
        <div class="section">
            <div class="card card-padded">
                <div class="home-section-header">
                    <span class="section-title" style="margin-bottom:0">本周骑行趋势</span>
                    <span class="home-section-link" onclick="Router.navigate('data-stats')">查看详情 ></span>
                </div>
                <div id="weekly-chart" style="width:100%;height:200px;margin:var(--space-md) 0"></div>

                <div class="home-week-summary">
                    <span>本周: ${weekTotal.toFixed(1)}km | 目标: ${weekGoal}km</span>
                </div>
                <div style="margin-top:var(--space-sm)">
                    <div class="home-week-progress-label">
                        <span>完成度</span>
                        <span>${weekPercent}%</span>
                    </div>
                    ${Components.progressBar(weekPercent, 'green', 'lg')}
                </div>

                <div class="divider"></div>

                <div>
                    <div class="home-achievements-title">本周游戏化成就</div>
                    ${Store.weeklyAchievements.map((a, i) => `
                        <div class="home-achievement-item stagger-item" style="animation-delay:${i * 100}ms">
                            <span class="home-achievement-icon ${a.isNew ? 'animate-glow' : ''}">${a.icon}</span>
                            <span>${a.text}</span>
                            ${a.isNew ? '<span class="badge badge-orange" style="margin-left:auto">NEW</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="section">
            <div class="home-quick-actions">
                <div class="home-quick-action hover-scale" onclick="Router.navigate('skill-tree')">
                    <div class="home-quick-icon" style="background:rgba(74,144,226,0.12)">⚡</div>
                    <div class="home-quick-label">技能树</div>
                    <div class="home-quick-sub">8/20解锁</div>
                </div>
                <div class="home-quick-action hover-scale" onclick="Router.navigate('challenges')">
                    <div class="home-quick-icon" style="background:rgba(255,107,0,0.12)">🏆</div>
                    <div class="home-quick-label">挑战</div>
                    <div class="home-quick-sub">2个进行中</div>
                </div>
                <div class="home-quick-action hover-scale" onclick="Router.navigate('star-coin')">
                    <div class="home-quick-icon" style="background:rgba(255,215,0,0.12)">🎁</div>
                    <div class="home-quick-label">兑换</div>
                    <div class="home-quick-sub">${u.starCoin}星币</div>
                </div>
            </div>
        </div>

        <!-- Ride History -->
        <div class="section">
            <div class="section-title">骑行历史记录</div>
            ${Store.rideHistory.map(ride => `
                <div class="card card-padded home-ride-item stagger-item" onclick="Router.navigate('ride-detail/${ride.id}')">
                    <div class="home-ride-header">
                        <span class="home-ride-time">今天 ${ride.time}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="14" height="14">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <div class="home-ride-stats">${ride.distance}km · ${ride.duration}分钟</div>
                    <div class="home-ride-route">${ride.startLocation} → ${ride.endLocation}</div>
                    <div class="home-ride-rewards">
                        获得: ${Components.currency('energy', ride.energyGained, true)}
                        ${Components.currency('star', ride.starCoinGained, true)}
                        ${Components.currency('xp', ride.xpGained, true)}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
};
