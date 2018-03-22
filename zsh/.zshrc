# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=999999
SAVEHIST=99999999
setopt appendhistory autocd extendedglob hist_ignore_all_dups
bindkey -e
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '~/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall
autoload -U promptinit
promptinit
#prompt fade
prompt adam2

# zstyle ':completion:*:descriptions' format '%U%B%d%b%u' 
# zstyle ':completion:*:warnings' format '%BSorry, no matches for: %d%b'
zstyle ':completion:*' menu select

USER_LOCAL="${HOME}/.local"
LATEX_PREVIEW="${HOME}/.local/share/nvim/plugged/vim-live-latex-preview"
NPM_PACKAGES="${HOME}/.npm-packages"
ANACONDA="${HOME}/anaconda3"
PATH="$USER_LOCAL/bin:$LATEX_PREVIEW/bin:$NPM_PACKAGES/bin:$ANACONDA/bin:$PATH"

unset MANPATH
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"

alias pacman="pacman --color auto"
alias ls="ls --color=auto"
alias ll="ls -l"
alias la="ls -la"
alias tree="tree -C"
alias grep="grep --color=auto"
alias open="xdg-open"
alias vi="nvim"
alias vim="nvim"


source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

# neofetch
fortune | cowsay | lolcat
