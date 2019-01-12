#!/bin/sh
# script to add examples as options to select in turtle.html file
#
# usage:
#   modifyHTML.sh directory
        

directory=$1 # name of directory containing a set of javascript programs

if [ ${1}NotSpecified =  NotSpecified ]; then
  echo Input directory not specified
  exit
fi

#rm -f tmp # in case it exists
echo '          <option selected value='example'>Examples</option>' > tmp

for fileName in `ls $directory` ; do
  optionName=`head -1 $directory/$fileName |sed "s/^\/\/ *\(.*\) --.*$/\1/"`
  echo "$fileName" | sed -e "s/\(.*\)\.js/          <option value=\1><\/option>/" -e "s/></>$optionName</" >>tmp
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
