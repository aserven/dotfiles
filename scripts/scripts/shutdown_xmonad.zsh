#! /usr/bin/zsh

if [[ ! -z $(pgrep xmonad) ]]
then
    for win in $(wmctrl -l | awk '{print $1}'); do
        wmctrl -i -c $win
    done
    shutdown -h now
else
    echo "Not running in xmonad"
fi

