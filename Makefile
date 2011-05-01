build:
	mkdir -p build/src
	mkdir -p build/textarea/src
	./Makefile.dryice.js
	./Makefile.dryice.textarea.js

clean:
	rm -rf build
	rm -rf ace-*
	rm -f ace-*.tgz

amps:
	cp build/src/mode-css.js ../../trilogy/dev/amps/public/ace/
	cp build/src/mode-html.js ../../trilogy/dev/amps/public/ace/
	cp build/src/mode-javascript.js ../../trilogy/dev/amps/public/ace/
	cp build/src/mode-liquid.js ../../trilogy/dev/amps/public/ace/
	cp build/src/mode-ruby.js ../../trilogy/dev/amps/public/ace/
	cp build/src/mode-xml.js ../../trilogy/dev/amps/public/ace/
	cp build/src/theme-amps_dark.js ../../trilogy/dev/amps/public/ace/
	cp build/src/theme-amps_light.js ../../trilogy/dev/amps/public/ace/
	cp build/src/theme-amps_white.js ../../trilogy/dev/amps/public/ace/
	cp build/src/theme-amps_black.js ../../trilogy/dev/amps/public/ace/
	cp build/src/ace.js ../../trilogy/dev/amps/public/ace/
	cp build/src/ace-uncompressed.js ../../trilogy/dev/amps/public/ace/

ace.tgz: build
	mv build ace-`./version.js`/
	cp Readme.md ace-`./version.js`/
	cp LICENSE ace-`./version.js`/
	tar cvfz ace-`./version.js`.tgz ace-`./version.js`/

dist: clean build ace.tgz
