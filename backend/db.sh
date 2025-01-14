#!/bin/bash

exec gosu postgres /usr/local/bin/docker-entrypoint.sh "$@"