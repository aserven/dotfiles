#! /usr/bin/zsh

 xrandr --newmode "2560x1080_30.00"  106.56  2560 2640 2896 3232  1080 1081 1084 1099  -HSync +Vsync\n
 xrandr --addmode HDMI2 2560x1080_30.00
 xrandr --output HDMI2 --mode 2560x1080_30.00

 xrandr --output LVDS1 --off
 xrandr --output VGA1 --off
