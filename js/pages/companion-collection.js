/* ===== Companion Collection Page ===== */
Pages.companionCollection = function() {
    const companions = Store.companions;
    const unlockedCount = companions.filter(c => c.unlocked).length;
    const percent = Math.round(unlockedCount / companions.length * 100);

    return `
    <div class="page">
        ${Components.pageHeader('伙伴图鉴')}

        <div class="collection-header">
            <div class="collection-progress">收集进度: ${unlockedCount}/${companions.length}  ${percent}%</div>
            ${Components.progressBar(percent, 'purple')}
        </div>

        ${Components.filterTabs(['全部', '城市', '神话', '限定'], 0, '')}

        <div class="section">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md)">
                ${companions.map(companion => Components.collectionItem(companion, 'companion')).join('')}
            </div>
        </div>
    </div>`;
};
