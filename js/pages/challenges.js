/* ===== Challenges Page ===== */
Pages.challenges = function() {
    const tabs = ['进行中', '已完成', '可参与'];
    const active = window.challengeTab || 0;

    return `
    <div class="page">
        ${Components.pageHeader('我的挑战')}
        ${Components.filterTabs(tabs, active, 'Pages.switchChallengeTab')}
        <div class="section">
            ${active === 0 ? `
                ${Store.challenges.ongoing.map(challenge => `
                    <div class="card card-padded challenge-card stagger-item">
                        <div class="challenge-header">
                            <div class="challenge-icon">${challenge.icon}</div>
                            <div style="flex:1">
                                <div class="challenge-title">${challenge.name}</div>
                                <div class="challenge-time">剩余时间: ${challenge.daysLeft}天</div>
                            </div>
                        </div>
                        <div style="margin-bottom:var(--space-md)">
                            ${Components.progressBar(challenge.progress, 'green', 'lg')}
                            <div style="text-align:right;font-size:var(--font-xs);color:var(--text-tertiary);margin-top:4px">${challenge.progress}%</div>
                        </div>
                        <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">任务进度</div>
                        ${challenge.tasks.map(task => `
                            <div class="challenge-task">
                                <span>${task.completed ? '✓' : '⏳'}</span>
                                <span>${task.name} (${task.current}/${task.target})</span>
                            </div>
                        `).join('')}
                        <div class="divider"></div>
                        <div style="font-size:var(--font-sm);font-weight:var(--font-weight-bold);margin-bottom:var(--space-sm)">奖励预览</div>
                        <div class="challenge-reward-preview">
                            ${challenge.rewards.map(r => Components.badge(`${r.icon} ${r.name || r.value + (r.type === '能量' ? '能量' : '')}`, r.type === '勋章' ? 'purple' : r.type === '能量' ? 'yellow' : 'orange')).join('')}
                        </div>
                        <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg)">
                            <button class="btn btn-outline" style="flex:1">查看详情</button>
                            <button class="btn btn-primary" style="flex:1">继续挑战</button>
                        </div>
                    </div>
                `).join('')}
                <div class="section-title">每日任务</div>
                <div class="card">
                    ${Store.challenges.daily.map(task => `
                        <div class="daily-task">
                            <span>${task.completed ? '✓' : '⏳'}</span>
                            <div class="daily-task-info">
                                <div class="daily-task-name">${task.name} (${task.current}/${task.target})</div>
                                <div class="daily-task-reward">奖励: +${task.reward}⚡ ${task.claimed ? '已领取' : ''}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div>该分类内容正在准备中</div>
                </div>
            `}
        </div>
    </div>`;
};

Pages.switchChallengeTab = function(index) {
    window.challengeTab = index;
    Router.renderPage('challenges');
};
