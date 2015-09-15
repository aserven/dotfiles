syntax enable
set number
colorscheme darkblue

set so=6
set ruler

set ignorecase
set smartcase
set gdefault
set incsearch
set showmatch
set hlsearch

set magic
set encoding=utf8

set expandtab
set smarttab
set shiftwidth=4
set tabstop=4
set softtabstop=4

set scrolloff=3
set autoindent
set showmode
set showcmd
set hidden
set wildmenu
set wildmode=list:longest
set visualbell
"set cursorline
set ttyfast
set backspace=indent,eol,start
set relativenumber
set undofile

set lbr
set tw=120

set ai
set si
set wrap
set textwidth=99
set formatoptions=qrn1
set colorcolumn=105

"set list
"set listchars=tab:>\ ,eol:¬

set laststatus=2
set statusline=\ %{HasPaste()}%F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l

function HasPaste()
    if &paste
        return 'PASTE MODE  '
    endif
    return ''
endfunction

