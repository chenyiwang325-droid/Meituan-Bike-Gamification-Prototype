/* ===== Star Coin Shop Page ===== */
Pages.starCoin = function() {
    const balance = Store.user.starCoin;
    const items = Store.starCoinShop;

    return `
    <div class="page">
        ${Components.pageHeader('星币兑换')}

        <div class="star-coin-balance">
            <div class="balance-value">⭐ ${balance}</div>
            <div class="balance-label">当前星币余额</div>
        </div>

        <div style="padding:0 var(--space-lg)">
            ${Components.filterTabs(['全部', '外卖', '酒店', '娱乐', '会员'], 0, '')}
        </div>

        <div class="section">
            <div class="section-title">推荐兑换</div>
            ${items.slice(0, 1).map(item => `
                <div class="card card-padded" style="margin-bottom:var(--space-lg);border:2px solid var(--star-coin-gold)">
                    <div style="display:flex;align-items:center;gap:var(--space-md)">
                        <div style="font-size:48px">${item.icon}</div>
                        <div style="flex:1">
                            <div style="font-weight:var(--font-weight-bold);font-size:var(--font-lg)">${item.name}</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">${item.category} | 有效期: 7天</div>
                            <div style="font-size:var(--font-sm);color:var(--text-tertiary)">已兑换: 2,345次</div>
                        </div>
                        <div style="text-align:right">
                            <div class="shop-price-value">⭐ ${item.price}</div>
                            <button class="btn btn-primary" style="margin-top:var(--space-sm);padding:6px 16px;font-size:var(--font-sm)" ${balance < item.price ? 'disabled style="opacity:0.5"' : ''}>立即兑换</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section" style="padding-top:0">
            <div class="section-title">兑换商品列表</div>
            ${items.map(item => `
                <div class="shop-item">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-info">
                        <div class="shop-item-name">${item.name}</div>
                        <div class="shop-item-category">${item.category}</div>
                    </div>
                    <div class="shop-item-price">
                        <div class="shop-price-value">⭐ ${item.price}</div>
                        <div class="shop-stock ${item.stock === '有限' ? 'limited' : ''}">${item.stock}</div>
                        <button class="btn ${balance >= item.price ? 'btn-primary' : 'btn-secondary'}" style="padding:4px 12px;font-size:var(--font-xs)" ${balance < item.price ? 'disabled' : ''}>${balance >= item.price ? '兑换' : '不足'}</button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section" style="padding-top:0">
            <div class="card card-padded text-center" style="cursor:pointer">
                <div style="color:var(--text-secondary);font-size:var(--font-sm)">查看我的兑换记录 ></div>
            </div>
        </div>
    </div>`;
};
