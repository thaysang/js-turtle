#!/bin/bash
# this script produces a list of files in the current directory that are
# not included in the index.html file

for i in $( ls *.html); do
  grep -q "$i" index.html
  if [ $? != 0 ]; then
    echo "$i"
  fi
done 
