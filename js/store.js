/* ===== Global Mock Data Store ===== */
const Store = {
    // User profile
    user: {
        id: 1,
        name: '探索者',
        avatar: '🚴',
        level: 25,
        xp: 8500,
        xpMax: 10000,
        energy: 1250,
        starCoin: 320,
        title: '城市漫游者',
        registeredDays: 45,
        consecutiveDays: 7
    },

    // Today's stats
    today: {
        rides: 3,
        distance: 8.5,
        duration: 45,
        energyGained: 120,
        starCoinGained: 25,
        xpGained: 300
    },

    // Weekly data for chart
    weeklyData: [
        { day: '一', distance: 6.2, rides: 2 },
        { day: '二', distance: 8.5, rides: 3 },
        { day: '三', distance: 4.8, rides: 2 },
        { day: '四', distance: 0, rides: 0 },
        { day: '五', distance: 9.2, rides: 4 },
        { day: '六', distance: 3.3, rides: 1 },
        { day: '日', distance: 3.2, rides: 1 }
    ],

    // Current companion
    currentCompanion: {
        id: 1,
        name: '美团小袋鼠',
        emoji: '🦘',
        level: 15,
        xp: 1200,
        xpMax: 2000,
        intimacy: 80,
        series: '城市系列',
        type: '初始伙伴',
        daysWithUser: 45,
        skills: [
            { name: '能量加成', level: 3, maxLevel: 3, bonus: 15, icon: '⚡' },
            { name: '经验加成', level: 2, maxLevel: 3, bonus: 15, icon: '📈' },
            { name: '幸运加成', level: 1, maxLevel: 3, bonus: 10, icon: '🍀' }
        ],
        stories: [
            { chapter: 1, title: '相遇', unlocked: true },
            { chapter: 2, title: '成长', unlocked: true },
            { chapter: 3, title: '冒险', unlocked: true },
            { chapter: 4, title: '进化', unlocked: false, requirement: 'Lv.25' },
            { chapter: 5, title: '传说', unlocked: false, requirement: 'Lv.50' }
        ],
        evolution: ['幼年', '少年', '成年', '传说'],
        currentStage: 1
    },

    // Current bike
    currentBike: {
        id: 1,
        name: '赛博单车',
        emoji: '🚲',
        level: 8,
        xp: 600,
        xpMax: 1000,
        proficiency: 4,
        series: '科技系列',
        unlockLevel: 25,
        usageCount: 45,
        attributes: [
            { name: '能量加成', level: 2, bonus: 10, icon: '⚡' },
            { name: '经验加成', level: 1, bonus: 5, icon: '📈' }
        ],
        features: [
            { name: '炫彩车身', unlocked: true },
            { name: '光效轨迹', unlocked: true },
            { name: '音效系统', unlocked: false, requirement: 'Lv.15' },
            { name: '全息投影', unlocked: false, requirement: 'Lv.30' }
        ],
        specialEffect: '科幻光效轨迹'
    },

    // Ride history
    rideHistory: [
        {
            id: 1,
            date: '2026-03-06',
            time: '14:30',
            distance: 3.2,
            duration: 18,
            startLocation: '朝阳区三里屯太古里',
            endLocation: '朝阳区工人体育场',
            startArea: '朝阳区',
            endArea: '朝阳区',
            avgSpeed: 10.7,
            carbonSaved: 1.3,
            energyGained: 50,
            starCoinGained: 10,
            xpGained: 100,
            bonuses: [
                { type: '伙伴加成', value: 10, percent: 20 },
                { type: '单车加成', value: 5, percent: 10 },
                { type: '连续骑行', value: 3, days: 7 }
            ],
            companion: '美团小袋鼠 Lv.15',
            bike: '赛博单车 Lv.8',
            routeCompleted: '逛吃三里屯',
            medalUnlocked: '美食探索者'
        },
        {
            id: 2,
            date: '2026-03-06',
            time: '10:15',
            distance: 2.8,
            duration: 15,
            startLocation: '海淀区中关村',
            endLocation: '西城区金融街',
            startArea: '海淀区',
            endArea: '西城区',
            avgSpeed: 11.2,
            carbonSaved: 1.1,
            energyGained: 40,
            starCoinGained: 8,
            xpGained: 80,
            bonuses: [
                { type: '伙伴加成', value: 8, percent: 20 },
                { type: '单车加成', value: 4, percent: 10 }
            ],
            companion: '美团小袋鼠 Lv.15',
            bike: '赛博单车 Lv.8'
        },
        {
            id: 3,
            date: '2026-03-06',
            time: '08:00',
            distance: 2.5,
            duration: 12,
            startLocation: '朝阳区国贸',
            endLocation: '朝阳区建国门',
            startArea: '朝阳区',
            endArea: '朝阳区',
            avgSpeed: 12.5,
            carbonSaved: 1.0,
            energyGained: 30,
            starCoinGained: 7,
            xpGained: 70,
            bonuses: [
                { type: '伙伴加成', value: 6, percent: 20 },
                { type: '单车加成', value: 3, percent: 10 }
            ],
            companion: '美团小袋鼠 Lv.15',
            bike: '赛博单车 Lv.8'
        }
    ],

    // Weekly achievements
    weeklyAchievements: [
        { text: '解锁新区域: 东城区', icon: '✓' },
        { text: '伙伴升级: Lv.14 → Lv.15', icon: '✓' },
        { text: '完成挑战: 逛吃三里屯', icon: '✓' },
        { text: '技能解锁: 能量加成II', icon: '⚡', isNew: true }
    ],

    // Skills tree
    skills: [
        {
            category: '效率',
            skills: [
                { id: 1, name: '能量加成I', level: 5, bonus: '+10%', unlocked: true, unlockedAt: '2026-02-01' },
                { id: 2, name: '能量加成II', level: 15, bonus: '+20%', unlocked: true, unlockedAt: '2026-02-15' },
                { id: 3, name: '能量加成III', level: 30, bonus: '+30%', unlocked: false },
                { id: 4, name: '经验加速I', level: 10, bonus: '+10%', unlocked: true, unlockedAt: '2026-02-08' },
                { id: 5, name: '经验加速II', level: 25, bonus: '+20%', unlocked: true, unlockedAt: '2026-03-01' },
                { id: 6, name: '经验加速III', level: 40, bonus: '+30%', unlocked: false }
            ]
        },
        {
            category: '社交',
            skills: [
                { id: 7, name: '好友加成', level: 8, bonus: '+5%', unlocked: true, unlockedAt: '2026-02-05' },
                { id: 8, name: '分享奖励', level: 12, bonus: '+10能量', unlocked: true, unlockedAt: '2026-02-12' },
                { id: 9, name: '组队加成', level: 20, bonus: '+15%', unlocked: false }
            ]
        },
        {
            category: '特殊',
            skills: [
                { id: 10, name: '幸运之星', level: 15, bonus: '+10%掉落', unlocked: true, unlockedAt: '2026-02-20' },
                { id: 11, name: '探索加成', level: 18, bonus: '新区域+50能量', unlocked: false },
                { id: 12, name: '传奇骑士', level: 50, bonus: '全属性+50%', unlocked: false }
            ]
        }
    ],

    // Challenges
    challenges: {
        ongoing: [
            {
                id: 1,
                name: '春季赏花挑战赛',
                icon: '🌸',
                daysLeft: 15,
                progress: 75,
                tasks: [
                    { name: '完成3条赏花路线', current: 3, target: 3, completed: true },
                    { name: '骑行累计20km', current: 25.6, target: 20, completed: true },
                    { name: '收集5个春季记忆', current: 3, target: 5, completed: false },
                    { name: '分享1次打卡', current: 0, target: 1, completed: false }
                ],
                rewards: [
                    { type: '勋章', name: '春日骑士勋章', icon: '🏅' },
                    { type: '能量', value: 1000, icon: '⚡' },
                    { type: '伙伴', name: '樱花精灵', icon: '🎁' }
                ]
            }
        ],
        daily: [
            { name: '骑行3km', current: 3.2, target: 3, reward: 50, completed: true, claimed: true },
            { name: '完成1条路线', current: 1, target: 1, reward: 30, completed: true, claimed: true },
            { name: '给好友点赞3次', current: 0, target: 3, reward: 20, completed: false, claimed: false }
        ]
    },

    // Areas
    areas: [
        {
            id: 1,
            name: '朝阳区',
            icon: '🏙️',
            explored: true,
            distance: 15.8,
            routesCompleted: 8,
            routesTotal: 12,
            memoriesCollected: 5,
            memoriesTotal: 8,
            progress: 67
        },
        {
            id: 2,
            name: '海淀区',
            icon: '🎓',
            explored: true,
            distance: 10.5,
            routesCompleted: 5,
            routesTotal: 10,
            memoriesCollected: 3,
            memoriesTotal: 6,
            progress: 50
        },
        {
            id: 3,
            name: '东城区',
            icon: '🏛️',
            explored: true,
            distance: 7.0,
            routesCompleted: 3,
            routesTotal: 8,
            memoriesCollected: 2,
            memoriesTotal: 5,
            progress: 38
        },
        {
            id: 4,
            name: '西城区',
            icon: '🏦',
            explored: false,
            firstReward: { energy: 50, xp: 100 }
        }
    ],

    // Routes
    routes: [
        {
            id: 1,
            name: '逛吃三里屯',
            icon: '🍜',
            type: '逛吃',
            rating: 4.8,
            completions: 1234,
            distance: 5.2,
            difficulty: '轻松',
            area: '朝阳区',
            tags: ['逛吃', '美食', '轻松', '5.2km', '朝阳区', '周末推荐'],
            rewards: { energy: 80, xp: 120, starCoin: 10 },
            description: '穿梭在三里屯的美食街区，探索网红餐厅和特色小吃',
            pois: ['太古里', '那里花园', '三里屯SOHO'],
            reviews: [
                { user: '骑行达人', rating: 5, comment: '路线很棒，美食很多！' },
                { user: '美食探索者', rating: 5, comment: '周末必去的路线' }
            ]
        },
        {
            id: 2,
            name: '环二环城市风光',
            icon: '🌆',
            type: '风景',
            rating: 4.6,
            completions: 856,
            distance: 8.5,
            difficulty: '适中',
            area: '多区域',
            tags: ['风景', 'City Ride', '适中', '8.5km', '多区域', '摄影推荐'],
            rewards: { energy: 150, xp: 200, starCoin: 20 },
            description: '沿着二环路骑行，欣赏北京城市天际线',
            pois: ['建国门', '朝阳门', '东直门', '安定门'],
            reviews: [
                { user: '摄影师', rating: 5, comment: '拍照圣地！' },
                { user: '城市探索者', rating: 4, comment: '路线有点长但很值得' }
            ]
        },
        {
            id: 3,
            name: '中关村科技之旅',
            icon: '💻',
            type: 'City Ride',
            rating: 4.5,
            completions: 678,
            distance: 6.8,
            difficulty: '轻松',
            area: '海淀区',
            tags: ['City Ride', '科技', '轻松', '6.8km', '海淀区'],
            rewards: { energy: 100, xp: 150, starCoin: 15 },
            description: '探访中国硅谷，感受科技创新氛围',
            pois: ['中关村广场', '理想国际大厦', '鼎好电子城'],
            reviews: []
        }
    ],

    // Medals collection
    medals: [
        { id: 1, name: '新手探索者', rarity: 'common', unlocked: true, icon: '🏅', description: '完成首次骑行' },
        { id: 2, name: '城市漫游者', rarity: 'uncommon', unlocked: true, icon: '🎖️', description: '探索3个区域' },
        { id: 3, name: '美食探索者', rarity: 'rare', unlocked: true, icon: '🍜', description: '完成5条美食路线' },
        { id: 4, name: '春日骑士', rarity: 'epic', unlocked: false, icon: '🌸', description: '完成春季挑战赛' },
        { id: 5, name: '传奇骑士', rarity: 'legendary', unlocked: false, icon: '👑', description: '达到100级' }
    ],

    // Companions collection
    companions: [
        { id: 1, name: '美团小袋鼠', emoji: '🦘', rarity: 'common', unlocked: true, level: 15, series: '城市系列' },
        { id: 2, name: '熊猫骑士', emoji: '🐼', rarity: 'uncommon', unlocked: true, level: 8, series: '城市系列' },
        { id: 3, name: '赛博猫', emoji: '🐱', rarity: 'rare', unlocked: true, level: 5, series: '科技系列' },
        { id: 4, name: '樱花精灵', emoji: '🌸', rarity: 'epic', unlocked: false, series: '季节系列' },
        { id: 5, name: '青龙', emoji: '🐉', rarity: 'legendary', unlocked: false, series: '神话系列' }
    ],

    // Bikes collection
    bikes: [
        { id: 1, name: '经典单车', emoji: '🚲', rarity: 'common', unlocked: true, level: 12, series: '经典系列' },
        { id: 2, name: '赛博单车', emoji: '🚴', rarity: 'rare', unlocked: true, level: 8, series: '科技系列' },
        { id: 3, name: '竞速单车', emoji: '🏍️', rarity: 'epic', unlocked: false, series: '竞速系列' },
        { id: 4, name: '传奇战车', emoji: '🛸', rarity: 'legendary', unlocked: false, series: '传奇系列' }
    ],

    // Star coin shop
    starCoinShop: [
        { id: 1, name: '美团外卖5元券', price: 50, icon: '🍔', category: '外卖', stock: '充足' },
        { id: 2, name: '美团外卖10元券', price: 100, icon: '🍜', category: '外卖', stock: '充足' },
        { id: 3, name: '美团酒店50元券', price: 500, icon: '🏨', category: '酒店', stock: '有限' },
        { id: 4, name: '美团电影票券', price: 200, icon: '🎬', category: '娱乐', stock: '充足' },
        { id: 5, name: '美团月卡会员', price: 800, icon: '👑', category: '会员', stock: '有限' }
    ],

    // Community posts
    communityPosts: [
        {
            id: 1,
            user: { name: '骑行达人', avatar: '🚴', level: 32 },
            time: '2小时前',
            content: '今天完成了环二环路线，风景太美了！',
            images: ['🌆', '🌇'],
            route: '环二环城市风光',
            likes: 156,
            comments: 23,
            liked: false
        },
        {
            id: 2,
            user: { name: '美食探索者', avatar: '🍜', level: 28 },
            time: '5小时前',
            content: '三里屯的美食路线真的太棒了，推荐给大家！',
            images: ['🍔', '🍕'],
            route: '逛吃三里屯',
            likes: 234,
            comments: 45,
            liked: true
        }
    ],

    // Cumulative stats
    cumulativeStats: {
        totalRides: 156,
        totalDistance: 428.5,
        totalDuration: 2340,
        totalEnergy: 15680,
        totalStarCoin: 2450,
        carbonSaved: 171.4,
        treesEquivalent: 8.6,
        gasolineSaved: 68.5,
        bestDistance: 12.5,
        bestDuration: 68,
        bestSpeed: 15.2,
        consecutiveDays: 7
    },

    // Titles
    titles: [
        { id: 1, name: '新手探索者', unlocked: true },
        { id: 2, name: '漫游者', unlocked: true },
        { id: 3, name: '探索达人', unlocked: true },
        { id: 4, name: '资深骑士', unlocked: true },
        { id: 5, name: '城市漫游者', unlocked: true, current: true },
        { id: 6, name: '传奇骑士', unlocked: false }
    ],

    // Rankings
    rankings: {
        city: 156,
        national: 8234
    }
};
