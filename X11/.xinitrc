#!/bin/bash

# Load resources

xrdb -merge .Xresources

# Set up an icon tray

# trayer --edge top --align right --SetDockType true --SetPartialStrut true \
	# --expand true --width 6 --transparent true --tint 0x000000 --height 20 &

# Set the background color

feh --bg-scale ~/Pictures/walls/xmonadTrees.jpg

# Fire up apps
# gajim &

xsetroot -cursor_name arrow
setxkbmap -layout us,es -option 'grp:alt_shift_toggle' 
xmodmap ~/.Xmodmap
# xscreensaver -no-splash &
# urxvtc -q -o -f &
synclient TouchpadOff=1

dunst > /dev/null 2>&1 &

udiskie -t -A -n &

picom &

[ -x /usr/bin/nm-applet ] && nm-applet --sm-disable &

[ -x /usr/bin/xfce4-power-manager ] bash -c 'sleep 3; xfce4-power-manager &' &

[ ! -s ~/.config/mpd/pid ] && mpd

# conky -c ~/.config/conky/config.conf &


exec xmonad

