import sys
p = sys.argv[1] + '/base.html'; s = open(p).read()
a = "let APP_VERSION = '2026.10.08.3';"
assert s.count(a) == 1
open(p, 'w').write(s.replace(a, "let APP_VERSION = '2026.10.08.10';"))
