all: eslint build run

build:
	npx tsc -p tsconfig.json

run:
	node dist/motor.js

test:
	npx jest --coverage tst/*.ts

eslint:
	npx eslint src tst

# parcel:
# 	npx parcel dist/index.html

clean:
	rm -f *~
