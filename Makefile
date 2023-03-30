all: eslint build run

build:
	npx tsc -p tsconfig.json

run:
	node dist/main.js

test:
	npx jest tst/*.ts

eslint:
	npx eslint src tst

# parcel:
# 	npx parcel dist/index.html

clean:
	rm -f *~
