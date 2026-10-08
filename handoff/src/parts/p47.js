/* =========================================================
   v2.4 创新进化四段论：LV1→LV2 成形 · LV2→LV3 入世（环境 + 伙伴）· LV3→LV4 蜕变（八种质变）· LV4→LV5 升华（十二种领域，可进入；每只精灵的领域有唯一子名）
   · LV3 不再是更大的 LV2：出现专属环境与伙伴（伙伴就是本精灵主体词的小形态，连线体现关系）
   · LV4 不再加件：聚合 / 分化 / 结构 / 材质 / 维度 / 时间 / 空间 / 概念
   · LV5 不再加光环：升华为可进入的领域（身后的领域窗，不是脚下光圈）
========================================================= */
var SP_LV3_ENV = {E1:{n:['市集型','Market','Chợ'], t:['{s}点亮成市集：{c}飘浮，彼此以光丝相连','{s} lights up a market: {c} float, linked by threads of light','{s} thắp sáng thành phiên chợ: {c} lơ lửng, nối bằng sợi sáng']},
  E2:{n:['生态型','Ecosystem','Sinh thái'], t:['{s}长成生态：{c}环绕共生','{s} grows into an ecosystem: {c} live around it','{s} thành hệ sinh thái: {c} cộng sinh quanh nó']},
  E3:{n:['结构型','Structure','Kết cấu'], t:['{s}筑成结构群：{c}以光桥相连','{s} builds a structure group: {c} joined by light bridges','{s} dựng thành quần thể: {c} nối bằng cầu sáng']},
  E4:{n:['星象型','Star map','Tinh tượng'], t:['{s}排成星象：{c}连成星座','{s} forms a star map: {c} join into constellations','{s} xếp thành tinh tượng: {c} nối thành chòm sao']},
  E5:{n:['网络型','Network','Mạng lưới'], t:['{s}织成网络：{c}在节点间流动','{s} weaves a network: {c} flow between nodes','{s} dệt thành mạng: {c} chảy giữa các nút']},
  E6:{n:['梦境型','Dreamscape','Giấc mơ'], t:['{s}化作梦境：{c}如倒影般与它对话','{s} becomes a dreamscape: {c} talk to it like reflections','{s} hóa giấc mơ: {c} trò chuyện như bóng phản chiếu']}};
var SP_LV4_MUT = {T1:{n:['聚合质变','Aggregation','Hợp tụ'], t:['许多{s}聚合为一体，长成新的结构','Many {s} gather into one new structure','Nhiều {s} hợp thành một cấu trúc mới']},
  T2:{n:['分化质变','Differentiation','Phân hóa'], t:['一个{s}分化为许多独立的存在','One {s} splits into many independent beings','Một {s} tách thành nhiều thực thể']},
  T3:{n:['结构质变','Restructure','Tái cấu trúc'], t:['{s}的结构彻底重组，浮空而起','{s}\'s structure is rebuilt and rises into the air','Cấu trúc {s} tái tổ hợp và bay lên']},
  T4:{n:['材质质变','Material shift','Đổi chất liệu'], t:['{s}的材质彻底改变，化为琉璃','{s} changes material entirely and turns to glass','{s} đổi hẳn chất liệu, hóa lưu ly']},
  T5:{n:['维度质变','Dimension shift','Đổi chiều'], t:['{s}从平面变为立体','{s} goes from flat to three-dimensional','{s} từ phẳng thành khối']},
  T6:{n:['时间质变','Time shift','Biến đổi thời gian'], t:['{s}获得时间属性，流向逆转','{s} gains a time nature and its flow reverses','{s} mang thuộc tính thời gian, dòng chảy đảo ngược']},
  T7:{n:['空间质变','Space shift','Biến đổi không gian'], t:['{s}打开通往别处的空间之门','{s} opens doors into other spaces','{s} mở cửa sang không gian khác']},
  T8:{n:['概念质变','Concept shift','Biến đổi khái niệm'], t:['{s}从「物」变为「{g}」这一概念','{s} turns from a thing into the idea of "{g}"','{s} từ vật thành khái niệm "{g}"']}};
var SP_LV5_DOM = {D1:{n:['光域','Realm of light','Cõi ánh sáng'], dn:['光','light','ánh sáng'], law:['光之法则：被照亮之处皆可被看见','Law of light: whatever it lights can be seen','Luật ánh sáng: nơi được soi sáng đều hiện ra'], c:['#fde68a','#fb923c']},
  D2:{n:['知域','Realm of knowledge','Cõi tri thức'], dn:['知识','knowledge','tri thức'], law:['知之法则：读过的都会被记住','Law of knowledge: what is read is remembered','Luật tri thức: điều đã đọc sẽ được nhớ'], c:['#fef3c7','#a16207']},
  D3:{n:['禅域','Realm of stillness','Cõi thiền'], dn:['禅','stillness','thiền'], law:['禅之法则：静下来，时间也慢下来','Law of stillness: be still and time slows down','Luật thiền: tĩnh lại thì thời gian chậm lại'], c:['#ecfccb','#3f6212']},
  D4:{n:['星域','Realm of stars','Cõi tinh tú'], dn:['星','stars','tinh tú'], law:['星之法则：每一条轨迹都有方向','Law of stars: every orbit has a direction','Luật tinh tú: mọi quỹ đạo đều có hướng'], c:['#1e1b4b','#6366f1']},
  D5:{n:['镜域','Realm of mirrors','Cõi gương'], dn:['镜','mirrors','gương'], law:['镜之法则：每一面都映出另一个世界','Law of mirrors: every pane shows another world','Luật gương: mỗi mặt phản chiếu một thế giới'], c:['#e0f2fe','#38bdf8']},
  D6:{n:['时域','Realm of time','Cõi thời gian'], dn:['时','time','thời gian'], law:['时之法则：流逝的可以被回溯','Law of time: what has passed can be rewound','Luật thời gian: cái đã trôi có thể quay lại'], c:['#fef9c3','#ca8a04']},
  D7:{n:['空域','Realm of space','Cõi không gian'], dn:['空','space','không gian'], law:['空之法则：每扇门都通往别处','Law of space: every door leads elsewhere','Luật không gian: mỗi cánh cửa dẫn tới nơi khác'], c:['#ede9fe','#7c3aed']},
  D8:{n:['道域','Realm of the Way','Cõi Đạo'], dn:['道','the Way','Đạo'], law:['道之法则：万象皆可化一','Law of the Way: all forms can become one','Luật Đạo: vạn tượng quy về một'], c:['#f5f5f4','#1c1917']},
  /* v2.5 新增四域 */
  D9:{n:['生域','Realm of life','Cõi sinh trưởng'], dn:['生','life','sinh trưởng'], law:['生之法则：凡有根者，皆会生长','Law of life: whatever has roots will grow','Luật sinh: cái gì có rễ đều sẽ lớn'], c:['#dcfce7','#15803d']},
  D10:{n:['律域','Realm of order','Cõi quy luật'], dn:['律','order','quy luật'], law:['律之法则：一切运转皆有规则','Law of order: everything that runs follows a rule','Luật quy củ: mọi vận hành đều có quy tắc'], c:['#e2e8f0','#334155']},
  D11:{n:['梦域','Realm of dreams','Cõi mộng'], dn:['梦','dreams','mộng'], law:['梦之法则：所想即所见','Law of dreams: what you imagine is what you see','Luật mộng: nghĩ gì thấy nấy'], c:['#fce7f3','#be185d']},
  D12:{n:['韵域','Realm of rhythm','Cõi vận luật'], dn:['韵','rhythm','vận luật'], law:['韵之法则：万物皆有节拍','Law of rhythm: everything keeps a beat','Luật nhịp: vạn vật đều có nhịp'], c:['#ffedd5','#c2410c']}};
