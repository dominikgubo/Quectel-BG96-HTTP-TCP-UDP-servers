#!/bin/sh

PORT="$1"

echo "Starting UDP server and listening on $1"

netcat -l -u -k $1
