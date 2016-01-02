
alias la='ls -la'
alias ll='ls-l'

if [ -f /usr/bin/archey ]; then
    archey
fi
if [ -f /usr/bin/toilet ]; then
    toilet -f mono9 Albert
fi

promptCommand() {
    # set an error string for the prompt, if applicable
    if [ $? -eq 0 ]; then
        ERRPROMPT=" "
    else
        ERRPROMPT=" ($?) "
    fi

    local BRANCH=""

    # if we're in a Git repo, show current branch
    if [ "\$(type -t __git_ps1)" ]; then
        BRANCH="\$(__git_ps1 '[ %s ]')"
    fi

    if [ -d ".svn" ]; then
        BRANCH="[ "`svn info | awk '/Last\ Changed\ Rev/ {print $4}'`" ]"
    fi

    local LOAD=`cut -d' ' -f1 /proc/loadavg`
    #local TIME=`date +"%d.%m.%Y %H:%M:%S"`
    local TIME=`date +"%H:%M:%S"`
    local CURENT_PATH=`echo ${PWD/#$HOME/\~}`

    # trim long path
    if [ ${#CURENT_PATH} -gt "35" ]; then
        let CUT=${#CURENT_PATH}-35
        CURENT_PATH="...$(echo -n $PWD | sed -e "s/\(^.\{$CUT\}\)\(.*\)/\2/")"
    fi

    local TITLEBAR="${CURENT_PATH}\a"

    local GREEN="\[\033[0;32m\]"
    local BGREEN="\[\033[1;32m\]"
    local BYELLOW="\[\033[1;33m\]"
    local BPURPLE="\[\033[1;35m\]"
    local CYAN="\[\033[0;36m\]"
    local BCYAN="\[\033[1;36m\]"
    local BLUE="\[\033[0;34m\]"
    local GRAY="\[\033[0;37m\]"
    local DKGRAY="\[\033[1;30m\]"
    local WHITE="\[\033[1;37m\]"
    local RED="\[\033[0;31m\]"
    # return color to Terminal setting for text color
    local DEFAULT="\[\033[0;39m\]"

    PROMPT="[ ${USER}@${HOSTNAME} ]$ERRPROMPT [ ${CURENT_PATH} ] "

    # different prompt and color for root
    local PR="$ "
    local USERNAME_COLORED="${GREEN}${USER}${WHITE}@${GREEN}${HOSTNAME}"
    if [ "$UID" = "0" ]; then
        PR="# "
        USERNAME_COLORED="${RED}${USER}${GREEN}@${RED}${HOSTNAME}"
    fi

    # use only ASCII symbols in linux console
    local DASH="\[\e(0q\e(B\]"
    local TC="\[\e(0l\e(B\]"
    local CC="\[\e(0k\e(B\]"
    local BC="\[\e(0\]m\[\e(B\]"
    if [ "$TERM" = "linux" ]; then
        TITLEBAR=""
        DASH="-"
        TC=""
        BC=""
    fi

    local SEPARATOR=""
    let FILLS=${COLUMNS}-${#PROMPT}
    for (( i=0; i<$FILLS; i++ )) do
        SEPARATOR=$SEPARATOR$DASH
    done

    local TOP_LINE="${GRAY}${TC}[ ${USERNAME_COLORED} ${GRAY}]${RED}$ERRPROMPT${GRAY}[ ${BYELLOW}${CURENT_PATH}${GRAY} ]${SEPARATOR}${CC}"
    local BOTTOM_LINE="${GRAY}${BC}${BPURPLE}${BRANCH}${GRAY}${DASH}> ${DEFAULT}"
    export PS1="\n${TOP_LINE}\n${BOTTOM_LINE}"
}
PROMPT_COMMAND=promptCommand

#export PS1="\t \[$BRed\]- \[$Green\]\u\[$White\]@\[$Cyan\]\H \[$BYellow\]\W\n\[$BGreen\]$ \[$White\]"
