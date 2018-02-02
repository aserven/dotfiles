#! /usr/bin/zsh

hdmi2_connected=$(xrandr -q | grep "HDMI2 connected")
vga1_connected=$(xrandr -q | grep "VGA1 connected")

# cvt 2560 1080 30
# 2560x1080 29.97 Hz (CVT) hsync: 33.03 kHz; pclk: 106.75 MHz
xrandr --newmode "2560x1080_30.00"  106.75  2560 2640 2896 3232  1080 1083 1093 1102 -hsync +vsync

# cvt 1920 1080 60
# 1920x1080 59.96 Hz (CVT 2.07M9) hsync: 67.16 kHz; pclk: 173.00 MHz
xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync


if [[ ! -z ${vga1_connected} ]] then
    xrandr --addmode VGA1 1920x1080_60.00
fi

if [[ ! -z ${hdmi2_connected} ]] then
    xrandr --addmode HDMI2 2560x1080_30.00
    xrandr --output HDMI2 --mode 2560x1080_30.00
    xrandr --output LVDS1 --off
    xrandr --output VGA1 --off
fi
