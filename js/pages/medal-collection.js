/* ===== Medal Collection Page ===== */
Pages.medalCollection = function() {
    const medals = Store.medals;
    const unlockedCount = medals.filter(m => m.unlocked).length;
    const percent = Math.round(unlockedCount / medals.length * 100);

    return `
    <div class="page">
        ${Components.pageHeader('勋章图鉴')}

        <div class="collection-header">
            <div class="collection-progress">收集进度: ${unlockedCount}/${medals.length}  ${percent}%</div>
            ${Components.progressBar(percent, 'energy')}
        </div>

        ${Components.filterTabs(['全部', '里程碑', '探索', '挑战', '社区'], 0, '')}

        <div class="section">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md)">
                ${medals.map(medal => Components.collectionItem(medal, 'medal')).join('')}
            </div>
        </div>
    </div>`;
};
