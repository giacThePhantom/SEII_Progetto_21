#!/usr/bin/zsh

PREFIX=""
VERSION=""

if [ "$1" = "local" ]; then
	PREFIX="localhost:3000/api/v$2/"
	echo "Testing in local $PREFIX"
elif [ "$1" = "remote" ]; then
	PREFIX="https://se-2-progetto-21-test.herokuapp.com/api/v$2/"
	echo "Testing on remote $PREFIX"
fi

if [ ! "$3" = "" ]; then
	echo "Test on $PREFIX$3"
	wget "$PREFIX$3" -O - --content-on-error | jq '.'
fi
