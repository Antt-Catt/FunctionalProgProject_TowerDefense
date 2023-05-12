all: eslint build

build:
	npx tsc -p tsconfig.json

run:
	node dist/motor.js

test:
	npx jest --coverage tst/*.ts

eslint:
	npx eslint src tst

parcel:
	npx parcel html/game.html

clean:
	rm -rf *~ coverage .parcel-cache dist/* doc/*.aux doc/*.toc doc/*.log doc/*.out doc/report.pdf
