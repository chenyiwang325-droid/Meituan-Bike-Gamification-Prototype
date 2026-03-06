/* ===== Data Stats Page ===== */
Pages.dataStats = function() {
    const tabs = ['今日', '本周', '本月', '累计'];
    const active = window.statsTab || 1;
    const stats = Store.cumulativeStats;
    const weekDistance = Store.weeklyData.reduce((sum, d) => sum + d.distance, 0);
    const weekRides = Store.weeklyData.reduce((sum, d) => sum + d.rides, 0);
    const exploredAreas = Store.areas.filter(a => a.explored);
    const totalAreaDistance = exploredAreas.reduce((sum, a) => sum + a.distance, 0);

    return `
    <div class="page">
        ${Components.pageHeader('数据统计')}
        ${Components.filterTabs(tabs, active, 'Pages.switchStatsTab')}
        <div class="section">
            <div class="stats-grid">
                <div class="stats-card"><div class="stats-card-value">${weekDistance.toFixed(1)}km</div><div class="stats-card-label">总里程</div></div>
                <div class="stats-card"><div class="stats-card-value">${weekRides}</div><div class="stats-card-label">骑行次数</div></div>
                <div class="stats-card"><div class="stats-card-value">180min</div><div class="stats-card-label">总时长</div></div>
                <div class="stats-card"><div class="stats-card-value">520⚡</div><div class="stats-card-label">获得能量</div></div>
                <div class="stats-card"><div class="stats-card-value">80⭐</div><div class="stats-card-label">获得星币</div></div>
                <div class="stats-card"><div class="stats-card-value">14.1kg</div><div class="stats-card-label">减少碳排</div></div>
            </div>
        </div>
        <div class="section">
            <div class="section-title">里程趋势图</div>
            <div class="card card-padded">
                <div id="trend-chart" style="width:100%;height:240px"></div>
                <div style="font-size:var(--font-sm);color:var(--success-green);margin-top:var(--space-sm)">对比上周: +15% ↑</div>
            </div>
        </div>
        <div class="section">
            <div class="section-title">区域分布</div>
            <div class="card card-padded">
                ${exploredAreas.map(area => {
                    const percent = Math.round(area.distance / totalAreaDistance * 100);
                    return `
                        <div class="area-bar">
                            <div class="area-bar-name">${area.name}</div>
                            <div class="area-bar-fill">${Components.progressBar(percent, 'energy')}</div>
                            <div class="area-bar-value">${percent}% ${area.distance}km</div>
                        </div>`;
                }).join('')}
                <div id="area-chart" style="width:100%;height:260px;margin-top:var(--space-lg)"></div>
            </div>
        </div>
        <div class="section">
            <div class="section-title">环保贡献</div>
            <div class="card eco-card">
                <div style="font-size:var(--font-sm);color:var(--text-secondary)">累计减少碳排放</div>
                <div class="eco-value">${stats.carbonSaved} kg CO2</div>
                <div class="eco-items">
                    <div>
                        <div style="font-size:24px">🌳</div>
                        <div style="font-size:var(--font-sm)">相当于种植</div>
                        <div style="font-weight:var(--font-weight-bold)">${stats.treesEquivalent}棵树</div>
                    </div>
                    <div>
                        <div style="font-size:24px">⛽</div>
                        <div style="font-size:var(--font-sm)">节省</div>
                        <div style="font-weight:var(--font-weight-bold)">${stats.gasolineSaved}升汽油</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="section-title">个人最佳</div>
            <div class="card card-padded">
                <div class="best-record"><span>单次最长距离</span><strong>${stats.bestDistance}km</strong></div>
                <div class="best-record"><span>单次最长时间</span><strong>${stats.bestDuration}分钟</strong></div>
                <div class="best-record"><span>最高平均速度</span><strong>${stats.bestSpeed}km/h</strong></div>
                <div class="best-record"><span>连续骑行天数</span><strong>${stats.consecutiveDays}天</strong></div>
            </div>
        </div>
    </div>`;
};

Pages.switchStatsTab = function(index) {
    window.statsTab = index;
    Router.renderPage('data-stats');
};
