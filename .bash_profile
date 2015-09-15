export LUCENEDIR=/Users/alberts/Programs/lucene
export ANT_HOME=/Users/alberts/Programs/ant-1.9.4
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_67.jdk/Contents/Home/
export ANDROID_HOME=/Users/alberts/Library/Android/sdk
export GOPATH=/Users/alberts/GitProjects/go


export ADB_ANDROID=/Users/alberts/Library/Android/sdk/platform-tools
export TOOLS_ANDROID=/Users/alberts/Library/Android/sdk/tools
export ANTLR3=/Users/alberts/Programs/antlr3

export BIN=/usr/local/bin
export SBIN=/usr/local/sbin
export PATH=$PATH:$SBIN:$ANTLR3:$TOOLS_ANDROID:$ADB_ANDROID
export PATH=$PATH:/Users/alberts/Programs/clang-llvm/build/bin
export PATH=$PATH:$ANT_HOME/bin
export PATH=$PATH:$GOPATH/bin

export CLASSPATH=$LUCENEDIR/lucene-core-3.6.2.jar:$LUCENEDIR/lucene-demo-3.6.2.jar:$LUCENEDIR/lukeall-4.10.0.jar:$CLASSPATH
export CLASSPATH=.:$ANTLR3/antlr-3.4-complete.jar:$ANTLR3/antlrworks-1.5.jar:$CLASSPATH

export LIBRARY_PATH=/usr/local/lib
export LD_LIBRARY_PATH=/Users/alberts/Programs/Viewer/viewer/bin
export PYTHONPATH=/usr/local/lib/python:$PYTHONPATH

# Tell ls to be colourful
export CLICOLOR=1
export LSCOLORS=Exfxcxdxbxegedabagacad

# Tell grep to highlight matches
export GREP_OPTIONS='--color=auto'

alias ls='ls -G'
alias ll='ls -l -G'
alias la='ls -la -G'
alias tree='tree -C'

alias py='python3'
alias sqlite='/Applications/sqlite3'
alias clips='/Users/alberts/Programs/clips/clips'
alias viewer='open /Users/alberts/Programs/Viewer/viewer/bin/viewer.app/Contents/MacOS/viewer'
alias protege='/Applications/Protege_3.4.8/run_protege.sh'
alias lukeall='java -jar $LUCENEDIR/lukeall-4.10.0.jar'
alias crawl='/Users/alberts/Programs/nutch-1.9/runtime/local/bin/crawl'
alias nutch='/Users/alberts/Programs/nutch-1.9/runtime/local/bin/nutch'
alias solr='cd /Users/alberts/Programs/solr-4.10.1/example/ && java -jar start.jar'

export PS1='\[\e[0;34m\]\u\[\e[0;35m\]@\h\[\e[0m\]:\[\e[1;33m\]\w\[\e[0;32m\]\n\$\[\e[0m\] '

# OPAM configuration
. /Users/alberts/.opam/opam-init/init.sh > /dev/null 2> /dev/null || true
