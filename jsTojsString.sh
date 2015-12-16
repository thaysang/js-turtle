#!/bin/sh
# script to convert javascript program into a literal javascript string for loading

inFileName=$1 # name of the input file, assumed to be a javascript program
stringName=$2 # name of the string to be assinged
outFileName=$3 # name of the output file to contain a javascript program with string assignment

(echo "${stringName} ='\\\\"
cat $inFileName | sed -e "s/$/\\\\n\\\\/"
echo "'" )>$outFileName
