syntax enable

set number
set hlsearch
set tabstop=4
set shiftwidth=4

set expandtab
set smarttab
set autoindent
set smartindent
set wrap

"colorscheme darkblue
"set background=light

"let g:molokai_original = 1
"let g:rehash256 = 1
"colorscheme monokai

"function! ClangCheckImpl(cmd)
"    if &autowrite | wall | endif
"    echo 'Running ' . a:cmd . ' ...'
"    let l:output = system(a:cmd)
"    cexpr l:output
"    cwindow
"    let w:quickfix_title = a:cmd
"    if v:shell_error != 0
"        cc
"    endif
"    let g:clang_check_last_cmd = a:cmd
"endfunction
"
"function ClangCheck()
"    let l:filename = expand('%')
"    if l:filename =~ '\.\(cpp\|cxx\|cc\|c\)$'
"        call ClangCheckImpl("clang-check " . l:filename)
"    elseif exists("g:clang_check_last_cmd")
"        call ClangCheckImpl(g:clang_check_last_cmd)
"    else
"        echo 'Can't detect file's compilation arguments and no previous clang-check invocation!'
"    endif
"endfunction
"
"nmap <silent> <F5> : call ClangCheck()<CR><CR>
