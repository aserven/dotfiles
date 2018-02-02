#! /usr/bin/zsh

hdmi2_connected=$(xrandr -q | grep "HDMI2 connected")
vga1_connected=$(xrandr -q | grep "VGA1 connected")

connected_displays=0

if [[ ! -z ${hdmi2_connected} ]] then
    echo "Setting wide screen (2560x1080)"
    connected_displays=$(($connected_displays + 1))
    xrandr --output HDMI2 --right-of LVDS1 --primary --mode 2560x1080_30.00
    xrandr --output LVDS1 --off
fi

if [[ ! -z ${vga1_connected} ]] then
    echo "Setting vertical screen (1080x1920)"
    connected_displays=$(($connected_displays + 1))
    xrandr --output VGA1 --right-of HDMI2 --rotate right --auto
fi

if [[ $connected_displays -eq 2 ]] then
    echo "Two connected displays"
fi


