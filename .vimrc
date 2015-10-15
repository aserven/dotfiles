syntax enable
set number

set expandtab
set smarttab
set shiftwidth=4
set tabstop=4

set foldmethod=syntax

set lbr
set tw=120

set ai
set si
set wrap

set laststatus=2
set statusline=\ %{HasPaste()}%F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l

function HasPaste()
    if &paste
        return 'PASTE MODE  '
    endif
    return ''
endfunction
