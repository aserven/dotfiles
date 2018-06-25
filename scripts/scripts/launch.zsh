#!/bin/zsh


if [ -x /usr/local/bin/Telegram ]; then
  Telegram &
fi

if [ -x /usr/bin/iceweasel ]; then
  iceweasel &
fi

if [ -x /usr/bin/icedove ]; then
  icedove &
fi

