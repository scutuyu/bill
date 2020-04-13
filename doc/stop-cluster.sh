#! /bin/bash

result=`ps -ef | grep redis-server | grep cluster`

if [[ "" == $result ]];
then
    echo ">>> the redis cluster is not started"
    exit 1
fi

ps -ef | grep redis-server | grep cluster | awk '{print $2}' |xargs kill -9

if [[ "" == $(ps -ef | grep redis-server | grep -v grep) ]];
then
    echo ">>> stop redis cluster successful!"
else
   ps -ef | grep redis-server | grep -v grep
fi
