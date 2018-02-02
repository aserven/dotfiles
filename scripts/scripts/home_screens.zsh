#! /usr/bin/zsh


xrandr --output HDMI2 --right-of LVDS1 --auto
xrandr --output LVDS1 --off
xrandr --output VGA1 --right-of HDMI2 --rotate right --auto

