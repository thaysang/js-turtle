#!/bin/sh
# script to convert JavaScript programs in a directory into a set of literal JavaScript strings for loading
#
# usage:
# buildJsStrings.sh directory
#
# strings are output to the standard output
#
# NOTE: JavaScript routines CANNOT contain single quotes!!!


directory=$1 # name of directory containing a set of JavaScript programs

if [ ${1}NotSpecified =  NotSpecified ]; then
  echo Input directory not specified
  exit
fi

rm -f examples.js # clear temporary file

for fileName in `ls $directory` ; do
  stringName=`echo $fileName | sed -e s/.js\$//`
  (echo "${stringName} ='\\"
  sed -e "s/$/\\\\n\\\\/" < $directory/$fileName
  echo "'") >>examples.js
done
