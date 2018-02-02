#!/bin/bash

# Load resources

xrdb -merge .Xresources

# Set up an icon tray

trayer --edge top --align right --SetDockType true --SetPartialStrut true \
	--expand true --width 5 --transparent true --tint 0x000000 --height 22 &

# Set the background color

# feh --bg-scale ~/Pictures/walls/this-is-freedom-wallpaper.png

# Fire up apps
# gajim &

xsetroot -cursor_name arrow
xscreensaver -no-splash &
# xmodmap ~/scripts/capslock-ctrl.zsh

/usr/lib/notification-daemon-1.0/notification-daemon &

compton &

if [ -x /usr/bin/nm-applet ]; then
  nm-applet --sm-disable &
fi

if [ -x /usr/bin/xfce4-power-manager ]; then
  sleep 3
  xfce4-power-manager &
fi


exec xmonad

