/* ===== Bike Collection Page ===== */
Pages.bikeCollection = function() {
    const bikes = Store.bikes;
    const unlockedCount = bikes.filter(b => b.unlocked).length;
    const percent = Math.round(unlockedCount / bikes.length * 100);

    return `
    <div class="page">
        ${Components.pageHeader('单车图鉴')}

        <div class="collection-header">
            <div class="collection-progress">收集进度: ${unlockedCount}/${bikes.length}  ${percent}%</div>
            ${Components.progressBar(percent, 'xp')}
        </div>

        ${Components.filterTabs(['全部', '城市', '科技', '复古', '限定'], 0, '')}

        <div class="section">
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md)">
                ${bikes.map(bike => Components.collectionItem(bike, 'bike')).join('')}
            </div>
        </div>
    </div>`;
};