var SP_EVO_MECH = [['LV1→LV2',['成形','Taking shape','Thành hình'],['从「点」到「形」：结构形成','From a point to a form: structure appears','Từ điểm đến hình: cấu trúc hình thành']],['LV2→LV3',['入世','Entering the world','Nhập thế'],['从「形」到「境」：环境与伙伴出现','From form to place: an environment and companions appear','Từ hình đến cảnh: môi trường và bạn đồng hành xuất hiện']],['LV3→LV4',['蜕变','Metamorphosis','Lột xác'],['从「境」到「变」：形态、材质、结构质变','From place to change: form, material and structure transform','Từ cảnh đến biến: hình, chất liệu, cấu trúc biến đổi']],['LV4→LV5',['升华','Sublimation','Thăng hoa'],['从「变」到「道」：升华为可进入的领域','From change to the Way: rises into an enterable realm','Từ biến đến Đạo: thăng hoa thành cõi có thể bước vào']]];
/* 名表（LV2 名 → 环境 / 伙伴 / 质变 / 领域 / 概念字 / 专属描述），其余精灵按名称自动推导 */
var SP_EVO_PATH_SRC = `灯笼灵|E1|小灯笼群|T1|D1|光|灯笼点亮形成夜市长街，多盏灯笼飘浮，以光丝相连|千盏灯聚合为灯树，每盏灯为一片叶，光从树心流出|化为光之维度，千灯为星辰，可进入灯界
书页灵|E2|小书签群|T5|D2|知|书页如海藻般生长成书海生态，小书签群像鱼群环绕，书虫与之共生|书页从平面立起成立体书，折页层层弹出楼阁|化为知识维度，书海为世界，可进入书界
茶壶灵|E1|茶具群|T4|D3|茶|茶壶升华为茶席，茶气成云，茶具围绕|材质从陶变为琉璃，茶气化为实体|化为禅之维度，茶气为天地，可进入茶界
罗盘灵|E4|小指针群|T7|D4|枢|罗盘展开为地图，指针化为航线，地标浮现|指针化为星轨，地标化为星位|化为星之维度，星轨为路，可进入星界
镜子灵|E6|镜影群|T2|D5|镜|镜子分裂为镜廊，镜中倒影成为伙伴|一镜分为万镜，每面镜显示不同世界|化为镜之维度，万镜为门，可进入镜界
钥匙灵|E3|小锁群|T1|D7|锁|钥匙插入锁孔，锁化为锁阵，钥匙与锁共鸣|钥匙与锁聚合为锁阵，钥匙为轴|化为空之维度，万锁为门，可进入秘界
沙漏灵|E4|沙粒群|T6|D6|时|沙漏化为时间流，沙粒化为时间刻度|沙流逆转，周围出现时钟齿轮|化为时之维度，沙流为河，可进入时界
面具灵|E6|面具群|T2|D8|相|面具分裂为面具阵，每面表情不同，彼此对话|面具化为幻面，每面为独立存在|化为道之维度，万面为相，可进入相界
风铃灵|E6|音符群|T8|D1|音|风铃化为音律场，音符浮空，风丝穿行|声音化为实体，音符浮空|化为音之维度，音律为世界，可进入音界
纸鸢灵|E4|风筝群|T5|D4|鸢|纸鸢化为风筝阵|从平面变为立体飞行器|化为云之维度，云海为世界，可进入云界
印章灵|E5|篆文群|T8|D8|印|印章化为篆文阵，印章彼此盖章|化为万象印，可印出任何事物|化为印之维度，万象为印，可进入印界
算盘灵|E5|算珠群|T8|D8|算|算盘化为演算阵，算珠浮空，数字流动|化为天算，可计算任何事物|化为数之维度，命数为算，可进入数界
塔灵|E3|小塔群|T3|D7|塔|塔化为塔群，塔与塔以光桥相连|结构重组，塔身浮空|化为塔之维度，塔为世界，可进入塔界
桥灵|E3|小桥群|T3|D7|桥|桥化为桥阵，桥与桥以水相连|桥身浮空，桥面为光|化为桥之维度，桥为世界，可进入桥界
门灵|E3|小门群|T7|D7|门|门化为门阵，每扇门通向不同空间|门化为万门，每扇门通向不同空间|化为门之维度，门为世界，可进入门界
藤灵|E2|小藤群|T1|D2|藤|藤化为藤林，藤与藤交织成网|藤与藤聚合为藤神|化为森之维度，藤为世界，可进入森界
花灵|E2|小花群|T1|D1|花|花化为花海，花朵彼此呼应|花与花聚合为花神|化为花之维度，花为世界，可进入花界
树灵|E2|小树群|T3|D2|树|树化为树阵，树与树以根相连|化为世界树，根为地，冠为天|化为树之维度，树为世界，可进入树界
晶灵|E2|小晶群|T4|D4|晶|晶化为晶洞，晶与晶以光相连|材质从晶变为琉璃|化为晶之维度，晶为世界，可进入晶界
焰灵|E2|小火群|T8|D1|焰|焰化为火海，焰与焰以火丝相连|火化为概念|化为焰之维度，焰为世界，可进入焰界
水灵|E2|小水群|T8|D4|水|水化为水泽，水与水以水流相连|水化为概念|化为海之维度，海为世界，可进入海界
时针兽|E4|小刻度群|T6|D6|时|时针化为时间盘，刻度浮现|时间化为概念|化为时之维度，时为世界，可进入时界
齿轮卫|E5|小齿轮群|T3|D10|齿|齿轮化为机械阵，齿轮彼此咬合|结构彻底重组|化为齿之维度，齿为世界，可进入齿界
星辉兽|E4|小星群|T7|D4|辉|星辉化为星图，星座浮现|星辉化为空间|化为辉之维度，辉为世界，可进入辉界
苔灵|E2|小苔群|T1|D3|苔|苔原覆盖|苔化为古苔|化为苔之维度，可进入苔界
果实灵|E2|小果群|T1|D1|果|果园丰饶|果化为丰果|化为果之维度，可进入果界
种子灵|E2|芽田群|T2|D9|生|芽田萌发|一种化为万种|化为生之维度，可进入生界
蘑菇灵|E2|小菌群|T2|D3|菌|菌林|菌化为万菌|化为菌之维度，可进入菌界
竹灵|E2|小竹群|T3|D3|竹|竹林|竹化为天竹|化为竹之维度，可进入竹界
风灵|E2|风丝群|T8|D7|风|风场风丝|风化为概念|化为风之维度，可进入风界
雷灵|E5|雷丝群|T8|D1|雷|雷场雷丝|雷化为概念|化为雷之维度，可进入雷界
冰灵|E2|冰丝群|T4|D4|冰|冰原冰丝|冰化为概念|化为冰之维度，可进入冰界
光灵|E4|光丝群|T8|D1|光|光场光丝|光化为概念|化为光之维度，可进入光界
暗灵|E6|暗丝群|T8|D5|暗|暗场暗丝|暗化为概念|化为暗之维度，可进入暗界
裂隙灵|E5|裂隙网|T7|D7|隙|裂隙网|隙化为天隙|化为裂之维度，可进入裂界
日历灵|E4|月历盘|T6|D6|历|月历盘|年轮化|化为历之维度，可进入历界
发条犬|E3|机械犬群|T3|D7|条|机械犬群|条化为天条|化为条之维度，可进入条界
量子机灵|E5|量子场|T2|D7|量|量子场|量子化|化为量之维度，可进入量界
蒸汽灵|E5|蒸汽机械|T5|D3|汽|蒸汽机械|汽化|化为汽之维度，可进入汽界
月神使|E4|月相群|T7|D4|月|月相月华|月化空间|化为月之维度，可进入月界
日耀龙|E4|日华群|T7|D1|日|日相日华|日化空间|化为日之维度，可进入日界
创世灵|E3|创界阵|T8|D8|创|创界阵|创化为天创|化为创之维度，可进入创界
记忆灵|E6|记忆群|T8|D2|忆|记忆场|记忆化|化为忆之维度，可进入忆界
梦灵|E6|梦泡群|T8|D11|梦|梦域|梦化|化为梦之维度，可进入梦界
回声灵|E6|回响群|T2|D1|回|回响场|回声化|化为回之维度，可进入回界
时间灵|E4|时刻群|T6|D6|刻|时间场|时间化|化为时之维度，可进入时界
故障灵|E5|障点群|T2|D5|障|故障场|故障化|化为障之维度，可进入障界
乱码灵|E5|码点群|T2|D2|码|乱码场|乱码化|化为码之维度，可进入码界
噪点灵|E5|噪点群|T2|D5|噪|噪点场|噪点化|化为噪之维度，可进入噪界
死机灵|E5|机点群|T6|D6|机|死机场|死机化|化为机之维度，可进入机界
包子灵|E1|小包子群|T1|D3|包|包阵|包化|化为包之维度，可进入包界
糖灵|E1|小糖群|T4|D1|糖|糖阵|糖化|化为糖之维度，可进入糖界
茶灵|E1|小茶群|T4|D3|茶|茶阵|茶化|化为茶之维度，可进入茶界
琴灵|E6|弦音群|T8|D12|琴|琴阵|琴化|化为琴之维度，可进入琴界
鼓灵|E1|小鼓群|T5|D12|鼓|鼓阵|鼓化|化为鼓之维度，可进入鼓界
铃灵|E6|小铃群|T8|D1|铃|铃阵|铃化|化为铃之维度，可进入铃界
喜灵|E6|喜气群|T8|D1|喜|喜场|喜化|化为喜之维度，可进入喜界
怒灵|E6|怒火群|T8|D8|怒|怒场|怒化|化为怒之维度，可进入怒界
哀灵|E6|哀雨群|T8|D3|哀|哀场|哀化|化为哀之维度，可进入哀界
乐灵|E6|乐音群|T8|D1|乐|乐场|乐化|化为乐之维度，可进入乐界
梦魇灵|E6|魇影群|T2|D5|魇|魇域|魇化|化为魇之维度，可进入魇界
安眠灵|E6|眠云群|T4|D3|眠|眠域|眠化|化为眠之维度，可进入眠界
幻境灵|E6|幻影群|T2|D5|幻|幻域|幻化|化为幻之维度，可进入幻界
清醒灵|E6|醒光群|T8|D1|醒|醒域|醒化|化为醒之维度，可进入醒界
孢子灵|E2|孢点群|T2|D2|孢|孢点场|孢化|化为孢之维度，可进入孢界
病毒灵|E5|毒点群|T2|D8|毒|毒点场|毒化|化为毒之维度，可进入毒界`;
var SP_EVO_PATH_TV = {tv_hto_phoenix:['E2','凤阵','T5','D1','阳','火海凤阵','三尾直立火冠','日轮 + 九阳'], tv_hto_dragon:['E2','龙脉地火','T3','D8','龙','龙脉地火','东方龙 + 龙珠','龙脉 + 山脉'], tv_lto_tortoise:['E3','冰原龟阵','T4','D4','玄','冰原龟阵','巨龟背冰山','冰宫 + 星象'], tv_lto_wolf:['E4','冰原狼群','T2','D4','狼','冰原狼群','单头巨狼 + 月牙','双头 + 双月 + 狼群'], tv_opst_whale:['E2','云海鲸群','T3','D7','鲸','云海鲸群','单体云鲸 + 云海','鲸落 + 岛屿 + 鲸群'], tv_tst_lion:['E3','冰火狮群','T4','D8','王','冰火狮群','单头冰火狮 + 王冠','双头 + 王座 + 双剑'], tv_tpc_snake:['E4','循环蛇阵','T6','D6','环','循环蛇阵','单环咬尾 + 时间纹','多重环 + 分身'], tv_cth_butterfly:['E2','温湿蝶群','T4','D1','蝶','温湿蝶群','单体双色 + 温湿纹','蝶群 + 温湿领域'], tv_cus_alien:['E5','星尘场','T5','D7','星','星尘场','机甲外星人 + 科技武器','星舰 + 星域 + 形态切换']};
var SP_EVO_PATH_CAT = {obj:'灯笼灵 书页灵 茶壶灵 罗盘灵 镜子灵 钥匙灵 沙漏灵 面具灵 风铃灵 纸鸢灵 印章灵 算盘灵',arch:'塔灵 桥灵 门灵',plant:'藤灵 花灵 树灵 苔灵 果实灵 种子灵 蘑菇灵 竹灵',mineral:'晶灵',elem:'焰灵 水灵 风灵 雷灵 冰灵 光灵 暗灵',time:'时针兽 裂隙灵 日历灵',mech:'齿轮卫 发条犬 量子机灵 蒸汽灵',myth:'星辉兽 月神使 日耀龙 创世灵',concept:'记忆灵 梦灵 回声灵 时间灵',glitch:'故障灵 乱码灵 噪点灵 死机灵',food:'包子灵 糖灵 茶灵',music:'琴灵 鼓灵 铃灵',emotion:'喜灵 怒灵 哀灵 乐灵',dream:'梦魇灵 安眠灵 幻境灵 清醒灵',micro:'孢子灵 病毒灵'};
var SP_EVO_PATH = (()=>{ const m = {}; SP_EVO_PATH_SRC.trim().split('\n').forEach(l=>{ const [k, e, c, t, d, g, d3, d4, d5] = l.split('|'); m[k] = {env:e, comp:c, mut:t, dom:d, glyph:g, d3, d4, d5, cat:Object.keys(SP_EVO_PATH_CAT).find(c2=>SP_EVO_PATH_CAT[c2].split(' ').includes(k))||''}; }); return m; })();
var SP_PATH_FLAGS = [['env','lv3_environment_enabled',['LV3 环境','LV3 environments','Môi trường LV3']],['comp','lv3_companion_enabled',['LV3 伙伴','LV3 companions','Bạn đồng hành LV3']],['mut','lv4_mutation_enabled',['LV4 质变','LV4 transformations','Biến đổi LV4']],['dom','lv5_domain_enabled',['LV5 领域','LV5 realms','Cõi LV5']],['entry','lv5_domain_entry_enabled',['LV5 领域可进入','LV5 realms can be entered','Có thể vào cõi LV5']],['uniq','stage_evolution_unique_per_spirit',['每只精灵进化路径唯一','Unique evolution path per spirit','Lộ trình riêng cho mỗi tinh linh']]];
function spPathFlags(){ const c = (typeof gCfg==='function' && gCfg().evoCfg?.path) || {}; const o = {}; SP_PATH_FLAGS.forEach(([k])=>o[k] = c[k]!==false); return o; }
function spPathOn(){ try{ const F = spPathFlags(); return F.env || F.mut || F.dom; }catch(_e){ return false; } }
var SP_ENV_BY_CAT = {obj:'E1', arch:'E3', plant:'E2', mineral:'E2', elem:'E2', time:'E4', mech:'E5', myth:'E4', concept:'E6', text:'E5', light:'E6', fest:'E1', glitch:'E5', food:'E1', music:'E6', weather:'E2', astro:'E4', emotion:'E6', dream:'E6', ocean:'E2', insect:'E2', flying:'E4', reptile:'E2', micro:'E2', collab:'E1', link:'E5', event:'E1', lab:'E3', trial:'E2', ach:'E4', adm:'E5', hidden:'E6'};
var SP_DOM_BY_CAT = {obj:'D8', arch:'D7', plant:'D9', mineral:'D4', elem:'D1', time:'D6', mech:'D10', myth:'D8', concept:'D8', text:'D2', light:'D5', fest:'D12', glitch:'D10', food:'D9', music:'D12', weather:'D12', astro:'D4', emotion:'D11', dream:'D11', ocean:'D9', insect:'D9', flying:'D7', reptile:'D8', micro:'D9', collab:'D1', link:'D10', event:'D12', lab:'D2', trial:'D6', ach:'D1', adm:'D10', hidden:'D5'};
function spPathOfRaw(def){
  if(!def) return null; const doc = (typeof gCfg==='function' && gCfg().evoCfg?.paths?.[def.id]) || {}, F = def.forms?.[0] || [], n2 = def.name?.[0] || F[1] || '', ck = spArtCatKey(def), subj = spEvoSubject(def);
  const tv = SP_EVO_PATH_TV[def.id], T = tv ? {env:tv[0], comp:tv[1], mut:tv[2], dom:tv[3], glyph:tv[4], d3:tv[5], d4:tv[6], d5:tv[7]} : ([SP_EVO_PATH[n2], SP_EVO_PATH[F[1]]].find(t=>t && (!t.cat || t.cat===def.cat)) || null);
  const n4 = String(F[3]||''), n5 = String(F[4]||'').replace(/觉醒$/,''), n3 = String(F[2]||'');
  const mut = T?.mut || (/世界|通天/.test(n4) ? 'T3' : /[千万百]/.test(n4) ? (/[镜面分种菌]/.test(n4+subj) ? 'T2' : 'T1') : /[逆时历纪年秒]/.test(n4) ? 'T6' : /[门盘镜空隙界]/.test(n4) ? 'T7' : /[琉璃晶玉冰]/.test(n4) ? 'T4' : /[鸢翔飞机]/.test(n4) ? 'T5' : /^天/.test(n4) ? (['mech','arch','lab','link','trial'].includes(ck) ? 'T3' : ['mineral'].includes(ck) ? 'T4' : 'T8') : ['mech','arch'].includes(ck) ? 'T3' : 'T1');
  const dom = T?.dom || (/[梦魇]/.test(n5) ? 'D11' : /[生芽根苗孢菌藻]/.test(n5) ? 'D9' : /[律规齿械轨]/.test(n5) ? 'D10' : /[音韵琴鼓笛箫弦歌舞]/.test(n5) ? 'D12' : /[光灯焰花日阳辉虹耀]/.test(n5) ? 'D1' : /[书知树森诗字典]/.test(n5) ? 'D2' : /[茶禅莲兰静眠]/.test(n5) ? 'D3' : /[星枢晶海珠月陨宇]/.test(n5) ? 'D4' : /[镜影幻]/.test(n5) ? 'D5' : /[时沙历秒纪逆]/.test(n5) ? 'D6' : /[门塔桥锁空穿隙天]/.test(n5) ? 'D7' : /[印算面道命因果序混万]/.test(n5) ? 'D8' : SP_DOM_BY_CAT[ck] || 'D1');
  const env = T?.env || (/[市坊集]/.test(n3) ? 'E1' : /[林园丛海原泽]/.test(n3) ? 'E2' : /[阵塔桥门关]/.test(n3) ? 'E3' : /[星辰图盘]/.test(n3) ? 'E4' : /[网路码链程]/.test(n3) ? 'E5' : /[梦幻境镜影]/.test(n3) ? 'E6' : SP_ENV_BY_CAT[ck] || 'E2');
  const byName = {3:!!T || /[市坊集林园丛海原泽阵塔桥门关星辰图盘网路码链程梦幻境镜影]/.test(n3), 4:!!T || /[世界通天千万百逆时历纪年秒门盘镜空隙琉璃晶玉冰鸢翔飞机天]/.test(n4), 5:!!T || /[光灯焰花日阳辉虹耀书知树森诗字典茶禅莲兰静眠星枢晶海珠月陨宇镜影幻时沙历秒纪逆门塔桥锁空穿隙天印算面道命因果序混万]/.test(n5)};
  byName[5] = byName[5] || /[梦魇生芽根苗孢菌藻律规齿械轨音韵琴鼓笛箫弦歌舞]/.test(n5);
  return {byName, env:doc.env || env, mut:doc.mut || mut, dom:doc.dom || dom, glyph:doc.glyph || T?.glyph || [...subj][0] || '灵', comp:doc.comp || T?.comp || null, d3:doc.d3 || T?.d3 || '', d4:doc.d4 || T?.d4 || '', d5:doc.d5 || T?.d5 || '', fixed:!!T};
}
/* 全库分配：同主体、同类型组合时自动错开（同类 / 跨类都不重复），名表与管理员指定的不动 */
var spPathCache = {ver:-1, map:null};
function spPathAll(){
  if(spPathCache.ver===spCacheVer && spPathCache.map) return spPathCache.map;
  const map = new Map(), used = new Set(), E = Object.keys(SP_LV3_ENV), M = Object.keys(SP_LV4_MUT), D = Object.keys(SP_LV5_DOM);
  const key = (d, p)=>[p.env, p.mut, p.dom, p.glyph, d.body].join('|');
  spPathCache = {ver:spCacheVer, map};
  const L = [...spLib(), ...Object.keys(SP_EVO_PATH_TV).map(id=>spTvDef(id)).filter(Boolean)];
  L.filter(d=>{ const p = spPathOfRaw(d); return p.fixed || gCfg().evoCfg?.paths?.[d.id]; }).forEach(d=>{ const p = spPathOfRaw(d); used.add(key(d, p)); map.set(d.id, p); });
  L.forEach(d=>{ if(map.has(d.id)) return; const p = {...spPathOfRaw(d)}; let i = 0;
    while(used.has(key(d, p)) && i<64){ i++; p.dom = D[(D.indexOf(p.dom)+1) % D.length]; if(i%8===0) p.mut = M[(M.indexOf(p.mut)+1) % M.length]; if(i%32===0) p.env = E[(E.indexOf(p.env)+1) % E.length]; }
    used.add(key(d, p)); map.set(d.id, p); });
  return map;
}
function spPathOf(def){ if(!def) return null; try{ const m = spPathAll(); if(m.has(def.id)) return m.get(def.id); }catch(_e){} return spPathOfRaw(def); }
function spPathSubj(def){ const zh = spEvoSubject(def), en = String(def?.name?.[1]||'').replace(/\s*(Sprite|Spirit|Beast|Guard|Hound)$/i,'') || zh, vi = String(def?.name?.[2]||'').replace(/^(Linh|Tinh linh)\s+/i,'') || zh; return [zh, en, vi]; }
function spPathText(def, st){
  const P = spPathOf(def), S = spPathSubj(def), comp = P.comp ? [P.comp, `little ${S[1]} companions`, `bạn ${S[2]} nhỏ`] : [`小${S[0]}群`, `little ${S[1]} companions`, `bạn ${S[2]} nhỏ`];
  const fill = (t, i)=>t.replace(/\{s\}/g, S[i]).replace(/\{c\}/g, comp[i]).replace(/\{g\}/g, i ? S[i] : P.glyph);
  if(st===3){ const E = SP_LV3_ENV[P.env]; return [P.d3 ? `${P.d3}` : fill(E.t[0],0), fill(E.t[1],1), fill(E.t[2],2)]; }
  if(st===4){ const M = SP_LV4_MUT[P.mut]; return [P.d4 || fill(M.t[0],0), fill(M.t[1],1), fill(M.t[2],2)]; }
  if(st===5){ const D = SP_LV5_DOM[P.dom]; return [P.d5 || `化为${D.dn[0]}的维度，可进入${S[0]}之界`, `Becomes a dimension of ${D.dn[1]}; you can step into the ${S[1]} realm`, `Hóa thành chiều ${D.dn[2]}; có thể bước vào cõi ${S[2]}`]; }
  return st===1 ? ['点：主体词的雏形','A point: the seed of the subject','Điểm: mầm của chủ đề'] : ['形：结构成形','A form: the structure takes shape','Hình: cấu trúc thành hình'];
}
/* ---------- 渲染：LV3 环境 + 伙伴 / LV4 质变 / LV5 领域（全部在身后或身体内；不画脚下光圈） ---------- */
function spPathMini(def, x, px, py, s, op=1, rot=0){ if(x.kitMini) return x.kitMini(px, py, s, op, rot); return `<g class="pt-mini" transform="translate(${spF(px)} ${spF(py)}) rotate(${rot}) scale(${s}) translate(-24 -30)" opacity="${op}">${spBody(def.body, x.c, x.dk, x.belly)}</g>`; }
function spPathSvg(def, st, x){
  const o = {back:'', front:'', dom:'', op:null, ovl:'', lift:0}; if(st<3 || !spPathOn()) return o;
  const F = spPathFlags(), P = spPathOf(def), {c, ac, dk, fy, hy} = x, lt = spMixC(ac,'#fff',.45), m = (a,b,s,op,r)=>spPathMini(def, x, a, b, s, op, r);
  if(st===3 && F.env && !x.kitNoEnv){ const C = F.comp;
    switch(P.env){
      case 'E1': o.back += `<g class="pt-env pt-e1"><path d="M0 9Q24 18 48 9" fill="none" stroke="${lt}" stroke-width=".7"/>${C ? [[6,13.4],[17,16.3],[31,16.3],[42,13.4]].map(([a,b],i)=>`<path d="M${a} ${spF(b-2)}v2" stroke="${dk}" stroke-width=".35"/>${m(a, b+3, .17, 1, i%2?6:-6)}`).join('') : ''}</g>`; break;
      case 'E2': o.back += `<g class="pt-env pt-e2">${C ? m(5.5, 38, .24, 1, -10) + m(42.5, 37, .22, 1, 8) + m(8, 22, .16, .9, -6) : ''}${[[2.5,44],[45.5,43.5],[9,45.5]].map(([a,b])=>`<path d="M${a} ${b}q-1.4-3 0-5.4M${a} ${b}q1.6-2.6 3-3.6M${a} ${b}q-2-1.6-3.2-1.4" fill="none" stroke="${spMixC(c,'#16a34a',.6)}" stroke-width=".55" stroke-linecap="round"/>`).join('')}<path d="M10 22Q16 24 15 28M38 37Q34 36 34 33" fill="none" stroke="${lt}" stroke-width=".45" stroke-dasharray="1 .8"/></g>`; break;
      case 'E3': o.back += `<g class="pt-env pt-e3">${C ? m(5, 30, .22) + m(43, 28, .2) : ''}<rect x="0.5" y="35" width="9" height="1.6" rx=".5" fill="${spShade(c,-.2)}"/><rect x="38.5" y="33" width="9" height="1.6" rx=".5" fill="${spShade(c,-.2)}"/><path d="M9.5 35.6Q17 31 12.5 32M38.5 33.6Q31 30 35.5 31" fill="none" stroke="${lt}" stroke-width=".8" opacity=".85"/></g>`; break;
      case 'E4': { const P4 = [[6,12],[42,9],[3,30],[45,28]]; o.back += `<g class="pt-env pt-e4"><path d="M${P4.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${lt}" stroke-width=".45" stroke-dasharray="1 .9"/>${C ? P4.map(([a,b],i)=>m(a, b, .14, 1, i*12)).join('') : ''}${[[16,6],[30,4],[24,2]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".55" fill="#fde68a"/>`).join('')}</g>`; break; }
      case 'E5': { const N = [[4,14],[44,14],[2,34],[46,34],[24,4]]; o.back += `<g class="pt-env pt-e5" fill="none" stroke="${lt}" stroke-width=".45"><path d="M4 14L24 4L44 14M2 34L4 14M46 34L44 14"/>${N.map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.4" fill="${spMixC(ac,'#fff',.7)}"/>`).join('')}</g>${C ? `<g class="pt-env">${m(4, 14, .13)}${m(44, 14, .13)}${m(2, 34, .13)}${m(46, 34, .13)}</g>` : ''}`; break; }
      case 'E6': o.back += `<g class="pt-env pt-e6">${[[6,20,4.4],[42,18,4],[5,38,3.6],[43,38,3.4]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="${spMixC(ac,'#fff',.82)}" opacity=".7" stroke="${lt}" stroke-width=".35"/>`).join('')}${C ? m(6, 21, .15, .65, -8) + m(42, 19, .14, .65, 8) + m(5, 39, .12, .6) + m(43, 39, .12, .6) : ''}</g>`; break;
    } }
  if(st===4 && F.mut && !x.kitMut){
    switch(P.mut){
      case 'T1': o.back += `<g class="pt-mut pt-t1"><path d="M24 44V14M24 22L12 12M24 22L36 12M24 30L9 24M24 30L39 24M24 16L19 6M24 16L29 6" fill="none" stroke="${spMixC(dk,'#78350f',.4)}" stroke-width="1.6" stroke-linecap="round"/>${[[12,12],[36,12],[9,24],[39,24],[19,6],[29,6],[24,3]].map(([a,b],i)=>m(a, b, .15, 1, i%2?10:-10)).join('')}</g>`; break;
      case 'T2': o.back += `<g class="pt-mut pt-t2">${[[4,10,-18,.2],[44,8,16,.18],[1,30,-8,.16],[47,31,12,.17],[10,46,-24,.13],[38,46,22,.14]].map(([a,b,r,s])=>`<g transform="rotate(${r} ${a} ${b})"><rect x="${spF(a-5.2*s/.2)}" y="${spF(b-5.6*s/.2)}" width="${spF(10.4*s/.2)}" height="${spF(11.2*s/.2)}" rx="1" fill="${spMixC(ac,'#fff',.85)}" stroke="${lt}" stroke-width=".4" opacity=".9"/></g>${m(a, b, s, 1, r)}`).join('')}</g>`; break;
      case 'T3': o.lift -= 2; o.back += `<g class="pt-mut pt-t3">${[[6,40,9],[38,38,9],[19,48,10]].map(([a,b,w])=>`<path d="M${a} ${b}h${w}l-1.6 2.6h${-w+3.2}Z" fill="${spShade(c,-.25)}" stroke="${dk}" stroke-width=".45"/><path d="M${a+w/2} ${b-1}v-6" stroke="${lt}" stroke-width=".5" stroke-dasharray=".9 .9"/>`).join('')}</g>`; o.ovl += `<path d="M6 ${spF(fy+3)}H42M6 ${spF(fy+9)}H42" stroke="${spMixC(c,'#fff',.6)}" stroke-width="1.1" opacity=".75"/>`; break;
      case 'T4': o.op = .8; o.ovl += `<path d="M8 ${spF(fy-14)}L40 ${spF(fy+6)}" stroke="#fff" stroke-width="2.4" opacity=".45"/><path d="M8 ${spF(fy-6)}L40 ${spF(fy+14)}" stroke="#fff" stroke-width=".8" opacity=".55"/><path d="M8 ${spF(fy+4)}L40 ${spF(fy+22)}" stroke="#a5f3fc" stroke-width="1.6" opacity=".35"/>`; break;
      case 'T5': o.back += `<g class="pt-mut pt-t5" transform="translate(2.2 1.8)" opacity=".95">${spBody(def.body, spShade(c,-.45), spShade(c,-.6), spShade(c,-.45))}</g><g class="pt-mut">${[[15,44],[33,44]].map(([a,b])=>`<path d="M${a-1.4} ${b}l1.4 4 1.4-4Z" fill="#fb923c" opacity=".85"/>`).join('')}</g>`; break;
      case 'T6': o.back += `<g class="pt-mut pt-t6">${[[7,14,4.4],[41,36,3.6]].map(([a,b,r])=>{ let t = ''; for(let i=0;i<8;i++){ const q = i*Math.PI/4; t += `<rect x="${spF(a+r*Math.cos(q)-.8)}" y="${spF(b+r*Math.sin(q)-.8)}" width="1.6" height="1.6" transform="rotate(${i*45} ${spF(a+r*Math.cos(q))} ${spF(b+r*Math.sin(q))})"/>`; } return `<g class="pt-gear" fill="${spShade(ac,-.1)}" stroke="${dk}" stroke-width=".35">${t}<circle cx="${a}" cy="${b}" r="${r}"/><circle cx="${a}" cy="${b}" r="${r*.35}" fill="${lt}"/></g>`; }).join('')}<path d="M40 22Q45 14 38 9M8 34Q3 42 10 46" fill="none" stroke="${lt}" stroke-width=".8" stroke-linecap="round"/><path d="M36.8 10.4L38 9l.3 1.9M11.2 44.6L10 46l-.3-1.9" fill="none" stroke="${lt}" stroke-width=".8"/></g>`; break;
      case 'T7': o.back += `<g class="pt-mut pt-t7">${[[-1,14,'#a78bfa'],[40,12,'#38bdf8'],[41,32,'#fbbf24']].map(([a,b,col])=>`<rect x="${a}" y="${b}" width="8" height="12" rx="4" fill="${spMixC(col,'#fff',.3)}" stroke="${dk}" stroke-width=".55"/><rect x="${a+1.4}" y="${b+1.6}" width="5.2" height="9" rx="2.6" fill="${spShade(col,-.35)}" opacity=".85"/>`).join('')}</g>`; break;
      case 'T8': o.back += `<g class="pt-mut pt-t8"><text data-i18n-ignore="1" x="24" y="34" text-anchor="middle" font-size="34" font-weight="900" font-family="serif" fill="${spMixC(ac,'#fff',.7)}" stroke="${lt}" stroke-width=".5" opacity=".75">${escapeHtml(P.glyph)}</text></g>`; break;
    } }
  if(st>=5 && F.dom && x.lod!==0){ const D = SP_LV5_DOM[P.dom], [c1, c2] = D.c, id = x.id; let s = '';
    switch(P.dom){
      case 'D1': s = `${[0,30,60,90,120,150].map(a=>{ const t = a*Math.PI/180; return `<path d="M${spF(24-30*Math.cos(t))} ${spF(22-30*Math.sin(t))}L${spF(24+30*Math.cos(t))} ${spF(22+30*Math.sin(t))}" stroke="#fff7d6" stroke-width="1.2" opacity=".35"/>`; }).join('')}`; break;
      case 'D2': s = [[-4,4],[46,2],[-6,30],[48,28]].map(([a,b],i)=>`<g transform="rotate(${i%2?8:-8} ${a+5} ${b+6})"><rect x="${a}" y="${b}" width="10" height="13" rx="1" fill="#fffbeb" stroke="${c2}" stroke-width=".4"/>${[2.5,5,7.5,10].map(y=>`<path d="M${a+1.6} ${b+y}h6.8" stroke="${c2}" stroke-width=".35" opacity=".6"/>`).join('')}</g>`).join(''); break;
      case 'D3': s = `<path d="M-10 40L2 28L10 34L20 22L30 32L38 24L58 40Z" fill="${c2}" opacity=".18"/><path d="M48 8a7 7 0 1 1-1.4-4.2" fill="none" stroke="${c2}" stroke-width="1.6" stroke-linecap="round" opacity=".45"/>`; break;
      case 'D4': s = `${[[-6,2],[4,-6],[50,0],[54,20],[-8,26],[52,44],[0,48],[30,-8]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".7" fill="#fff"/>`).join('')}<ellipse cx="24" cy="24" rx="32" ry="10" transform="rotate(-18 24 24)" fill="none" stroke="#a5b4fc" stroke-width=".5" opacity=".6"/>`; break;
      case 'D5': s = [[-8,0,-10],[46,-4,12],[-9,30,6],[47,28,-8]].map(([a,b,r])=>`<rect x="${a}" y="${b}" width="10" height="16" rx="1.2" transform="rotate(${r} ${a+5} ${b+8})" fill="url(#dmg_${id})" stroke="#fff" stroke-width=".5"/>`).join('') + `<defs><linearGradient id="dmg_${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${c2}" stop-opacity=".6"/></linearGradient></defs>`; break;
      case 'D6': s = `${[30,36].map(r=>`<circle cx="24" cy="24" r="${r}" fill="none" stroke="${c2}" stroke-width=".6" stroke-dasharray="1.2 2.4" opacity=".55"/>`).join('')}<path d="M-8 44Q8 36 24 46T56 40" fill="none" stroke="${c2}" stroke-width="1.6" opacity=".35"/>`; break;
      case 'D7': s = [[-8,6],[48,4],[-9,30],[49,28]].map(([a,b])=>`<rect x="${a}" y="${b}" width="9" height="14" rx="4.5" fill="${spMixC(c2,'#fff',.6)}" stroke="${c2}" stroke-width=".5" opacity=".8"/>`).join(''); break;
      case 'D8': s = `<g opacity=".22"><circle cx="24" cy="22" r="26" fill="${c1}"/><path d="M24 -4a13 13 0 0 1 0 26a13 13 0 0 0 0 26a26 26 0 0 0 0-52Z" fill="${c2}"/></g>`; break;
      case 'D9': s = [[-8,46,1],[56,46,-1]].map(([a,b,sd])=>`<path d="M${a} ${b}Q${a+sd*10} ${b-14} ${a+sd*6} ${b-30}Q${a+sd*3} ${b-40} ${a+sd*12} ${b-50}" fill="none" stroke="${c2}" stroke-width="1.2" opacity=".45" stroke-linecap="round"/>${[14,26,38].map((t,i)=>`<ellipse cx="${spF(a+sd*(8+i*1.5))}" cy="${spF(b-t)}" rx="2.6" ry="1.2" transform="rotate(${sd*(i%2?30:-30)} ${spF(a+sd*(8+i*1.5))} ${spF(b-t)})" fill="${c2}" opacity=".4"/>`).join('')}`).join('') + [[6,-4],[42,-6],[24,-8]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.1" fill="#bbf7d0" opacity=".8"/>`).join(''); break;
      case 'D10': s = `<g stroke="${c2}" stroke-width=".35" opacity=".35">${[-4,8,20,32,44].map(v=>`<path d="M${v} -9V51"/><path d="M-9 ${v}H57"/>`).join('')}</g>` + [[-4,-4],[44,-4],[-4,32],[44,32]].map(([a,b])=>`<rect x="${a-2.2}" y="${b-2.2}" width="4.4" height="4.4" fill="none" stroke="${c2}" stroke-width=".6" opacity=".6" transform="rotate(45 ${a} ${b})"/>`).join(''); break;
      case 'D11': s = [[-4,6,4],[50,2,3],[-6,34,3.4],[52,30,4.2],[24,-6,2.4]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="#fff" opacity=".55" stroke="${c2}" stroke-width=".35"/><circle cx="${spF(a-r*.35)}" cy="${spF(b-r*.35)}" r="${spF(r*.25)}" fill="#fff"/>`).join('') + `<path d="M44 -2a6 6 0 1 0 6 7a4.6 4.6 0 1 1-6-7Z" fill="${c2}" opacity=".35"/>`; break;
      case 'D12': s = `<g fill="none" stroke="${c2}" stroke-width=".4" opacity=".4">${[0,2.4,4.8,7.2,9.6].map(dy=>`<path d="M-9 ${spF(-2+dy)}Q12 ${spF(-8+dy)} 24 ${spF(-2+dy)}T57 ${spF(-2+dy)}"/>`).join('')}</g>` + [[-3,40],[50,38],[46,-1]].map(([a,b])=>`<ellipse cx="${a}" cy="${b}" rx="1.6" ry="1.15" transform="rotate(-20 ${a} ${b})" fill="${c2}" opacity=".55"/><path d="M${a+1.4} ${b}v-6" stroke="${c2}" stroke-width=".5" opacity=".55"/>`).join(''); break;
    }
    /* v2.5 LV5 去法器：手持法器化入领域，成为领域里成群浮现的世界元素 */
    if(x.heldEcho) s += `<g class="pt-held">${[[-2,2,.5,-14],[46,0,.46,12],[-4,34,.42,8],[48,34,.44,-10]].map(([a,b,k,r])=>`<g transform="translate(${a} ${b}) rotate(${r}) scale(${k}) translate(-40 -24)" opacity=".42">${x.heldEcho}</g>`).join('')}</g>`;
    o.dom = `<g class="pt-dom pt-${P.dom}"><rect x="-9" y="-9" width="66" height="60" rx="14" fill="${P.dom==='D4' ? c1 : spMixC(c1,'#fff',.45)}" opacity="${P.dom==='D4' ? .5 : .45}"/>${s}</g>`; }
  return o;
}
/* ---------- v2.5 域子名：「{LV5 名}·{核心字}之域」，例如「灯神觉醒·灯之域」；全库唯一 ---------- */
var spDomNameCache = {ver:-1, map:null};
function spDomNameAll(){
  if(spDomNameCache.ver===spCacheVer && spDomNameCache.map) return spDomNameCache.map;
  const map = new Map(), used = new Set(); spDomNameCache = {ver:spCacheVer, map};
  let L = []; try{ L = [...spLib(), ...Object.keys(SP_EVO_PATH_TV).map(id=>spTvDef(id)).filter(Boolean)]; }catch(_e){}
  const docOf = d=>(typeof gCfg==='function' && gCfg().evoCfg?.paths?.[d.id]?.domName) || '';
  L.filter(d=>docOf(d)).forEach(d=>{ const z = docOf(d); used.add(z); map.set(d.id, z); });   /* 管理员指定的优先占用 */
  /* 占名顺序：示例精灵 → 基础类别 → 名表精灵 → 其余（联名 / 联动 / 试验 / 活动 / 管理员）→ ID */
  const rank = d=>(typeof SP_SHAPE_FIX!=='undefined' && SP_SHAPE_FIX[d.id] ? 0 : 4) + (['collab','link','trial','event','lab','ach','adm','hidden'].includes(spArtCatKey(d)) ? 2 : 0) + (SP_EVO_PATH[d.name?.[0]] ? 0 : 1);
  L.slice().sort((a, b)=>rank(a) - rank(b) || (a.id<b.id ? -1 : 1)).forEach(d=>{ if(map.has(d.id)) return;
    const S = spPathSubj(d)[0], lv5 = String(d.forms?.[0]?.[4] || `${S}觉醒`), P = spPathOf(d), sc = [...S].filter(ch=>!/[灵兽卫犬精]/.test(ch));
    const cores = [...sc, P?.glyph, sc.slice(0, 2).join(''), S].filter((v, i, a)=>v && a.indexOf(v)===i);
    let z = ''; for(const k of cores){ const t = `${lv5}·${k}之域`; if(!used.has(t)){ z = t; break; } }
    for(let i=2; !z; i++){ const t = `${lv5}·${cores[0]||'灵'}之域${i}`; if(!used.has(t)) z = t; }
    used.add(z); map.set(d.id, z); });
  return map;
}
function spDomName(def){
  if(!def) return ['', '', '']; let z = ''; try{ z = spDomNameAll().get(def.id) || ''; }catch(_e){}
  const S = spPathSubj(def); if(!z) z = `${String(def.forms?.[0]?.[4] || S[0]+'觉醒')}·${[...S[0]][0]||'灵'}之域`;
  const en = String(def.forms?.[1]?.[4] || `Awakened ${S[1]}`), vi = String(def.forms?.[2]?.[4] || `${S[2]} thức tỉnh`);
  return [z, `${en} · Realm of ${S[1]}`, `${vi} · Cõi ${S[2]}`];
}
/* ---------- 领域进入（lv5_domain_entries） ---------- */
function spDomainHtml(m){
  const d = spDef(m.id) || spTvDef(m.id); if(!d) return ''; const P = spPathOf(d), D = SP_LV5_DOM[P.dom], S = spPathSubj(d);
  return `<div class="modal sp-domain-modal" role="dialog" aria-modal="true" aria-labelledby="spDomT"><div class="modal-head"><h2 id="spDomT">🌌 ${escapeHtml(trT(spDomName(d)))} · ${escapeHtml(trT(D.n))}</h2><button class="modal-close" data-act="closeModal" aria-label="${escapeAttr(tx('关闭','Close','Đóng'))}">${svgIcon('x',15)}</button></div>
    <div class="modal-body"><div class="sp-domain-stage pt-${P.dom}">${spiritView(d, 260, 5, {entrance:true})}</div>
      <p class="sp-domain-law"><b>${escapeHtml(trT(D.law))}</b></p><p>${escapeHtml(trT(spPathText(d, 5)))}</p>
      <p class="hint">${escapeHtml(tx('领域只是观赏与收藏，不影响真实进度、甘特条数据和业务统计。','Realms are for viewing and collecting only — they never affect real progress, Gantt data or statistics.','Cõi chỉ để ngắm và sưu tầm — không ảnh hưởng tiến độ hay thống kê.'))}</p></div></div>`;
}
function spRenderModal4(m){ if(m.type==='spDomain') return spDomainHtml(m); return typeof spRenderModal5==='function' ? spRenderModal5(m) : ''; }
function spDomainEnter(id){ if(!spPathFlags().entry) return; try{ if(spCanPlay()){ const u = spU(); u.domV = u.domV || {}; u.domV[id] = (+u.domV[id]||0) + 1; gTouch(u); saveGrowth(); } }catch(_e){} state.modal = {type:'spDomain', id}; render(); }
