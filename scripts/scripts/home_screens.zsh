#! /usr/bin/zsh


xrandr --output HDMI-2 --right-of LVDS-1 --auto
xrandr --output LVDS-1 --off
xrandr --output VGA-1 --right-of HDMI-2 --rotate right --auto

