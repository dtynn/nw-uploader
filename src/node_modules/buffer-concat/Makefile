TESTS = test/*.js
REPORTER = spec
TIMEOUT = 10000
JSCOVERAGE = ./node_modules/jscover/bin/jscover

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(TESTS)

lib-cov:
	@rm -rf $@
	@$(JSCOVERAGE) lib $@

test-cov: lib-cov
	@BUFFER_CONCAT_COV=1 $(MAKE) test REPORTER=dot
	@BUFFER_CONCAT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

.PHONY: test lib-cov test-cov
