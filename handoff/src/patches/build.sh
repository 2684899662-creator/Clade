set -e
cd /tmp/claude-0/-home-user-Clade/a7ad1b4f-2910-5b4e-8d02-1e00fcf429d1/scratchpad
python3 -I replay.py > replay.log 2>&1
for p in patches/p*.py; do python3 -I $p $PWD/t; done
python3 -I assemble.py /home/user/Clade/index.html
python3 -I -c "
import re;s=open('/home/user/Clade/index.html').read();open('app.js','w').write(re.findall(r'<script>([\s\S]*?)</script>',s)[-1])"
node --check app.js && echo BUILD-OK
