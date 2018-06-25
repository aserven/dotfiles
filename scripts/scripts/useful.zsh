
# append history lines from current session to the history file
history -a

# update the current history list
history -r

!n                  # Refer command line n
!!                  # Refer to the previous command
!string             # most recent command starting with string
^string1^string2    # Quick substitution, repeat the last command

!$  # previous command last argument
!^  # previous command first argument
!*  # previous command all arguments


C-a     # start current line
C-e     # end of the line
C-f     # forward a character
C-b     # back a character
M-f     # forward to the end of the next word
M-b     # move back to the start of the current or previous word

M-Del   # delete word before cursor
M-d     # delete word after cursor
C-d     # Delete character under cursor
C-h     # Delete character before cursor
C-w     # Cut the word before the cursor to the clipboard
C-k     # Cut the line after the cursor to the clipboard
C-u     # Cut/delete the line before the cursor to the clipboard
C-y     # paste the last thing to be cut
C-_     # undo

C-x C-e # open editor and write your command there

# useful commands
grep
tee
cut
find
nl
xargs
watch
tail
sort
diff
uniq
wc
sed
tee
curl
tr
cat
comm
head

# new ones!
jq
rg
icdiff
jid
pv
httpie
spark
jj
hub
yank
tig
awless
dbcli
