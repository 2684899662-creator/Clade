/* =========================================================
   v2.4 时序灵绘风格 · 多画派并行（Time Spirit Style · multi-school）
   · 不再使用单一底层：八大画派（赛璐璐 / 厚涂 / 水彩 / 像素 / 剪影 / 极简 / 3D / 民俗）+ 管理员专属画派
   · 类别 → 主 / 副画派映射；阶段画派迁移（LV1 极简 → LV2 赛璐璐 → LV3 主画派 → LV4 主 + 副 → LV5 副 + 专属）
   · 材质 / 光影 / 构图 / 线条 / 配色均由画派决定；联名换画派；皮肤换画派；九大觉醒体专属画派
   · 无脚下光圈；不遮挡脸 / 核心 / 剪影；只改变展示，不影响真实进度、甘特条数据与业务统计
========================================================= */
var SP_ART_NAME = ['时序灵绘风格 · 多画派并行','Time Spirit Style · multi-school','Phong cách Linh Họa Thời Tự · đa trường phái'];
/* ---------- 八大画派 + 管理员专属画派（art_schools） ---------- */
var SP_ART_SCHOOLS = {
  A:{en:'Cel Flat', n:['赛璐璐平涂派','Cel Flat','Phái tô phẳng cel'], feat:['硬边、平涂、清晰描边','Hard edges, flat fills, clear outlines','Viền cứng, tô phẳng, nét rõ'],
     line:['硬描边 3~4px，深色','Hard outline 3–4px, dark','Viền cứng 3–4px, màu tối'], shade:['硬边平涂，2~3 层明暗','Hard-edged flat fills, 2–3 tone steps','Tô phẳng viền cứng, 2–3 tầng sáng tối'],
     light:['硬光：主光左上，硬阴影','Hard light: key top-left, hard shadow','Ánh sáng cứng: chính trên-trái, bóng cứng'], mat:['简化，色块为主','Simplified, colour blocks','Giản lược, mảng màu'],
     comp:['居中，正面','Centred, front view','Giữa khung, chính diện'], pal:['高饱和：明亮、对比','High saturation: bright, contrasty','Bão hòa cao: tươi, tương phản'], use:['器物、建筑、机械、食物、乐器、爬行','Artifacts, architecture, mech, food, instruments, reptiles','Đồ vật, kiến trúc, cơ khí, món ăn, nhạc cụ, bò sát']},
  B:{en:'Painterly', n:['厚涂写实派','Painterly','Phái sơn dày tả thực'], feat:['笔触、厚涂、无描边','Brushwork, thick paint, no outline','Nét cọ, sơn dày, không viền'],
     line:['无描边，靠明暗分界','No outline; edges from light and shade','Không viền; ranh giới nhờ sáng tối'], shade:['厚涂，多层过渡','Thick paint, layered transitions','Sơn dày, chuyển nhiều lớp'],
     light:['神光：顶光、神性，四层强对比','Divine light: top light, four layers, strong contrast','Thần quang: sáng đỉnh, bốn lớp, tương phản mạnh'], mat:['精细，反射、折射','Detailed: reflection, refraction','Tinh tế: phản xạ, khúc xạ'],
     comp:['3/4 侧视，动态','Three-quarter view, dynamic','Nghiêng 3/4, động'], pal:['低饱和：沉稳、写实','Low saturation: calm, realistic','Bão hòa thấp: trầm, tả thực'], use:['元素、神话、时空、星体','Elemental, mythic, spacetime, celestial','Nguyên tố, thần thoại, thời không, thiên thể']},
  C:{en:'Watercolor', n:['水彩晕染派','Watercolor','Phái màu nước loang'], feat:['水彩、晕染、柔边','Watercolour washes, soft edges','Màu nước, loang, viền mềm'],
     line:['细线或无线，柔边','Fine or no line, soft edges','Nét mảnh hoặc không, viền mềm'], shade:['水彩晕染，色彩渗透','Wet washes, bleeding colour','Loang màu nước, màu thấm'],
     light:['柔光：无硬阴影','Soft light: no hard shadows','Ánh sáng mềm: không bóng cứng'], mat:['纸感、水感','Paper and water feel','Cảm giác giấy và nước'],
     comp:['留白，柔和','Generous white space, gentle','Chừa trắng, dịu'], pal:['水彩渐变：柔和、渗透','Watercolour gradients: soft, bleeding','Chuyển màu nước: dịu, thấm'], use:['植物、天气、海洋、飞行、情绪','Plants, weather, ocean, flyers, emotions','Thực vật, thời tiết, đại dương, phi hành, cảm xúc']},
  D:{en:'Pixel Retro', n:['像素复古派','Pixel Retro','Phái pixel hoài cổ'], feat:['像素、点阵、限色','Pixels, dot matrix, limited colours','Pixel, ma trận điểm, giới hạn màu'],
     line:['像素边 1px 点阵','1px pixel edge','Viền pixel 1px'], shade:['限色，点阵抖动','Limited colours, dithering','Giới hạn màu, dithering'],
     light:['扫描线：扫描线、抖动','Scanlines and dithering','Đường quét và dithering'], mat:['像素块','Pixel blocks','Khối pixel'],
     comp:['居中，网格对齐','Centred, grid-aligned','Giữa khung, căn lưới'], pal:['限色：8~16 色','Limited: 8–16 colours','Giới hạn: 8–16 màu'], use:['故障、文字、微生物、联动','Glitch, script, microbes, partnerships','Lỗi, văn tự, vi sinh, liên động']},
  E:{en:'Silhouette', n:['剪影光影派','Silhouette','Phái bóng và ánh sáng'], feat:['剪影、逆光、强对比','Silhouette, backlight, strong contrast','Bóng đen, ngược sáng, tương phản mạnh'],
     line:['剪影边：边缘光代替描边','Silhouette edge: rim light instead of lines','Viền bóng: ánh viền thay nét'], shade:['逆光、强对比','Backlit, high contrast','Ngược sáng, tương phản cao'],
     light:['逆光：边缘光、轮廓光','Backlight: rim and contour light','Ngược sáng: ánh viền, ánh đường bao'], mat:['半透明、光','Translucency and light','Bán trong suốt, ánh sáng'],
     comp:['逆光、背光','Backlit composition','Bố cục ngược sáng'], pal:['单色：单一色调','Monochrome: a single hue','Đơn sắc: một tông'], use:['光影、隐藏、梦境、天气','Light & shadow, hidden, dreams, weather','Quang ảnh, ẩn, giấc mơ, thời tiết']},
  F:{en:'Line Minimal', n:['线条极简派','Line Minimal','Phái nét tối giản'], feat:['单线、极简、留白','Single line, minimal, white space','Một nét, tối giản, chừa trắng'],
     line:['单线，极细','A single, very fine line','Một nét, rất mảnh'], shade:['无填充或单色','No fill or a single tint','Không tô hoặc một màu'],
     light:['无光：无光影','No lighting','Không ánh sáng'], mat:['无','None','Không'],
     comp:['极简：大量留白','Minimal: lots of white space','Tối giản: nhiều khoảng trắng'], pal:['无彩：黑白或单色','Achromatic: black-and-white or one tint','Vô sắc: trắng đen hoặc một màu'], use:['概念、文字、情绪、隐藏','Concepts, script, emotions, hidden','Khái niệm, văn tự, cảm xúc, ẩn']},
  G:{en:'3D Render', n:['3D 渲染派','3D Render','Phái kết xuất 3D'], feat:['立体、材质、反射','Volume, materials, reflections','Khối, chất liệu, phản xạ'],
     line:['无描边，靠材质','No outline; materials carry the form','Không viền; chất liệu tạo hình'], shade:['PBR 材质','PBR-style materials','Chất liệu kiểu PBR'],
     light:['环境光：反射、环境','Ambient: reflections, environment','Ánh sáng môi trường: phản xạ'], mat:['金属、宝石、玻璃','Metal, gem, glass','Kim loại, đá quý, thủy tinh'],
     comp:['立体，多角度','Volumetric, angled','Khối, nhiều góc'], pal:['金属色：金属、反射','Metallic: metal, reflections','Màu kim loại: phản xạ'], use:['机械、矿物、星体、昆虫、试验','Mech, minerals, celestial, insects, trials','Cơ khí, khoáng vật, thiên thể, côn trùng, thử nghiệm']},
  H:{en:'Folk Illustration', n:['民俗插画派','Folk Illustration','Phái minh họa dân gian'], feat:['民俗、纹样、平面','Folk motifs, patterns, flat','Dân gian, hoa văn, phẳng'],
     line:['粗线，装饰性','Thick decorative lines','Nét đậm trang trí'], shade:['平面色块，纹样','Flat colour blocks with patterns','Mảng màu phẳng, hoa văn'],
     light:['平面光：无立体','Flat light: no volume','Ánh sáng phẳng: không khối'], mat:['纸、布、木','Paper, cloth, wood','Giấy, vải, gỗ'],
     comp:['对称、纹样','Symmetric, patterned','Đối xứng, hoa văn'], pal:['民俗色：红、金、青','Folk colours: red, gold, teal','Màu dân gian: đỏ, vàng, xanh'], use:['节日、文化、器物、乐器、联名','Festivals, culture, artifacts, instruments, collabs','Lễ hội, văn hóa, đồ vật, nhạc cụ, hợp tác']},
  X:{en:'Authority Divine', n:['权限神性派（管理员专属）','Authority Divine (admin only)','Phái thần tính quyền hạn (riêng quản trị)'], feat:['权限神性 + 厚涂 + 3D','Authority divinity + painterly + 3D','Thần tính quyền hạn + sơn dày + 3D'],
     line:['金描边','Gold outline','Viền vàng'], shade:['厚涂 + PBR 金属','Painterly with PBR metal','Sơn dày + kim loại PBR'],
     light:['权限光 + 神光','Authority light + divine light','Ánh quyền hạn + thần quang'], mat:['金属 + 能量 + 宝石','Metal + energy + gem','Kim loại + năng lượng + đá quý'],
     comp:['神性对称','Divine symmetry','Đối xứng thần tính'], pal:['金紫 + 权限色','Gold-purple + authority colours','Vàng tím + màu quyền hạn'], use:['管理员专属精灵与管理员皮肤','Admin-exclusive spirits and admin skins','Tinh linh và trang phục riêng quản trị']},
};
var SP_ART_ORDER = ['A','B','C','D','E','F','G','H'];
/* ---------- 类别 → 画派映射（category_art_mapping）：[主画派, 副画派, 材质, 说明] ---------- */
var SP_ART_CAT = {
  obj:['A','H',['wood','metal'],['东方器物用民俗','Oriental artifacts lean folk','Đồ vật phương Đông theo dân gian']],
  arch:['A','G',['stone','wood'],['结构用 3D','Structures in 3D','Kết cấu bằng 3D']],
  plant:['C','A',['wood','water'],['柔美','Soft and graceful','Mềm mại']],
  mineral:['G','A',['gem','stone'],['折射','Refraction','Khúc xạ']],
  elem:['B','E',['fire','energy'],['能量','Energy','Năng lượng']],
  time:['B','F',['metal','rune'],['抽象','Abstract','Trừu tượng']],
  mech:['G','A',['metal','code'],['工业','Industrial','Công nghiệp']],
  myth:['B','E',['gem','rune'],['神性','Divinity','Thần tính']],
  concept:['F','E',['dream','energy'],['抽象','Abstract','Trừu tượng']],
  text:['D','F',['rune','code'],['符号','Symbols','Ký hiệu']],
  light:['E','B',['light','dark'],['逆光','Backlight','Ngược sáng']],
  fest:['H','A',['cloth','light'],['喜庆','Festive','Hân hoan']],
  glitch:['D','E',['code','dark'],['故障','Glitch','Lỗi'], ['D','B']],
  food:['A','C',['cloth','water'],['可爱','Cute','Dễ thương']],
  music:['A','H',['wood','metal'],['韵律','Rhythm','Nhịp điệu']],
  weather:['C','E',['cloud','water'],['气象','Meteorology','Khí tượng']],
  astro:['B','G',['star','gem'],['宇宙','Cosmos','Vũ trụ']],
  emotion:['F','C',['light','cloud'],['情绪','Feelings','Cảm xúc']],
  dream:['E','C',['dream','star'],['梦幻','Dreamlike','Mộng ảo']],
  ocean:['C','G',['water','gem'],['水感','Water feel','Cảm giác nước']],
  insect:['G','A',['gem','leather'],['细节','Detail','Chi tiết']],
  flying:['C','E',['wind','cloth'],['羽风','Feather and wind','Lông vũ và gió']],
  reptile:['A','G',['leather','stone'],['鳞甲','Scales and armour','Vảy giáp']],
  micro:['D','F',['spore','energy'],['微观','Microscopic','Vi mô']],
  collab:['A','C',['cloth','light'],['按 IP 画派适配','Adapted per IP school','Thích ứng theo trường phái IP']],
  link:['D','G',['code','metal'],['数据','Data','Dữ liệu']],
  event:['H','A',['cloth','light'],['活动主题','Event theme','Chủ đề sự kiện']],
  lab:['A','G',['metal','gem'],['试验室器物','Lab gear','Dụng cụ phòng thí nghiệm']],
  trial:['G','A',['metal','energy'],['工业','Industrial','Công nghiệp']],
  ach:['G','B',['metal','gem'],['荣誉','Honour','Vinh dự']],
  adm:['X','G',['metal','energy','gem'],['金紫权限','Gold-purple authority','Quyền hạn vàng tím']],
  hidden:['E','F',['dark','rune'],['线索','Clues','Manh mối']],
};
var SP_ART_CAT_N = {trial:['试验系','Trial','Hệ thử nghiệm'], ach:['成就精灵','Achievement spirits','Tinh linh thành tựu'], adm:['管理员专属','Admin exclusive','Riêng quản trị'], hidden:['隐藏系','Hidden','Hệ ẩn']};
/* 元素 / 天气类按元素取材质 */
var SP_ART_FX_MAT = {flame:['fire','energy'], fire:['fire','energy'], water:['water','light'], wind:['wind','cloud'], thunder:['thunder','energy'], earth:['stone','gem'], ice:['ice','gem'], nature:['wood','water'], myth:['light','rune'], time:['metal','rune'], mech:['metal','code'], festival:['cloth','light'], code:['code','energy']};
/* ---------- 材质 → 画派（material_art_mapping） ---------- */
var SP_ART_MAT = {
  fire:['B',['火','Fire','Lửa'],['流动、笔触、非粒子','Flowing brushstrokes, not particles','Dòng chảy, nét cọ, không hạt']],
  ice:['G',['冰','Ice','Băng'],['折射、切面、非自发光','Refraction and facets, not glow','Khúc xạ, mặt cắt, không tự phát sáng']],
  light:['E',['光','Light','Ánh sáng'],['边缘光、逆光、非粒子','Rim light and backlight, not particles','Ánh viền, ngược sáng, không hạt']],
  dark:['E',['暗','Dark','Bóng tối'],['剪影、吞噬光','Silhouette that swallows light','Bóng đen nuốt ánh sáng']],
  thunder:['B',['雷','Thunder','Sấm'],['笔触、锐利','Sharp brushstrokes','Nét cọ sắc']],
  wind:['C',['风','Wind','Gió'],['晕染、流动','Flowing washes','Loang, chảy']],
  water:['C',['水','Water','Nước'],['水感、渗透','Wet, bleeding','Cảm giác nước, thấm']],
  wood:['H',['木','Wood','Gỗ'],['纹样、平面','Patterned, flat','Hoa văn, phẳng']],
  stone:['G',['石','Stone','Đá'],['颗粒、硬光','Grain and hard light','Hạt, ánh sáng cứng']],
  metal:['G',['金属','Metal','Kim loại'],['反射、高光','Reflections and highlights','Phản xạ, điểm sáng']],
  gem:['G',['宝石','Gem','Đá quý'],['折射、内部光','Refraction and inner light','Khúc xạ, ánh sáng bên trong']],
  cloth:['H',['布','Cloth','Vải'],['褶皱、纹样','Folds and patterns','Nếp gấp, hoa văn']],
  leather:['A',['皮','Leather','Da'],['色块、简化','Colour blocks, simplified','Mảng màu, giản lược']],
  energy:['F',['能量','Energy','Năng lượng'],['线条、几何','Lines and geometry','Đường nét, hình học']],
  code:['D',['代码','Code','Mã'],['像素、扫描线','Pixels and scanlines','Pixel, đường quét']],
  rune:['F',['符文','Rune','Phù văn'],['线条、几何','Lines and geometry','Đường nét, hình học']],
  spore:['D',['孢子','Spore','Bào tử'],['像素、点阵','Pixels, dot matrix','Pixel, ma trận điểm']],
  cloud:['C',['云','Cloud','Mây'],['晕染、柔边','Washes, soft edges','Loang, viền mềm']],
  star:['B',['星','Star','Sao'],['笔触、星云','Brushstrokes and nebulae','Nét cọ, tinh vân']],
  dream:['E',['梦','Dream','Mộng'],['剪影、梦幻','Silhouette, dreamy','Bóng, mộng ảo']],
};
/* ---------- 阶段画派迁移（stage_art_migration） ---------- */
var SP_ART_STAGE = {
  1:{line:['极简单线','Minimal single line','Một nét tối giản'], light:['无','None','Không'], mat:['无','None','Không'], comp:['留白','White space','Chừa trắng'], pal:['单色','One colour','Đơn sắc'], school:['线条极简派（像素主画派保持像素）','Line Minimal (pixel-main keeps Pixel)','Nét tối giản (chủ phái pixel giữ pixel)'], mats:0, prop:{sx:1.04, sy:.96, fs:1.05}},
  2:{line:['赛璐璐描边','Cel outline','Viền cel'], light:['硬光','Hard light','Ánh sáng cứng'], mat:['单材质','One material','Một chất liệu'], comp:['居中','Centred','Giữa khung'], pal:['双色','Two colours','Hai màu'], school:['赛璐璐平涂派（水彩 / 像素主画派提前进入主画派）','Cel Flat (watercolour / pixel mains enter early)','Cel (chủ phái màu nước / pixel vào sớm)'], mats:1, prop:{sx:1, sy:1, fs:1}},
  3:{line:['主画派线条','Main-school line','Nét chủ phái'], light:['主画派光影','Main-school light','Ánh sáng chủ phái'], mat:['双材质','Two materials','Hai chất liệu'], comp:['主画派构图','Main-school composition','Bố cục chủ phái'], pal:['三色','Three colours','Ba màu'], school:['主画派','Main school','Chủ phái'], mats:2, prop:{sx:.98, sy:1.05, fs:.96}},
  4:{line:['主画派 + 副画派','Main + secondary','Chủ + phụ'], light:['主画派 + 副画派','Main + secondary','Chủ + phụ'], mat:['多材质','Multiple materials','Nhiều chất liệu'], comp:['主画派 + 副画派','Main + secondary','Chủ + phụ'], pal:['多色','Multi-colour','Đa sắc'], school:['主画派 + 副画派','Main + secondary school','Chủ phái + phụ phái'], mats:3, prop:{sx:.97, sy:1.08, fs:.93}},
  5:{line:['副画派 + 专属','Secondary + exclusive','Phụ + riêng'], light:['副画派 + 领域光','Secondary + domain light','Phụ + ánh lĩnh vực'], mat:['最多两种材质 + 领域','At most two materials + domain','Tối đa hai chất liệu + lĩnh vực'], comp:['副画派 + 动态','Secondary + dynamic','Phụ + động'], pal:['多色 + 自发光','Multi-colour + emissive','Đa sắc + tự phát sáng'], school:['副画派 + 专属画派（形态质变）','Secondary + exclusive school (true transformation)','Phụ phái + phái riêng (biến đổi chất)'], mats:3, prop:{sx:.96, sy:1.11, fs:.9}},
};
/* ---------- 光影 / 构图 / 线条 / 配色 → 画派（lighting / composition / line / palette mapping） ---------- */
var SP_ART_LIGHTMAP = {A:[['硬光','Hard light','Ánh sáng cứng'],['硬阴影、清晰','Hard shadows, crisp','Bóng cứng, rõ'],['器物、建筑','Artifacts, architecture','Đồ vật, kiến trúc']], C:[['柔光','Soft light','Ánh sáng mềm'],['无硬阴影','No hard shadows','Không bóng cứng'],['植物、天气','Plants, weather','Thực vật, thời tiết']], E:[['逆光','Backlight','Ngược sáng'],['边缘光','Rim light','Ánh viền'],['光影、隐藏','Light & shadow, hidden','Quang ảnh, ẩn']], G:[['环境光','Ambient light','Ánh sáng môi trường'],['反射、环境','Reflections, environment','Phản xạ, môi trường'],['机械、矿物','Mech, minerals','Cơ khí, khoáng vật']], B:[['神光','Divine light','Thần quang'],['顶光、神性','Top light, divinity','Sáng đỉnh, thần tính'],['神话、星体','Mythic, celestial','Thần thoại, thiên thể']], D:[['扫描线','Scanlines','Đường quét'],['扫描线、抖动','Scanlines, dithering','Đường quét, dithering'],['故障、文字','Glitch, script','Lỗi, văn tự']], F:[['无光','No light','Không sáng'],['无光影','No lighting','Không ánh sáng'],['概念、情绪','Concepts, emotions','Khái niệm, cảm xúc']], H:[['平面光','Flat light','Ánh sáng phẳng'],['无立体','No volume','Không khối'],['节日、文化','Festivals, culture','Lễ hội, văn hóa']]};
/* ---------- 联名画派适配（collab_art_adapter）：只换画派 / 配色 / 材质 / 装饰 / 特效；全部原创，不复刻角色 ---------- */
var SP_ART_COLLAB = {
  darkcute:{s:['A','E'], n:['暗黑可爱风','Dark-cute','Dễ thương u tối'], d:['圆润线条 + 紫黑','Rounded lines + purple-black','Nét tròn + tím đen'], pal:['#6d28d9','#111827','#f9a8d4'], deco:'bow', fx:'myth'},
  sweet:{s:['C','A'], n:['甜梦风','Sweet dream','Giấc mơ ngọt'], d:['柔边 + 粉白','Soft edges + pink-white','Viền mềm + hồng trắng'], pal:['#f9a8d4','#fde68a','#ffffff'], deco:'heart', fx:'festival'},
  starwish:{s:['B','E'], n:['华丽美少女风','Glamorous magical girl','Thiếu nữ lộng lẫy'], d:['星月光影','Star-and-moon lighting','Ánh sao trăng'], pal:['#f472b6','#fbbf24','#e0e7ff'], deco:'star', fx:'myth'},
  zodiac:{s:['G','B'], n:['星座铠甲风','Constellation armour','Giáp chòm sao'], d:['铠甲金属','Armoured metal','Kim loại giáp'], pal:['#fbbf24','#1e3a8a','#fef3c7'], deco:'star', fx:'myth'},
  detective:{s:['A','F'], n:['冷色推理风','Cool-toned mystery','Trinh thám tông lạnh'], d:['推理冷色','Cool mystery tones','Tông lạnh suy luận'], pal:['#1e3a8a','#dc2626','#f8fafc'], deco:'bowtie', fx:'time'},
  gadget:{s:['A','G'], n:['圆润未来道具风','Round future-gadget','Bảo bối tương lai tròn trịa'], d:['蓝白','Blue and white','Xanh trắng'], pal:['#0ea5e9','#ef4444','#ffffff'], deco:'bell', fx:'mech'},
  magic:{s:['H','B'], n:['华丽魔法牌风','Ornate card magic','Phép thẻ bài lộng lẫy'], d:['魔法牌纹样','Magic-card motifs','Hoa văn thẻ phép'], pal:['#ec4899','#facc15','#fff1f2'], deco:'card', fx:'festival'},
  mecha:{s:['G','A'], n:['机甲合体风','Combining mecha','Cơ giáp hợp thể'], d:['金属合体','Metal combination','Hợp thể kim loại'], pal:['#f8fafc','#2563eb','#dc2626'], deco:'vfin', fx:'mech'},
  hero:{s:['G','B'], n:['英雄小队风','Hero squad','Biệt đội anh hùng'], d:['金属光','Metallic light','Ánh kim loại'], pal:['#dc2626','#1d4ed8','#fbbf24'], deco:'emblem', fx:'mech'},
  toy:{s:['A','G'], n:['潮玩收藏风','Designer toy','Đồ chơi sưu tầm'], d:['圆润','Rounded','Tròn trịa'], pal:['#a8a29e','#f472b6','#fafaf9'], deco:'stitch', fx:'festival'},
  fighter:{s:['B','E'], n:['武道气功风','Martial energy','Võ đạo khí công'], d:['能量光','Energy light','Ánh năng lượng'], pal:['#f97316','#1d4ed8','#fde68a'], deco:'spark', fx:'thunder'},
  daily:{s:['F','A'], n:['蜡笔简笔风','Crayon doodle','Bút sáp nét đơn'], d:['极简','Minimal','Tối giản'], pal:['#ef4444','#facc15','#fff7ed'], deco:'doodle', fx:'festival'},
  chase:{s:['A','F'], n:['动感追逐风','Dynamic chase','Rượt đuổi năng động'], d:['猫鼠动感','Cat-and-mouse energy','Năng động mèo chuột'], pal:['#94a3b8','#f59e0b','#ffffff'], deco:'swoosh', fx:'wind'},
  inventor:{s:['F','G'], n:['几何发明风','Geometric inventor','Nhà phát minh hình học'], d:['几何发明','Geometric invention','Phát minh hình học'], pal:['#22c55e','#f97316','#fefce8'], deco:'gear', fx:'mech'},
  fairy:{s:['B','C'], n:['华丽魔法童话风','Ornate fairy-tale magic','Cổ tích phép thuật lộng lẫy'], d:['华丽魔法','Ornate magic','Phép thuật lộng lẫy'], pal:['#60a5fa','#fbbf24','#fdf4ff'], deco:'sparkle', fx:'myth'},
  caper:{s:['A','F'], n:['圆润卡通风','Round cartoon caper','Hoạt hình tròn trịa'], d:['圆润喜剧','Rounded comedy','Hài tròn trịa'], pal:['#9ca3af','#f97316','#ffffff'], deco:'note', fx:'festival'},
  boe:{s:['D','G'], n:['车载显示屏像素风','Car-display pixel','Pixel màn hình ô tô'], d:['显示屏','Display panels','Màn hình'], pal:['#0ea5e9','#1e293b','#e0f2fe'], deco:'pixel', fx:'code'},
  place:{s:['C','A'], n:['南部港口水彩风','Southern-port watercolour','Màu nước cảng phía Nam'], d:['港口暖光','Warm harbour light','Ánh cảng ấm'], pal:['#f59e0b','#0ea5e9','#fff7ed'], deco:'wave', fx:'water'},
  vnfood:{s:['A','C'], n:['越南美食暖色风','Warm Vietnamese food','Ẩm thực Việt tông ấm'], d:['食物暖色','Warm food tones','Tông ấm món ăn'], pal:['#16a34a','#f59e0b','#fffbeb'], deco:'steam', fx:'festival'},
  vnculture:{s:['H','C'], n:['越南文化民俗风','Vietnamese folk culture','Dân gian văn hóa Việt'], d:['纹样对称','Symmetric motifs','Hoa văn đối xứng'], pal:['#dc2626','#facc15','#fff7ed'], deco:'lotus', fx:'festival'},
};
var SP_ART_COLLAB_BY = {'Gothic Cutie':'darkcute','Sweet Dreamer':'sweet','Star Wish Girl':'starwish','Star Sailor':'starwish','Moon Mirror':'starwish','Star Dream':'starwish','Magical Girl':'starwish','Card Magic':'magic','Zodiac Armour':'zodiac','Detective':'detective','Gadget Box':'gadget','Mecha Pilot':'mecha','Hero Squad':'hero','Designer Toy':'toy','Energy Fighter':'fighter','Slice of Life':'daily','Chase Comedy':'chase','Inventor':'inventor','Fairy Castle':'fairy','Cartoon Caper':'caper'};
/* ---------- 管理员专属画派（admin_art_school） ---------- */
var SP_ART_ADMIN = {school:'X', pal:['#6d28d9','#fbbf24','#fde68a'], line:'#8a5a00', mats:['metal','energy','gem'], pattern:['权限纹样（身上的金色纹带，非脚下光圈）','Authority pattern (a gold band on the body, never a ground ring)','Hoa văn quyền hạn (dải vàng trên thân, không phải vòng dưới chân)'], emblem:['管理员徽记（LV3 起）','Admin emblem (from LV3)','Huy hiệu quản trị (từ LV3)']};
/* ---------- 皮肤画派（skin_art_school） ---------- */
var SP_ART_SKIN = {
  common:[['同画派换色','Same school, new colours','Cùng phái, đổi màu'],['颜色 / 配饰','Colours / accessories','Màu / phụ kiện'],['col','head','hair','eyes','mouth'],1],
  rare:[['同画派换装','Same school, new outfit','Cùng phái, đổi trang phục'],['服装 / 动作','Outfit / motion','Trang phục / động tác'],['outfit','act','pat'],2],
  epic:[['主画派 → 副画派','Main → secondary school','Chủ phái → phụ phái'],['建模 / 特效','Model / effects','Mô hình / hiệu ứng'],['mat','extra','fx'],3],
  legend:[['主画派 → 副画派 + 专属','Main → secondary + exclusive','Chủ → phụ + riêng'],['完整重做','Full redesign','Làm lại hoàn toàn'],['outfit','head','held','mat','extra'],5],
  limited:[['专属画派（剪影纪念）','Exclusive school (commemorative silhouette)','Phái riêng (bóng kỷ niệm)'],['主题化','Themed','Theo chủ đề'],['outfit','head'],3],
  festival:[['专属画派（民俗节庆）','Exclusive school (folk festive)','Phái riêng (lễ hội dân gian)'],['主题化','Themed','Theo chủ đề'],['outfit','head','held'],3],
  collab:[['IP 画派','IP school','Phái IP'],['IP 适配','IP adaptation','Thích ứng IP'],['outfit','head'],3],
  admin:[['权限画派','Authority school','Phái quyền hạn'],['金紫权限','Gold-purple authority','Quyền hạn vàng tím'],['outfit','head'],3],
};
/* ---------- 九大觉醒体画派（awaken_art_school） ---------- */
var SP_ART_REF = {
  tv_hto_phoenix:{l2:'A', l3:'B', l4:['B'], l5:['E','B'], bd:'sun', d:['日轮逆光','Sun-disc backlight','Ngược sáng vầng nhật']},
  tv_hto_dragon:{l2:'A', l3:'A', l4:['B'], l5:['G','B'], bd:'ridge', d:['龙脉 3D 山体','3D dragon-vein ridge','Núi long mạch 3D']},
  tv_lto_tortoise:{l2:'A', l3:'G', l4:['G'], l5:['H','G'], bd:'palace', d:['冰宫纹样','Ice-palace motifs','Hoa văn cung băng']},
  tv_lto_wolf:{l2:'A', l3:'B', l4:['B'], l5:['E','B'], bd:'moons', d:['双月逆光','Twin-moon backlight','Ngược sáng song nguyệt']},
  tv_opst_whale:{l2:'C', l3:'C', l4:['C'], l5:['E','C'], bd:'fall', d:['鲸落逆光','Whale-fall backlight','Ngược sáng cá voi rơi']},
  tv_tst_lion:{l2:'A', l3:'B', l4:['B'], l5:['G','B'], bd:'throne', d:['王座 3D','3D throne','Ngai vàng 3D']},
  tv_tpc_snake:{l2:'A', l3:'F', l4:['F'], l5:['E','F'], bd:'loop', d:['时间循环剪影','Time-loop silhouette','Bóng vòng lặp thời gian']},
  tv_cth_butterfly:{l2:'C', l3:'C', l4:['C'], l5:['E','C'], bd:'swarm', d:['蝶群逆光','Backlit butterfly swarm','Bầy bướm ngược sáng']},
  tv_cus_alien:{l2:'D', l3:'D', l4:['D','G'], l5:['G','D'], bd:'ship', d:['星舰 3D','3D starship','Phi thuyền 3D']},
};
/* ---------- 稀有度点缀色 ---------- */
var SP_ART_RAR = {N:null, R:['#60a5fa'], SR:['#a78bfa','#f0abfc'], SSR:['#fde68a','#94a3b8'], UR:['#fb7185','#fbbf24'], EX:['#fbbf24','#b45309'], FD:['#ef4444','#fbbf24'], HD:['#22d3ee','#a78bfa'], CL:['#38bdf8','#f472b6'], AD:['#fbbf24','#7c3aed']};
var SP_ART_RAR_N = {N:['无点缀','No accent','Không điểm nhấn'], R:['单色点缀','Single accent','Một điểm nhấn'], SR:['双色点缀','Two-colour accent','Hai màu nhấn'], SSR:['金属点缀','Metal accent','Nhấn kim loại'], UR:['自发光点缀','Emissive accent','Nhấn tự phát sáng'], EX:['金边','Gold edge','Viền vàng'], FD:['节日主题色','Festival colours','Màu lễ hội'], HD:['特殊光','Special light','Ánh sáng đặc biệt'], CL:['联名主题色','Collab colours','Màu hợp tác'], AD:['金紫','Gold-purple','Vàng tím']};
/* ---------- 全局开关（art_school_* 配置） ---------- */
var SP_ART_FLAGS = [
  ['on','art_schools',['多画派并行渲染','Multi-school rendering','Kết xuất đa trường phái'],0],
  ['catMap','art_school_category_mapping',['类别 → 画派映射','Category → school mapping','Ánh xạ hệ → phái'],0],
  ['stageMig','art_school_stage_migration',['阶段画派迁移','Stage school migration','Chuyển phái theo giai đoạn'],0],
  ['matDiff','art_school_material_diff',['材质差异化','Material differentiation','Khác biệt chất liệu'],0],
  ['lightDiff','art_school_lighting_diff',['光影差异化','Lighting differentiation','Khác biệt ánh sáng'],0],
  ['compDiff','art_school_composition_diff',['构图差异化','Composition differentiation','Khác biệt bố cục'],0],
  ['lineDiff','art_school_line_diff',['线条差异化','Line differentiation','Khác biệt đường nét'],0],
  ['palDiff','art_school_palette_diff',['配色差异化','Palette differentiation','Khác biệt phối màu'],0],
  ['collab','art_school_collab_adapter',['联名换画派','Collabs switch school','Hợp tác đổi phái'],0],
  ['admin','art_school_admin_exclusive',['管理员专属画派','Admin-exclusive school','Phái riêng quản trị'],0],
  ['skin','art_school_skin_change',['皮肤换画派','Skins switch school','Trang phục đổi phái'],0],
  ['awaken','art_school_awaken_diff',['九大觉醒体画派差异化','Nine awakenings use distinct schools','Chín thể thức tỉnh khác phái'],0],
  ['rarAccent','art_rarity_accent',['稀有度点缀色','Rarity accent colours','Màu nhấn theo độ hiếm'],0],
  ['darkAdj','art_dark_mode_adjust',['深色模式降亮度、提对比','Dark mode: lower brightness, higher contrast','Chế độ tối: giảm sáng, tăng tương phản'],0],
  ['preferAssets','art_prefer_assets',['有 PNG 资源时优先使用（热更新）','Prefer PNG assets when present (hot update)','Ưu tiên ảnh PNG khi có (cập nhật nóng)'],0],
  ['noGround','art_school_no_ground_aura',['无脚下光圈','No ground aura','Không vòng sáng dưới chân'],1],
  ['lv45','art_school_lv4_lv5_diff',['LV4 / LV5 形态质变','LV4 / LV5 true transformation','LV4 / LV5 biến đổi chất'],1],
  ['noOcc','art_no_occlusion',['不遮挡脸 / 核心 / 剪影','Never cover face / core / silhouette','Không che mặt / lõi / dáng'],1],
];
function spArtDefaults(){ const f = {}; SP_ART_FLAGS.forEach(([k])=>f[k] = true); return {flags:f, cat:{}, collab:{}, assets:{ver:1, base:'assets/spirits', list:{}, scanned:''}, anim:{fps:24, mobile:'low', particles:true}}; }
function spArtCfg(){ const d = spArtDefaults(), c = (typeof gCfg==='function' && gCfg().artCfg) || {}; const o = {...d, ...c, flags:{...d.flags, ...(c.flags||{})}, assets:{...d.assets, ...(c.assets||{})}, anim:{...d.anim, ...(c.anim||{})}};
  SP_ART_FLAGS.forEach(([k,,,lock])=>{ if(lock) o.flags[k] = true; }); return o; }
