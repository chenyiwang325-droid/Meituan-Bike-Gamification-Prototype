/* ===== Companion & Bike Detail Page ===== */
Pages.companionBike = function() {
    const c = Store.currentCompanion;
    const b = Store.currentBike;

    return `
    <div class="page">
        ${Components.pageHeader('我的骑行伙伴')}

        <div class="cb-scene">
            <div class="cb-illustration">
                <div class="cb-companion animate-breathe" style="font-size:80px">${c.emoji}</div>
                <div class="cb-bike" style="font-size:48px">${b.emoji}</div>
            </div>
            <div style="margin-top:var(--space-md)">
                <div class="cb-bonus-card">
                    <div class="cb-bonus-item">⚡ 能量加成: +25% (伙伴+${c.skills[0].bonus}% 单车+${b.attributes[0].bonus}%)</div>
                    <div class="cb-bonus-item">📈 经验加成: +20% (伙伴+${c.skills[1].bonus}% 单车+${b.attributes[1].bonus}%)</div>
                    <div class="cb-bonus-item">🍀 幸运加成: +${c.skills[2].bonus}% (伙伴技能)</div>
                </div>
            </div>
        </div>

        <div id="cb-tabs">
            ${Components.tabSwitcher(['伙伴信息', '单车信息', '组合数据'], 0, 'Pages.switchCBTab')}
        </div>

        <div id="cb-content">
            ${Pages._companionTab()}
        </div>
    </div>`;
};

Pages._companionTab = function() {
    const c = Store.currentCompanion;
    return `
    <div class="section">
        <div class="card card-padded">
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-lg)">
                <div style="font-size:48px">${c.emoji}</div>
                <div>
                    <div style="font-size:var(--font-xl);font-weight:var(--font-weight-bold)">${c.name} Lv.${c.level}</div>
                    <div style="font-size:var(--font-sm);color:var(--text-secondary)">${c.series} · ${c.type}</div>
                </div>
            </div>
            <div style="margin-bottom:var(--space-md)">
                <div style="display:flex;justify-content:space-between;font-size:var(--font-sm);margin-bottom:4px">
                    <span>等级进度</span>
                    <span>${c.xp}/${c.xpMax} (${Math.round(c.xp/c.xpMax*100)}%)</span>
                </div>
                ${Components.progressBar(c.xp / c.xpMax * 100, 'energy', 'lg')}
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                <span style="font-size:var(--font-sm)">亲密度</span>
                ${Components.hearts(c.intimacy)}
                <span style="font-size:var(--font-sm);color:var(--text-tertiary)">${c.intimacy}%</span>
            </div>
            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">陪伴天数: ${c.daysWithUser}天</div>
        </div>
    </div>
    <div class="section">
        <div class="section-title">伙伴技能</div>
        <div class="card card-padded">
            ${c.skills.map(s => `
                <div class="cb-skill-item">
                    <div class="cb-skill-icon">${s.icon}</div>
                    <div class="cb-skill-info">
                        <div class="cb-skill-name">${s.name} Lv.${s.level} ${s.level >= s.maxLevel ? '<span class="badge badge-orange">MAX</span>' : ''}</div>
                        <div class="cb-skill-level">+${s.bonus}%</div>
                    </div>
                </div>
            `).join('')}
            <button class="btn btn-outline btn-block" style="margin-top:var(--space-md)">升级技能</button>
        </div>
    </div>
    <div class="section">
        <div class="section-title">伙伴故事 (已解锁 ${c.stories.filter(s => s.unlocked).length}/${c.stories.length})</div>
        <div class="card card-padded">
            ${c.stories.map(s => `
                <div class="cb-story-item">
                    <span>${s.unlocked ? '✓' : '🔒'}</span>
                    <span style="flex:1">第${s.chapter}章: ${s.title}</span>
                    ${!s.unlocked ? '<span style="font-size:var(--font-xs);color:var(--text-tertiary)">需要' + s.requirement + '</span>' : ''}
                </div>
            `).join('')}
        </div>
    </div>
    <div class="section">
        <div class="section-title">进化路线</div>
        <div class="card card-padded">
            <div class="cb-evolution">
                ${c.evolution.map((stage, i) => `
                    ${i > 0 ? '<span class="cb-evo-arrow">→</span>' : ''}
                    <div class="cb-evo-stage ${i < c.currentStage ? 'completed' : i === c.currentStage ? 'current' : ''}">${stage}${i <= c.currentStage ? '✓' : ''}</div>
                `).join('')}
            </div>
            <div style="text-align:center;font-size:var(--font-sm);color:var(--text-tertiary)">下次进化: Lv.25 (还需10级)</div>
        </div>
    </div>
    <div class="cb-actions">
        <button class="btn btn-primary" style="flex:1">喂养伙伴 -50⚡</button>
        <button class="btn btn-secondary" style="flex:1">更换伙伴</button>
    </div>`;
};

