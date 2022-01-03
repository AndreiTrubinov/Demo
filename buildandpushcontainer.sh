#!/bin/bash

npm run build && docker build --platform="amd64" -t registry.gitlab.com/mirspcm/izipropal-web/webimage:latest . && docker push registry.gitlab.com/mirspcm/izipropal-web/webimage:latest

