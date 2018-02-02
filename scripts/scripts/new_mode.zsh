gtf 1920 1080 60 -x
xrandr --newmode 1920x1080_60.00  172.80  1920 2040 2248 2576  1080 1081 1084 1118  -HSync +Vsync
xrandr --addmode VGA1 1920x1080_60.00
xrandr --output VGA1 --mode 1920x1080_60.00 --right-of HDMI2 --rotate right

