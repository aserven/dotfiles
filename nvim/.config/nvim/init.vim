set nocompatible              " be iMproved, required

call plug#begin('~/.local/share/nvim/plugged')

Plug 'ying17zi/vim-live-latex-preview'
Plug 'LaTeX-Box-Team/LaTeX-Box'
Plug 'farmergreg/vim-lastplace'
Plug 'junegunn/fzf.vim'
Plug 'ryanoasis/vim-devicons'
Plug 'tpope/vim-surround'
Plug 'scrooloose/nerdcommenter'
Plug 'scrooloose/nerdtree'
Plug 'majutsushi/tagbar'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'airblade/vim-gitgutter'
Plug 'tpope/vim-fugitive'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'neoclide/coc.nvim', {'do': {-> coc#util#install()}}
Plug 'chrisbra/colorizer'
" Plug 'vim-syntastic/syntastic'
Plug 'mileszs/ack.vim'
Plug 'junegunn/goyo.vim'
"Plug 'w0rp/ale'
Plug 'sheerun/vim-polyglot'
Plug 'tpope/vim-commentary'
Plug 'tpope/vim-repeat'
Plug 'tpope/vim-unimpaired'
Plug 'skywind3000/asyncrun.vim'
Plug 'xolox/vim-misc'
Plug 'xolox/vim-notes'
Plug 'suan/vim-instant-markdown', {'for': 'markdown'}
Plug 'chrisbra/csv.vim'
Plug 'Yggdroot/indentLine'
Plug 'machakann/vim-highlightedyank'
Plug 'tommcdo/vim-exchange'

" Colorschemes
Plug 'chriskempson/base16-vim'
Plug 'morhetz/gruvbox'
Plug 'szorfein/darkest-space'
Plug 'arcticicestudio/nord-vim'

"" colorful
Plug 'dracula/vim'
Plug 'NLKNguyen/papercolor-theme'
Plug 'trusktr/seti.vim'
Plug 'hzchirs/vim-material'
Plug 'skielbasa/vim-material-monokai'
Plug 'nanotech/jellybeans.vim'
"" greenish
Plug 'preocanin/greenwint'
Plug 'kadekillary/skull-vim'
Plug 'Drogglbecher/vim-moonscape'
"" monochrome
Plug 'fxn/vim-monochrome'
Plug 'andreypopp/vim-colors-plain'
Plug 'hauleth/blame.vim'
Plug 'logico-dev/typewriter'


" Haskell
"Plug 'enomsg/vim-haskellConcealPlus'
Plug 'Twinside/vim-haskellConceal'
Plug 'travitch/hasksyn'
Plug 'neovimhaskell/haskell-vim'
Plug 'alx741/vim-hindent'

Plug 'purescript-contrib/purescript-vim'

" Python
Plug 'vim-scripts/indentpython.vim'
Plug 'nvie/vim-flake8'
Plug 'jeetsukumaran/vim-pythonsense'

" HTML/CSS
Plug 'docunext/closetag.vim'

call plug#end()

let mapleader = ","
let python_highlight_all=1

" Fast saving
nmap <leader>w :w!<cr>

" :W sudo saves the file 
" (useful for handling the permission-denied error)
command W w !sudo tee % > /dev/null

" Set 7 lines to the cursor - when moving vertically using j/k
set so=7

" syntax enable
" set encoding=utf-8
"set termguicolors
set number
set relativenumber
set autoindent
set smartindent
set smarttab
set expandtab
set softtabstop=4
set shiftwidth=4
set incsearch
set hlsearch
set spell spelllang=en_us
set nospell

set ignorecase
set smartcase

set lazyredraw 
set foldcolumn=1
set foldmethod=indent   
set foldnestmax=10
set nofoldenable
set foldlevel=2

set undofile " Maintain undo history between sessionsc
set undodir=~/.config/nvim/undodir

set inccommand=split

" Allow transparent background
hi Normal guibg=NONE ctermbg=NONE   

" Colorscheme
let g:gruvbox_italic = 1
let g:monochrome_italic_comments = 1
let g:materialmonokai_italic = 1
let g:materialmonokai_subtle_spell = 1
let g:jellybeans_use_term_italics = 1
let g:jellybeans_use_lowcolor_black = 1
let g:PaperColor_Theme_Options = {
  \   'theme': {
  \     'default': {
  \       'transparent_background': 1,
  \       'allow_bold': 1,
  \       'allow_italic': 1
  \     }
  \   },
  \   'language': {
  \     'python': {
  \       'highlight_builtins' : 1
  \     },
  \     'cpp': {
  \       'highlight_standard_library': 1
  \     },
  \     'c': {
  \       'highlight_builtins' : 1
  \     }
  \   }
  \ }
set background=dark    " Setting dark mode
colorscheme PaperColor

let g:indentLine_char_list = ['|', '¦', '┆', '┊']

let g:airline_powerline_fonts = 1
let g:airline_theme = 'luna'

" testing rounded separators (extra-powerline-symbols):
let g:airline_left_sep = "\uE0b4"
let g:airline_right_sep = "\uE0b6"

" set the CN (column number) symbol:
let g:airline_section_z = airline#section#create(["\uE0A1" . '%{line(".")}' . "\uE0A3" . '%{col(".")}'])

let g:gitgutter_sign_added = '●'
let g:gitgutter_sign_modified = '●'
let g:gitgutter_sign_removed = '●'
let g:gitgutter_sign_removed_first_line = '●'
let g:gitgutter_sign_modified_removed = '●'


" let b:ale_linters = ['mypy', 'flake8', 'pylint']
let g:ale_fixers = {'python': ['remove_trailing_lines', 'add_blank_lines_for_python_control_statements', 'autopep8', 'isort']}
"\   'ale#fixers#generic_python#BreakUpLongLines',

nnoremap <buffer> <silent> <Leader>= :ALEFix<CR>

" let g:ale_sign_error = '●' " Less aggressive than the default '>>'
" let g:ale_sign_warning = '.'
" let g:ale_lint_on_enter = 0 " Less distracting when opening a new file
"
" let g:ycm_path_to_python_interpreter = '/usr/bin/python'
" let g:python_host_prog = '/usr/bin/python2.7'
" let g:python3_host_prog = '/usr/bin/python3.7'


" set statusline+=%#warningmsg#
" set statusline+=%{SyntasticStatuslineFlag()}
" set statusline+=%*

" let g:syntastic_always_populate_loc_list = 1
" let g:syntastic_auto_loc_list = 1
" let g:syntastic_check_on_open = 1
" let g:syntastic_check_on_wq = 0

" au BufRead,BufNewFile *.py,*.pyw,*.c,*.h match BadWhitespace /\s\+$/

hi SpellBad cterm=reverse gui=reverse

map <C-n> :NERDTreeToggle<CR>
nmap <C-m> :TagbarToggle<CR>
map <F6> :setlocal spell! spelllang=en_us<CR>

" nnoremap <Tab> :tabnext<CR>
nnoremap <S-Tab> :tabnext<CR>

nnoremap SS :%s//&\r/<CR>

nmap ; :Buffers<CR>
nmap <Leader>t :Files<CR>
nmap <Leader>r :Tags<CR>
nmap <Leader>s :Ag <CR>
nmap <M-k>    :Ag <C-R><C-W><CR>
" nmap <Esc>k   :Ack! "\b<cword>\b" <CR>
nmap <M-S-k>  :Ag! <C-R><C-W><CR>
" nmap <Esc>K   :Ggrep! "\b<cword>\b" <CR>

nmap <F8> :LivedownToggle<CR>

map <C-h> <C-w>h
map <C-j> <C-w>j
map <C-k> <C-w>k
map <C-l> <C-w>l

filetype plugin on

function! ProseMode()
  call goyo#execute(0, [])
  set noci nosi noai nolist noshowmode noshowcmd
  set complete+=s
  "set bg=light
  "if !has('gui_running')
    "let g:solarized_termcolors=256
  "endif
  "colors solarized
endfunction

command! ProseMode call ProseMode()
nmap \p :ProseMode<CR>

com! -range=% FormatJSON  :<line1>,<line2>!python3 -m json.tool
com! -range=% FormatXML :<line1>,<line2>!python3 -c "import xml.dom.minidom, sys; print(xml.dom.minidom.parse(sys.stdin).toprettyxml())"

command! GenerateCtags :!ctags -f ~/git/tags -R ~/git
command! RpdbTrace :r! echo import 'rpdb\nrpdb.set_trace("0.0.0.0", 4444)\n'

au FileType python setlocal formatprg=autopep8\ -

augroup XML
    autocmd!
    autocmd FileType xml setlocal foldmethod=indent foldlevelstart=999 foldminlines=0
augroup END

autocmd BufWritePost *.js AsyncRun -post=checktime /usr/bin/eslint --fix %
" autocmd BufReadPost fugitive://* set bufhidden=delete

" testing extra-powerline-symbols

" set font terminal font or set gui vim font
" to a Nerd Font (https://github.com/ryanoasis/nerd-fonts):
set guifont=DroidSansMono\ Nerd\ Font\ 12
" inoremap <Space><Space> <Esc>/<++><Enter>"_c4l
"

" CoC
" if hidden is not set, TextEdit might fail.
set hidden

" Some servers have issues with backup files, see #649
set nobackup
set nowritebackup

" Better display for messages
set cmdheight=2

" You will have bad experience for diagnostic messages when it's default 4000.
set updatetime=300

" don't give |ins-completion-menu| messages.
set shortmess+=c

" always show signcolumns
set signcolumn=yes

" Use tab for trigger completion with characters ahead and navigate.
" Use command ':verbose imap <tab>' to make sure tab is not mapped by other plugin.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
" inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
inoremap <silent><expr> <c-space> coc#refresh()

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current position.
" Coc only does snippet and additional edit on confirm.
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"

" Use `[c` and `]c` to navigate diagnostics
nmap <silent> [c <Plug>(coc-diagnostic-prev)
nmap <silent> ]c <Plug>(coc-diagnostic-next)

" Remap keys for gotos
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight symbol under cursor on CursorHold
autocmd CursorHold * silent call CocActionAsync('highlight')

" Remap for rename current word
nmap <leader>rn <Plug>(coc-rename)

" Remap for format selected region
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Remap for do codeAction of selected region, ex: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap for do codeAction of current line
nmap <leader>ac  <Plug>(coc-codeaction)
" Fix autofix problem of current line
nmap <leader>qf  <Plug>(coc-fix-current)

" Use <tab> for select selections ranges, needs server support, like: coc-tsserver, coc-python
nmap <silent> <TAB> <Plug>(coc-range-select)
xmap <silent> <TAB> <Plug>(coc-range-select)
xmap <silent> <S-TAB> <Plug>(coc-range-select-backword)

" Use `:Format` to format current buffer
command! -nargs=0 Format :call CocAction('format')

" Use `:Fold` to fold current buffer
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" use `:OR` for organize import of current buffer
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add status line support, for integration with other plugin, checkout `:h coc-status`
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Using CocList
" Show all diagnostics
nnoremap <silent> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions
nnoremap <silent> <space>e  :<C-u>CocList extensions<cr>
" Show commands
nnoremap <silent> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document
nnoremap <silent> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols
nnoremap <silent> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list
nnoremap <silent> <space>p  :<C-u>CocListResume<CR>

 nnoremap <leader> F :call CocAction('format')<CR>
