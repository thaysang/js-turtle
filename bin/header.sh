#!/bin/bash
files='
  about.html 
  animation.html 
  examples.html 
  guide.html 
  javascript.html 
  nerd.html 
  overview.html 
  reference.html 
  tutorial.html'


for file in $files
do
 echo $file
 # extract the header from overview
 sed -ne '/<header>/,/<\/header>/p' \
     <overview.html >temp
 # make the active link the current file
 sed -e '/ class="active"/s///' \
     -e "/href=\"${file}\"/s//class=\"active\" &/"\
     <temp >temp2
 # replace existing header with modified header
 sed -e '/<header>/,/<\/header>/d'\
     -e '/<body>/r temp2' \
     -i $file
done

# clean up
rm temp temp2
