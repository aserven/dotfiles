set nocompatible              " be iMproved, required

call plug#begin('~/.local/share/nvim/plugged')

Plug 'ying17zi/vim-live-latex-preview'
Plug 'LaTeX-Box-Team/LaTeX-Box'
Plug 'farmergreg/vim-lastplace'
Plug 'kien/ctrlp.vim'
Plug 'tpope/vim-surround'
Plug 'scrooloose/nerdcommenter'
"Plug 'Shougo/neocomplcache.vim'
Plug 'vim-airline/vim-airline'
Plug 'Valloric/YouCompleteMe'
Plug 'chrisbra/colorizer'

" Colorschemes
Plug 'chriskempson/base16-vim'
Plug 'morhetz/gruvbox'

" Haskell
"Plug 'enomsg/vim-haskellConcealPlus'
Plug 'Twinside/vim-haskellConceal'
Plug 'travitch/hasksyn'

Plug 'purescript-contrib/purescript-vim'

call plug#end()

syntax enable
"set termguicolors
set number
set relativenumber
set autoindent
set expandtab
set softtabstop=4
set shiftwidth=4
set incsearch
set hlsearch
set spell spelllang=en_us
set background=dark    " Setting dark mode

let g:gruvbox_italic=1

let g:airline_powerline_fonts = 1
let g:ycm_path_to_python_interpreter = '/usr/bin/python'
let g:python_host_prog = '/usr/bin/python2.7'
let g:python3_host_prog = '/usr/bin/python3.6'


colorscheme gruvbox
hi SpellBad cterm=reverse gui=reverse
