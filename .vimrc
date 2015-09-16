syntax enable

set autoread


set so=3
set ruler
set cmdheight=2


set backspace=eol,start,indent

set ignorecase

set smartcase
set hlsearch
set incsearch

set magic
set showmatch

set encoding=utf8

set expandtab
set smarttab
set shiftwidth=4
set tabstop=4

set lbr
set tw=120

set ai
set si
set wrap

set number

set laststatus=2
set statusline=\ %{HasPaste()}%F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l

function! HasPaste()
    if &paste
        return 'PASTE MODE  '
    endif
    return ''
endfunction

