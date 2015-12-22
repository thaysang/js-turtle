#!/bin/sh
# script to convert javascript programs in a directory into a set of literal javascript strings for loading
#
# usage:
# makeJsStrings.sh directory
#
# strings are output to the standard output
# a set of options are insered between the <select id=examples> and </select> tags in the turtle.html file
#
# NOTE: javascript routines CANNOT contain single quotes!!!
        

directory=$1 # name of directory containing a set of javascript programs

if [ ${1}NotSpecified =  NotSpecified ]; then
  echo Input directory not specified
  exit
fi

rm -f tmp # in case it exists
rm -f examples.js # clear temporary file

for fileName in `ls $directory` ; do
  stringName=`echo $fileName | sed -e s/.js\$//`
  optionName=`head -1 $directory/$fileName |sed "s/^\/\/ *\(.*\) --.*$/\1/"`
  echo "$fileName" | sed -e "s/\(.*\)\.js/          <option value=\1><\/option>/" -e "s/></>$optionName</" >>tmp
  (echo "${stringName} ='\\\\"
  sed -e "s/$/\\\\n\\\\/" < $directory/$fileName
  echo "'") >>examples.js
done

# add the new options to the turtle.html file
backupName=backups/turtle.html.`date "+%Y-%m-%d.%H.%M.%S"`
cp -f turtle.html $backupName
(
  sed -n -e "1,/<select id=examples>/p" <$backupName
  cat tmp
  sed -n -e "/<\/select>/,\$p" <$backupName
) > turtle.html

# clean up
rm -f tmp 
