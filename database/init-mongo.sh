#!/bin/bash

mongorestore --host 127.0.0.1:27017 --username admin --password 939afd1cf9640827468cecd3bffd64236bec09a71f7f5c64dba153eab3f36b7c --authenticationDatabase admin /data/db/backup
