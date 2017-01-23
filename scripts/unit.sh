#!/bin/bash

set -e

npm run lint 
karma start karma.conf.js --single-run 
cat ./build/coverage/report-text/text-summary.txt 
echo  '\nCoverage Detail: ./build/coverage/report-html/index.html\n'