/* ---------- 颜色工具 ---------- */
function spRgbOf(h){ const m = /^#?([0-9a-f]{6})$/i.exec(String(h||'')); if(!m) return [148,163,184]; const n = parseInt(m[1],16); return [n>>16,(n>>8)&255,n&255]; }
function spHexOf(r,g,b){ return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function spMixC(a, b, t){ const A = spRgbOf(a), B = spRgbOf(b); return spHexOf(...A.map((v,i)=>v+(B[i]-v)*t)); }
function spSatC(h, f){ const [r,g,b] = spRgbOf(h), l = r*.299+g*.587+b*.114; return spHexOf(l+(r-l)*f, l+(g-l)*f, l+(b-l)*f); }
function spNearC(h, pal){ const A = spRgbOf(h); let best = pal[0], bd = 1e12; pal.forEach(p=>{ const B = spRgbOf(p), d = (A[0]-B[0])**2*.3+(A[1]-B[1])**2*.59+(A[2]-B[2])**2*.11; if(d<bd){ bd = d; best = p; } }); return best; }
var SP_ART_PX16 = ['#1c1b2e','#4a2a5e','#b8384f','#f07a4a','#ffd166','#9be564','#2fa865','#22707a','#283a7a','#3d63d0','#4fb3f6','#8cf1f2','#f5f5f0','#9fb3c4','#5a6b85','#353d58'];
var SP_ART_FOLK = ['#c0392b','#e2a72e','#0f766e','#1e3a8a','#fdf3dc','#3f7d3a','#7a1f2b','#f2c14e','#e85d75','#2b6cb0'];
/* ---------- 画派解析：类别 → 主 / 副画派；阶段迁移；觉醒体 / 管理员 / 联名 / 皮肤覆写 ---------- */
function spArtCatKey(def){ if(!def) return 'obj'; if(def.admin || def.cat==='adm') return 'adm'; if(def.hidden && !SP_ART_CAT[def.cat]) return 'hidden'; return SP_ART_CAT[def.cat] ? def.cat : (def.ach ? 'ach' : 'obj'); }
function spArtCollabOf(def){ const C = spArtCfg(); if(C.collab?.[def.id] && SP_ART_COLLAB[C.collab[def.id]]) return C.collab[def.id];
  const en = Array.isArray(def.name) ? def.name[1] : (def.en || ''); if(SP_ART_COLLAB_BY[en]) return SP_ART_COLLAB_BY[en];
  const lv = Array.isArray(def.forms) ? (def.forms[2]?.[1] || '') : ''; for(const k in SP_ART_COLLAB_BY) if(String(def.id).includes(k.toLowerCase().replace(/[^a-z]+/g,'_'))) return SP_ART_COLLAB_BY[k];
  return SP_ART_COLLAB[def.sub] ? def.sub : (def.sub==='acg' ? 'starwish' : def.sub==='ip' ? 'toy' : 'vnfood'); }
function spArtCatMap(def){ const C = spArtCfg(), ck = spArtCatKey(def), base = SP_ART_CAT[ck] || SP_ART_CAT.obj, ov = C.cat?.[ck] || {};
  let main = ov.main || base[0], sub = ov.sub || base[1], mats = base[2], l5 = base[4] || null, ad = null;
  if(!C.flags.catMap){ main = 'A'; sub = 'G'; }
  if(ck==='collab' && C.flags.collab){ ad = spArtCollabOf(def); const A = SP_ART_COLLAB[ad]; if(A){ main = ov.main || A.s[0]; sub = ov.sub || A.s[1]; } }
  if(ck==='adm' && !C.flags.admin){ main = 'B'; sub = 'G'; }
  if(def.hidden && ck!=='adm' && ck!=='hidden'){ sub = 'E'; }
  if((ck==='elem' || ck==='weather') && SP_ART_FX_MAT[def.fx]) mats = SP_ART_FX_MAT[def.fx];
  return {ck, main, sub, mats, l5, ad};
}
/* 返回 {p:主渲染画派, s:叠加画派, ex:专属（领域光 / 觉醒背景）} */
function spArtSchoolsAt(def, st, opts={}){
  const C = spArtCfg(), M = spArtCatMap(def), R = C.flags.awaken ? SP_ART_REF[def.id] : null;
  if(opts.school && SP_ART_SCHOOLS[opts.school]) return {p:opts.school, s:opts.school2 || null, ex:!!opts.ex || st>=5, M};
  let r;
  if(!C.flags.stageMig) r = {p:M.main, s:st>=4 ? M.sub : null, ex:st>=5};
  else if(M.ck==='adm' && C.flags.admin) r = st===1 ? {p:'F'} : st===2 ? {p:'A'} : st===3 ? {p:'X'} : st===4 ? {p:'X', s:'G'} : {p:'X', s:'B', ex:true};
  else if(st===1) r = {p:R?.l1 || (M.main==='D' ? 'D' : 'F')};
  else if(st===2) r = {p:R?.l2 || (['C','D'].includes(M.main) ? M.main : 'A')};
  else if(st===3) r = {p:R?.l3 || M.main};
  else if(st===4) r = R ? {p:R.l4[0], s:R.l4[1]||M.sub} : {p:M.main, s:M.sub};
  else r = R ? {p:R.l5[0], s:R.l5[1]||null, ex:true} : M.l5 ? {p:M.l5[0], s:M.l5[1], ex:true} : {p:M.sub, s:M.main===M.sub ? null : M.main, ex:true};
  /* 皮肤换画派 */
  const tier = opts.skinTier;
  if(tier && C.flags.skin && st>=2){
    if(tier==='epic') r = {p:M.sub, s:r.p===M.sub ? M.main : r.p, ex:r.ex};
    else if(tier==='legend') r = {p:M.sub, s:M.main, ex:true};
    else if(tier==='limited') r = {p:'E', s:M.main, ex:true};
    else if(tier==='festival') r = {p:'H', s:M.main, ex:st>=4};
    else if(tier==='collab'){ const A = SP_ART_COLLAB[opts.skinAd] || SP_ART_COLLAB.toy; r = {p:A.s[0], s:A.s[1], ex:st>=5}; }
    else if(tier==='admin') r = {p:'X', s:'G', ex:st>=4};
  }
  r.s = r.s===r.p ? null : (r.s || null); r.ex = !!r.ex; r.M = M; return r;
}
/* ---------- 每个画派的配色 / 线条 / 构图 ---------- */
function spArtPalette(P, c, ac, belly, M, st){
  switch(P){
    case 'A': return [spSatC(c,1.18), spSatC(ac,1.15), belly];
    case 'B': return [spSatC(spMixC(c,'#64748b',.06),.82), spSatC(ac,.85), spMixC(belly, c, .25)];
    case 'C': return [spMixC(c,'#ffffff',.2), spMixC(ac,'#ffffff',.15), spMixC(belly,'#ffffff',.3)];
    case 'D': return [spNearC(c, SP_ART_PX16), spNearC(ac, SP_ART_PX16), spNearC(belly, SP_ART_PX16)];
    case 'E': return [spMixC(spShade(c,-.62),'#1e1b4b',.5), spMixC(spShade(ac,-.45),'#1e1b4b',.4), spMixC(spShade(c,-.5),'#1e1b4b',.45)];
    case 'F': return st>=5 ? [spMixC(c,'#ffffff',.55), spMixC(ac,'#ffffff',.25), '#ffffff'] : [spMixC(c,'#ffffff',.9), spMixC(ac,'#ffffff',.72), '#ffffff'];
    case 'G': return [spSatC(c,.95), ac, spMixC(belly,'#ffffff',.2)];
    case 'H': return [spMixC(c, spNearC(c, SP_ART_FOLK), .55), spNearC(ac, SP_ART_FOLK), '#fdf3dc'];
    case 'X': return [spMixC(c,'#6d28d9',.38), '#fbbf24', spMixC(belly,'#fde68a',.45)];
  }
  return [c, ac, belly];
}
var SP_ART_LINE_W = {A:1.45, B:.4, C:.55, D:1, E:.45, F:.6, G:.3, H:1.85, X:1.1};
function spArtLineCol(P, c0, c){
  switch(P){ case 'A': return spShade(c,-.6); case 'B': return spShade(c,-.22); case 'C': return spMixC(spShade(c0,-.35), c, .35); case 'D': return '#1c1b2e';
    case 'E': return spShade(c,-.55); case 'F': return spShade(c0,-.38); case 'G': return spShade(c,-.28); case 'H': return '#3b1d14'; case 'X': return '#8a5a00'; }
  return spShade(c0,-.42);
}
function spArtComp(P, st){ switch(P){ case 'B': return 'rotate(-4 24 32) translate(.6 0)'; case 'C': return 'translate(24 32) scale(.93) translate(-24 -32)'; case 'F': return 'translate(24 32) scale(.9) translate(-24 -32)';
  case 'G': return 'translate(24 32) skewY(-2.5) scale(.97 1) translate(-24 -32)'; } return ''; }
/* ---------- 画派总入口：spiritSvg 调用 ---------- */
function spArtOf(def, st, opts={}){
  if(opts.noArt) return null; let C; try{ C = spArtCfg(); }catch(_e){ return null; } if(!C.flags.on) return null;
  const S = spArtSchoolsAt(def, st, opts), rar = opts.rar || def.rar || 'N', size = +opts.size || 48;
  const lod = size<=40 ? 0 : size<=80 ? 1 : 2;
  const M = typeof spModelOf==='function' ? spModelOf(def, st, opts) : null;
  const nM = [0, 0, 2, 3, 4, 5][st], pool = [...(typeof spModelTexList==='function' ? spModelTexList(M) : []), ...(S.M.mats||[])].filter((v,i,a)=>a.indexOf(v)===i);
  const mats = C.flags.matDiff ? pool.slice(0, lod===0 ? Math.min(1, nM) : lod===1 ? Math.min(3, nM) : nM) : [];
  let domLight = null; if(st>=5){ mats.splice(2); if(C.flags.matDiff && lod) domLight = S.p==='E' ? 'dark' : 'light'; }   /* v2.5 LV5：身体最多两种材质；领域光属于领域，不计入材质 */
  return {S, M, p:S.p, domLight, s:lod ? S.s : null, ex:S.ex, rar, lod, st, C, mats, ad:S.M.ad, admin:S.M.ck==='adm', ref:C.flags.awaken ? SP_ART_REF[def.id] : null, prop:C.flags.stageMig ? SP_ART_STAGE[st].prop : {sx:1,sy:1,fs:1}};
}
function spArtColors(A, c0, ac0, b0){
  const C = A.C; let [c, ac, belly] = C.flags.palDiff || ['E','F'].includes(A.p) ? spArtPalette(A.p, c0, ac0, b0, A.S.M, A.st) : [c0, ac0, b0];
  if(A.st===1 && C.flags.palDiff && A.p!=='D'){ ac = spMixC(ac, c, .6); belly = A.p==='F' ? '#ffffff' : spMixC(belly, c, .5); }
  else if(A.st===2 && C.flags.palDiff){ ac = spMixC(ac, c, .35); }
  if(A.ad && C.flags.palDiff && !['E','F'].includes(A.p)){ const P = SP_ART_COLLAB[A.ad].pal; c = spMixC(c, P[0], .22); ac = spMixC(ac, P[1], .35); }
  const dk = C.flags.lineDiff || ['E','F'].includes(A.p) ? spArtLineCol(A.p, c0, c) : spShade(c0,-.42);
  return {c, ac, belly, dk, ink:A.p==='E' ? '#f8fafc' : null, rimC:spMixC(spSatC(c0,1.3),'#ffffff',.42)};
}
function spArtLine(s, A){
  if(!s) return s; const C = A.C; const w = C.flags.lineDiff || ['E','F'].includes(A.p) ? (SP_ART_LINE_W[A.p]||1) : 1;
  let o = s.replace(/stroke-width="([\d.]+)"/g, (m,v)=>`stroke-width="${spF(+v*w)}"`);
  if(A.p==='D') o = o.replace(/stroke-linejoin="round"/g, 'stroke-linejoin="miter"');
  return o;
}
