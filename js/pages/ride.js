/* ===== Ride Page ===== */
Pages.ride = function() {
    return `
    <div class="page">
        <div class="section" style="padding-top:var(--space-3xl);text-align:center">
            <div style="font-size:64px;margin-bottom:var(--space-lg)">🚲</div>
            <div style="font-size:var(--font-2xl);font-weight:var(--font-weight-bold);margin-bottom:var(--space-md)">扫码开始骑行</div>
            <div style="font-size:var(--font-md);color:var(--text-secondary);margin-bottom:var(--space-2xl)">
                打开美团APP扫描车身二维码<br>即可开始您的骑行之旅
            </div>
            <button class="btn btn-primary btn-block" style="max-width:280px;margin:0 auto;padding:14px 24px;font-size:var(--font-lg)">
                扫码骑行
            </button>
        </div>

        <div class="section">
            <div class="section-title">今日数据</div>
            <div class="card card-padded">
                <div style="display:flex;justify-content:space-around">
                    ${Components.statItem(Store.today.rides, '次骑行')}
                    ${Components.statItem(Store.today.distance + 'km', '里程')}
                    ${Components.statItem(Store.today.duration + 'min', '时长')}
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">推荐路线</div>
            ${Store.routes.slice(0, 2).map(route => `
                <div class="card card-padded" style="margin-bottom:var(--space-md);cursor:pointer" onclick="Router.navigate('route-detail/${route.id}')">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:32px">${route.icon}</div>
                        <div style="flex:1">
                            <div style="font-weight:var(--font-weight-bold)">${route.name}</div>
                            <div style="font-size:var(--font-sm);color:var(--text-secondary)">
                                ${route.distance}km · ${route.difficulty}
                            </div>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" width="20" height="20"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
};
