#!/bin/sh

firebase init

firebase apps:create

firebase apps:sdkconfig WEB 1:534523350857:web:3ab0b099800e47bdda9498 > src/base.js
