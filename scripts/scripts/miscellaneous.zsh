

sudo pacman -S intel-gpu-tools
sudo intel_reg write 0x00061254 your_value_in_C_hex_format
# usual value 0x60016001
# then go with xbacklight -set 10 to 100

# in /home/albert/Downloads/libreboot_util/nvramtool/x86_64/
sudo ./nvramtool -w power\_management\_beeps=[Enable|Disable]
sudo ./nvramtool -w low\_battery\_beep=[Enable|Disable]
# usual value 0x60016001


# list fonts
fc-list

# Query type of file
xdg-mime query filetype FILE

# Query default application to use
xdg-mime query default TYPE

# Set default app
xdg-mime default APP.desktop TYPE

# properties about window
xprop
