#!/bin/sh
# script to convert javascript programs in a directory into a set of literal javascript strings for loading
#
# usage:
# makeJsStrings.sh directory
#
# strings are output to the standard output
#
# NOTE: javascript routines CANNOT contain single quotes!!!
        

directory=$1 # name of directory containing a set of javascript programs

if [ ${1}NotSpecified =  NotSpecified ]; then
  echo Input directory not specified
  exit
fi

rm -f examples.js # clear temporary file

for fileName in `ls $directory` ; do
  stringName=`echo $fileName | sed -e s/.js\$//`
  (echo "${stringName} ='\\\\"
  sed -e "s/$/\\\\n\\\\/" < $directory/$fileName
  echo "'") >>examples.js
done
