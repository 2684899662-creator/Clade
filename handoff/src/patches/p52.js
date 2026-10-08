/* v3.0 全量元素表（365 只；5 只示例用手写元素表 SP_KIT）
   id | 本体 | 部件A=图元@挂点 | 部件B=图元@挂点 | 伙伴（= LV1 破口元素）=图元 | 核心徽记=图元 | 主色,强调色,浅色 | 选项 */
var SP_KIT_SRC = `
sp_obj_book|书页:book|书签:bookmark=bookmark@top|墨滴:ink drop=inkDrop@hold|书页:page=page|书脊印:spine seal=stamp|#c9773b,#e8463c,#fff4dc|pat=paper
sp_obj_teapot|茶壶:teapot|蒸汽:steam=steam@top|茶杯:teacup=teacup@hold|茶叶:tea leaf=teaLeaf|茶珠:tea pearl=pearl|#2fb5a2,#e8a33c,#f6f0d8
sp_obj_compass|罗盘:compass|方位针:needle=compassNeedle@hold|航线:route=thread@tail|星位:star point=sparkle|方位盘:bearing dial=cipherWheel|#d8553a,#f2c14e,#fff3dc|pat=ring
sp_obj_mirror|镜面:mirror|镜片:mirror shards=mirrorShard@orb|光斑:light spot=lightSpot@hold|镜影:reflection=mirrorPane|镜心:mirror core=diamond|#7fb8e6,#c9a24a,#f2fbff|pat=facet
sp_obj_key|钥匙:key|锁:lock=lock@hold|钥匙圈:key ring=chain@tail|小钥匙:little key=key|锁芯:lock core=cipherWheel|#e0b030,#7a4b2a,#fff3c4
sp_obj_brush|画笔:brush|颜料:paint=paintDab@hold|墨滴:ink drop=inkDrop@tail|笔锋:brush tip=brushTip|彩墨珠:ink pearl=pearl|#3b6fd8,#e8463c,#fff4e0
sp_obj_umbrella|伞:umbrella|雨丝:rain=rain@LR|水洼:puddle=wave@tail|雨滴:raindrop=drop|伞骨:umbrella ribs=wheel|#d8473b,#3fa8e8,#fff1e6|pat=stripe
sp_obj_scissors|剪刀:scissors|剪纸花:paper-cut flower=sakura@hold|缎带:ribbon=ribbon@tail|纸屑:paper bits=errorShard|剪纹:cut pattern=kaleido|#e8463c,#c9d2dc,#fff4e6
sp_obj_sand_glass|沙漏:sand-glass|沙堆:sand pile=sand@base|玻璃光:glass glint=mirrorShard@hold|小沙漏:little sand-glass=hourglass|时砂:time sand=amber|#c9a24a,#3b7fd8,#fff4d0
sp_obj_mask|面具:mask|缎带:ribbon=ribbon@LR|流苏:tassel=tassel@tail|亮片:sequin=sparkle|宝石:gem=gem|#7a3bd8,#f2c14e,#fff0f6
sp_obj_wind_chime|铃:bell|风铃管:chime tubes=chimeTube@base|风:wind=swirl@hold|音符:note=note|铃心:clapper=pearl|#3fb8d8,#f2c14e,#effcff
sp_obj_kite|纸鸢:kite|风筝尾:kite tail=kiteTail@tail|风筝线:kite string=thread@base|云:cloud=cloud|蝴蝶结:bow=bow|#e8463c,#3fa8e8,#fff4dc
sp_obj_seal|印章:seal|印泥:ink paste=paintDab@hold|卷轴:scroll=scroll@base|印纹:seal mark=stamp|玉印:jade seal=jadeDisc|#c0392b,#e8c56a,#fff2e0
sp_obj_abacus|算盘:abacus|算珠串:bead row=abacusRow@hold|铜钱:coin=coin@orb|算珠:bead=bead|金锭:gold ingot=ingot|#8a5a2b,#e8b030,#fff1d6|pat=grain
sp_arch_tower|塔:tower|旗幡:banner=flag@top|云:cloud=cloud@base|檐铃:eave bell=bell|塔珠:tower pearl=pearl|#c9773b,#3b6fd8,#fff1dc|pat=brick
sp_arch_bridge|桥:bridge|流水:stream=wave@tail|栏柱:pillar=pillar@LR|卵石:pebble=pebble|拱心石:keystone=archMini|#8a96a8,#3fa8e8,#f0f4f8
sp_arch_gate|门:gate|门环:door knocker=jadeDisc@belly|钥匙:key=key@hold|锁:lock=lock|门钉:door stud=button|#c0392b,#e8b030,#fff0dc
sp_arch_clock_tower|钟楼:clock tower|钟摆:pendulum=pendulum@base|钟:bell=bell@top|齿轮:gear=gearMini|钟面:clock face=dial|#8a5a2b,#e8b030,#fff4dc
sp_arch_pavilion|亭:pavilion|灯笼:lanterns=lanternSeg@LR|荷叶:lotus leaf=lotusPad@base|竹叶:bamboo leaf=bambooLeaf|亭心珠:pavilion pearl=pearl|#2f9e6a,#d84a3b,#fff4dc
sp_arch_rampart|城墙:rampart|旗帜:banner=flag@top|砖块:brick=brick@hold|石块:stone=rock|城盾:wall shield=shieldMini|#a08a6a,#d8473b,#f4ecdc|pat=brick
sp_arch_window|窗:window|窗花:window flowers=blossom@base|光斑:light spots=lightSpot@orb|樱花瓣:petal=sakura|晨光:morning sun=sunDisc|#3b8fd8,#f2c14e,#effaff
sp_arch_stairway|台阶:stairway|石灯:stone lamps=lampPost@LR|苔:moss=moss@base|石子:pebble=pebble|阶石:step stone=step|#9a8a7a,#5fbf4a,#f4f0e8
sp_arch_eaves|屋檐:eaves|风铃:chimes=chimeTube@LR|檐雨:eave rain=rain@base|瓦片:roof tile=roofTile|檐铃:eave bell=bell|#3b4f8a,#e8b030,#eef2fa
sp_arch_courtyard|假山:garden rock|松针:pine needles=pineNeedle@top|池水:pond=wave@tail|圆叶:round leaf=leafR|月门:moon gate=archMini|#7a8a9a,#3fae6a,#eef4f0
sp_arch_archway|牌坊:archway|中国结:knots=knot@LR|石阶:steps=step@base|祥云:auspicious cloud=cloud|匾印:plaque seal=stamp|#c0392b,#e8b030,#fff1e0
sp_arch_lamp_stand|灯架:lamp stand|光斑:light spots=lightSpot@orb|藤蔓:vine=vine@base|萤光:glow=glow|灯泡:bulb=bulb|#2f3f5a,#f2c14e,#fff6d0
sp_plant_vine|藤:vine|卷须:tendrils=vine@LR|花苞:bud=bud@top|圆叶:round leaf=leafR|嫩芽:sprout=sprout|#2fae4a,#e86a8a,#f0ffe0|pat=vein
sp_moss|苔:moss|苔团:moss tuft=moss@base|孢子:spores=spore@orb|露珠:dewdrop=drop|苔石:moss stone=pebble|#4d8a1a,#9be05a,#effbd6|pat=spot
sp_flower|花:flower|叶片:leaves=leaf@LR|花苞:bud=bud@hold|花瓣:petal=petal|花心:flower heart=blossom|#ff6fae,#3fbf5a,#ffd84a
sp_plant_fruit|果实:fruit|叶片:leaf=leafR@top|浆果:berries=berry@hold|种子:seed=seed|樱桃:cherry=cherry|#e8463c,#3fae4a,#ffe6c9
sp_sprout|种子:seed|嫩芽:sprout=sprout@top|根须:roots=root@base|种子:seed=seed|四叶草:clover=clover|#9a6a3a,#5fd35a,#f4ffe0
sp_tree|树:tree|果子:fruit=fruit@orb|根须:roots=root@base|叶片:leaf=leaf|年轮:tree rings=agate|#4a9a2a,#8a5a2b,#e8ffd0
sp_mush|蘑菇:mushroom|孢子:spores=spore@orb|菌丝:hyphae=hypha@base|小菌盖:little cap=mushcap|菌石:mushroom stone=pebble|#e8463c,#fff4d6,#ffffff
sp_plant_bamboo|竹:bamboo|竹叶:bamboo leaves=bambooLeaf@top|竹节:bamboo node=bambooNode@hold|嫩芽:shoot=sprout|竹玉:bamboo jade=jadeDisc|#3fae4a,#c9e86a,#effbe0
sp_lotus|莲:lotus|荷叶:lotus leaf=lotusPad@base|莲瓣:petals=lotusPetal@LR|露珠:dewdrop=drop|莲蓬:seed pod=honeycomb|#f472b6,#3fae6a,#fff0f8
sp_plant_pine|松:pine|松果:pine cone=pinecone@hold|积雪:snow cap=cloud@top|雪花:snowflake=snowflake|松脂:resin=amber|#1f7a3a,#8a5a2b,#e8f8e0
sp_plant_plum_blossom|梅:plum blossom|梅枝:branch=root@base|雪花:snowflakes=snowflake@orb|梅花:plum flower=plum|梅蕊:stamens=pollen|#e8466a,#6a3a2a,#fff0f2
sp_plant_orchid|兰:orchid|兰叶:orchid leaves=orchid@LR|露珠:dew=drop@orb|花瓣:petal=petal|兰露:orchid dew=pearl|#9a6ad8,#3fae6a,#f6f0ff
sp_plant_chrysanthemum|菊:chrysanthemum|菊瓣:petals=mum@hold|叶片:leaves=leafR@LR|小菊:little mum=mum|秋阳:autumn sun=sunDisc|#f2b01e,#3f8a3a,#fff6d0
sp_plant_cactus|仙人掌:cactus|掌臂:cactus arms=cactusArm@LR|小花:flower=blossom@top|尖刺:spine=thorn|储水:stored water=drop|#3fae4a,#ff6fae,#effbd6
sp_plant_snap_flower|食人花:flytrap|叶片:leaf=leaf!@tail|藤蔓:vine=vine@base|尖刺:thorn=thorn|蜜珠:nectar bead=amber|#3faa3a,#e8466a,#fff0d6
sp_mineral_crystal|晶:crystal|晶簇:crystal cluster=crystal@LR|晶片:shard=shard@top|闪光:sparkle=sparkle|宝石:gem=gem|#9a6ad8,#5fd3e8,#f6f0ff|pat=facet
sp_mineral_meteorite|陨石:meteorite|焰尾:fire tail=flame@tail|碎石:rock chips=flake@orb|陨石:meteor=meteor|熔核:molten core=lavaDrop|#6a5a8a,#ff8a3a,#f0ecf8|pat=crack
sp_mineral_sand|沙丘:dune|沙粒:sand=sand@base|旋风:whirlwind=swirl@hold|卵石:pebble=pebble|沙漠日:desert sun=sunDisc|#e8b85a,#c9773b,#fff6dc|pat=wave
sp_mineral_salt|盐晶:salt crystal|海浪:sea wave=wave@tail|盐晶:salt cube=saltCube@hold|气泡:bubble=bubble|盐核:salt core=shard|#dfe8f4,#3f8ae8,#ffffff|pat=facet
sp_mineral_gem|宝石:gem|闪光:sparkle=sparkle@orb|项链:necklace=chain@hold|宝石:gem=gem|钻芯:diamond core=diamond|#e8346a,#f2c14e,#ffe8f0|pat=facet
sp_mineral_jade|玉:jade|玉璧:jade disc=jadeDisc@hold|玉结:jade knot=knot@tail|祥云:cloud=cloud|玉珠:jade pearl=pearl|#4ac08a,#c0392b,#eafff4
sp_mineral_agate|玛瑙:agate|玛瑙纹:agate bands=agate@tail|晶簇:crystals=crystal@hold|卵石:pebble=pebble|玛瑙珠:agate bead=pearl|#d8553a,#f2c1a0,#fff0e8|pat=ring
sp_mineral_amber|琥珀:amber|松果:pine cone=pinecone@hold|琥珀:amber drop=amber@orb|蜜滴:honey drop=drop|远古虫翅:ancient wing=insectWing|#e8902a,#7a4a1a,#fff0c9
sp_mineral_obsidian|黑曜石:obsidian|黑曜片:obsidian flakes=obsidian@LR|火岩:lava rock=lavaRock@base|火星:spark=spark|熔核:molten core=lavaDrop|#2a2440,#c04ad8,#d8d0f0|pat=facet
sp_mineral_diamond|钻石:diamond|光芒:rays=ray@LR|闪光:sparkle=sparkle@orb|晶片:shard=shard|星芒:starburst=burst|#8fe3ff,#5aa8ff,#ffffff|pat=facet
sp_mineral_pearl|珍珠:pearl|贝壳:shell=shell@hold|气泡:bubbles=bubble@orb|珍珠:pearl=pearl|月华:moonlight=moon|#f4eef8,#e88ab8,#ffffff
sp_mineral_coral_stone|珊瑚:coral|海星:starfish=starfish@hold|海浪:wave=wave@tail|贝壳:shell=shell|宝石:gem=gem|#ff6a5a,#3fb8d8,#fff0ea
sp_water|水:water|浪花:wave=wave@tail|气泡:bubbles=bubble@orb|水滴:drop=drop|漩涡:whirlpool=spiral|#2f9ae8,#8fe3ff,#e8f8ff|pat=wave
sp_wind|风:wind|旋风:whirlwind=swirl@LR|疾风线:gust lines=speedLines@tail|羽毛:feather=feather|风车:pinwheel=pinwheel|#6ad8b8,#2f8ab8,#effffa
sp_thunder|雷:thunder|雷云:storm cloud=stormCloud@top|电光:electric sparks=sparkle@LR|闪电:lightning=zap|雷核:thunder core=burst|#ffd23f,#5b6cff,#fff8d0|body=bolt
sp_elem_ice|冰:ice|冰棱:icicles=iceShard@LR|霜雾:frost mist=mist@base|冰雹:hail=hail|雪花:snowflake=snowflake|#8fd8ff,#2f7ad8,#f0fbff|pat=crack
sp_elem_light|光:light|光斑:light spots=lightSpot@orb|光束:beam=beam@hold|闪光:sparkle=sparkle|光核:light core=glow|#ffd84a,#ff9a3a,#fffbe0
sp_elem_dusk|暗:darkness|月牙:crescent=moon@hold|影团:shadow=shadowBlob@base|暗萤:dim glow=glow|暗核:dark core=voidRing|#3a2a6a,#9a6ad8,#d8ccf8
sp_earth|土:earth|石块:stones=rock!@orb|嫩芽:sprout=sprout@top|卵石:pebble=pebble|土玛瑙:earth agate=agate|#a0703a,#5fae3a,#f8ecd8|pat=crack
sp_elem_metal|金:metal|金铃:gold bell=bell@hold|金片:metal flakes=flake@orb|铜钱:coin=coin|金核:metal core=nut|#e8b830,#a0a8b8,#fff6d0|pat=band
sp_elem_timber|木:wood|嫩芽:sprout=sprout@top|叶片:leaves=leaf@LR|圆叶:round leaf=leafR|松果:pine cone=pinecone|#8a5a2b,#4ac04a,#f8e8c8|pat=grain
sp_elem_lava_rock|火岩:lava rock|熔岩滴:lava drops=lavaDrop@LR|烟团:smoke=smoke@top|火星:spark=spark|熔岩核:lava core=lavaRock|#5a3a2a,#ff6a1a,#ffd84a|pat=crack
sp_elem_cloudlet|云:cloud|雨丝:rain=rain@base|阳光:sunshine=sunDisc@orb|风丝:breeze=mist|云珠:cloud pearl=pearl|#e8f0ff,#5a9ae8,#ffffff
sp_elem_mist|雾:mist|雾气:mist=mist@base|露珠:dew=drop@orb|雾团:fog puff=smoke|雾中月:moon in mist=moon|#b8c8d8,#6a8ab8,#f4f8fc|pat=wave
sp_elem_snow|雪:snow|雪球:snowball=snowball@base|冰棱:icicles=iceShard@orb|雪花:snowflake=snowflake|冰雹:hail=hail|#dff0ff,#3f8ae8,#ffffff
sp_frost|霜:frost|冰棱:icicles=iceShard@LR|霜叶:frosted leaf=leafR@base|霜花:frost pattern=kaleido|冰晶:ice crystal=crystal|#a8e0f8,#5a6ad8,#f4fcff|pat=crack
sp_elem_rainbow|虹:rainbow|云朵:clouds=cloud@LR|雨滴:rain=rain@orb|光谱:spectrum=spectrum|棱镜:prism=prismTri|#ff6a8a,#5ab8ff,#fff6d0
sp_elem_star|星:star|星尘尾:stardust tail=dustTail@tail|闪光:sparkle=sparkle@orb|星:star=star|星芒:starburst=burst|#ffd84a,#7c6cf6,#fffbe0
sp_elem_moon|月:moon|星星:stars=star@orb|云纱:cloud veil=cloud@base|闪光:sparkle=sparkle|月珠:moon pearl=pearl|#f2e6a0,#5a6ad8,#fffbe8
sp_elem_sun|日:sun|日冕:corona=burst@back|火焰:flames=flame@orb|日轮:sun disc=sunDisc|日徽:sun emblem=badgeStar|#ff9a1a,#e8463c,#fff0b0
sp_elem_void|虚:void|虚空环:void ring=voidRing@back|星尘:stardust=dust@orb|黑洞:black hole=blackhole|无限:infinity=infinity|#2a1a4a,#8a5af8,#d8c8ff
sp_time_rift|裂隙:rift|裂纹:cracks=crack@belly|空间框:space frame=cubeFrame@hold|碎片:shards=errorShard|时隙核:gap core=voidRing|#5a3ad8,#ff5ab8,#f0e8ff
sp_sand|沙漏:hourglass|循环箭头:loop arrow=loopArrow@hold|流沙:falling sand=sandStream@LR|小沙漏:little hourglass=hourglass|钟面:clock face=dial|#3b7fd8,#e8c06a,#eef4ff
sp_time_calendar|日历:calendar|日历页:page=calPage@hold|月牙:crescent=moon@orb|日轮:sun=sunDisc|年轮:year rings=agate|#e8463c,#3b6fd8,#fff4ee|pat=grid
sp_time_resonance|回响:resonance|回声波:echoes=echoArc@hold|音符:notes=note@orb|声波:sound wave=soundWave|共鸣铃:resonant bell=bell|#5ab8d8,#e85ab8,#effaff|pat=wave
sp_time_shuttle|穿梭:shuttle|疾风线:speed lines=speedLines@tail|星环:orbit=orbit@back|闪光:sparkle=sparkle|门核:gate core=cubeFrame|#3ad8b8,#5a6ad8,#efffff
sp_time_stasis|停滞:stasis|停滞符:pause mark=pause@belly|冰棱:icicles=iceShard@orb|沙漏:hourglass=hourglass|静止纹:stillness=hush|#7ab8e8,#3a4a8a,#f0f8ff|pat=grid
sp_minute|加速:acceleration|火花:sparks=spark@LR|风:wind=swirl@base|彗星:comet=comet|加速核:boost core=burst|#ff8a1a,#ffd23f,#fff4dc|pat=chevron
sp_second|逆转:reversal|逆转:rewind=rewind@hold|时针:clock hand=needle@tail|循环箭头:loop arrow=loopArrow|密码轮:time wheel=cipherWheel|#9a5ad8,#3ad8c8,#f6eeff
sp_time_parallel|平行:parallel|平行环:twin rings=twinRing@back|镜片:mirror shards=mirrorShard@orb|镜影:reflection=mirrorPane|双星:twin stars=twinStar|#5a8ad8,#ff8ab8,#eef4ff
sp_time_cycle|循环:cycle|循环箭头:loop arrows=loopArrow@hold|季叶:season leaves=leafR@orb|雪花:snowflake=snowflake|轮回轮:cycle wheel=wheel|#3ab86a,#e8a03a,#effff4
sp_origin|纪元:epoch|卷轴:scroll=scroll@hold|星系:galaxy=galaxy@back|符文石:rune stone=runeStone|纪元日:epoch sun=sunDisc|#c9a24a,#5a3a8a,#fff4dc
sp_dog|发条:clockwork|发条钥:wind-up key=gearToy@tail|犬耳:dog ears=dogEars@top|螺母:nut=nut|齿心:gear heart=gearMini|#e8902a,#7a8a9a,#fff0d6|sk
sp_quantum|量子:quantum|电子轨道:electron orbit=orbit@back|量子位:qubits=pixel@orb|量子点:quantum dot=sparkle|原子核:nucleus=nucleus|#5a6ad8,#3ae8d8,#eef0ff|pat=circuit
sp_steam|蒸汽:steam|蒸汽:steam=steam@top|汽阀:valve=steamValve@hold|烟团:smoke=smoke|压力线圈:pressure coil=coil|#a0603a,#c9d2dc,#fff0dc
sp_mech_circuit|电路:circuit|电线:wire=wire@tail|电路纹:traces=circuit@LR|闪电:spark=zap|电池:battery=battery|#2f9e6a,#ffd23f,#eafff4|pat=circuit
sp_mech_chip|芯片:chip|数据块:data=data@hold|信号格:signal bars=signalBars@orb|像素:pixel=pixel|逻辑门:logic gate=logicGate|#3a4a6a,#3ae8a8,#eafff8|pat=grid
sp_mech_motor|马达:motor|线圈:coil=coil@hold|电线:wire=wire@tail|扇叶:fan blade=fanBlade|齿轮:gear=gearMini|#d84a3a,#c9d2dc,#fff0ea
sp_mech_screw|螺丝:screw|扳手:wrench=wrench@hold|螺母:nuts=nut@orb|螺丝:screw=screw|螺纹:thread=spiral|#a8b0c0,#e8902a,#f4f6fa
sp_mech_spring|弹簧:spring|小弹簧:springs=spring@LR|弹跳线:bounce lines=echoArc@base|弹珠:marble=pearl|回弹:rebound=loopArrow|#5ad86a,#3a4a6a,#f0fff0
sp_mech_piston|活塞:piston|小活塞:pistons=piston@LR|齿轮:gear=gear@tail|螺母:hex nut=bolt|传动轮:drive wheel=wheel|#c04a3a,#a8b0c0,#fff0ea
sp_mech_welder|焊枪:welder|焊花:weld sparks=weldSpark@hold|护盾:shield=shieldMini@L|火星:spark=spark|焊火:weld flame=flame|#3a6ad8,#ff8a1a,#eef4ff
sp_proto|引擎:engine|烟囱:exhaust=chimney@top|尾焰:exhaust flame=flame@tail|齿轮:gear=gearMini|引擎核:engine core=burst|#5a6a7a,#ff6a1a,#eef0f4
sp_mech_antenna|天线:antenna|信号波:signal waves=echoArc@LR|卫星:satellite=planet@orb|电波:radio wave=soundWave|接收镜:receiver lens=lens|#3ab8d8,#e8463c,#effaff
sp_mech_radar|雷达:radar|雷达波:radar waves=radarArc@hold|屏幕:screen=screen@base|光点:blip=glow|方位针:bearing needle=compassNeedle|#2f8a5a,#5af08a,#eafff0
sp_cybercat|机械龙:mech dragon|机翼:mech wings=wing@LR|尾焰:exhaust flame=flame@tail|螺丝:screw=screw|芯片:chip=chip|#2a3a5a,#3ae8f8,#e0f8ff
sp_moon|月:moon|桂花:osmanthus=blossom@orb|星星:star=star@tail|闪光:sparkle=sparkle|月华:moonlight=moon|#e8dca0,#6a5ad8,#fffbe8
sp_sun|日:sun|龙角:dragon horns=hornPair@top|日冕:corona=burst@back|火焰:flame=flame|日轮:sun disc=sunDisc|#ff9a1a,#e8463c,#fff0b0
sp_qilin|创世:genesis|鹿角:antlers=antler@top|祥云:auspicious cloud=cloud@base|星:star=star|星系:galaxy=galaxy|#3ac08a,#e8b030,#eafff4
sp_myth_chaos|混沌:chaos|螺旋:spiral=spiral@back|碎片:shards=errorShard@orb|星云:nebula=nebula|阴阳:yin-yang=yinyang|#5a2a6a,#e84a8a,#f0d8f8
sp_myth_order|秩序:order|秩序格:order grid=orderGrid@hold|天平:balance=balance@top|字块:tile=tile|空间框:frame=cubeFrame|#3a6ad8,#e8c06a,#eef4ff|pat=grid
sp_myth_fate|命运:fate|命运线:fate threads=thread@tail|星星:stars=star@orb|卡牌:card=card|牌扇:card fan=cardFan|#6a3ad8,#e8c06a,#f4eeff
sp_myth_karma|因果:karma|链环:chains=chain@tail|多米诺:dominoes=domino@hold|循环箭头:loop arrow=loopArrow|天平:balance=balance|#3a8a8a,#e8902a,#eafafa
sp_myth_samsara|轮回:samsara|轮回轮:wheel=wheel@back|莲瓣:lotus petals=lotusPetal@LR|魂火:soul flame=soulFlame|玉璧:jade disc=jadeDisc|#c08a3a,#3a6a5a,#fff4e0
sp_myth_phoenix_rebirth|涅槃:rebirth|羽翼:phoenix wings=wing@LR|尾羽:tail feather=feather@tail|火星:spark=spark|魂火:soul flame=soulFlame|#ff5a1a,#ffd23f,#fff0c0
sp_myth_nothingness|虚无:nothingness|虚空环:void ring=voidRing@back|雾气:mist=mist@base|影团:shadow=shadowBlob|空泡:empty bubble=bubble|#c8c8d8,#5a5a7a,#f8f8ff
sp_myth_eternity|永恒:eternity|无限环:infinity loop=infinity@belly|星砂:star sand=sparkle@orb|星:star=star|永恒钻:eternal diamond=diamond|#3a3ad8,#e8c06a,#eeeeff
sp_concept_memory|记忆:memory|记忆片:snapshot=photo@hold|丝带:ribbon=ribbon@tail|回忆泡:memory bubble=thoughtBubble|记忆锁:memory lock=lock|#d88a5a,#5a8ad8,#fff4ec|pat=paper
sp_concept_dream|梦:dream|梦泡:dream bubbles=dreamBubble@orb|月牙:crescent=moon@hold|闪光:sparkle=sparkle|枕头:pillow=pillow|#b89af8,#ffd84a,#f8f0ff
sp_concept_echo|回声:echo|回声波:echoes=echoArc@hold|山峰:mountain=karst@base|声波:sound wave=soundWave|衍射纹:ripples=wavelets|#5ad8c8,#3a5a8a,#effffc
sp_concept_silence|沉默:silence|静默纹:hush mark=hush@belly|羽毛:feathers=feather@orb|雪花:snowflake=snowflake|静珠:quiet pearl=pearl|#8a9ab8,#3a4a6a,#f4f6fa
sp_concept_time|时间:time|沙漏:hourglass=hourglass@hold|循环箭头:loop arrow=loopArrow@tail|时针:clock hand=needle|无限:infinity=infinity|#e8b030,#3a5ad8,#fff6dc
sp_concept_space|空间:space|空间框:space frame=cubeFrame@hold|星环:orbit=orbit@back|星:star=star|星系:galaxy=galaxy|#2a3a8a,#5ae8f8,#e8f0ff|pat=grid
sp_concept_causality|因果律:causality|多米诺:dominoes=domino@hold|齿轮:gear=gearMini@tail|字块:tile=tile|命运线:thread=thread|#8a6a3a,#3a8ad8,#fff4e4
sp_concept_probability|概率:probability|卡牌:cards=card@hold|硬币:coins=coin@orb|骰子:dice=dice|四叶草:clover=clover|#e8463c,#3a5ad8,#fff4f0|pat=check
sp_concept_logic|逻辑:logic|逻辑门:logic gate=logicGate@hold|电路纹:traces=circuit@LR|积木:block=block|秩序格:grid=orderGrid|#3a8ad8,#e8e83a,#eef8ff|pat=circuit
sp_egg|悖论:paradox|莫比乌斯:mobius strip=mobius@back|镜片:mirror shards=mirrorShard@orb|碎片:shards=errorShard|阴阳:yin-yang=yinyang|#e85ab8,#3ad8c8,#fff0fa
sp_concept_imagination|想象:imagination|灵感灯泡:idea bulb=bulb@top|彩虹:rainbow=rainbow@base|闪光:sparkle=sparkle|万花纹:kaleidoscope=kaleido|#ff8a3a,#5a6ad8,#fff6e8
sp_concept_creativity|创造:creativity|颜料:paint=paintDab@hold|积木:blocks=block@base|铅笔:pencil=pencil|灯泡:bulb=bulb|#e8463c,#3ab8d8,#fff4e8
sp_concept_will|意志:will|旗帜:banner=flag@hold|盾:shield=shieldMini@L|火星:spark=spark|星徽:star badge=badgeStar|#ff3a3a,#ffd23f,#fff0e0
sp_concept_feeling|情感:feeling|心:hearts=heart@orb|丝带:ribbon=ribbon@base|气泡:bubble=bubble|宝石:gem=gem|#ff5a8a,#ffd84a,#fff0f4
sp_concept_soul|灵魂:soul|魂火:soul flames=soulFlame@orb|光斑:light spot=lightSpot@tail|萤光:glow=glow|灵珠:soul pearl=pearl|#a8c8ff,#5a3ad8,#f4f8ff
sp_text_rune|符文:rune|符文石:rune stone=runeStone@hold|闪光:sparkle=sparkle@orb|石片:stone flake=flake|符文轮:rune wheel=cipherWheel|#5a6a7a,#3ae8d8,#eef4f6|pat=crack
sp_code|代码:code|代码窗:code window=codeBlock@hold|光标:cursor=cursor@orb|像素:pixel=pixel|芯片:chip=chip|#2a3a4a,#3ae86a,#eafff0|pat=grid
sp_text_poem|诗:poem|羽毛笔:quill=quill@hold|梅花:plum flowers=plum@orb|墨滴:ink drop=inkDrop|诗月:poet's moon=moon|#f4ecd8,#3a3a5a,#ffffff|pat=paper
sp_text_riddle|谜语:riddle|放大镜:magnifier=magnifier@hold|灯谜灯笼:riddle lantern=lanternSeg@tail|便签:note card=noteCard|谜锁:riddle lock=lock|#e8902a,#5a3ad8,#fff4e4
sp_text_symbol|符号:symbol|星徽:star badge=badgeStar@hold|心:hearts=heart@orb|双星:twin stars=twinStar|无限:infinity=infinity|#3a5ad8,#e84a6a,#f0f4ff
sp_text_letter|字母:letter|信封:envelope=envelope@hold|邮票:stamps=postStamp@orb|字块:tile=tile|印纹:seal mark=stamp|#e8463c,#3a8ad8,#fff4ee
sp_text_number|数字:number|算珠串:bead row=abacusRow@hold|刻度尺:ruler=rulerTicks@tail|骰子:dice=dice|铜钱:coin=coin|#3ab86a,#e8b030,#effff4|pat=grid
sp_text_formula|公式:formula|烧瓶:flask=flask@hold|原子轨道:atomic orbit=orbit@back|原子核:nucleus=nucleus|天平:balance=balance|#3a4a8a,#e8d83a,#eef0ff
sp_text_cipher|密码:cipher|密码轮:cipher wheel=cipherWheel@hold|钥匙:key=key@tail|条码:barcode=barcode|宝石:gem=gem|#2a4a3a,#3ae89a,#eafff4
sp_text_pact|契约:pact|契约卷:pact scroll=sealScroll@hold|链环:chain=chain@tail|印纹:seal=stamp|小盾:shield=shieldMini|#8a3a2a,#e8c06a,#fff4e4
sp_light_silhouette|剪影:silhouette|聚光:spotlight=beam@top|影团:shadow=shadowBlob@base|蝙蝠剪影:bat cut-out=bat|镜片:lens=lens|#2a2a3a,#ffd84a,#e8e0f0
sp_light_reflection|镜像:mirror image|镜影:reflection=mirrorPane@hold|光斑:light spots=lightSpot@orb|钻石:diamond=diamond|双星:twin stars=twinStar|#9ad8f8,#5a5ad8,#f4fcff
sp_light_spectrum|光谱:spectrum|光谱带:spectrum band=spectrum@tail|光束:light beam=beam@L|闪光:sparkle=sparkle|星芒:starburst=burst|#e8f4ff,#8a5af8,#ffffff
sp_light_shadow|影子:shadow|影团:shadow=shadowBlob@tail|月牙:crescent=moon@orb|萤光:glow=glow|暗环:dark ring=voidRing|#3a3a5a,#9a8af8,#dcd8f8
sp_light_light_spot|光斑:light spot|光斑:light spots=lightSpot@orb|光束:beam=beam@tail|萤光:glow=glow|日轮:sun=sunDisc|#ffe84a,#ff9a3a,#fffbe0
sp_light_refraction|折射:refraction|折射光:refracted ray=refractRay@hold|水滴:droplets=drop@orb|镜片:lens=lens|钻石:diamond=diamond|#5ad8f8,#ff6a8a,#f0fcff
sp_light_reflex|反射:reflection|反射光:reflected ray=reflectRay@hold|闪光:sparkle=sparkle@orb|镜片:mirror shard=mirrorShard|光斑:light spot=lightSpot|#c8d8e8,#e8902a,#ffffff
sp_light_diffraction|衍射:diffraction|衍射纹:ripples=wavelets@hold|光点:glow dots=glow@orb|闪光:sparkle=sparkle|镜片:lens=lens|#3a8ad8,#e8e83a,#eef6ff|pat=ring
sp_light_interference|干涉:interference|干涉纹:fringes=interfer@hold|声波:wave=soundWave@base|泡泡:soap bubble=bubble|平行环:twin rings=twinRing|#8a5ad8,#3ae8c8,#f4eeff
sp_light_polarisation|偏振:polarisation|偏振栅:polariser=polar@hold|光芒:rays=ray@orb|窗格:pane=pane|萤光:glow=glow|#3a5a8a,#e8d83a,#eef4fa|pat=stripe
sp_spring|福:fortune|爆竹:firecrackers=firecracker@LR|铜钱:coins=coin@orb|灯笼:lantern=lanternSeg|福金锭:gold ingot=ingot|#e8343a,#f2c14e,#fff0d6
sp_rabbit|月兔:moon rabbit|兔耳:rabbit ears=bunnyEars@top|月牙:crescent=moon@hold|月饼:mooncake=mooncakeMini|玉珠:jade pearl=pearl|#f8f4f8,#e88ab8,#ffffff
sp_snow|雪人:snowman|围巾:scarf=ribbon@base|雪花:snowflakes=snowflake@orb|雪球:snowball=snowball|纽扣:button=button|#f0f8ff,#e8463c,#ffffff
sp_pumpkin|南瓜:pumpkin|藤蔓:vine=vine@top|蝙蝠:bats=bat@orb|幽灵:ghost=ghostWisp|烛心:candle=candleStick|#ff8a1a,#5a2a6a,#fff0c0
sp_fest_rice_dumpling|粽子:zongzi|粽叶:bamboo leaves=riceLeaf@LR|龙舟桨:paddle=paddle@hold|饭团:rice ball=riceBall|粽结:knot=knot|#4aa84a,#e8c06a,#f4fff0
sp_fest_mooncake|月饼:mooncake|月牙:crescent=moon@hold|桂花:osmanthus=blossom@orb|小月饼:little mooncake=mooncakeMini|月珠:moon pearl=pearl|#e8a83a,#8a4a2a,#fff4d6
sp_fest_festival_lamp|花灯:festival lamp|流苏:tassels=tassel@base|桃花:blossoms=sakura@orb|烛火:candle flame=candle|灯泡:bulb=bulb|#ff5a7a,#f2c14e,#fff0f4
sp_fest_firecracker|鞭炮:firecracker|爆光:burst=burst@top|烟团:smoke=smoke@base|火星:spark=spark|爆竹:cracker=firecracker|#e8343a,#ffd23f,#fff0d6
sp_fest_red_envelope|红包:red envelope|金锭:gold ingot=ingot@hold|中国结:knot=knot@tail|铜钱:coin=coin|福印:luck seal=stamp|#e8343a,#f2c14e,#fff0d6
sp_fest_yuletide|圣诞:yuletide|彩球:ornaments=ornament@LR|树顶星:tree star=star@top|礼盒:gift=gift|拐杖糖:candy cane=candyCane|#2f8a3a,#e8343a,#fff4d6
sp_fest_hallowed|万圣:Halloween|小南瓜:pumpkin=pumpkinMini@hold|糖果:candy=candy@base|蝙蝠:bat=bat|月牙:crescent=moon|#6a3ad8,#ff8a1a,#f4eeff
sp_fest_gratitude|感恩:gratitude|麦穗:wheat=wheat@hold|心:hearts=heart@orb|圆叶:leaf=leafR|果子:fruit=fruit|#e8902a,#c0392b,#fff4dc
sp_fest_peach_blossom|桃花:peach blossom|桃叶:leaves=leaf@LR|花瓣:petals=petal@orb|桃花:blossom=sakura|桃子:peach=fruit|#ff8ab8,#5ab84a,#fff0f6
sp_fest_red_banner|红旗:red banner|旗帜:banner=flag@hold|星星:stars=star@orb|缎带:ribbon=ribbon|星徽:star badge=badgeStar|#e8343a,#ffd23f,#fff0e0
sp_fest_dragon_boat|龙舟:dragon boat|船桨:paddles=paddle@LR|浪花:waves=wave@tail|鼓槌:drumstick=drumstick|龙鳞:dragon scale=scaleChip|#e8463c,#3ab86a,#fff4e0|body=riceleaf
sp_fest_dumpling|饺子:dumpling|筷子:chopsticks=chopsticks@hold|蒸汽:steam=steam@top|饺子:dumpling=dumpling|碗:bowl=bowl|#f4ecd8,#c0392b,#ffffff
sp_fest_childhood|童心:childhood|风车:pinwheel=pinwheel@hold|气球泡:bubbles=bubble@orb|拨浪鼓:rattle drum=toyDrum|糖果:candy=candy|#ff8a3a,#3ab8f8,#fff4e8
sp_fest_toy_box|玩具:toy|积木:blocks=block@base|发条钥:wind-up key=gearToy@tail|毛线球:yarn ball=yarnBall|摇杆:joystick=joystick|#3a8ad8,#ffd23f,#eef6ff
sp_fest_writing_brush|笔:writing brush|卷轴:scroll=scroll@hold|墨滴:ink drop=inkDrop@tail|竹叶:bamboo leaf=bambooLeaf|印章:seal=stamp|#2a2a3a,#c0392b,#fff4e0
sp_fest_family|家庭:family|小屋:house=houseMini@hold|灯光:warm light=lightSpot@orb|心:heart=heart|双心:two hearts=heartPair|#ff7a5a,#ffd84a,#fff4ec
sp_fest_sweetheart|情人:sweetheart|蝴蝶结:bow=bow@top|玫瑰:rose=blossom@hold|巧克力:chocolate=chocoSquare|宝石:gem=gem|#e8346a,#ff9ab8,#fff0f4
sp_glitch|故障:glitch|错位条:offset bars=glitchBar@LR|碎片:shards=errorShard@orb|噪点:noise=noiseDots|闪电:zap=zap|#3a3a5a,#e83a8a,#e8f0ff|pat=band
sp_glitch_garble|乱码:garbled text|像素:pixels=pixel@orb|代码窗:code window=codeBlock@hold|扫描线:scanlines=scanline|密码轮:cipher wheel=cipherWheel|#2a4a2a,#3ae86a,#eaffee|pat=check
sp_glitch_noise|噪点:noise|噪点:noise dots=noiseDots@hold|扫描线:scanlines=scanline@base|像素:pixel=pixel|信号格:signal bars=signalBars|#8a8a9a,#e83a3a,#f4f4f8|pat=dots
sp_glitch_freeze|死机:freeze|冰棱:icicles=iceShard@orb|加载环:loading ring=loading@hold|雪花:snowflake=snowflake|静默纹:hush=hush|#5a8ab8,#2f4a8a,#f0f8ff|pat=crack
sp_glitch_blue_screen|蓝屏:blue screen|错误碎片:error shards=errorShard@orb|光标:cursor=cursor@hold|错位条:glitch bar=glitchBar|芯片:chip=chip|#2a5ad8,#8fe3ff,#eef6ff|pat=band
sp_glitch_lag|卡顿:lag|加载环:loading ring=loading@hold|流沙:falling sand=sandStream@LR|沙漏:hourglass=hourglass|停滞符:pause=pause|#e8b030,#3a3a5a,#fff6dc
sp_glitch_latency|延迟:latency|信号格:signal bars=signalBars@hold|雷达波:radio waves=radarArc@orb|加载环:loading=loading|天线:antenna=antennaRod|#3ab8a8,#e85a3a,#effcfa
sp_glitch_overflow|溢出:overflow|溢出杯:overflowing cup=overflowCup@hold|气泡:bubbles=bubble@orb|数据块:data=data|水滴:drop=drop|#3a8ae8,#e8e83a,#eef6ff
sp_food_steamed_bun|包子:steamed bun|蒸汽:steam=steam@top|竹叶:steamer leaf=bambooLeaf@base|小包子:little bun=bunMini|红点:red dot=berry|#f4ecd8,#e8463c,#ffffff
sp_food_candy|糖:candy|糖粒:sprinkles=sprinkle@orb|拐杖糖:candy cane=candyCane@hold|糖果:sweet=candy|心:heart=heart|#ff5ab8,#5ad8f8,#fff0fa|pat=stripe
sp_food_tea|茶:tea|茶叶:tea leaves=teaLeaf@orb|茶香:aroma=mist@top|气泡:bubble=bubble|珍珠:tapioca pearl=pearl|#8a5a2a,#5ab84a,#fff0dc
sp_food_noodles|面:noodles|筷子:chopsticks=chopsticks@hold|面条:noodles=noodle@top|葱花:scallion=leafR|蛋黄:egg yolk=glow|#f2c14e,#e8463c,#fff8e0
sp_food_jelly|果冻:jelly|樱桃:cherry=cherry@top|果冻块:jelly cube=jellyCube@hold|浆果:berries=berry|宝石:gem=gem|#ff5a7a,#ffd84a,#fff0f4
sp_food_ice_cream|冰淇淋:ice cream|冰淇淋球:scoops=iceScoop@orb|甜筒:cone=cone@hold|糖粒:sprinkles=sprinkle|雪花:snowflake=snowflake|#ffb8d8,#8a5a2a,#fff8fa
sp_food_cake|蛋糕:cake|奶油:cream=cream@top|樱桃:cherries=cherry@orb|蛋糕块:cake slice=cakeSlice|蜡烛:candle=candleStick|#ff8ab8,#e8463c,#fff4e8
sp_food_chocolate|巧克力:chocolate|巧克力块:chocolate square=chocoSquare@hold|心:hearts=heart@orb|奶油:cream=cream|巧克力币:chocolate coin=coin|#6a3a1a,#ff5a8a,#f8e8dc|pat=grid
sp_food_biscuit|饼干:biscuit|牛奶滴:milk drops=drop@orb|小饼干:little cookie=cookie@hold|麦穗:wheat=wheat|星:star=star|#d8a05a,#6a3a1a,#fff4e0|pat=dots
sp_food_pudding|布丁:pudding|焦糖:caramel=drop@top|小碟:plate=bowl@base|果冻块:jelly cube=jellyCube|焦糖日:caramel sun=sunDisc|#f2c14e,#8a4a1a,#fff8e0
sp_food_rice_ball|汤圆:tangyuan|碗:bowl=bowl@tail|月牙:crescent=moon@orb|雪球:snowball=snowball|元宵灯:festival lantern=lanternSeg|#fff4f8,#e85a7a,#ffffff
sp_food_sushi|寿司:sushi|寿司卷:sushi roll=sushiRoll@hold|海浪:wave=wave@tail|饭团:rice ball=riceBall|樱花:cherry blossom=sakura|#e8603a,#2a4a3a,#ffffff
sp_music_zither|琴:zither|琴弦:strings=strings@base|音符:notes=note@orb|琴码:bridge=bridgePeg|梅花:plum flower=plum|#8a4a2a,#e8c06a,#fff4dc|pat=grain
sp_music_drum|鼓:drum|鼓槌:drumsticks=drumstick@LR|声波:sound wave=soundWave@hold|音符:note=note|鼓心:drum heart=coin|#e8344e,#8a5a2b,#ffe9c9
sp_music_bell|铃:bell|蝴蝶结:bow=bow@top|回声波:echoes=echoArc@LR|双音符:notes=notes2|铃珠:bell pearl=pearl|#f2c14e,#e8463c,#fff8dc
sp_music_flute|笛:flute|双音符:notes=notes2@orb|笛风:breath=swirl@tail|竹叶:bamboo leaf=bambooLeaf|玉:jade=jadeDisc|#6ab84a,#e8463c,#f4ffe8
sp_music_xiao_flute|箫:xiao flute|流苏:tassel=tassel@tail|月牙:crescent=moon@orb|音符:note=note|箫珠:flute pearl=pearl|#4a6a3a,#c0392b,#f0f8e8
sp_music_pipa|琵琶:pipa|拨片:plectrum=pick@hold|珠落:falling pearls=pearl@orb|玉盘:jade plate=jadeDisc|小花:blossom=blossom|#c0602a,#f2c14e,#fff0e0
sp_music_erhu|二胡:erhu|琴弦:strings=strings@hold|声波:sound wave=soundWave@tail|月牙:moon=moon|松香:rosin=amber|#6a3a1a,#e8c06a,#fff0dc
sp_music_guzheng|古筝:guzheng|琴码:bridges=bridgePeg@hold|流水:flowing water=wave@tail|高山:mountain=karst|筝珠:zither pearl=pearl|#c08a3a,#3a8ab8,#fff4e0|pat=grain
sp_weather_cloud|云:cloud|风丝:breeze=mist@tail|彩虹:rainbow=rainbow@base|小云:cloudlet=cloud|太阳:sun=sunDisc|#f0f6ff,#3ab8f8,#ffffff
sp_weather_rain|雨:rain|雨丝:rain=rain@base|伞:umbrella=umbrella@hold|水滴:drop=drop|气泡:bubble=bubble|#3a7ad8,#8fd8ff,#eef6ff
sp_weather_snowfall|雪:snowfall|雪花:snowflakes=snowflake@orb|雪云:snow cloud=cloud@tail|雪球:snowball=snowball|霜花:frost pattern=kaleido|#e8f4ff,#5a8ae8,#ffffff
sp_weather_fog|雾:fog|雾气:fog=mist@base|灯塔光:lighthouse beam=lightBeam@hold|烟团:fog puff=smoke|光斑:light spot=lightSpot|#c8d0dc,#e8b030,#f6f8fa|pat=wave
sp_weather_thundercloud|雷云:thundercloud|闪电:lightning=zap@base|雨丝:rain=rain@LR|闪光:sparkle=sparkle|雷爆:thunderclap=burst|#4a4a6a,#ffd23f,#e8e8f4
sp_weather_typhoon|台风:typhoon|旋风:whirlwind=swirl@back|浪花:waves=wave@tail|飞叶:flying leaf=leafR|风眼:eye=voidRing|#3a6a8a,#5ad8f8,#eef8fc
sp_weather_tornado|龙卷:tornado|疾风线:gusts=speedLines@LR|尘烟:dust=dustCloud@base|碎石:debris=flake|漏斗云:funnel=funnel|#8a8a9a,#c0a06a,#f4f4f6
sp_weather_hail|冰雹:hail|冰雹:hailstones=hail@orb|雷云:storm cloud=stormCloud@hold|冰棱:icicle=iceShard|冰钻:ice diamond=diamond|#a8d8f8,#3a5ad8,#f4fcff
sp_weather_rainbow_arc|彩虹:rainbow|太阳:sun=sunDisc@hold|云:cloud=cloud@base|水滴:drop=drop|光谱:spectrum=spectrum|#ff8a3a,#3ab86a,#fff8e0
sp_weather_aurora|极光:aurora|极光带:aurora ribbon=aurora@tail|星:stars=sparkle@orb|雪花:snowflake=snowflake|月:moon=moon|#3ae8a8,#8a5af8,#e8fff8
sp_astro_comet|彗星:comet|星尘尾:stardust tail=dustTail@tail|冰晶:ice=iceShard@orb|星尘:stardust=dust|陨核:comet core=meteor|#8fd8ff,#5a6ad8,#f4fcff
sp_astro_planet|行星:planet|卫星:moons=moon@orb|星环:ring=orbit@back|星:star=star|地球仪:globe=globe|#e8903a,#5a6ad8,#fff4e4
sp_astro_nebula|星云:nebula|星云团:nebula cloud=nebula@tail|星星:stars=star@orb|闪光:sparkle=sparkle|星系:galaxy=galaxy|#c05af8,#5ad8f8,#f8eeff
sp_astro_black_hole|黑洞:black hole|吸积盘:accretion disk=orbit@back|碎星:star shards=errorShard@orb|螺旋:spiral=spiral|视界:event horizon=voidRing|#2a1a3a,#ff8a3a,#e8d8f8
sp_astro_white_hole|白洞:white hole|光芒:rays=ray@orb|闪光:sparkle=sparkle@tail|爆光:burst=burst|光核:light core=glow|#f8f8ff,#5ad8f8,#ffffff
sp_astro_galaxy|星系:galaxy|星星:stars=star@orb|星云:nebula=nebula@base|小星系:little galaxy=galaxy|中心黑洞:central black hole=blackhole|#5a3ad8,#ffd84a,#eeeaff
sp_astro_supernova|超新星:supernova|爆光:burst=burst@back|火星:sparks=spark@orb|石片:debris=flake|日轮:sun=sunDisc|#ff5a3a,#ffd23f,#fff0e0
sp_astro_pulsar|脉冲星:pulsar|光束:beam=beam@top|脉冲波:pulse=soundWave@base|闪光:sparkle=sparkle|原子核:core=nucleus|#5ad8f8,#ff5ab8,#effcff
sp_astro_quasar|类星体:quasar|喷流:jets=quasarJet@hold|吸积盘:accretion disk=blackhole@tail|爆光:burst=burst|镜片:lens=lens|#8a5af8,#ffd84a,#f4eeff
sp_astro_dark_matter|暗物质:dark matter|影团:shadow=shadowBlob@tail|星环:ring=orbit@back|虚空环:void ring=voidRing|无限:infinity=infinity|#3a2a5a,#5a8af8,#d8d0f0
sp_emotion_joy|喜:joy|闪光:sparkles=sparkle@orb|彩带:streamer=ribbon@base|心:heart=heart|日轮:sun=sunDisc|#ffd23f,#ff5a8a,#fff8dc
sp_emotion_anger|怒:anger|怒纹:anger marks=angerMark@orb|蒸汽:steam=steam@top|火星:spark=spark|爆光:burst=burst|#e8343a,#ff9a1a,#fff0e0
sp_emotion_sorrow|哀:sorrow|雨丝:rain=rain@base|泪滴:tears=drop@orb|云:cloud=cloud|月:moon=moon|#5a7ab8,#a8c8f8,#eef4fc
sp_emotion_delight|乐:delight|双音符:notes=notes2@orb|气球泡:balloon=bubble@hold|音符:note=note|双星:twin stars=twinStar|#ff9a3a,#5ad86a,#fff4e4
sp_emotion_fear|惧:fear|颤线:shivers=shiver@LR|影团:shadow=shadowBlob@base|幽灵:ghost=ghostWisp|静默纹:hush=hush|#6a5a8a,#c8e8ff,#f0eef8
sp_emotion_love|爱:love|双心:hearts=heartPair@orb|丝带:ribbon=ribbon@base|心:heart=heart|宝石:gem=gem|#ff3a6a,#ffd84a,#fff0f4
sp_emotion_grudge|恨:grudge|尖刺:thorns=thorn@orb|裂纹:crack=crack@belly|影团:shadow=shadowBlob|黑曜:obsidian=obsidian|#4a1a2a,#e8344a,#f0d8dc
sp_emotion_surprise|惊:surprise|爆光:burst=burst@back|弹簧:spring=spring@base|闪光:sparkle=sparkle|闪电:zap=zap|#ffd23f,#3ab8f8,#fff8dc
sp_emotion_thought|思:thought|思绪泡:thought bubble=thoughtBubble@hold|齿轮:gears=gearMini@orb|灯泡:bulb=bulb|螺旋:spiral=spiral|#5a6ad8,#ffd84a,#eef0ff
sp_emotion_insight|悟:insight|灵光灯泡:bulb=bulb@hold|光芒:rays=ray@orb|莲瓣:lotus petal=lotusPetal|光核:light core=glow|#f2c14e,#e86aa8,#fff8e0
sp_dream_nightmare|梦魇:nightmare|蝙蝠:bats=bat@orb|月牙:crescent=moon@hold|幽灵:ghost=ghostWisp|黑曜:obsidian=obsidian|#2a1a3a,#c03a6a,#e0d0f0
sp_dream_slumber|安眠:slumber|枕头:pillow=pillow@base|星星:stars=star@orb|梦泡:dream bubble=dreamBubble|光斑:light spot=lightSpot|#6a7ad8,#ffd84a,#eef0ff
sp_dream_illusion|幻境:illusion|万花纹:kaleidoscope=kaleido@hold|镜片:mirror shards=mirrorShard@orb|泡泡:bubble=bubble|莫比乌斯:mobius=mobius|#c05af8,#3ae8c8,#f8eeff
sp_dream_lucid|清醒梦:lucid dream|闪光:sparkles=sparkle@orb|梦泡:dream bubble=dreamBubble@hold|星:star=star|镜片:lens=lens|#ffd84a,#5a8ad8,#fffbe8
sp_dream_daydream|白日梦:daydream|彩虹:rainbow=rainbow@base|泡泡:bubbles=bubble@orb|小云:cloudlet=cloud|心:heart=heart|#f8f0ff,#ff9ab8,#ffffff
sp_dream_bad_dream|噩梦:bad dream|裂纹:cracks=crack@belly|雷云:storm cloud=stormCloud@top|碎片:shards=errorShard|黑洞:black hole=blackhole|#3a2a4a,#8af85a,#e8e0f0
sp_dream_sweet_dream|美梦:sweet dream|星星:stars=star@orb|糖果:candy=candy@hold|月牙:crescent=moon|枕头:pillow=pillow|#ffb8d8,#8a7af8,#fff6fa
sp_dream_dreamless|无梦:dreamless|静默纹:hush=hush@belly|雾气:mist=mist@base|虚空环:void ring=voidRing|静珠:quiet pearl=pearl|#a8b0c8,#3a4a6a,#f4f6fa
sp_ocean_coral|珊瑚:coral|海藻:kelp=kelp@tail|气泡:bubbles=bubble@orb|海星:starfish=starfish|珍珠:pearl=pearl|#ff8a7a,#3ac8b8,#fff0ec
sp_ocean_seashell|贝壳:seashell|珍珠:pearl=pearl@hold|海浪:wave=wave@tail|沙粒:sand=sand|海螺纹:conch spiral=spiral|#ffd8c8,#e8708a,#fff8f4
sp_ocean_kelp|海藻:kelp|海藻须:kelp fronds=kelp@base|气泡:bubbles=bubble@top|贝壳:shell=shell|水滴:drop=drop|#3a9a5a,#8fe8d8,#eafff4
sp_ocean_abyss|深海:abyss|深海光:deep glow=glow@orb|暗流:undercurrent=wave@tail|气泡:bubble=bubble|诱光核:lure core=lightSpot|#1a2a5a,#5af8f8,#d8e8ff
sp_ocean_jellyfish|水母:jellyfish|水母须:tentacles=jellyTail@base|光点:sparkles=sparkle@orb|气泡:bubble=bubble|伞心:bell core=pearl|#ff8fd1,#8fe3ff,#fff0fb
sp_ocean_starfish|海星:starfish|贝壳:shell=shell@hold|沙粒:sand=sand@base|小海星:little starfish=starfish|水滴:drop=drop|#ff7a4a,#ffd8a8,#fff4ec|pat=dots
sp_ocean_seahorse|海马:seahorse|卷尾:curled tail=curlTail@tail|海藻:kelp=kelp@hold|气泡:bubble=bubble|珊瑚:coral=coral|#f2a03a,#3ab8a8,#fff4e0
sp_ocean_octopus|章鱼:octopus|墨滴:ink drops=inkDrop@orb|贝壳:shell=shell@hold|海藻:kelp=kelp|宝石:gem=gem|#e85a8a,#5a3a8a,#fff0f6
sp_ocean_shark|鲨鱼:shark|背鳍:dorsal fin=fin@top|浪花:waves=wave@tail|锚:anchor=anchor|锯齿:teeth=tooth|#5a7a9a,#2f6ad8,#f4f8ff
sp_ocean_whale|鲸:whale|水柱:spout=spout@top|星星:stars=star@orb|水滴:drop=drop|月:moon=moon|#3a6ad8,#8fe3ff,#eef6ff
sp_insect_butterfly|蝶:butterfly|蝶翼:wings=bflyWing@LR|触角:antennae=antenna@top|花粉:pollen=pollen|小花:flower=blossom|#ff8a3a,#5a3ad8,#fff0e0
sp_insect_beetle|甲虫:beetle|甲角:horn=beetleHorn@top|透明翅:wings=insectWing@LR|圆叶:leaf=leafR|甲片:shell plate=shellPlate|#2a8a5a,#e8c03a,#eafff4|sk
sp_insect_bee|蜂:bee|透明翅:wings=insectWing@LR|尾针:stinger=stinger@base|蜂巢:honeycomb=honeycomb|蜂蜜:honey=amber|#ffd23f,#2a2a2a,#fff8dc|pat=band
sp_insect_ant|蚁:ant|饼干屑:crumb=cookie@hold|叶片:leaf=leaf@back|种子:seed=seed|圆叶:round leaf=leafR|#8a2a1a,#5ab84a,#f8e8e0|sk
sp_insect_firefly|萤火:firefly|透明翅:wings=insectWing@LR|萤光:tail light=glow@tail|光斑:light spot=lightSpot|月:moon=moon|#3a4a2a,#e8f83a,#f8ffe0|body=shp_drop
sp_insect_dragonfly|蜻蜓:dragonfly|透明翅:wings=insectWing@LR|荷叶:lotus leaf=lotusPad@base|水滴:drop=drop|复眼:compound eye=lens|#3ab8d8,#8af85a,#efffff
sp_insect_mantis|螳螂:mantis|镰臂:blade arms=mantisBlade@LR|叶片:leaf=leaf@base|尖刺:thorn=thorn|晶片:shard=shard|#5ad84a,#e8a03a,#f4ffe8
sp_insect_cicada|蝉:cicada|透明翅:wings=insectWing@LR|声波:song=soundWave@orb|回声波:echo=echoArc|夏日:summer sun=sunDisc|#6a5a3a,#8fe3d8,#f4f0e0|sk
sp_flying_plume|羽:plume|羽毛:feathers=feather@LR|风:wind=swirl@base|小羽:little feather=feather|宝石:gem=gem|#5ab8f8,#f2c14e,#effaff
sp_flying_wing|翼:wing|羽翼:wings=wing@LR|云:cloud=cloud@base|疾风线:gust=speedLines|星徽:star badge=badgeStar|#e8eef8,#5a6ad8,#ffffff
sp_flying_falcon|风隼:falcon|疾风线:gust lines=speedLines@tail|旋风:whirlwind=swirl@LR|羽毛:feather=feather|方位针:bearing=compassNeedle|#8a5a3a,#5ad8f8,#f8eee4
sp_flying_eagle|鹰:eagle|疾风:wind=swirl@LR|山峰:peaks=karst@base|云:cloud=cloud|日:sun=sunDisc|#6a4a2a,#f2c14e,#fff4e0
sp_flying_crane|鹤:crane|丹顶:red crest=crest@top|松针:pine=pineNeedle@base|雾气:mist=mist|月:moon=moon|#f4f4f8,#e8343a,#ffffff
sp_flying_swallow|燕:swallow|燕尾:forked tail=swallowTail@tail|柳叶:willow leaves=leaf@orb|雨滴:rain=rain|桃花:spring blossom=sakura|#2a3a5a,#e8463c,#f0f4ff
sp_reptile_scale|鳞:scale|鳞片:scales=scaleChip@tail|水波:ripples=wave@hold|宝石:gem=gem|晶片:shard=shard|#3ab88a,#e8c03a,#eafff4|pat=scale
sp_reptile_serpent|蛇:serpent|蛇信:forked tongue=snakeTongue@hold|草叶:grass=leaf@base|鳞片:scale=scaleChip|宝石:gem=gem|#5a9a3a,#e8463c,#f0ffe0|pat=scale
sp_reptile_lizard|蜥:lizard|卷尾:curled tail=curlTail@tail|石块:rock=rock@base|日轮:sun=sunDisc|宝石:gem=gem|#8ac03a,#e8902a,#f4ffe0
sp_reptile_tortoise|龟:tortoise|荷叶:lotus leaf=lotusPad@base|水滴:drops=drop@orb|甲片:shell plate=shellPlate|玉璧:jade disc=jadeDisc|#4a8a4a,#c0a03a,#eef8e4|pat=hex
sp_reptile_crocodile|鳄:crocodile|浪花:waves=wave@hold|芦苇:reeds=orchid@tail|锯齿:teeth=tooth|鳞片:scale=scaleChip|#3a7a3a,#e8d83a,#eef8e0|pat=scale
sp_chrono|龙:dragon|龙须:whiskers=whisker@LR|龙珠:dragon pearl=pearl@hold|祥云:cloud=cloud|龙鳞:dragon scale=scaleChip|#3a6ad8,#f2c14e,#eef4ff
sp_micro_spore|孢子:spore|孢子:spores=spore@orb|菌丝:hyphae=hypha@base|花粉:pollen=pollen|细胞核:nucleus=nucleus|#a8c83a,#5a3a8a,#f8ffe0
sp_micro_fungus|菌:fungus|小菌盖:little caps=mushcap@orb|孢子:spores=spore@top|苔团:moss=moss|卵石:pebble=pebble|#c08a5a,#5ad8a8,#fff4e8|pat=spot
sp_micro_cell|细胞:cell|小泡:vesicles=bubble@orb|线粒体:mitochondrion=coffeeBean@hold|细胞核:nucleus=nucleus|平行环:twin rings=twinRing|#8ae8a8,#e85a8a,#f4fff8
sp_micro_virus|病毒:virus|刺突:spikes=spike@LR|衣壳:capsids=capsid@orb|小衣壳:little capsid=capsid|宝石:gem=gem|#8a3ad8,#e8e83a,#f4eeff
sp_micro_bacterium|细菌:bacterium|鞭毛:flagellum=flagellum@tail|孢子:spores=spore@orb|菌毛:pili=pili|菌珠:bacterial pearl=pearl|#5ac8a8,#e8a03a,#effcf8
sp_micro_phage|噬菌体:phage|衣壳:capsid=capsid@hold|尾丝:tail fibres=antenna@base|刺突:spike=spike|螺母:hex core=nut|#5a8ad8,#e8a03a,#eef4ff
sp_collab_boe_car_display|车载屏:car display|方向盘:steering wheel=wheel@hold|导航针:navigation needle=compassNeedle@orb|像素:pixel=pixel|芯片:chip=chip|#2a3a5a,#3ad8f8,#e8f8ff|pat=grid
sp_collab_boe_lumen|光显:light display|显示屏:display screen=screen@hold|光斑:light spots=lightSpot@orb|闪光:sparkle=sparkle|光核:light core=glow|#5a3ad8,#ffd84a,#f0eeff|pat=check
sp_collab_vung_tau|头顿:Vung Tau|灯塔光:lighthouse beam=lightBeam@hold|浪花:waves=wave@tail|贝壳:shell=shell|锚:anchor=anchor|#e8463c,#3a8ad8,#fff4ee
sp_collab_ho_chi_minh_city|胡志明市:Ho Chi Minh City|莲瓣:lotus petals=lotusPetal@orb|星星:star=star@hold|灯笼:lantern=lanternSeg|星徽:star badge=badgeStar|#e8343a,#ffd23f,#fff0e0
sp_collab_phu_my|富美:Phu My|烟囱:chimney=chimney@top|齿轮:gear=gear@hold|螺母:hex nut=bolt|电池:power cell=battery|#5a7a8a,#e8b030,#eef4f6
sp_collab_rice_noodle|米粉:rice noodles|米粉:noodles=noodle@top|香草:herbs=leafR@orb|蒸汽:steam=steam|筷子:chopsticks=chopsticks|#f0e0c0,#3ab84a,#ffffff
sp_collab_spring_roll|春卷:spring roll|香草叶:herb leaves=leaf@LR|酱汁:sauce drops=drop@orb|小春卷:little roll=springRoll|虾:prawn=prawn|#f0d8a0,#5ab84a,#fff8e8
sp_collab_banh_mi|法棍:banh mi|香菜:coriander=sprout@top|酱料:sauce=paintDab@hold|麦穗:wheat=wheat|暖阳:warm sun=sunDisc|#e8a85a,#3ab84a,#fff4e0
sp_collab_drip_coffee|咖啡:coffee|蒸汽:steam=steam@top|咖啡豆:beans=coffeeBean@orb|咖啡滴:coffee drop=drop|拉花:latte heart=heart|#6a3a1a,#e8b07a,#fff0e0
sp_collab_beef_pho|牛粉:beef pho|葱花:scallion=sprout@top|筷子:chopsticks=chopsticks@hold|香草:herb=leafR|热气:heat=flame|#c0602a,#3ab84a,#fff0dc
sp_collab_sizzling_pancake|煎饼:banh xeo|虾:prawn=prawn@hold|生菜:lettuce=leafR@LR|蒸汽:steam=steam|金饼:golden crepe=sunDisc|#f2c14e,#e8603a,#fff8dc
sp_collab_sticky_rice|糯米饭:sticky rice|稻穗:rice ears=wheat@hold|蒸汽:steam=steam@top|饭团:rice ball=riceBall|糯米珠:rice pearl=pearl|#5ab84a,#f2c14e,#fff8e8
sp_collab_sugarcane_prawn|甘蔗虾:sugarcane prawn|甘蔗:sugarcane=bambooNode@hold|生菜:lettuce=leafR@base|虾:prawn=prawn|火星:sizzle=spark|#ff8a5a,#c8a05a,#fff4ec
sp_collab_phin_filter|滴漏:phin filter|咖啡滴:drips=drop@base|冰块:ice cube=saltCube@hold|咖啡豆:bean=coffeeBean|计时沙漏:timer=hourglass|#a0a8b8,#6a3a1a,#f4f6fa
sp_collab_coffee_bean|咖啡豆:coffee bean|咖啡豆:beans=coffeeBean@orb|咖啡叶:leaf=leaf@top|咖啡果:coffee cherry=cherry|种子:seed=seed|#6a3a1a,#e8463c,#f8e8dc
sp_collab_conical_hat|斗笠:conical hat|稻穗:rice ears=wheat@hold|系带:chin strap=ribbon@base|竹叶:bamboo leaf=bambooLeaf|莲瓣:lotus petal=lotusPetal|#e8d8a0,#3a9a4a,#fff8e0
sp_collab_ao_dai|奥黛:ao dai|丝带:silk ribbons=ribbon@tail|莲花:lotus flower=blossom@hold|莲瓣:lotus petal=lotusPetal|中国结:knot=knot|#f4f0f8,#e8346a,#ffffff
sp_collab_lotus_bloom|莲花:lotus bloom|莲灯:lotus lanterns=lanternSeg@orb|水波:water=wave@tail|莲瓣:lotus petal=lotusPetal|莲子:lotus seed=seed|#ff8ab8,#f2c14e,#fff0f6
sp_collab_village_bamboo|乡竹:village bamboo|竹篱:bamboo fence=pane@base|稻穗:rice ears=wheat@hold|竹叶:bamboo leaf=bambooLeaf|小屋:village house=houseMini|#8ac03a,#c08a3a,#f4ffe0
sp_collab_water_puppet|木偶:water puppet|提线:strings=puppetString@top|水波:water=wave@tail|小旗:flag=flag|拨浪鼓:drum=toyDrum|#e8a03a,#3a8ad8,#fff4e4
sp_collab_hoi_an_lantern|会安灯笼:Hoi An lantern|小灯笼:little lanterns=lanternSeg@orb|流苏:tassels=tassel@base|烛火:candle flame=candle|樱花:blossom=sakura|#f2c14e,#e8343a,#fff6d6
sp_collab_ha_long_bay|下龙湾:Ha Long Bay|浪花:waves=wave@tail|小舟桨:oar=paddle@hold|石峰:karst peak=karst|龙珠:dragon pearl=pearl|#3ab8a8,#5a8a6a,#eafffa
sp_collab_gothic_cutie|暗萌:gothic cutie|蝴蝶结:bow=bow@top|月牙:crescent=moon@orb|心:heart=heart|宝石:gem=gem|#3a2a4a,#e8346a,#f4e8f8
sp_collab_sweet_dreamer|甜梦:sweet dreamer|糖果:candy=candy@hold|星星:stars=star@orb|梦泡:dream bubble=dreamBubble|心:heart=heart|#ffd8f0,#8a7af8,#ffffff
sp_collab_star_wish_girl|星愿:star wish|缎带:ribbon=ribbon@base|闪光:sparkles=sparkle@orb|流星:shooting star=comet|心:heart=heart|#ffd84a,#ff7ab8,#fffbe8
sp_collab_star_sailor|星海水手:star sailor|锚:anchor=anchor@hold|浪花:waves=wave@tail|星:star=star|方位针:compass needle=compassNeedle|#3a5ad8,#e8343a,#eef2ff
sp_collab_magical_girl|魔法:magic|星星:stars=star@orb|心:heart=heart@hold|闪光:sparkle=sparkle|宝石:gem=gem|#ff7ab8,#ffd84a,#fff0f8
sp_collab_moon_mirror|月光:moonlight|月牙:crescent=moon@hold|闪光:sparkles=sparkle@orb|星:star=star|月珠:moon pearl=pearl|#c8c0f8,#ffd84a,#f8f6ff
sp_collab_star_dream|星梦:star dream|梦泡:dream bubble=dreamBubble@hold|星星:stars=star@orb|闪光:sparkle=sparkle|月:moon=moon|#8a6af8,#ffd84a,#f4eeff
sp_collab_zodiac_armour|星座铠:zodiac armour|星环:star orbit=orbit@back|星徽:star badge=badgeStar@belly|星:star=star|宝石:gem=gem|#f2c14e,#3a3a8a,#fff8dc
sp_collab_detective|侦探:detective|脚印:footprints=pawPrint@tail|便签:clue card=noteCard@hold|钥匙:key=key|锁:lock=lock|#8a6a3a,#3a5a8a,#fff4e4
sp_collab_gadget_box|道具:gadgets|扳手:wrenches=wrench@hold|弹簧:spring=spring@top|发条钥:wind-up key=gearToy|灯泡:bulb=bulb|#3a8ad8,#ffd23f,#eef6ff
sp_collab_card_magic|卡牌魔法:card magic|牌扇:card fan=cardFan@hold|闪光:sparkles=sparkle@orb|卡牌:card=card|宝石:gem=gem|#c0392b,#2a2a3a,#fff4ee
sp_collab_mecha_pilot|机甲:mecha|天线:antenna=antennaRod@top|推进焰:thruster flame=flame@base|螺母:hex nut=bolt|电池:battery=battery|#3a6ad8,#e8463c,#eef2ff
sp_collab_hero_squad|英雄:hero squad|闪电:lightning=zap@orb|星星:star=star@hold|小盾:shield=shieldMini|星徽:star badge=badgeStar|#e8343a,#ffd23f,#fff0e0
sp_collab_designer_toy|潮玩:designer toy|积木:block=block@hold|闪光:sparkles=sparkle@orb|糖粒:sprinkles=sprinkle|宝石:gem=gem|#8a5af8,#3ae8c8,#f6f0ff|pat=spot
sp_collab_energy_fighter|气功:qi energy|气团:qi ball=qiBall@hold|旋风:whirlwind=swirl@LR|闪光:sparkle=sparkle|阴阳:yin-yang=yinyang|#3ab8f8,#ffd23f,#eefaff
sp_collab_slice_of_life|日常:slice of life|对话框:speech bubble=speech@hold|茶杯:teacup=teacup@base|心:heart=heart|小屋:home=houseMini|#ff9a5a,#3ab8a8,#fff4ec
sp_collab_chase_comedy|追逐:chase comedy|疾风线:speed lines=speedLines@tail|尘烟:dust cloud=dustCloud@base|脚印:footprint=pawPrint|火星:spark=spark|#ff8a3a,#5a6ad8,#fff4e4
sp_collab_inventor|发明:invention|灯泡:idea bulb=bulb@top|扳手:wrench=wrench@hold|螺丝:screw=screw|齿轮:gear=gearMini|#c08a3a,#3ab8f8,#fff4e0
sp_collab_fairy_castle|童话城堡:fairy castle|旗帜:pennant=flag@top|塔楼:turrets=castleTower@LR|闪光:sparkle=sparkle|心:heart=heart|#ff9ac8,#8a7af8,#fff4fa
sp_collab_cartoon_caper|卡通:cartoon caper|爆光:pow burst=burst@back|弹簧:spring=spring@base|星:star=star|闪光:sparkle=sparkle|#ffd23f,#e8343a,#fff8dc
sp_collab|委托:commission|印章:seal=stamp@hold|信封:envelopes=envelope@orb|便签:note card=noteCard|星徽:star badge=badgeStar|#8a6a3a,#3a6ad8,#fff4e4
sp_link_test_lab|试验:test lab|试管:test tubes=tube@LR|气泡:bubbles=bubble@top|小烧瓶:little flask=flask|原子核:nucleus=nucleus|#3ab8a8,#e8463c,#effffc
sp_link_data|数据:data|数据块:data blocks=data@hold|柱状图:chart=chart@orb|像素:pixel=pixel|密码轮:cipher=cipherWheel|#3a6ad8,#3ae8a8,#eef4ff|pat=circuit
sp_link_sample|样本:sample|标签:label=tag@hold|载玻片:slide=slideGlass@base|水滴:drop=drop|孢子:spore=spore|#5ab8f8,#e8a03a,#f0faff
sp_link_report|报告:report|柱状图:chart=chart@hold|书签:bookmark=bookmark@top|书页:page=page|奖章:medal=medal|#3a5a8a,#e8b030,#eef4fa|pat=paper
sp_link_batch_no|批号:batch number|条码:barcode=barcode@hold|标签:tags=tag@orb|档案盒:archive box=archiveBox|印纹:stamp=stamp|#6a7a8a,#e8603a,#f4f6f8
sp_link_inspection|检测:inspection|夹板:clipboard=clipboard@hold|检测光:scan light=lightSpot@orb|试管:test tube=tube|小盾:shield=shieldMini|#2f9e6a,#e8b030,#eafff4
sp_link_analysis|分析:analysis|放大镜:magnifier=magnifier@hold|数据块:data=data@orb|骰子:dice=dice|镜片:lens=lens|#8a5ad8,#3ab8f8,#f4eeff|pat=grid
sp_link_archive|归档:archive|档案盒:archive box=archiveBox@hold|书页:pages=page@orb|标签:tag=tag|锁:lock=lock|#a07a4a,#3a6a8a,#fff4e4
sp_link_review|审核:review|天平:balance=balance@tail|羽毛笔:quill=quill@hold|印纹:stamp=stamp|宝石:gem=gem|#c0392b,#e8c06a,#fff2ea
sp_event_check_in|签到:check-in|日历页:calendar page=calPage@hold|闪光:sparkles=sparkle@orb|星:star=star|星徽:star badge=badgeStar|#3ab86a,#ffd23f,#effff4
sp_event_double_xp|双倍:double XP|双星:twin stars=twinStar@hold|光芒:rays=ray@orb|爆光:burst=burst|闪电:zap=zap|#8a5af8,#ffd23f,#f6f0ff
sp_event_anniversary|周年:anniversary|蜡烛:candle=candleStick@top|彩带:streamer=ribbon@base|礼盒:gift=gift|心:heart=heart|#ff7ab8,#ffd23f,#fff4fa
sp_event_ladder_climber|冲榜:leaderboard climb|奖杯:trophy=trophy@top|旗帜:flag=flag@hold|奖章:medal=medal|柱状图:chart=chart|#e8b030,#3a6ad8,#fff6dc
sp_event_jigsaw|拼图:jigsaw|拼图块:pieces=puzzle@orb|图片:picture=photo@hold|字块:tile=tile|宝石:gem=gem|#3a8ad8,#ff8a3a,#eef6ff
sp_event_treasure_hunt|寻宝:treasure hunt|藏宝图:treasure map=scroll@hold|罗盘针:compass needle=compassNeedle@orb|铜钱:coin=coin|钻石:diamond=diamond|#c08a3a,#e8343a,#fff4e0
sp_event_punch_card|打卡:punch card|打孔卡:punch card=punchCard@hold|闹铃:alarm bells=alarmBell@tail|星:star=star|日历页:calendar page=calPage|#e8603a,#3a5a8a,#fff4ee
sp_event_fortune_stick|抽签:fortune stick|签条:sticks=stick@top|祥云:cloud=cloud@base|签:stick=stick|中国结:knot=knot|#c0392b,#e8c06a,#fff2e4|body=phin
sp_event_victory_toast|庆功:victory toast|碰杯:cheers=cheers@hold|爆光:burst=burst@back|闪光:sparkle=sparkle|奖杯:trophy=trophy|#f2c14e,#e8343a,#fff8dc
sp_event_night_watch|守夜:night watch|月牙:crescent=moon@orb|灯光:lamplight=lightSpot@hold|萤光:glow=glow|小盾:shield=shieldMini|#2a3a6a,#f2c14e,#eef0fa
sp_event_patrol|巡检:patrol|手电光:torch beam=lightBeam@hold|足迹:footprints=pawPrint@base|小旗:flag=flag|星徽:star badge=badgeStar|#3a8a5a,#e8b030,#eefaf4
sp_event_calibration|校准:calibration|刻度尺:scale=rulerTicks@base|准星:reticle=cipherWheel@hold|螺母:nut=nut|天平:balance=balance|#3a6ad8,#e8603a,#eef2ff
sp_event_metronome|节拍:metronome|音符:notes=note@orb|声波:beat=soundWave@base|双音符:notes=notes2|摆锤:pendulum=pendulum|#8a4a2a,#f2c14e,#fff0e0
sp_event_gift_box|礼盒:gift box|蝴蝶结:bow=bow@top|彩纸:confetti=sprinkle@orb|糖果:candy=candy|星:star=star|#e8346a,#ffd23f,#fff0f6
sp_event_badge|徽章:badge|绶带:ribbon=ribbon@base|星星:stars=star@orb|奖章:medal=medal|小盾:shield=shieldMini|#3a5ad8,#ffd23f,#eef2ff
sp_lab_folding_fan|折扇:folding fan|流苏:tassel=tassel@tail|梅花:plum flowers=plum@orb|风丝:breeze=mist|玉璧:jade disc=jadeDisc|#e8463c,#2a2a3a,#fff4e8
sp_lab_spinning_top|陀螺:spinning top|旋风:whirl=swirl@tail|疾风线:spin lines=speedLines@base|小陀螺:little top=topSpin|螺旋:spiral=spiral|#3a8ad8,#ffd23f,#eef6ff|pat=ring
sp_lab_pinwheel|风车:pinwheel|风丝:breeze=mist@LR|云:clouds=cloud@orb|小风车:little pinwheel=pinwheel|太阳:sun=sunDisc|#ff5a8a,#3ab8f8,#fff4f8
sp_lab_kaleidoscope|万花筒:kaleidoscope|万花纹:pattern=kaleido@hold|镜片:mirror shards=mirrorShard@orb|宝石:gem=gem|棱镜:prism=prismTri|#8a5af8,#ffd23f,#f6f0ff|pat=check
sp_lab_music_box|八音盒:music box|音梳:comb=musicComb@hold|发条钥:wind-up key=gearToy@tail|音符:note=note|双音符:notes=notes2|#c08a3a,#ff7ab8,#fff4e8
sp_lab_building_block|积木:building block|积木:block=block@hold|拱:arch=archMini@base|像素:pixel=pixel|空间框:frame=cubeFrame|#e8463c,#3a8ad8,#fff4ee|pat=check
sp_lab_yarn|毛线:yarn|毛线球:yarn ball=yarnBall@hold|纽扣:buttons=button@orb|心:heart=heart|蝴蝶结:bow=bow|#ff8a8a,#3ab8a8,#fff0f0
sp_lab_button|纽扣:button|针线:thread=thread@tail|布带:fabric strip=ribbon@base|小纽扣:little button=button|宝石:gem=gem|#3a6ad8,#f2c14e,#eef4ff
sp_lab_candlestick|烛台:candlestick|烛火:candle flame=candle@top|烛托:dish=bowl@base|萤光:glow=glow|火焰:flame=flame|#e8c06a,#ff6a1a,#fff8e0
sp_lab_globe|地球仪:globe|指针:pointer=compassNeedle@hold|云:clouds=cloud@orb|圆叶:leaf=leafR|地球:earth=globe|#3a8ad8,#5ab84a,#eef6ff
sp_lab_telescope|望远镜:telescope|星星:stars=star@orb|镜片:lens=lens@hold|彗星:comet=comet|行星:planet=planet|#3a3a6a,#f2c14e,#eeeef8
sp_lab_microscope|显微镜:microscope|载玻片:slide=slideGlass@hold|细胞:cells=nucleus@orb|孢子:spore=spore|镜片:lens=lens|#c8d4e0,#3a6ad8,#ffffff
sp_lab_beaker|烧杯:beaker|蒸汽:vapour=steam@top|药滴:drops=drop@orb|气泡:bubble=bubble|宝石:gem=gem|#5ad8c8,#e8603a,#effffc
sp_lab_test_tube|试管:test tube|药滴:drop=drop@base|气泡:bubbles=bubble@orb|小试管:little tube=tube|烧瓶:flask=flask|#8a5af8,#5ae8a8,#f6f0ff
sp_lab_thermometer|温度计:thermometer|热浪:heat=steam@top|雪花:snowflake=snowflake@orb|水滴:drop=drop|火焰:flame=flame|#e8343a,#3ab8f8,#fff0f0
sp_lab_magnet|磁铁:magnet|磁力线:magnetic field=echoArc@LR|回形针:paper clips=clip@orb|螺母:nut=nut|闪电:zap=zap|#e8343a,#c8d0dc,#fff0f0
sp_lab_prism|棱镜:prism|光谱带:spectrum=spectrum@tail|闪光:sparkles=sparkle@orb|光芒:ray=ray|钻石:diamond=diamond|#e8f4ff,#8a5af8,#ffffff|pat=facet
sp_lab_envelope|信封:envelope|邮票:stamp=postStamp@hold|心:hearts=heart@orb|便签:note=noteCard|火漆印:wax seal=stamp|#f4ecd8,#e8343a,#ffffff
sp_lab_stamp|邮票:postage stamp|邮戳:postmark=stamp@hold|飞燕:swallows=swallowTail@orb|小邮票:little stamp=postStamp|地球仪:globe=globe|#3ab86a,#e8603a,#effff4
sp_lab_candle|蜡烛:candle|火苗:flame=flame@top|烛泪:wax drops=drop@orb|火星:spark=spark|暖阳:warm sun=sunDisc|#f4e8d0,#ff8a1a,#ffffff
sp_lab_matchstick|火柴:match|火花:spark=spark@top|烟:smoke=smoke@orb|小火柴:little match=matchStick|余烬:ember=ember|#c08a3a,#e8343a,#fff0e0
sp_lab_notebook|笔记本:notebook|铅笔:pencil=pencil@hold|便签:notes=noteCard@orb|书页:page=page|书签:bookmark=bookmark|#3a6ad8,#f2c14e,#eef4ff|pat=paper
sp_lab_sticky_note|便签:sticky note|回形针:paper clip=clip@top|心:hearts=heart@orb|小便签:little note=noteCard|星:star=star|#ffe84a,#ff5a8a,#fffbe0
sp_lab_stapler|订书机:stapler|订书钉:staples=staple@orb|纸页:paper=page@hold|回形针:paper clip=clip|螺母:nut=nut|#e8343a,#a8b0c0,#fff0f0
sp_lab_paper_clip|回形针:paper clip|便签:note=noteCard@hold|磁铁:magnet=magnet@orb|小回形针:little clip=clip|链环:chain=chain|#a8b8c8,#3a8ad8,#f4f8fc
sp_lab_eraser|橡皮:eraser|碎屑:crumbs=sprinkle@base|铅笔:pencil=pencil@tail|小橡皮:little eraser=eraser|心:heart=heart|#ff8ab8,#3a8ad8,#fff4fa
sp_lab_ruler|尺子:ruler|直角尺:set square=step@hold|圆规针:compass point=compassNeedle@orb|铅笔:pencil=pencil|天平:balance=balance|#f2c14e,#3a5a8a,#fff8dc
sp_lab_tape|胶带:tape|剪刀刃:scissor blade=blade@hold|胶条:tape strip=ribbon@base|小胶带:little roll=tape|闪光:sparkle=sparkle|#ffd23f,#3ab8a8,#fffbe8
sp_lab_desk_lamp|台灯:desk lamp|光束:light beam=beam@hold|书页:pages=page@orb|灯泡:bulb=bulb|光核:light core=glow|#3a8ad8,#ffd84a,#eef6ff
sp_lab_alarm_clock|闹钟:alarm clock|声波:ringing=echoArc@LR|月牙:crescent=moon@orb|晨日:morning sun=sunDisc|钟面:clock face=dial|#e8343a,#f2c14e,#fff0ec
sp_lab_desk_fan|风扇:desk fan|疾风线:breeze lines=speedLines@tail|雪花:snowflake=snowflake@orb|扇叶:fan blade=fanBlade|传动轮:wheel=wheel|#5ab8f8,#3a5a8a,#f4fbff
sp_lab_pencil|铅笔:pencil|橡皮头:eraser cap=eraser@top|纸页:paper=page@hold|刻度尺:ruler=rulerTicks|钻石:diamond=diamond|#ffd23f,#ff8ab8,#fff8dc
`;
