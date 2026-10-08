/* =========================================================
   v2.4 六层建模差异化：骨架 / 几何 / 部件 / 材质节点 / 绑定 / 动画逻辑
   · 不再一套「头 + 躯干 + 四肢 + 尾」套所有精灵：十二种骨架、十二种几何、十二种部件槽、十二种材质节点、十二种绑定、十二种动画逻辑
   · 阶段建模：LV1 简化 → LV2 基础 → LV3 主骨架 → LV4 主 + 副 → LV5 副骨架 + 专属（保留主骨架标志部件）
   · 九大觉醒体按觉醒表单独指定 LV4 / LV5 骨架与几何；无脚下光圈；不遮挡脸 / 核心
========================================================= */
var SP_SKEL = {
  S1:{n:['双足人形','Biped humanoid','Hình người hai chân'], st:['头 + 躯干 + 双臂 + 双腿','Head + torso + two arms + two legs','Đầu + thân + hai tay + hai chân']},
  S2:{n:['四足兽形','Quadruped beast','Hình thú bốn chân'], st:['头 + 躯干 + 四腿 + 尾','Head + torso + four legs + tail','Đầu + thân + bốn chân + đuôi']},
  S3:{n:['无足漂浮形','Limbless floater','Thể trôi không chân'], st:['头 + 躯干（无四肢），整体悬浮','Head + torso (no limbs), hovering','Đầu + thân (không chi), lơ lửng']},
  S4:{n:['多足形','Many-legged','Nhiều chân'], st:['头 + 躯干 + 六 / 八腿','Head + torso + six / eight legs','Đầu + thân + sáu / tám chân']},
  S5:{n:['多头形','Multi-headed','Nhiều đầu'], st:['多首 + 躯干 + 四肢（副首在身后，不挡主脸）','Extra heads + torso + limbs (extra heads behind, never over the main face)','Nhiều đầu + thân + chi (đầu phụ phía sau, không che mặt chính)']},
  S6:{n:['蛇形','Serpentine','Hình rắn'], st:['头 + 长躯干（无四肢），盘绕尾身','Head + long coiling body (no limbs)','Đầu + thân dài cuộn (không chi)']},
  S7:{n:['植物形','Plant','Hình thực vật'], st:['根 + 茎 + 叶 / 花','Roots + stem + leaves / flowers','Rễ + thân + lá / hoa']},
  S8:{n:['建筑形','Architectural','Hình kiến trúc'], st:['基座 + 主体 + 顶（基座是结构，不是光圈）','Plinth + body + roof (the plinth is structure, not an aura)','Bệ + thân + mái (bệ là kết cấu, không phải vòng sáng)']},
  S9:{n:['器物形','Object','Hình đồ vật'], st:['本体 + 细长附肢（器物拟人）','Object body + slender appendages','Thân đồ vật + chi mảnh']},
  S10:{n:['抽象形','Abstract','Hình trừu tượng'], st:['几何体 + 环绕符号','Geometric body + orbiting symbols','Khối hình học + ký hiệu bao quanh']},
  S11:{n:['星体形','Celestial','Hình thiên thể'], st:['核心 + 环 + 卫星','Core + ring + satellites','Lõi + vành + vệ tinh']},
  S12:{n:['机械合体形','Modular mech','Cơ giáp mô-đun'], st:['模块 + 关节 + 核心','Modules + joints + core','Mô-đun + khớp + lõi']},
};
var SP_GEO = {
  G1:{n:['球体堆叠','Stacked spheres','Khối cầu chồng']}, G2:{n:['圆柱结构','Cylinders','Khối trụ']}, G3:{n:['锥体结构','Cones','Khối nón']}, G4:{n:['多边形晶体','Polyhedral crystal','Tinh thể đa diện']},
  G5:{n:['流体曲面','Fluid surfaces','Mặt cong chất lỏng']}, G6:{n:['管道结构','Pipes','Đường ống']}, G7:{n:['模块拼装','Modular blocks','Lắp ghép mô-đun']}, G8:{n:['环状结构','Rings','Cấu trúc vòng']},
  G9:{n:['螺旋结构','Spirals','Xoắn ốc']}, G10:{n:['平面剪影','Flat cut-outs','Cắt phẳng']}, G11:{n:['粒子云','Particle cloud','Đám hạt']}, G12:{n:['混合结构','Mixed structure','Cấu trúc hỗn hợp']},
};
var SP_MNODE = {
  M1:{n:['标准 PBR','Standard PBR','PBR tiêu chuẩn'], tx:[]}, M2:{n:['半透明 SSS','Translucent SSS','SSS bán trong'], tx:['sss']}, M3:{n:['折射','Refraction','Khúc xạ'], tx:['ice','gem']},
  M4:{n:['自发光','Emissive','Tự phát sáng'], tx:['glow']}, M5:{n:['流动','Flowing','Dòng chảy'], tx:['flow']}, M6:{n:['像素','Pixel','Pixel'], tx:['code']},
  M7:{n:['剪影','Silhouette','Bóng'], tx:['dark']}, M8:{n:['金属','Metal','Kim loại'], tx:['metal']}, M9:{n:['能量','Energy','Năng lượng'], tx:['energy']},
  M10:{n:['民俗','Folk','Dân gian'], tx:['folk']}, M11:{n:['符文','Runic glow','Phù văn phát sáng'], tx:['rune','glow']}, M12:{n:['复合','Composite','Phức hợp'], tx:['metal','energy','rune','gem']},
};
var SP_RIG = {
  B1:['标准骨骼','Standard bones','Xương chuẩn'], B2:['无骨骼（顶点动画）','No bones (vertex animation)','Không xương (hoạt ảnh đỉnh)'], B3:['布料骨骼','Cloth bones','Xương vải'], B4:['流体骨骼','Fluid rig','Rig chất lỏng'],
  B5:['机械骨骼（关节）','Mechanical joints','Khớp cơ khí'], B6:['植物骨骼（生长）','Plant growth rig','Rig sinh trưởng'], B7:['星体骨骼（环）','Celestial ring rig','Rig vành thiên thể'], B8:['模块骨骼','Modular rig','Rig mô-đun'],
  B9:['多头骨骼','Multi-head rig','Rig nhiều đầu'], B10:['剪影骨骼','Silhouette rig','Rig bóng'], B11:['粒子骨骼','Particle rig','Rig hạt'], B12:['复合骨骼','Composite rig','Rig phức hợp'],
};
var SP_ANIM = {
  A1:['呼吸待机','Breathing idle','Chờ hít thở'], A2:['漂浮待机','Floating idle','Chờ lơ lửng'], A3:['生长待机','Growing idle','Chờ sinh trưởng'], A4:['旋转待机','Rotating idle','Chờ xoay'],
  A5:['机械待机','Mechanical idle','Chờ cơ khí'], A6:['流体待机','Fluid idle','Chờ chất lỏng'], A7:['像素待机','Pixel idle','Chờ pixel'], A8:['剪影待机','Silhouette idle','Chờ bóng'],
  A9:['多头待机','Multi-head idle','Chờ nhiều đầu'], A10:['粒子待机','Particle idle','Chờ hạt'], A11:['模块待机','Modular idle','Chờ mô-đun'], A12:['复合待机','Composite idle','Chờ phức hợp'],
};
/* 部件值词典（part_library 的取值） */
var SP_PV = {'无':['无','None','Không'],'单头':['单头','Single head','Một đầu'],'无头':['无头（面纹）','Headless (face mark)','Không đầu (vân mặt)'],'花头':['花头','Flower head','Đầu hoa'],'晶头':['晶头','Crystal head','Đầu tinh thể'],'时针头':['时针头','Clock-hand head','Đầu kim đồng hồ'],'机械头':['机械头','Mech head','Đầu cơ khí'],'多头':['多头','Multiple heads','Nhiều đầu'],'字头':['字头','Glyph head','Đầu chữ'],'剪影头':['剪影头','Silhouette head','Đầu bóng'],'人形头':['人形头','Humanoid head','Đầu hình người'],'像素头':['像素头','Pixel head','Đầu pixel'],'食物头':['食物头','Food head','Đầu món ăn'],'乐器头':['乐器头','Instrument head','Đầu nhạc cụ'],'星核头':['星核头','Star-core head','Đầu lõi sao'],'表情头':['表情头','Expression head','Đầu biểu cảm'],'鱼头':['鱼头','Fish head','Đầu cá'],'虫头':['虫头','Insect head','Đầu côn trùng'],'鸟头':['鸟头','Bird head','Đầu chim'],'蛇头':['蛇头','Snake head','Đầu rắn'],'数据头':['数据头','Data head','Đầu dữ liệu'],'权限头':['权限头','Authority head','Đầu quyền hạn'],
  '器物形':['器物形','Object body','Thân đồ vật'],'建筑形':['建筑形','Building body','Thân kiến trúc'],'茎干':['茎干','Stem','Thân cây'],'晶簇':['晶簇','Crystal cluster','Cụm tinh thể'],'能量体':['能量体','Energy body','Thân năng lượng'],'环体':['环体','Ring body','Thân vòng'],'模块躯干':['模块躯干','Modular torso','Thân mô-đun'],'神躯':['神躯','Divine body','Thân thần'],'抽象体':['抽象体','Abstract body','Thân trừu tượng'],'符体':['符体','Glyph body','Thân phù'],'影体':['影体','Shadow body','Thân bóng'],'人形躯干':['人形躯干','Humanoid torso','Thân người'],'模块':['模块','Modules','Mô-đun'],'食物躯干':['食物躯干','Food body','Thân món ăn'],'乐器躯干':['乐器躯干','Instrument body','Thân nhạc cụ'],'气象体':['气象体','Weather body','Thân khí tượng'],'星体':['星体','Celestial body','Thân thiên thể'],'情绪体':['情绪体','Emotion body','Thân cảm xúc'],'梦体':['梦体','Dream body','Thân mộng'],'鱼体':['鱼体','Fish body','Thân cá'],'虫体':['虫体','Insect body','Thân côn trùng'],'鸟体':['鸟体','Bird body','Thân chim'],'蛇体':['蛇体','Snake body','Thân rắn'],'微观体':['微观体','Microscopic body','Thân vi mô'],'数据体':['数据体','Data body','Thân dữ liệu'],'机械体':['机械体','Mech body','Thân cơ khí'],'权限体':['权限体','Authority body','Thân quyền hạn'],'剪影体':['剪影体','Silhouette body','Thân bóng'],
  '叶':['叶','Leaves','Lá'],'机械臂':['机械臂','Mech arms','Tay cơ khí'],'神臂':['神臂','Divine arms','Tay thần'],'双臂':['双臂','Two arms','Hai tay'],'短肢':['短肢','Stubby limbs','Chi ngắn'],'乐手':['乐手','Player hands','Tay nhạc công'],'鳍':['鳍','Fins','Vây'],'多足':['多足','Many legs','Nhiều chân'],'双足':['双足','Two legs','Hai chân'],'鞭毛':['鞭毛','Flagella','Roi'],'权限臂':['权限臂','Authority arms','Tay quyền hạn'],'细肢':['细肢','Slender limbs','Chi mảnh'],'四足':['四足','Four legs','Bốn chân'],
  '多尾':['多尾','Many tails','Nhiều đuôi'],'鱼尾':['鱼尾','Fish tail','Đuôi cá'],'羽尾':['羽尾','Feather tail','Đuôi lông'],'蛇尾':['蛇尾','Snake tail','Đuôi rắn'],'数据尾':['数据尾','Data tail','Đuôi dữ liệu'],'火焰尾':['火焰尾','Flame tail','Đuôi lửa'],
  '能量翼':['能量翼','Energy wings','Cánh năng lượng'],'能量形态延伸':['能量形态延伸（非翼非尾）','Energy-form extension (neither wing nor tail)','Phần kéo dài dạng năng lượng (không phải cánh hay đuôi)'],'机械翼':['机械翼','Mech wings','Cánh cơ khí'],'神翼':['神翼','Divine wings','Cánh thần'],'虫翅':['虫翅','Insect wings','Cánh côn trùng'],'羽翼':['羽翼','Feather wings','Cánh lông'],'权限翼':['权限翼','Authority wings','Cánh quyền hạn'],'光翼':['光翼','Light wings','Cánh ánh sáng'],
  '晶角':['晶角','Crystal horns','Sừng tinh thể'],'神角':['神角','Divine horns','Sừng thần'],'触角':['触角','Antennae','Râu'],'权限角':['权限角','Authority horns','Sừng quyền hạn'],
  '环':['环','Ring','Vòng'],'机械武器':['机械武器','Mech weapon','Vũ khí cơ khí'],'神器':['神器','Divine artefact','Thần khí'],'笔':['笔','Brush','Bút'],'节日物':['节日物','Festive item','Vật lễ hội'],'乐器':['乐器','Instrument','Nhạc cụ'],'数据器':['数据器','Data device','Thiết bị dữ liệu'],'试验器':['试验器','Test probe','Đầu dò thử nghiệm'],'权限器':['权限器','Authority sceptre','Quyền trượng'],'珠':['珠','Orb','Ngọc'],
  '器物纹':['器物纹','Artifact motif','Vân đồ vật'],'建筑纹':['建筑纹','Architectural motif','Vân kiến trúc'],'叶脉':['叶脉','Leaf veins','Gân lá'],'切面':['切面','Facets','Mặt cắt'],'元素纹':['元素纹','Elemental motif','Vân nguyên tố'],'时间纹':['时间纹','Time motif','Vân thời gian'],'电路纹':['电路纹','Circuit motif','Vân mạch'],'神纹':['神纹','Divine motif','Vân thần'],'符号':['符号','Symbols','Ký hiệu'],'符文':['符文','Runes','Phù văn'],'光影纹':['光影纹','Light motif','Vân quang ảnh'],'节日纹':['节日纹','Festive motif','Vân lễ hội'],'像素纹':['像素纹','Pixel motif','Vân pixel'],'食物纹':['食物纹','Food motif','Vân món ăn'],'乐纹':['乐纹','Music motif','Vân nhạc'],'气象纹':['气象纹','Weather motif','Vân khí tượng'],'星纹':['星纹','Star motif','Vân sao'],'情绪纹':['情绪纹','Emotion motif','Vân cảm xúc'],'梦纹':['梦纹','Dream motif','Vân mộng'],'鳞纹':['鳞纹','Scales','Vân vảy'],'甲纹':['甲纹','Carapace motif','Vân giáp'],'羽纹':['羽纹','Feather motif','Vân lông'],'微观纹':['微观纹','Micro motif','Vân vi mô'],'数据纹':['数据纹','Data motif','Vân dữ liệu'],'工业纹':['工业纹','Industrial motif','Vân công nghiệp'],'权限纹':['权限纹','Authority motif','Vân quyền hạn'],'线索纹':['线索纹','Clue motif','Vân manh mối'],
  '头环':['头环','Head ring','Vòng đầu'],'环绕':['环绕','Orbit','Bao quanh'],'领域':['领域（非脚下）','Domain (never at the feet)','Lĩnh vực (không dưới chân)'],
  '粒子':['粒子','Particles','Hạt'],'光带':['光带','Light ribbon','Dải sáng'],'数据流':['数据流','Data stream','Luồng dữ liệu'],'火焰':['火焰','Flames','Lửa'],
  '晶核':['晶核','Crystal core','Lõi tinh thể'],'能量核':['能量核','Energy core','Lõi năng lượng'],'时间核':['时间核','Time core','Lõi thời gian'],'神核':['神核','Divine core','Lõi thần'],'概念核':['概念核','Concept core','Lõi khái niệm'],'符核':['符核','Glyph core','Lõi phù'],'光核':['光核','Light core','Lõi ánh sáng'],'像素核':['像素核','Pixel core','Lõi pixel'],'音核':['音核','Sound core','Lõi âm'],'气象核':['气象核','Weather core','Lõi khí tượng'],'星核':['星核','Star core','Lõi sao'],'情绪核':['情绪核','Emotion core','Lõi cảm xúc'],'梦核':['梦核','Dream core','Lõi mộng'],'珠核':['珠核','Pearl core','Lõi ngọc trai'],'数据核':['数据核','Data core','Lõi dữ liệu'],'温度核':['温度核','Temperature core','Lõi nhiệt độ'],'权限核':['权限核','Authority core','Lõi quyền hạn'],
  '披风':['披风','Cape','Áo choàng'],'铃铛':['铃铛','Bell','Chuông'],'面具':['面具','Mask','Mặt nạ'],'挂饰':['挂饰','Charm','Vật treo'],'徽记':['徽记','Emblem','Huy hiệu']};
