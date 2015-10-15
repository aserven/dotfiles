# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
#force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# colored GCC warnings and errors
#export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

if [ -f /usr/bin/archey ]; then
    archey
fi

source ~/.git-prompt.sh
#PS1='\[\e[0;32m\]\u\[\e[m\] \[\e[1;34m\]\w\[\e[m\] \$(git branch 2>/dev/null | grep '^*' | colrm 1 2)\$ \n\[\e[1;32m\]\$\[\e[m\] \[\e[0;37m\]'

export PATH=/usr/local/bin/mongo:$PATH

export keyQA='/home/bellahora-04/.ssh/authorized_keys/bellahoraQA.pem'


# Reset
Color_Off='\e[0m'       # Text Reset

# Regular Colors
Black='\e[0;30m'        # Black
Red='\e[0;31m'          # Red
Green='\e[0;32m'        # Green
Yellow='\e[0;33m'       # Yellow
Blue='\e[0;34m'         # Blue
Purple='\e[0;35m'       # Purple
Cyan='\e[0;36m'         # Cyan
White='\e[0;37m'        # White

# Bold
BBlack='\e[1;30m'       # Black
BRed='\e[1;31m'         # Red
BGreen='\e[1;32m'       # Green
BYellow='\e[1;33m'      # Yellow
BBlue='\e[1;34m'        # Blue
BPurple='\e[1;35m'      # Purple
BCyan='\e[1;36m'        # Cyan
BWhite='\e[1;37m'       # White

# Underline
UBlack='\e[4;30m'       # Black
URed='\e[4;31m'         # Red
UGreen='\e[4;32m'       # Green
UYellow='\e[4;33m'      # Yellow
UBlue='\e[4;34m'        # Blue
UPurple='\e[4;35m'      # Purple
UCyan='\e[4;36m'        # Cyan
UWhite='\e[4;37m'       # White

# Background
On_Black='\e[40m'       # Black
On_Red='\e[41m'         # Red
On_Green='\e[42m'       # Green
On_Yellow='\e[43m'      # Yellow
On_Blue='\e[44m'        # Blue
On_Purple='\e[45m'      # Purple
On_Cyan='\e[46m'        # Cyan
On_White='\e[47m'       # White

# High Intensity
IBlack='\e[0;90m'       # Black
IRed='\e[0;91m'         # Red
IGreen='\e[0;92m'       # Green
IYellow='\e[0;93m'      # Yellow
IBlue='\e[0;94m'        # Blue
IPurple='\e[0;95m'      # Purple
ICyan='\e[0;96m'        # Cyan
IWhite='\e[0;97m'       # White

# Bold High Intensity
BIBlack='\e[1;90m'      # Black
BIRed='\e[1;91m'        # Red
BIGreen='\e[1;92m'      # Green
BIYellow='\e[1;93m'     # Yellow
BIBlue='\e[1;94m'       # Blue
BIPurple='\e[1;95m'     # Purple
BICyan='\e[1;96m'       # Cyan
BIWhite='\e[1;97m'      # White

# High Intensity backgrounds
On_IBlack='\e[0;100m'   # Black
On_IRed='\e[0;101m'     # Red
On_IGreen='\e[0;102m'   # Green
On_IYellow='\e[0;103m'  # Yellow
On_IBlue='\e[0;104m'    # Blue
On_IPurple='\e[0;105m'  # Purple
On_ICyan='\e[0;106m'    # Cyan
On_IWhite='\e[0;107m'   # White


