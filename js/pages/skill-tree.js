/* ===== Skill Tree Page ===== */
Pages.skillTree = function() {
    const categories = ['效率', '社交', '特殊'];
    const currentCategory = window.skillTreeCategory || 0;
    const categoryData = Store.skills[currentCategory];
    const unlockedCount = Store.skills.flatMap(s => s.skills).filter(s => s.unlocked).length;
    const totalCount = Store.skills.flatMap(s => s.skills).length;

    return `
    <div class="page">
        ${Components.pageHeader('技能树')}
        <div class="section" style="padding-bottom:0">
            <div style="font-size:var(--font-sm);color:var(--text-secondary)">已解锁: ${unlockedCount}/${totalCount}</div>
        </div>
        ${Components.filterTabs(categories, currentCategory, 'Pages.switchSkillCategory')}
        <div class="skill-tree-container">
            <div class="section-title">${categoryData.category}技能树</div>
            <div class="skill-branch">
                ${categoryData.skills.map((skill, index) => `
                    <div class="skill-node-card ${skill.unlocked ? 'unlocked' : 'locked'}" onclick="Pages.showSkillDetail(${currentCategory}, ${index})">
                        <div class="skill-level-req">Lv.${skill.level}</div>
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-bonus">${skill.bonus} ${skill.unlocked ? '✓' : '🔒'}</div>
                    </div>
                    ${index < categoryData.skills.length - 1 ? `<div class="skill-connector ${skill.unlocked ? 'active' : ''}"></div>` : ''}
                `).join('')}
            </div>
        </div>
        <div class="section">
            <div class="section-title">技能详情</div>
            <div class="card card-padded" id="skill-detail-card">
                ${Pages.renderSkillDetail(categoryData.skills.find(s => s.unlocked) || categoryData.skills[0])}
            </div>
        </div>
    </div>`;
};

Pages.renderSkillDetail = function(skill) {
    return `
        <div style="font-size:var(--font-lg);font-weight:var(--font-weight-bold);margin-bottom:var(--space-md)">${skill.name}</div>
        <div style="display:flex;flex-direction:column;gap:var(--space-sm);font-size:var(--font-sm)">
            <div>等级要求: Lv.${skill.level}</div>
            <div>状态: ${skill.unlocked ? '已解锁 ✓' : '未解锁 🔒'}</div>
            <div>效果说明: 骑行获得的${skill.name.includes('能量') ? '能量' : skill.name.includes('经验') ? '经验' : '奖励'}提升${skill.bonus.replace('+', '')}</div>
            ${skill.unlockedAt ? `<div>解锁时间: ${skill.unlockedAt}</div>` : ''}
            ${skill.unlocked ? `<div>累计加成: +${Math.floor(Math.random() * 3000 + 500)}⚡</div>` : ''}
        </div>`;
};

Pages.switchSkillCategory = function(index) {
    window.skillTreeCategory = index;
    Router.renderPage('skill-tree');
};

Pages.showSkillDetail = function(categoryIndex, skillIndex) {
    const skill = Store.skills[categoryIndex].skills[skillIndex];
    const card = document.getElementById('skill-detail-card');
    if (card) card.innerHTML = Pages.renderSkillDetail(skill);
};