var SP_PART_SLOTS = [['head',['头部','Head','Đầu']],['torso',['躯干','Torso','Thân']],['limbs',['四肢','Limbs','Chi']],['tail',['尾部','Tail','Đuôi']],['wing',['翼部','Wings','Cánh']],['horn',['角部','Horns','Sừng']],['held',['法器','Artefact','Pháp khí']],['pat',['纹样','Pattern','Hoa văn']],['aura',['光环（非脚下）','Aura (never at the feet)','Vầng (không dưới chân)']],['trail',['拖尾','Trail','Vệt']],['core',['核心','Core','Lõi']],['deco',['装饰','Decoration','Trang trí']]];
/* 类别 → 骨架 / 几何 / 部件 / 材质节点 / 绑定 / 动画（*_category_mapping） */
var SP_MODEL_CAT = {
  obj:['S9','S1','G2',null,['单头','器物形','细肢','无','无','无','无','器物纹','无','无','无','挂饰'],['M1','M10'],['B1','B9'],['A11']],
  arch:['S8','S12','G2','G7',['无头','建筑形','无','无','无','无','无','建筑纹','无','无','无','无'],['M1','M8'],['B1'],['A11']],
  plant:['S7','S3','G3',null,['花头','茎干','叶','无','无','无','无','叶脉','无','无','无','无'],['M2'],['B6'],['A3']],
  mineral:['S10','S11','G4',null,['晶头','晶簇','无','无','无','晶角','无','切面','无','无','晶核','无'],['M3'],['B1','B8'],['A4']],
  elem:['S3','S10','G11','G4',['无头','能量体','无','能量形态延伸','无','无','无','元素纹','环绕','粒子','能量核','无'],['M4','M9'],['B2','B11'],['A10']],
  time:['S11','S10','G8',null,['时针头','环体','无','无','无','无','环','时间纹','环绕','光带','时间核','无'],['M9','M11'],['B7'],['A4']],
  mech:['S12','S1','G6','G7',['机械头','模块躯干','机械臂','无','机械翼','无','机械武器','电路纹','无','数据流','能量核','无'],['M8'],['B5'],['A5']],
  myth:['S5','S2','G12',null,['多头','神躯','神臂','多尾','神翼','神角','神器','神纹','领域','光带','神核','披风'],['M8','M9','M11'],['B9'],['A9']],
  concept:['S10','S3','G8','G10',['无头','抽象体','无','无','无','无','无','符号','环绕','无','概念核','无'],['M9'],['B2'],['A2']],
  text:['S10','S12','G7',null,['字头','符体','无','无','无','无','笔','符文','无','无','符核','无'],['M11','M6'],['B8'],['A7']],
  light:['S3','S10','G10',null,['剪影头','影体','无','无','光翼','无','无','光影纹','环绕','光带','光核','无'],['M7'],['B10'],['A8']],
  fest:['S1','S9','G1',null,['人形头','人形躯干','双臂','无','无','无','节日物','节日纹','无','无','无','铃铛'],['M10'],['B1','B3'],['A1']],
  glitch:['S10','S12','G7',null,['像素头','模块','无','数据尾','无','无','无','像素纹','无','数据流','像素核','无'],['M6'],['B8'],['A7']],
  food:['S9','S1','G1',null,['食物头','食物躯干','短肢','无','无','无','无','食物纹','无','无','无','无'],['M2'],['B1'],['A1']],
  music:['S9','S1','G2',null,['乐器头','乐器躯干','乐手','无','无','无','乐器','乐纹','无','无','音核','无'],['M1','M10'],['B1'],['A1']],
  weather:['S3','S11','G5','G11',['无头','气象体','无','无','无','无','无','气象纹','环绕','粒子','气象核','无'],['M5'],['B4','B11'],['A6','A10']],
  astro:['S11','S3','G8',null,['星核头','星体','无','无','无','无','环','星纹','环绕','光带','星核','无'],['M4','M9'],['B7'],['A4']],
  emotion:['S10','S3','G1','G5',['表情头','情绪体','无','无','无','无','无','情绪纹','无','无','情绪核','无'],['M5'],['B2','B4'],['A2']],
  dream:['S3','S6','G5',null,['无头','梦体','无','无','无','无','无','梦纹','领域','光带','梦核','无'],['M5','M7'],['B4','B10'],['A6']],
  ocean:['S2','S4','G5',null,['鱼头','鱼体','鳍','鱼尾','无','无','无','鳞纹','无','无','珠核','无'],['M2','M5'],['B4'],['A6']],
  insect:['S4','S2','G4','G6',['虫头','虫体','多足','无','虫翅','触角','无','甲纹','无','无','无','无'],['M3','M8'],['B5'],['A5']],
  flying:['S2','S3','G5','G12',['鸟头','鸟体','双足','羽尾','羽翼','无','无','羽纹','无','光带','无','无'],['M2'],['B1'],['A1']],
  reptile:['S6','S2','G9',null,['蛇头','蛇体','无','蛇尾','无','无','无','鳞纹','无','无','无','无'],['M3','M8'],['B1'],['A1']],
  micro:['S10','S4','G11',null,['无头','微观体','鞭毛','无','无','无','无','微观纹','无','粒子','无','无'],['M6'],['B8','B11'],['A10']],
  collab:['S1','S9','G1',null,['单头','人形躯干','双臂','无','无','无','无','节日纹','无','无','无','挂饰'],['M10'],['B1','B3'],['A1']],
  link:['S12','S10','G7','G6',['数据头','数据体','无','无','无','无','数据器','数据纹','无','数据流','数据核','无'],['M6','M8'],['B5','B8'],['A5','A7']],
  event:['S1','S9','G1',null,['人形头','人形躯干','双臂','无','无','无','节日物','节日纹','无','无','无','铃铛'],['M10'],['B1','B3'],['A1']],
  lab:['S9','S12','G2','G6',['单头','器物形','细肢','无','无','无','试验器','工业纹','无','无','无','无'],['M1','M8'],['B1','B5'],['A11']],
  trial:['S12','S1','G6','G7',['机械头','机械体','机械臂','无','无','无','试验器','工业纹','无','数据流','温度核','无'],['M8','M9'],['B5'],['A5']],
  ach:['S11','S1','G8','G4',['单头','星体','无','无','无','无','环','神纹','环绕','光带','星核','徽记'],['M8','M4'],['B7'],['A4']],
  adm:['S1','S5','G12',null,['权限头','权限体','权限臂','无','权限翼','权限角','权限器','权限纹','领域','光带','权限核','徽记'],['M12'],['B12'],['A12']],
  hidden:['S10','S3','G10',null,['剪影头','剪影体','无','无','无','无','无','线索纹','无','无','无','无'],['M7'],['B10'],['A8']],
};
/* 联名按 IP 选骨架 / 几何（只换结构风格，全部原创） */
var SP_MODEL_COLLAB = {darkcute:['S1','S5','G1'], sweet:['S3','S1','G5'], starwish:['S1','S11','G8'], zodiac:['S1','S12','G4'], detective:['S9','S1','G2'], gadget:['S9','S12','G1'], magic:['S1','S10','G10'], mecha:['S12','S1','G7'], hero:['S1','S12','G6'], toy:['S9','S2','G1'], fighter:['S1','S3','G11'], daily:['S9','S1','G1'], chase:['S2','S9','G5'], inventor:['S12','S9','G6'], fairy:['S1','S7','G3'], caper:['S2','S9','G1'], boe:['S12','S10','G7'], place:['S8','S9','G2'], vnfood:['S9','S1','G1'], vnculture:['S9','S7','G2']};
/* 九大觉醒体建模（awaken_model_diff） */
var SP_MODEL_REF = {
  tv_hto_phoenix:{l4:['S2','G12'], l5:['S11','G8'], d:['兽形 → 星体','Beast → celestial','Thú → thiên thể']},
  tv_hto_dragon:{l4:['S6','G9'], l5:['S8','G2'], d:['蛇形 → 山脉','Serpent → mountain range','Rắn → dãy núi']},
  tv_lto_tortoise:{l4:['S2','G4'], l5:['S8','G2'], d:['龟形 → 冰宫','Tortoise → ice palace','Rùa → cung băng']},
  tv_lto_wolf:{l4:['S2','G5'], l5:['S5','G12'], d:['单头 → 双头','One head → two heads','Một đầu → hai đầu']},
  tv_opst_whale:{l4:['S3','G5'], l5:['S11','G8'], d:['单体 → 生态','Single body → ecosystem','Một thể → hệ sinh thái']},
  tv_tst_lion:{l4:['S2','G12'], l5:['S5','G12'], d:['单头 → 双头 + 王座','One head → two heads + throne','Một đầu → hai đầu + ngai']},
  tv_tpc_snake:{l4:['S6','G8'], l5:['S11','G8'], d:['单环 → 多重环','One ring → many rings','Một vòng → nhiều vòng']},
  tv_cth_butterfly:{l4:['S4','G5'], l5:['S3','G11'], d:['单体 → 领域','Single body → domain','Một thể → lĩnh vực']},
  tv_cus_alien:{l4:['S1','G7'], l5:['S11','G8'], d:['人形 → 星舰','Humanoid → starship','Hình người → phi thuyền']},
};
var SP_MODEL_STAGE = {
  1:{sk:['简化骨架','Simplified skeleton','Khung giản lược'], geo:['单几何','One geometry','Một hình khối'], parts:[1,2], mat:['单材质','One material','Một chất liệu'], rig:['简化绑定','Simplified rig','Rig giản lược'], anim:['单逻辑','One logic','Một logic']},
  2:{sk:['主骨架（元素组合）','Main skeleton (element combination)','Khung chính (tổ hợp nguyên tố)'], geo:['双几何','Two geometries','Hai hình khối'], parts:[3,4], mat:['双材质','Two materials','Hai chất liệu'], rig:['基础绑定','Basic rig','Rig cơ bản'], anim:['双逻辑','Two logics','Hai logic']},
  3:{sk:['主骨架（元素环境 / 伙伴）','Main skeleton (element setting / companions)','Khung chính (môi trường nguyên tố)'], geo:['主几何','Main geometry','Hình khối chính'], parts:[5,6], mat:['三材质','Three materials','Ba chất liệu'], rig:['主绑定','Main rig','Rig chính'], anim:['主逻辑','Main logic','Logic chính']},
  4:{sk:['主骨架 + 副骨架（元素质变）','Main + secondary skeleton (element transformation)','Khung chính + phụ (biến đổi nguyên tố)'], geo:['主几何 + 副几何','Main + secondary geometry','Hình chính + phụ'], parts:[7,8], mat:['多材质','Multiple materials','Nhiều chất liệu'], rig:['主绑定 + 副绑定','Main + secondary rig','Rig chính + phụ'], anim:['主逻辑 + 副逻辑','Main + secondary logic','Logic chính + phụ']},
  5:{sk:['副骨架 + 元素法相（元素升华，法相独立成层）','Secondary skeleton + element dharma form (sublimation; the dharma form is its own layer)','Khung phụ + pháp tướng nguyên tố'], geo:['副几何 + 专属','Secondary geometry + exclusive','Hình phụ + riêng'], parts:[9,11], mat:['最多两种材质 + 领域（领域不计入材质）','At most two materials + domain (the domain is not a material)','Tối đa hai chất liệu + lĩnh vực (lĩnh vực không tính là chất liệu)'], rig:['复合绑定','Composite rig','Rig phức hợp'], anim:['复合逻辑','Composite logic','Logic phức hợp']},
};
var SP_MODEL_FLAGS = [['skel','model_skeleton_diff',['骨架差异化','Skeleton differentiation','Khác biệt khung xương']],['geo','model_geometry_diff',['几何差异化','Geometry differentiation','Khác biệt hình khối']],['part','model_part_diff',['部件差异化','Part differentiation','Khác biệt bộ phận']],['mat','model_material_diff',['材质节点差异化','Material-node differentiation','Khác biệt nút chất liệu']],['rig','model_rig_diff',['绑定差异化','Rig differentiation','Khác biệt rig']],['anim','model_animation_diff',['动画逻辑差异化','Animation-logic differentiation','Khác biệt logic hoạt ảnh']],['stage','model_stage_diff',['阶段建模差异','Stage modelling differences','Khác biệt mô hình theo giai đoạn']],['awaken','model_awaken_diff',['九大觉醒体建模差异化','Nine awakenings modelled differently','Chín thể thức tỉnh mô hình riêng']]];
function spModelFlags(){ const c = (typeof gCfg==='function' && gCfg().modelCfg?.flags) || {}; const o = {}; SP_MODEL_FLAGS.forEach(([k])=>o[k] = c[k]!==false); return o; }
function spModelCatRow(def){ const ck = spArtCatKey(def); let r = SP_MODEL_CAT[ck] || SP_MODEL_CAT.obj; const ov = (typeof gCfg==='function' && gCfg().modelCfg?.cat?.[ck]) || {};
  r = [ov.sk1||r[0], ov.sk2||r[1], ov.g1||r[2], ov.g2||r[3], r[4], r[5], r[6], r[7]];
  if(ck==='collab'){ const ad = spArtCollabOf(def), m = SP_MODEL_COLLAB[ad]; if(m) r = [ov.sk1||m[0], ov.sk2||m[1], ov.g1||m[2], r[3], r[4], r[5], r[6], r[7]]; }
  if(def.hidden && ck!=='hidden' && ck!=='adm') r = [r[0], r[1], r[2], 'G10', r[4], [...r[5], 'M7'], [...r[6], 'B10'], r[7]];
  return {ck, row:r}; }
