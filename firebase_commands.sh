#!/bin/sh

firebase init

firebase apps:create

firebase apps:sdkconfig WEB <Firebase App ID> > src/base.js

# add alias to the project (e.g. for identify environment and apply env variables)
firebase use --add