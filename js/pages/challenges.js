/* ===== Challenges Page ===== */
Pages.challenges = function() {
    const tabs = ['进行中', '已完成', '可参与'];
    const active = window.challengeTab || 0;

    return `
    <div class="page">
        ${Components.pageHeader('我的挑战')}
        ${Components.filterTabs(tabs, active, 'Pages.switchChallengeTab')}
        <div class="section">
            ${active === 0 ? Pages._challengesOngoing() : ''}
            ${active === 1 ? Pages._challengesCompleted() : ''}
            ${active === 2 ? Pages._challengesAvailable() : ''}
        </div>
    </div>`;
};

Pages.switchChallengeTab = function(index) {
    window.challengeTab = index;
    Router.renderPage('challenges');
};

/* --- Ongoing tab --- */
Pages._challengesOngoing = function() {
    return `
        ${Store.challenges.ongoing.map(challenge => `
            <div class="card challenge-card stagger-item" style="overflow:hidden">
                <div style="padding:var(--space-md) var(--space-lg);background:${challenge.bannerGradient};color:#fff;display:flex;align-items:center;gap:var(--space-md)">
                    <div class="challenge-icon" style="background:rgba(255,255,255,0.18);color:#fff">
                        ${Components.svgIcon(challenge.iconName, 24)}
                    </div>
                    <div style="flex:1">
                        <div class="challenge-title" style="color:#fff">${challenge.name}</div>
                        <div style="font-size:var(--font-xs);opacity:0.85;margin-top:2px">${challenge.participants.toLocaleString()} 人参与 · 剩余 ${challenge.daysLeft} 天</div>
                    </div>
                </div>
                <div class="card-padded">
                    <div style="margin-bottom:var(--space-md)">
                        ${Components.progressBar(challenge.progress, 'green', 'lg')}
                        <div style="text-align:right;font-size:var(--font-xs);color:var(--text-tertiary);margin-top:4px">${challenge.progress}%</div>
                    </div>
                    <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">任务进度</div>
                    ${challenge.tasks.map(task => `
                        <div class="challenge-task">
                            <div class="challenge-task-icon ${task.completed ? 'done' : 'pending'}">
                                ${task.completed ? Components.svgIcon('check', 12) : Components.svgIcon('clock', 12)}
                            </div>
                            <span style="flex:1">${task.name}</span>
                            <span style="color:var(--text-tertiary);font-size:var(--font-xs)">${task.current}/${task.target}</span>
                        </div>
                    `).join('')}

                    <div class="challenge-carbon-stats">
                        ${Components.svgIcon('leaf', 20)}
                        <div>
                            <div class="carbon-value">${challenge.carbonSaved}kg</div>
                            <div class="carbon-label">已减碳 / 目标 ${challenge.carbonTarget}kg</div>
                        </div>
                        <div style="flex:1">
                            ${Components.progressBar(Math.round(challenge.carbonSaved / challenge.carbonTarget * 100), 'green')}
                        </div>
                    </div>

                    <div class="divider"></div>
                    <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">奖励预览</div>
                    <div class="challenge-reward-preview">
                        ${challenge.rewards.map(r => `
                            <span class="badge badge-${r.type === '勋章' ? 'purple' : r.type === '能量' ? 'yellow' : 'orange'}">
                                ${Components.svgIcon(r.iconName, 12)} ${r.name || r.value + (r.type === '能量' ? '能量' : '星币')}
                            </span>
                        `).join('')}
                    </div>
                    <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
                        <button class="btn btn-outline" style="flex:1">查看详情</button>
                        <button class="btn btn-primary" style="flex:1">继续挑战</button>
                    </div>
                </div>
            </div>
        `).join('')}

        <div class="section-title">每日任务</div>
        <div class="card">
            ${Store.challenges.daily.map(task => `
                <div class="daily-task">
                    <div class="challenge-task-icon ${task.completed ? 'done' : 'pending'}">
                        ${task.completed ? Components.svgIcon('check', 12) : Components.svgIcon('clock', 12)}
                    </div>
                    <div class="daily-task-info">
                        <div class="daily-task-name">${task.name} (${task.current}/${task.target})</div>
                        <div class="daily-task-reward">奖励: +${task.reward}⚡ ${task.claimed ? '已领取' : ''}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

/* --- Completed tab --- */
Pages._challengesCompleted = function() {
    const completed = Store.challenges.completed;
    if (!completed || completed.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${Components.svgIcon('trophy', 48)}</div>
                <div>还没有完成的挑战</div>
            </div>`;
    }

    return completed.map(c => `
        <div class="challenge-completed-card stagger-item">
            <div class="challenge-completed-header" style="background:${c.bannerGradient}">
                <div class="challenge-icon" style="background:rgba(255,255,255,0.18);color:#fff">
                    ${Components.svgIcon(c.iconName, 24)}
                </div>
                <div style="flex:1">
                    <div style="font-weight:var(--font-weight-bold)">${c.name}</div>
                    <div style="font-size:var(--font-xs);opacity:0.85;margin-top:2px">${c.participants.toLocaleString()} 人参与</div>
                </div>
                ${Components.badge('已完成', 'green')}
            </div>
            <div class="challenge-completed-body">
                <div class="challenge-completed-row">
                    <span>完成日期</span>
                    <span style="font-weight:var(--font-weight-medium)">${c.completedDate}</span>
                </div>
                <div class="challenge-completed-row">
                    <span>获得奖励</span>
                    <span style="font-weight:var(--font-weight-medium)">${c.rewardText}</span>
                </div>
                <div class="challenge-completed-row">
                    <span>减碳贡献</span>
                    <span style="font-weight:var(--font-weight-medium);color:var(--carbon-green)">${c.carbonSaved}kg CO₂</span>
                </div>
            </div>
        </div>
    `).join('');
};

/* --- Available tab --- */
Pages._challengesAvailable = function() {
    const available = Store.challenges.available;
    if (!available || available.length === 0) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${Components.svgIcon('trophy', 48)}</div>
                <div>暂无可参与的挑战</div>
            </div>`;
    }

    return available.map(c => `
        <div class="challenge-available-card stagger-item">
            ${Components.challengeBanner(c)}
            <div class="card-padded">
                <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">挑战目标</div>
                ${c.goals.map(g => `
                    <div class="challenge-goal-row">
                        <div class="challenge-task-icon pending">${Components.svgIcon('clock', 12)}</div>
                        <span>${g.name}</span>
                        <span class="goal-target">${g.target}</span>
                    </div>
                `).join('')}

                <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-top:var(--space-md);margin-bottom:var(--space-sm)">官方路线</div>
                <div class="challenge-official-routes">
                    ${c.officialRoutes.map(r => Components.badge(Components.svgIcon('route', 12) + ' ' + r, 'blue')).join('')}
                </div>

                <div class="challenge-carbon-stats">
                    ${Components.svgIcon('leaf', 20)}
                    <div>
                        <div class="carbon-value">${c.carbonSaved}kg</div>
                        <div class="carbon-label">全员减碳 / 目标 ${c.carbonTarget}kg</div>
                    </div>
                    <div style="flex:1">
                        ${Components.progressBar(Math.round(c.carbonSaved / c.carbonTarget * 100), 'green')}
                    </div>
                </div>

                <div class="challenge-participants">
                    <div class="challenge-participants-stack">
                        ${Components.userAvatar({name:'A',avatar:'A',level:10}, 24)}
                        ${Components.userAvatar({name:'B',avatar:'B',level:20}, 24)}
                        ${Components.userAvatar({name:'C',avatar:'C',level:30}, 24)}
                    </div>
                    <span>${c.participants.toLocaleString()} 人已参加</span>
                </div>

                <button class="btn btn-primary btn-block" style="margin-top:var(--space-lg)">立即参加</button>
            </div>
        </div>
    `).join('');
};