/* 解析：{lv:骨架细化等级 0~3, sk:主骨架, sk2:副骨架标志, geo:[...], nodes, rig, anim, parts(启用槽位)} */
function spModelOf(def, st, opts={}){
  if(opts.noArt || opts.noModel) return null; const F = spModelFlags(); let C; try{ C = spArtCfg(); }catch(_e){ return null; } if(!C.flags.on) return null;
  const {ck, row} = spModelCatRow(def), R = F.awaken ? SP_MODEL_REF[def.id] : null;
  const [m1, m2, g1, g2, parts, nodes, rig, anim] = row;
  let sk, sk2 = null, geo = [];
  if(R){ const L4 = R.l4, L5 = R.l5; if(st>=5){ sk = L5[0]; sk2 = L4[0]; geo = [L5[1]]; } else { sk = L4[0]; geo = st>=3 ? [L4[1]] : []; if(st===4 && L5[1]!==L4[1]) geo.push(L5[1]); } }
  else if(!F.stage){ sk = m1; sk2 = st>=4 ? m2 : null; geo = st>=3 ? [g1] : []; }
  else if(st<=3){ sk = m1; geo = st===3 ? [g1] : st===2 ? [g1] : []; }
  else if(st===4){ sk = m1; sk2 = m2; geo = [g1, g2].filter(Boolean); }
  else { sk = m2; sk2 = m1; geo = [g2 || g1, 'G12'].filter((v,i,a)=>v && a.indexOf(v)===i); }
  if(!F.skel){ sk = 'S1'; sk2 = null; } if(!F.geo) geo = [];
  if(opts.sk){ sk = opts.sk; sk2 = opts.sk2 || null; } if(opts.geo) geo = opts.geo;
  /* v2.5 LV3 起加 S1 拟人副骨架，与主骨架 / 其他副骨架共存（主骨架本身是 S1 时不重复） */
  const subs = [sk2].filter(v=>v && v!==sk);   /* v2.7 Q 版精灵、不拟人：不再加 S1 拟人副骨架 */
  const fx = F.skel && !opts.sk && st>=5 ? (R ? R.l5[0] : (m1 && m1!==sk ? m1 : m2 && m2!==sk ? m2 : 'S11')) : null;   /* LV5 专属法相骨架（身后独立成层，不占骨架） */
  const lv = [0, 0, 1, 2, 3, 3][st];
  const nP = SP_MODEL_STAGE[st].parts[1], on = {}; let n = 0;
  let heldDom = null;   /* v2.5 LV5 去法器：法器不再拿在手上，化入领域 */
  SP_PART_SLOTS.forEach(([k],i)=>{ const v = parts[i]; if(st>=5 && k==='held'){ if(v && v!=='无') heldDom = v; return; } if(v && v!=='无' && n < nP){ on[k] = v; n++; } else if(k==='head' || k==='torso'){ on[k] = v; } });
  const ns = st===1 ? nodes.slice(0,1) : st===2 || st>=5 ? nodes.slice(0,2) : nodes;   /* LV5 最多两种材质，领域另算 */
  const rg = st>=4 ? (st>=5 ? [...new Set([...rig, R ? 'B12' : rig[0]])] : rig) : rig.slice(0,1);
  const an = st===1 ? anim.slice(0,1) : st>=5 ? [...new Set([...anim, 'A12'])] : anim;
  return {ck, sk, sk2, subs, fx, heldDom, lv, geo, nodes:F.mat ? ns : ['M1'], rig:F.rig ? rg : ['B1'], anim:F.anim ? an : ['A1'], parts:F.part ? on : {}, row, R, st};
}
/* ---------- 骨架渲染：返回 {back, front, limbs:是否替换四肢, lower} ---------- */
/* 有自己的四肢；v2.5 支持主副骨架共存：spSkelHas(主骨架, [副骨架…]) 任一带四肢即为真 */
function spSkelHas(sk, subs){ const L = ['S1','S2','S4','S5','S7','S9','S12']; return [sk].concat(subs||[]).some(s=>s && L.includes(s)); }
function spSkelArms(sk){ return ['S1','S5','S9','S12'].includes(sk); }   /* 自带手臂 */
function spSkelSubs(M){ return (M.subs || [M.sk2]).filter(s=>s && s!==M.sk); }
function spSkelRender(M, x, st){
  const out = {back:'', front:'', replace:M.sk!=='S1' && M.sk!=='S5', lift:0, lower:null, arms:false}, subs = spSkelSubs(M);
  const add = (sk, lv, sig)=>{ const r = spSkelPart(sk, lv, x, st, sig); out.back += r.back||''; out.front += r.front||''; if(r.lift) out.lift = Math.min(out.lift, r.lift); if(r.lower!=null && !sig) out.lower = r.lower; };
  add(M.sk, M.lv, false);
  subs.filter(s=>s!=='S1').forEach(s=>{ const needLimbs = !spSkelHas(M.sk) && spSkelHas(s); add(s, Math.max(1, M.lv-1), !needLimbs); });
  /* S1 拟人副骨架：主骨架与其他副骨架都没有手臂时，补一对类人手臂（保留主骨架的腿 / 根 / 环 / 漂浮） */
  if(subs.includes('S1') && out.replace && !spSkelArms(M.sk) && !subs.some(k=>k!=='S1' && spSkelArms(k))) out.arms = true;
  return out;
}
/* S1 拟人副骨架的手臂：LV3 短臂，LV4 起按基因的类人手臂（前层） */
function spSkelArmsSvg(st, def, c, dk){
  if(st<3) return ''; const S = `fill="${c}" stroke="${dk}" stroke-width=".9" stroke-linejoin="round"`;
  if(st===3) return `<g class="sk-limb sk-s1" ${S}><ellipse cx="12.2" cy="32.5" rx="2.3" ry="3.6" transform="rotate(28 12.2 32.5)"/><ellipse cx="35.8" cy="32.5" rx="2.3" ry="3.6" transform="rotate(-28 35.8 32.5)"/></g>`;
  const f = spLimbs(4, def, c, dk)[1]; return f ? `<g class="sk-limb sk-s1">${f}</g>` : '';
}
/* 元素系「能量形态延伸」：从身体两侧向后上方分叉的能量形（不是翅膀，也不是尾巴）；LV2~LV4，LV5 做减法收回 */
function spModelExt(x, st){
  const {c, ac, dk} = x, fill = x.extFill || spMixC(spMixC(c, ac, .5), '#fff', .25), n = st>=4 ? 3 : 2; let s = '';
  for(let i=0;i<n;i++) [-1, 1].forEach(sd=>{ const y0 = 35 - i*4.2, len = 5.5 + st*1.2 - i*.8, bx = 24 + sd*8.6, tx = 24 + sd*(10.5 + len), ty = y0 - 4.5 - len*.55;
    s += `<path d="M${spF(bx)} ${spF(y0-2.6)}Q${spF(24+sd*(11+len*.45))} ${spF(y0-3.4)} ${spF(tx)} ${spF(ty)}Q${spF(24+sd*(11.5+len*.55))} ${spF(y0+.6)} ${spF(bx+sd*.6)} ${spF(y0+2.8)}Z" fill="${fill}" stroke="${dk}" stroke-width=".45" stroke-linejoin="round" opacity="${spF(.92-i*.18)}"/><path d="M${spF(bx+sd*1.2)} ${spF(y0)}Q${spF(24+sd*(11+len*.4))} ${spF(y0-1.6)} ${spF(tx-sd*1.6)} ${spF(ty+1.2)}" fill="none" stroke="#fff" stroke-width=".45" stroke-linecap="round" opacity=".6"/>`; });
  return `<g class="sp-ext">${s}</g>`;
}
function spSkelPart(sk, lv, x, st, sig){
  const {c, ac, dk, fy, hy, belly} = x, S = (w=.8)=>`stroke="${dk}" stroke-width="${w}" stroke-linejoin="round"`, o = {back:'', front:''};
  const mir = s=>spMirror(s);
  switch(sk){
    case 'S2': { if(!sig){ const h = [3.6,4.6,5.8,7][lv], leg = (xc, sh)=>`<path class="sk-limb" d="M${spF(xc-1.7)} 37.5v${spF(h)}q0 1.7 1.7 1.7q1.7 0 1.7-1.7v${spF(-h)}Z" fill="${sh}" ${S()}/>`;
        o.back += `<g class="sk-legs">${leg(14.6, spShade(c,-.14))}${leg(33.4, spShade(c,-.14))}${leg(19.6, c)}${leg(28.4, c)}</g>`; }
      if(lv>=1 && x.AL?.tail!==false) o.back += `<g class="sk-tail"><path d="M34.5 36.5C40 38 44.5 34 42.5 ${spF(29-lv)}" fill="none" stroke="${dk}" stroke-width="${spF(2.6+lv*.3)}" stroke-linecap="round"/><path d="M34.5 36.5C40 38 44.5 34 42.5 ${spF(29-lv)}" fill="none" stroke="${c}" stroke-width="${spF(1.6+lv*.3)}" stroke-linecap="round"/></g>`;
      return o; }
    case 'S3': { /* 无足漂浮：不再画下身流束（看着像奇怪的尖底），只抬高身体，靠漂浮动画与粒子体现 */
      o.lower = ''; o.lift = sig ? -1 : -2; return o; }
    case 'S4': { const n = sig ? 1 : [2,2,3,4][lv]; let s = '';
      for(let i=0;i<n;i++){ const y0 = 32.5 + i*2.6, kx = 7.6 - i*.3, ky = 29.8 + i*3.2, fx2 = 5.6 + i*.4, fy2 = 37.6 + i*2.7, d = `M13.4 ${spF(y0)}L${spF(kx)} ${spF(ky)}L${spF(fx2)} ${spF(fy2)}`;
        s += `<path d="${d}" fill="none" stroke="${dk}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width=".85" stroke-linecap="round" stroke-linejoin="round"/>`; }
      o.back += `<g class="sk-limb sk-multi">${mir(s)}</g>`; return o; }
    case 'S5': { const n = lv>=3 ? 1 : lv>=1 ? 1 : 0; if(!n) return o; const r = lv>=2 ? 5.4 : 4.4;
      const head = (cx, cy, flip)=>`<g class="sk-head2"><path d="M${flip?33:15} ${spF(fy-2)}Q${spF((cx+(flip?33:15))/2)} ${spF(cy+2)} ${spF(cx)} ${spF(cy+r*.4)}" stroke="${dk}" stroke-width="${spF(r*.95)}" stroke-linecap="round" fill="none"/><path d="M${flip?33:15} ${spF(fy-2)}Q${spF((cx+(flip?33:15))/2)} ${spF(cy+2)} ${spF(cx)} ${spF(cy+r*.4)}" stroke="${c}" stroke-width="${spF(r*.75)}" stroke-linecap="round" fill="none"/>
        <circle cx="${spF(cx)}" cy="${spF(cy)}" r="${spF(r)}" fill="${c}" ${S(.8)}/><path d="M${spF(cx-r*.75)} ${spF(cy-r*.55)}l${spF(-r*.25)} ${spF(-r*.8)} ${spF(r*.7)} ${spF(r*.35)}Z M${spF(cx+r*.75)} ${spF(cy-r*.55)}l${spF(r*.25)} ${spF(-r*.8)} ${spF(-r*.7)} ${spF(r*.35)}Z" fill="${c}" ${S(.6)}/>
        <ellipse cx="${spF(cx-r*.36)}" cy="${spF(cy)}" rx="${spF(r*.15)}" ry="${spF(r*.22)}" fill="#1f2937"/><ellipse cx="${spF(cx+r*.36)}" cy="${spF(cy)}" rx="${spF(r*.15)}" ry="${spF(r*.22)}" fill="#1f2937"/><circle cx="${spF(cx-r*.3)}" cy="${spF(cy-r*.1)}" r="${spF(r*.06)}" fill="#fff"/><circle cx="${spF(cx+r*.42)}" cy="${spF(cy-r*.1)}" r="${spF(r*.06)}" fill="#fff"/><path d="M${spF(cx-r*.25)} ${spF(cy+r*.42)}q${spF(r*.25)} ${spF(r*.2)} ${spF(r*.5)} 0" stroke="#1f2937" stroke-width=".45" fill="none" stroke-linecap="round"/></g>`;
      o.back += head(8.6, hy+3.4, false); if(n>1) o.back += head(39.4, hy+3.4, true); return o; }
    case 'S6': { const w = [2.6,3.4,4,4.6][lv], d = ['M28 41.5q6 2.4 8.6-1','M27 41.5C34 45.5 41 42.5 40.5 36.5','M27 41.5C35 46.5 44 42 42 34.5C40.5 29.5 35 31 36.5 35','M27 41.5C36 47.5 46.5 41.5 43.5 33C41 26.5 33.5 29 35.5 34.5C37 38 41 36.5 40.5 34'][lv];
      o.back += `<g class="sk-tail sk-coil"><path d="${d}" fill="none" stroke="${dk}" stroke-width="${spF(w+1.4)}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${spF(w)}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${spMixC(belly,c,.3)}" stroke-width="${spF(w*.32)}" stroke-linecap="round" stroke-dasharray="1.2 1.3" opacity=".85"/></g>`; return o; }
    case 'S7': { const lc = spMixC(c,'#4ade80',.45), roots = [[18,47],[21.5,48.2],[26.5,48.2],[30,47],[24,48.8]].slice(0, [2,3,4,5][lv]);
      if(!sig) o.back += `<g class="sk-root" fill="none" stroke="${spMixC(c,'#92400e',.55)}" stroke-width="1.05" stroke-linecap="round" opacity=".9">${roots.map(([a,b])=>`<path d="M24 41.5Q${spF((24+a)/2)} ${spF(b-3)} ${a} ${b}"/>`).join('')}</g>`;
      if(lv>=1 && !sig) o.back += `<g class="sk-leaf">${mir(`<g transform="rotate(-28 10.5 31)"><ellipse cx="10.5" cy="31" rx="${spF(3.6+lv*.5)}" ry="1.8" fill="${lc}" ${S(.6)}/><path d="M${spF(7.2-lv*.5)} 31h${spF(6.6+lv)}" stroke="${spShade(lc,-.35)}" stroke-width=".35"/></g>`)}</g>`;
      if(lv>=3 || sig) o.back += `<g class="sk-leaf">${[0,72,144,216,288].map(a=>`<ellipse cx="34.5" cy="${spF(hy+1.5)}" rx="1.1" ry="2.1" fill="${spMixC(ac,'#fff',.3)}" ${S(.35)} transform="rotate(${a} 34.5 ${spF(hy+3.4)})"/>`).join('')}<circle cx="34.5" cy="${spF(hy+3.4)}" r=".9" fill="#fde047"/></g>`;
      return o; }
    case 'S8': { const bc = spShade(c,-.16); o.front += `<g class="sk-mod sk-plinth"><rect x="13" y="41.3" width="22" height="2.6" rx=".5" fill="${bc}" ${S(.7)}/>${lv>=1?`<rect x="10.5" y="43.6" width="27" height="2.3" rx=".5" fill="${spShade(c,-.28)}" ${S(.7)}/>`:''}</g>`;
      if(lv>=2 || sig) o.back += `<g class="sk-mod"><path d="M13.5 ${spF(hy+3.2)}L24 ${spF(hy-4.8)}L34.5 ${spF(hy+3.2)}Q24 ${spF(hy+1)} 13.5 ${spF(hy+3.2)}Z" fill="${ac}" ${S(.7)}/><path d="M24 ${spF(hy-4.8)}v-2.4" stroke="${dk}" stroke-width=".7"/><circle cx="24" cy="${spF(hy-7.6)}" r=".8" fill="${ac}" ${S(.4)}/></g>`;
      if(lv>=3) o.back += `<g class="sk-mod">${mir(`<rect x="8.8" y="25" width="2.6" height="16.6" fill="${spMixC(c,'#fff',.3)}" ${S(.6)}/><rect x="8.2" y="23.8" width="3.8" height="1.6" fill="${bc}" ${S(.5)}/>`)}</g>`;
      return o; }
    case 'S9': { const arm = lv>=1 ? `<path d="M12.2 30.8q-3.6 1-4.8 4.8" fill="none" stroke="${dk}" stroke-width="1" stroke-linecap="round"/><circle cx="7.2" cy="36.2" r="1.25" fill="#fff" ${S(.5)}/>` : '';
      const armR = lv>=2 ? `<path d="M35.8 30.2q3.2-1.4 4-5.6" fill="none" stroke="${dk}" stroke-width="1" stroke-linecap="round"/><circle cx="40" cy="24.1" r="1.25" fill="#fff" ${S(.5)}/>` : arm ? `<g transform="translate(48 0) scale(-1 1)">${arm}</g>` : '';
      const legs = sig ? '' : mir(`<path d="M20 41.6v${spF(2.6+lv*.5)}" stroke="${dk}" stroke-width="1" stroke-linecap="round"/><ellipse cx="19.3" cy="${spF(44.6+lv*.5)}" rx="1.9" ry=".95" fill="${dk}"/>`);
      o.front += `<g class="sk-limb sk-hose">${arm}${armR}</g>`; o.back += `<g class="sk-limb">${legs}</g>`; return o; }
    case 'S10': { const sy = [[8.5,22,'tri'],[39.5,24,'sq'],[9,39,'ci'],[39,40,'di']].slice(0, sig ? 2 : [1,2,3,4][lv]); let s = '';
      sy.forEach(([a,b,t])=>{ const f = `fill="${spMixC(ac,'#fff',.55)}" fill-opacity=".6" stroke="${ac}" stroke-width=".7"`;
        s += t==='tri' ? `<path d="M${a} ${b-2.2}l2 3.6h-4Z" ${f}/>` : t==='sq' ? `<rect x="${a-1.6}" y="${b-1.6}" width="3.2" height="3.2" ${f}/>` : t==='ci' ? `<circle cx="${a}" cy="${b}" r="1.7" ${f}/>` : `<path d="M${a} ${b-2}l1.8 2-1.8 2-1.8-2Z" ${f}/>`; });
      if(lv>=3 && !sig) s += `<path d="M8.5 22L9 39M39.5 24L39 40" stroke="${ac}" stroke-width=".3" stroke-dasharray=".8 .8" opacity=".6"/>`;
      o.back += `<g class="sk-sym">${s}</g>`; o.lift = -1; return o; }
    case 'S11': { const rx = [13,15.5,17.5,19][lv], ry = 4.2, cy = fy + 5.6, n = sig ? 1 : [0,1,2,3][lv], rt = `rotate(-10 24 ${spF(cy)})`;
      const arc = sw=>`M${spF(24-rx)} ${spF(cy)}A${rx} ${ry} 0 0 ${sw} ${spF(24+rx)} ${spF(cy)}`;
      o.back += `<g class="sk-ring" transform="${rt}"><path d="${arc(1)}" fill="none" stroke="${dk}" stroke-width="2"/><path d="${arc(1)}" fill="none" stroke="${ac}" stroke-width="1.3"/></g>`;
      let sats = ''; [[200,1.5],[340,1.2],[95,1]].slice(0,n).forEach(([a,r],i)=>{ const t = a*Math.PI/180, px = 24 + rx*Math.cos(t), py = cy + ry*Math.sin(t); sats += `<circle class="sk-sat" style="animation-delay:${i*.6}s" cx="${spF(px)}" cy="${spF(py)}" r="${r}" fill="${spMixC(ac,'#fff',.35)}" ${S(.45)}/>`; });
      o.front += `<g class="sk-ring" transform="${rt}"><path d="${arc(0)}" fill="none" stroke="${dk}" stroke-width="2"/><path d="${arc(0)}" fill="none" stroke="${ac}" stroke-width="1.3"/><path d="${arc(0)}" fill="none" stroke="#fff" stroke-width=".35" opacity=".7"/>${sats}</g>`;
      return o; }
    case 'S12': { const m = spShade(c,-.18), j = spMixC(ac,'#fff',.15);
      if(!sig){ const armL = lv>=1 ? `<rect x="8.8" y="27.6" width="3.2" height="4.2" rx=".6" fill="${m}" ${S(.6)}/><circle cx="10.4" cy="32.3" r="1.25" fill="${j}" ${S(.5)}/><rect x="8.6" y="33.2" width="3.4" height="${spF(3.6+lv*.6)}" rx=".6" fill="${m}" ${S(.6)}/><path d="M8.6 ${spF(37+lv*.6)}l-.8 1.4M12 ${spF(37+lv*.6)}l.8 1.4" stroke="${dk}" stroke-width=".6" stroke-linecap="round"/>` : '';
        const leg = `<rect x="17.4" y="39.4" width="3.6" height="${spF(3.2+lv*.6)}" rx=".6" fill="${m}" ${S(.6)}/><circle cx="19.2" cy="39.6" r="1.15" fill="${j}" ${S(.45)}/><rect x="16.2" y="${spF(42.4+lv*.6)}" width="6" height="1.8" rx=".5" fill="${spShade(c,-.32)}" ${S(.5)}/>`;
        o.front += `<g class="sk-limb sk-mech">${mir(armL)}</g>`; o.back += `<g class="sk-limb sk-mech">${mir(leg)}</g>`; }
      if(lv>=2 || sig) o.front += `<g class="sk-mod">${mir(`<rect x="10.6" y="${spF(fy+1.2)}" width="2.4" height="5.6" rx=".6" fill="${m}" ${S(.5)}/><circle cx="11.8" cy="${spF(fy+2.6)}" r=".38" fill="${dk}"/><circle cx="11.8" cy="${spF(fy+5.4)}" r=".38" fill="${dk}"/>`)}</g>`;
      if(lv>=3) o.back += `<g class="sk-mod">${mir(`<path d="M17 ${spF(hy+5)}q-4.6-1.4-5.6-6.4" fill="none" stroke="${dk}" stroke-width="2.4" stroke-linecap="round"/><path d="M17 ${spF(hy+5)}q-4.6-1.4-5.6-6.4" fill="none" stroke="${m}" stroke-width="1.5" stroke-linecap="round"/><circle cx="11.4" cy="${spF(hy-1.6)}" r="1" fill="${j}" ${S(.4)}/>`)}</g>`;
      return o; }
  }
  return o;
}
/* ---------- 几何构成（G1~G12）：形体上的结构语言，均在身后或身体内，不挡脸 ---------- */
function spGeoRender(geo, x, st){
  const {c, ac, dk, fy, hy, id} = x, o = {back:'', ovl:'', front:''}, S = (w=.6)=>`stroke="${dk}" stroke-width="${w}"`, lite = st<=2;
  geo.forEach(G=>{ switch(G){
    case 'G1': o.back += `<g class="geo-g1"><circle cx="24" cy="${spF(hy-1)}" r="${lite?1.8:2.5}" fill="${spMixC(ac,'#fff',.2)}" ${S()}/>${lite?'':`<circle cx="24" cy="${spF(hy-4.6)}" r="1.5" fill="${spMixC(c,'#fff',.25)}" ${S(.5)}/>`}</g>`; break;
    case 'G2': o.ovl += `<g class="geo-g2" fill="none" stroke="${dk}" stroke-width=".55" opacity=".55"><path d="M10 ${spF(fy+6.6)}Q24 ${spF(fy+10)} 38 ${spF(fy+6.6)}"/>${lite?'':`<path d="M10 ${spF(fy+10.6)}Q24 ${spF(fy+14)} 38 ${spF(fy+10.6)}"/>`}</g>`; break;
    case 'G3': o.back += `<g class="geo-g3" fill="${ac}" ${S(.55)}>${[[17,1.2],[24,3.4],[31,1.2]].slice(lite?1:0, lite?2:3).map(([a,h])=>`<path d="M${a-2.2} ${spF(hy+4)}L${a} ${spF(hy-2.5-h)}L${a+2.2} ${spF(hy+4)}Z"/>`).join('')}</g>`; break;
    case 'G4': o.back += `<g class="geo-g4">${[[11.2,hy+7,-24],[36.8,hy+7,24]].slice(0, lite?1:2).map(([a,b,r])=>`<g transform="rotate(${r} ${a} ${spF(b)})"><path d="M${a-1.8} ${spF(b+3)}V${spF(b-2.5)}L${a} ${spF(b-5.2)}L${a+1.8} ${spF(b-2.5)}V${spF(b+3)}Z" fill="${spMixC(ac,'#fff',.45)}" fill-opacity=".92" ${S(.5)}/><path d="M${a} ${spF(b-5.2)}V${spF(b+3)}" stroke="#fff" stroke-width=".35" opacity=".8"/></g>`).join('')}</g>`; break;
    case 'G5': o.back += `<g class="geo-g5"><path d="M10.5 37.5q3.4 3.6 6.8 0t6.8 0t6.8 0t6.8 0V41.5Q24 ${lite?45:47.5} 10.5 41.5Z" fill="${spMixC(c,'#fff',.28)}" opacity=".8" ${S(.45)}/></g>`; break;
    case 'G6': o.back += `<g class="geo-g6">${spMirror(`<path d="M15.5 ${spF(hy+6.5)}q-6.4-1.6-6.4 5.6v${lite?3:7}" fill="none" stroke="${dk}" stroke-width="2.3" stroke-linecap="round"/><path d="M15.5 ${spF(hy+6.5)}q-6.4-1.6-6.4 5.6v${lite?3:7}" fill="none" stroke="${spShade(c,-.12)}" stroke-width="1.4" stroke-linecap="round"/><rect x="8" y="${spF(hy+12.6)}" width="2.2" height="1.1" rx=".3" fill="${ac}" ${S(.35)}/>`)}</g>`; break;
    case 'G7': { const cube = (a,b,s)=>`<path d="M${a} ${b}l${s} ${spF(-s*.55)}l${s} ${spF(s*.55)}l${-s} ${spF(s*.55)}Z" fill="${spMixC(ac,'#fff',.35)}" ${S(.45)}/><path d="M${a} ${b}l${s} ${s*.55}v${s}l${-s} ${-s*.55}Z" fill="${ac}" ${S(.45)}/><path d="M${a+s} ${b+s*.55}l${s} ${-s*.55}v${s}l${-s} ${s*.55}Z" fill="${spShade(ac,-.25)}" ${S(.45)}/>`;
      o.back += `<g class="geo-g7 sk-mod">${cube(5.6, +(fy-4).toFixed(2), 2.2)}${lite?'':cube(37.4, +(fy-1.5).toFixed(2), 2)}</g>`; break; }
    case 'G8': o.back += `<g class="geo-g8" fill="none"><ellipse class="geo-orbit" cx="24" cy="${spF(fy+1)}" rx="${lite?17:20}" ry="6" transform="rotate(28 24 ${spF(fy+1)})" stroke="${ac}" stroke-width=".6" stroke-dasharray="2 1.2" opacity=".7"/>${lite?'':`<ellipse cx="24" cy="${spF(fy+1)}" rx="20" ry="5" transform="rotate(-32 24 ${spF(fy+1)})" stroke="${spMixC(ac,'#fff',.4)}" stroke-width=".45" opacity=".6"/>`}</g>`; break;
    case 'G9': o.back += `<g class="geo-g9"><path d="M8 ${spF(fy+7)}a1 1 0 1 1 1 1a2.2 2.2 0 1 1-2.2-2.2a3.6 3.6 0 1 1 3.6 3.6" fill="none" stroke="${ac}" stroke-width=".9" stroke-linecap="round"/></g>`; break;
    case 'G10': o.back += `<g class="geo-g10" fill="${spShade(c,-.55)}" opacity=".85"><path d="M7 ${spF(fy-6)}l4.2 1.6-3 2.8Z"/><path d="M41.5 ${spF(fy+1)}l-4.4 1 2.2 3.6Z"/>${lite?'':`<path d="M9 ${spF(fy+12)}l3.6-.4-1.4 3.2Z"/>`}</g>`; break;
    case 'G11': { const R = spRng(spHash(x.def.id+'g11')); let s = ''; for(let i=0;i<(lite?7:13);i++){ const a = (110 + R()*320)*Math.PI/180, r = 13 + R()*6; s += `<circle class="geo-pt" style="animation-delay:${spF(R()*2)}s" cx="${spF(24+r*Math.cos(a))}" cy="${spF(31+r*Math.sin(a)*.9)}" r="${spF(.35+R()*.7)}" fill="${i%3?ac:'#fff'}" opacity="${spF(.5+R()*.4)}"/>`; } o.back += `<g class="geo-g11">${s}</g>`; break; }
    case 'G12': o.back += spGeoRender(['G4'], x, 2).back.replace('class="geo-g4"','class="geo-g12"') + (st>=5 ? spGeoRender(['G11'], x, 1).back : ''); break;
  } });
  return o;
}
/* ---------- 部件：法器 / 核心 / 拖尾（按类别部件表） ---------- */
function spModelHeld(v, x){
  const {ac, dk} = x, g = '#fbbf24';
  switch(v){
    case '神器': return `<path d="M38.4 41l3.2-16" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round"/><path d="M36.2 37.5h5" stroke="${g}" stroke-width="1.6" stroke-linecap="round"/><circle cx="39" cy="37.5" r=".7" fill="${ac}"/>`;
    case '权限器': return `<path d="M38.6 43V21" stroke="${g}" stroke-width="1.3" stroke-linecap="round"/><path d="M38.6 15.6l2.4 2.6-2.4 3.2-2.4-3.2Z" fill="#7c3aed" stroke="${g}" stroke-width=".6"/><circle cx="38.6" cy="23" r=".8" fill="${g}"/>`;
    case '环': return `<circle cx="39" cy="34" r="3.2" fill="none" stroke="${dk}" stroke-width="1.6"/><circle cx="39" cy="34" r="3.2" fill="none" stroke="${ac}" stroke-width="1"/>`;
    case '笔': return `<path d="M37.4 42l3.6-14" stroke="#7c2d12" stroke-width="1.2" stroke-linecap="round"/><path d="M36.9 41.9l-.6 2.4 1.8-1.6Z" fill="#111827"/>`;
    case '节日物': return `<path d="M39 25v3" stroke="${dk}" stroke-width=".6"/><rect x="36.8" y="28" width="4.4" height="5.6" rx="2" fill="#ef4444" stroke="${dk}" stroke-width=".6"/><path d="M39 33.6v1.8" stroke="#fbbf24" stroke-width=".7"/>`;
    case '乐器': return `<path d="M36.6 41.6l5.2-12.4" stroke="#a16207" stroke-width="1.5" stroke-linecap="round"/>${[0,1,2].map(i=>`<circle cx="${spF(38.6+i*1.1)}" cy="${spF(37+-i*2.6)}" r=".35" fill="#1f2937"/>`).join('')}`;
    case '数据器': return `<rect x="36.4" y="30" width="5.2" height="7" rx=".8" fill="#1e293b" stroke="${dk}" stroke-width=".5"/><rect x="37.2" y="31" width="3.6" height="4.6" fill="#38bdf8"/><path d="M37.8 34.6v-1.4M38.9 34.6v-2.4M40 34.6v-1" stroke="#e0f2fe" stroke-width=".45"/>`;
    case '试验器': return `<rect x="38" y="25" width="2.2" height="11" rx="1.1" fill="#f8fafc" stroke="${dk}" stroke-width=".5"/><circle cx="39.1" cy="37.2" r="1.9" fill="#ef4444" stroke="${dk}" stroke-width=".5"/><rect x="38.6" y="29" width="1" height="7" fill="#ef4444"/>`;
    case '机械武器': return `<rect x="36.2" y="31.6" width="7" height="2.8" rx=".8" fill="#64748b" stroke="${dk}" stroke-width=".5"/><circle cx="37.6" cy="33" r="1.6" fill="#475569" stroke="${dk}" stroke-width=".5"/><circle cx="43.6" cy="33" r=".6" fill="${ac}"/>`;
    case '珠': return `<circle cx="39" cy="34" r="2.4" fill="${spMixC(ac,'#fff',.4)}" stroke="${dk}" stroke-width=".5"/><circle cx="38.2" cy="33.2" r=".6" fill="#fff"/>`;
  }
  return '';
}
function spModelCore(v, x, cy){
  const {ac, dk} = x, f = spMixC(ac,'#fff',.2), S = `stroke="${dk}" stroke-width=".5"`, Y = spF(cy);
  switch(v){
    case '晶核': return `<path d="M24 ${spF(cy-3)}l2.4 1.5v3l-2.4 1.5-2.4-1.5v-3Z" fill="${f}" ${S}/><path d="M24 ${spF(cy-3)}v6" stroke="#fff" stroke-width=".35"/>`;
    case '时间核': return `<circle cx="24" cy="${Y}" r="2.7" fill="#fff" ${S}/><path d="M24 ${spF(cy-1.8)}V${Y}l1.3 .9" stroke="${dk}" stroke-width=".45" fill="none" stroke-linecap="round"/>`;
    case '像素核': case '数据核': return `<rect x="21.6" y="${spF(cy-2.4)}" width="4.8" height="4.8" fill="${f}" ${S}/><rect x="22.6" y="${spF(cy-1.4)}" width="1.2" height="1.2" fill="#fff"/><rect x="24.2" y="${spF(cy)}" width="1.2" height="1.2" fill="${dk}"/>`;
    case '温度核': return `<circle cx="24" cy="${spF(cy+.6)}" r="2.2" fill="#ef4444" ${S}/><rect x="23.2" y="${spF(cy-3.2)}" width="1.6" height="3.4" rx=".8" fill="#fff" ${S}/>`;
    case '星核': case '光核': return `<path d="M24 ${spF(cy-3)}l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" fill="${v==='光核'?'#fff7d6':f}" ${S}/>`;
    case '情绪核': return `<path d="M24 ${spF(cy+2.2)}c-2.6-1.6-3.2-3.4-2-4.2c.9-.6 1.6 0 2 .6c.4-.6 1.1-1.2 2-.6c1.2.8.6 2.6-2 4.2Z" fill="#fb7185" ${S}/>`;
    case '珠核': return `<circle cx="24" cy="${Y}" r="2.4" fill="#f8fafc" ${S}/><circle cx="23.3" cy="${spF(cy-.8)}" r=".7" fill="#fff"/>`;
    case '权限核': return `<path d="M24 ${spF(cy-3)}l2.6 2.6-2.6 3.4-2.6-3.4Z" fill="#7c3aed" stroke="#fbbf24" stroke-width=".6"/><circle cx="24" cy="${spF(cy-.2)}" r=".7" fill="#fde68a"/>`;
    case '神核': return `<circle cx="24" cy="${Y}" r="2.6" fill="${f}" stroke="#fbbf24" stroke-width=".7"/><circle cx="24" cy="${Y}" r="1" fill="#fff"/>`;
    case '音核': return `<circle cx="24" cy="${Y}" r="2.5" fill="${f}" ${S}/><path d="M24.6 ${spF(cy-1.4)}v2.2a.7.6 0 1 1-.5-.5" fill="none" stroke="${dk}" stroke-width=".45"/>`;
    case '梦核': return `<path d="M24.6 ${spF(cy-2.6)}a2.6 2.6 0 1 0 1.8 4a2 2 0 1 1-1.8-4Z" fill="#ede9fe" ${S}/>`;
    case '气象核': return `<path d="M21.6 ${spF(cy+1)}a1.4 1.4 0 0 1 .6-2.6a2 2 0 0 1 3.8 .4a1.2 1.2 0 0 1 0 2.2Z" fill="#fff" ${S}/>`;
    case '符核': case '概念核': return `<circle cx="24" cy="${Y}" r="2.6" fill="${f}" ${S}/><path d="M22.8 ${spF(cy+1)}l1.2-2.2 1.2 2.2Z" fill="none" stroke="${dk}" stroke-width=".4"/>`;
    case '能量核': return `<circle cx="24" cy="${Y}" r="2.6" fill="${f}" ${S}/><circle cx="24" cy="${Y}" r="1.2" fill="#fff" opacity=".85"/>`;
  }
  return '';
}
function spModelTrail(v, x){
  const {ac, c} = x;
  switch(v){
    case '粒子': return `<g class="md-trail">${[[8,34,1],[5,31,.8],[3,36,.6],[6,38.5,.5]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="${ac}" opacity=".7"/>`).join('')}</g>`;
    case '光带': return `<g class="md-trail" fill="none" stroke-linecap="round"><path d="M12 33Q6 31 1 34" stroke="${spMixC(ac,'#fff',.4)}" stroke-width="1.6" opacity=".55"/><path d="M12 36Q7 35 3 38" stroke="${ac}" stroke-width=".9" opacity=".5"/></g>`;
    case '数据流': return `<g class="md-trail">${[[8,32],[5,34],[2,32],[6,37],[3,39]].map(([a,b],i)=>`<rect x="${a}" y="${b}" width="1.4" height="1" fill="${i%2?ac:'#e0f2fe'}" opacity=".8"/>`).join('')}</g>`;
    case '火焰': return `<g class="md-trail"><path d="M12 36q-5-1-9 2q4-4 9-6q-3 3 0 4Z" fill="#fb923c" opacity=".75"/></g>`;
  }
  return '';
}
/* ---------- 新增材质节点纹理：SSS / 自发光 / 流动 / 民俗 ---------- */
function spModelTex(t, A, x, I=1){
  const id = x.id, c = x.c, ac = x.ac, fy = x.fy;
  switch(t){
    case 'sss': return `<g opacity="${spF(.45*I)}">${spBody(x.bk,'none', spMixC(c,'#fff1e6',.55),'none').replace(/stroke-width="([\d.]+)"/g,'stroke-width="3"')}</g><radialGradient id="ss_${id}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#fff7ed" stop-opacity="${spF(.3*I)}"/><stop offset="1" stop-color="#fff7ed" stop-opacity="0"/></radialGradient><rect x="8" y="12" width="32" height="34" fill="url(#ss_${id})"/>`;
    case 'glow': return `<radialGradient id="gl_${id}"><stop offset="0" stop-color="${spMixC(ac,'#fff',.5)}" stop-opacity="${spF(.55*I)}"/><stop offset="1" stop-color="${ac}" stop-opacity="0"/></radialGradient><circle cx="24" cy="${spF(fy+9)}" r="10" fill="url(#gl_${id})"/>`;
    case 'flow': return `<g class="am-flow" fill="none" stroke-linecap="round"><path d="M6 ${spF(fy+7)}q4.5-2 9 0t9 0t9 0t9 0" stroke="#fff" stroke-width="1.1" stroke-dasharray="5 3" opacity="${spF(.45*I)}"/><path d="M6 ${spF(fy+11.5)}q4.5-2 9 0t9 0t9 0t9 0" stroke="${spMixC(ac,'#fff',.4)}" stroke-width=".9" stroke-dasharray="4 3" opacity="${spF(.4*I)}"/></g>`;
    case 'folk': return `<pattern id="fk_${id}" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M2.5 .6l1.9 1.9-1.9 1.9-1.9-1.9Z" fill="none" stroke="#e2a72e" stroke-width=".4"/><circle cx="2.5" cy="2.5" r=".4" fill="#c0392b"/></pattern><rect x="-14" y="${spF(fy+6)}" width="76" height="40" fill="url(#fk_${id})" opacity="${spF(.55*I)}"/>`;
  }
  return spArtMat(t, A, x, I);
}
/* 模型层汇总：材质节点 → 纹理（与画派材质合并去重） */
function spModelTexList(M, A){ const tx = []; (M?.nodes||[]).forEach(n=>(SP_MNODE[n]?.tx||[]).forEach(t=>{ if(!tx.includes(t)) tx.push(t); })); return tx; }
