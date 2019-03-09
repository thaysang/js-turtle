#!/bin/bash
for file in $*
do
 echo $file
 # extract the header from index.html
 sed -ne '/<header>/,/<\/header>/p' <index.html >temp
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
