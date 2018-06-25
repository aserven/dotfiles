#!/bin/bash

# Load resources

xrdb -merge .Xresources

# Set up an icon tray

# trayer --edge top --align right --SetDockType true --SetPartialStrut true \
	# --expand true --width 6 --transparent true --tint 0x000000 --height 20 &

# Set the background color

feh --bg-scale ~/Pictures/walls/Xmonad_wallpaper_2.jpg

# Fire up apps
# gajim &

xsetroot -cursor_name arrow
setxkbmap -layout us,es -option 'grp:alt_shift_toggle' 
# xscreensaver -no-splash &
# xmodmap ~/scripts/capslock-ctrl.zsh
synclient TouchpadOff=1

/usr/lib/notification-daemon-1.0/notification-daemon &

compton &

if [ -x /usr/bin/nm-applet ]; then
  nm-applet --sm-disable &
fi

if [ -x /usr/bin/xfce4-power-manager ]; then
  bash -c 'sleep 3; xfce4-power-manager &' &
fi

[ ! -s ~/.config/mpd/pid ] && mpd

conky -c ~/.config/conky/conky.conf &


exec xmonad