PS1="\[$BIPurple\]\H\[$BRed\]-\[$BBlue\]\u\[$Yellow\]\[$Yellow\]\w\[$BGreen\]\$(__git_ps1)\n\[$Green\]\$\[$White\] "
#### PROMPT ESCAPES
#Bash allows these prompt strings to be customized by inserting a
#number of backslash-escaped special characters that are
#decoded as follows:
#
#	\a		an ASCII bell character (07)
#	\d		the date in "Weekday Month Date" format (e.g., "Tue May 26")
#	\D{format}	the format is passed to strftime(3) and the result
#			  is inserted into the prompt string an empty format
#			  results in a locale-specific time representation.
#			  The braces are required
#	\e		an ASCII escape character (033)
#	\h		the hostname up to the first `.'
##	\H		the hostname
#	\j		the number of jobs currently managed by the shell
#	\l		the basename of the shell's terminal device name
#	\n		newline
#	\r		carriage return
#	\s		the name of the shell, the basename of $0 (the portion following
#			  the final slash)
#	\t		the current time in 24-hour HH:MM:SS format
#	\T		the current time in 12-hour HH:MM:SS format
#	\@		the current time in 12-hour am/pm format
#	\A		the current time in 24-hour HH:MM format
#	\u		the username of the current user
#	\v		the version of bash (e.g., 2.00)
#	\V		the release of bash, version + patch level (e.g., 2.00.0)
#	\w		the current working directory, with $HOME abbreviated with a tilde
#	\W		the basename of the current working directory, with $HOME
#			 abbreviated with a tilde
#	\!		the history number of this command
#	\#		the command number of this command
#	\$		if the effective UID is 0, a #, otherwise a $
#	\nnn		the character corresponding to the octal number nnn
#	\\		a backslash
#	\[		begin a sequence of non-printing characters, which could be used
#			  to embed a terminal control sequence into the prompt
#	\]		end a sequence of non-printing characters
#
#	The command number and the history number are usually different:
#	the history number of a command is its position in the history
#	list, which may include commands restored from the history file
#	(see HISTORY below), while the command number is the position in
#	the sequence of commands executed during the current shell session.
#	After the string is decoded, it is expanded via parameter
#	expansion, command substitution, arithmetic expansion, and quote
#	removal, subject to the value of the promptvars shell option (see
#	the description of the shopt command under SHELL BUILTIN COMMANDS
#	below).

function pre_prompt {
    newPWD="${PWD}"
    user="whoami"
    host=$(echo -n $HOSTNAME | sed -e "s/[\.].*//")
    datenow=$(date "+%a, %d %b %y")
    let promptsize=$(echo -n "-----------($user@$host)(${PWD})----" \
                     | wc -c | tr -d " ")
    let fillsize=${COLUMNS}-${promptsize}
    fill=""
    while [ "$fillsize" -gt "0" ] 
    do 
        fill="${fill}─"
        let fillsize=${fillsize}-1
    done
    if [ "$fillsize" -lt "0" ]
    then
        let cutt=3-${fillsize}
        newPWD="...$(echo -n $PWD | sed -e "s/\(^.\{$cutt\}\)\(.*\)/\2/")"
    fi

}

PROMPT_COMMAND=pre_prompt

export black="\[\033[0;38;5;0m\]"
export red="\[\033[0;38;5;1m\]"
export orange="\[\033[0;38;5;130m\]"
export green="\[\033[0;38;5;2m\]"
export yellow="\[\033[0;38;5;3m\]"
export blue="\[\033[0;38;5;4m\]"
export bblue="\[\033[0;38;5;12m\]"
export magenta="\[\033[0;38;5;55m\]"
export cyan="\[\033[0;38;5;6m\]"
export white="\[\033[0;38;5;7m\]"
export coldblue="\[\033[0;38;5;33m\]"
export smoothblue="\[\033[0;38;5;111m\]"
export iceblue="\[\033[0;38;5;45m\]"
export turqoise="\[\033[0;38;5;50m\]"
export smoothgreen="\[\033[0;38;5;42m\]"

PS1="\n$green┌───($blue\u$orange@$bblue\h$green)\${fill}($yellow\$newPWD\
$green)───┐\n$green└─$smoothgreen\$(__git_ps1)$green──▶$white "

# bash_history settings: size and no duplicates and no lines w/ lead spaces
export HISTCONTROL="ignoreboth"
export HISTSIZE=1024