Pages._bikeTab = function() {
    const b = Store.currentBike;
    return `
    <div class="section">
        <div class="card card-padded">
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-lg)">
                <div style="font-size:48px">${b.emoji}</div>
                <div>
                    <div style="font-size:var(--font-xl);font-weight:var(--font-weight-bold)">${b.name} Lv.${b.level}</div>
                    <div style="font-size:var(--font-sm);color:var(--text-secondary)">${b.series} · ${b.unlockLevel}级解锁</div>
                </div>
            </div>
            <div style="margin-bottom:var(--space-md)">
                <div style="display:flex;justify-content:space-between;font-size:var(--font-sm);margin-bottom:4px">
                    <span>等级进度</span>
                    <span>${b.xp}/${b.xpMax} (${Math.round(b.xp/b.xpMax*100)}%)</span>
                </div>
                ${Components.progressBar(b.xp / b.xpMax * 100, 'xp', 'lg')}
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                <span style="font-size:var(--font-sm)">熟练度</span>
                ${Components.stars(b.proficiency)}
            </div>
            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">使用次数: ${b.usageCount}次</div>
        </div>
    </div>
    <div class="section">
        <div class="section-title">单车属性</div>
        <div class="card card-padded">
            ${b.attributes.map(a => `
                <div class="cb-skill-item">
                    <div class="cb-skill-icon">${a.icon}</div>
                    <div class="cb-skill-info">
                        <div class="cb-skill-name">${a.name} Lv.${a.level}</div>
                        <div class="cb-skill-level">+${a.bonus}%</div>
                    </div>
                </div>
            `).join('')}
            <div class="cb-skill-item">
                <div class="cb-skill-icon">💫</div>
                <div class="cb-skill-info">
                    <div class="cb-skill-name">特殊效果</div>
                    <div class="cb-skill-level">${b.specialEffect} ✓</div>
                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="section-title">解锁特性 (已解锁 ${b.features.filter(f => f.unlocked).length}/${b.features.length})</div>
        <div class="card card-padded">
            ${b.features.map(f => `
                <div class="cb-feature-item">
                    <span>${f.unlocked ? '✓' : '🔒'}</span>
                    <span style="flex:1">${f.name}</span>
                    ${!f.unlocked ? '<span style="font-size:var(--font-xs);color:var(--text-tertiary)">需要' + f.requirement + '</span>' : ''}
                </div>
            `).join('')}
        </div>
    </div>
    <div class="cb-actions">
        <button class="btn btn-primary" style="flex:1">升级单车 -100⚡</button>
        <button class="btn btn-secondary" style="flex:1">切换单车</button>
    </div>`;
};

Pages._comboTab = function() {
    return `
    <div class="section">
        <div class="section-title">共同骑行数据</div>
        <div class="card card-padded">
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-md)">
                ${Components.statItem('156.8km', '共同骑行')}
                ${Components.statItem('23条', '完成路线')}
                ${Components.statItem('780min', '骑行时长')}
                ${Components.statItem('+3,140⚡', '获得能量')}
            </div>
        </div>
    </div>
    <div class="section">
        <div class="section-title">组合成就</div>
        <div class="card card-padded">
            <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
                <div>✓ 初次相遇: 完成首次骑行</div>
                <div>✓ 默契伙伴: 共同骑行50km</div>
                <div>✓ 城市探索者: 解锁5个区域</div>
                <div style="color:var(--text-tertiary)">🔒 传奇组合: 共同骑行500km</div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="card card-padded text-center">
            <div>组合等级: ${Components.stars(3)}</div>
            <div style="font-size:var(--font-sm);color:var(--text-tertiary);margin-top:var(--space-sm)">下一级奖励: 额外能量加成+5%</div>
        </div>
    </div>`;
};

Pages.switchCBTab = function(index) {
    const content = document.getElementById('cb-content');
    const tabs = document.querySelectorAll('.tab-switcher-item');
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));

    if (index === 0) content.innerHTML = Pages._companionTab();
    else if (index === 1) content.innerHTML = Pages._bikeTab();
    else content.innerHTML = Pages._comboTab();

    Animations.initProgressBars();
};
