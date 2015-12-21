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

rm -f tmp tmp2 # in case it exists
touch tmp # create temporary file
rm -f examples.js # clear temporary file

for f in `ls $directory` ; do
  fileName=`echo $f | sed -e s/.js\$//`
  optionName=`head -1 $directory/$f |sed "s/^\/\/ *\(.*\) --.*$/\1/"`
  echo "$f" | sed -e "s/\(.*\)\.js/          <option value=\1><\/option>/" -e "s/></>$optionName</" >>tmp
  (echo "${fileName} ='\\\\"
  cat $directory/$f | sed -e "s/$/\\\\n\\\\/"
  echo "'") >>examples.js
done

# add the new options to the turtle.html file
cp -f turtle.html backups/turtle.html.`date "+%Y-%m-%d.%H.%M.%S"`
(
  sed -n -e "1,/<select id=examples>/p" <turtle.html
  cat tmp
  sed -n -e "/<\/select>/,\$p" <turtle.html
) >> tmp2
mv -f tmp2 turtle.html

# clean up
rm -f tmp tmp2
