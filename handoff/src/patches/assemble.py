import sys
W='t'
s=open(W+'/base.html').read()
lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if '${assetImg}' in l and '${aw?aw.back' in l]
assert len(idx)==1; lines[idx[0]]=lines[idx[0]].replace('${assetImg}','',1)
s='\n'.join(lines)
mark='/* 自动生成（tools/txextract.js）：程序内全部三语文案'
assert s.count(mark)==1
i=s.index(mark)
parts=''.join(open(f'{W}/parts/p{n}.js').read() for n in range(41,53))
open(sys.argv[1],'w').write(s[:i]+parts+s[i:])
