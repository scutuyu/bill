#! /bin/bash

for i in $(ls -p | grep /)
do
    if [[ "" != $(ls $i | grep redis-server) ]];
    then
        cd $i
        redis-server redis-${i%/*}.conf
        cd ..
    fi
done

exit 0

cd 6379
redis-server redis-6379.conf
cd ../6380
redis-server redis-6380.conf
cd ../6381
redis-server redis-6381.conf
cd ../6382
redis-server redis-6382.conf
cd ../6383
redis-server redis-6383.conf
cd ../6384
redis-server redis-6384.conf

