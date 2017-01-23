#!/bin/bash

set -e

NODE_ENV=mock

npm run unit
npm run e2e