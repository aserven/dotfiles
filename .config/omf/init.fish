function fish_greeting_old
    echo ''
    screenfetch
    echo ''
    fortune
    echo ''
end

function fish_greeting
    fortune | fmt -80 -s | random-cow | lolcat
end

source /home/alberts/anaconda3/etc/fish/conf.d/conda.fish

alias tmux "tmux -2"
alias lolcat lolcat.ruby2.1

set -gx EDITOR vim
set -gx SHELL /usr/bin/fish
set -gx LESS "-g -i -M -R -w"

set -x CONDA_PATH /home/alberts/anaconda3/bin

set -x JAVA_HOME /usr/java/latest
set -gx GO_BIN_PATH /usr/local/go/bin
set -gx GOPATH /home/alberts/go/

set -g theme_display_ruby no
set -g theme_display_virtualenv no

set -x PATH ~/.minimesos/bin $PATH
set -x PATH /opt/mongodb/mongodb-linux-x86_64-3.4.2/bin $PATH
set -x PATH $JAVA_HOME/bin $PATH $GO_BIN_PATH
set -x PATH $CONDA_PATH $PATH
set -x PATH $PATH ~/.local/bin/

set -x PATH $PATH /usr/lib64/mpi/gcc/openmpi/bin

set -e PYTHONSTARTUP
#set -x PYTHONHOME $PYTHONHOME:/usr/local/
#set -x PYTHONPATH $PYTHONPATH:/usr/local/lib/python3.5/

set -x HADOOP_HOME /opt/hadoop
set -x PATH $PATH $HADOOP_HOME/bin


set -x GECODE_LIB ~/Programs/gecode-5.0.0/
set -x LD_LIBRARY_PATH $GECODE_LIB:$LD_LIBRARY_PATH

alias lockscreen  "/usr/local/bin/lock/lock -gpf Roboto-Light"
alias idea "sh /home/alberts/Programs/idea-IC-162.1628.40/bin/idea.sh > /dev/null 2>&1"

function mirror --description "Mirrors the screen selected with resolution"
    xrandr --output $argv[1] --mode $argv[2] --same-as eDP1
end


function close-display --description "Closes display named"
    xrandr --output $argv[1] --off --output eDP1 --auto
end

function wifi-on --description "Enable wifi"
    nmcli r wifi on
end

function wifi-off --description "Disable wifi"
    nmcli r wifi off
end

function svndiffcolor --description "Svn with colordiff"
    svn diff $argv | colordiff | less -R
end

function random-cowsay --description "Cowsay with random cowfile"
    set cowfile (cowsay -l | sed '1 d' | tr ' ' '\n' | shuf -n 1)
    cowsay -f $cowfile $argv
end

function random-cow --description "Cowsay and Cowthink random"
    set exe (shuf -n 1 -e cowsay cowthink)
    set option (shuf -n 1 -e b d g p s t w y)
    set cowfile (cowsay -l | tail -n +2 | tr ' ' '\n')
    set cow (shuf -n 1 -e $cowfile)
    set command "$exe -$option -f $cow -n"
    eval $command
end

function download-directory --description "Download directory link using wget"
    wget -r --no-parent -nd $argv
    rm index.html*
end
