#!/bin/bash

base_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
temp_dir=/tmp/$(basename "${BASH_SOURCE[0]}")

SPRT_VERSION="1.4.1"

function error_exit {
    printf "\n\033[0;31mInstallation failed\033[0m\n"
    cd $base_dir
    exit 1
}

function finished {
    printf "\n\033[0;92mInstallation completed\033[0m\n"
    cd $base_dir
    exit 0
}

function git_clone_sprt {
    git clone https://github.com/mustafalani/SPRT.git -b master SPRT_$SPRT_VERSION
}

function install_sprt {
   cd SPRT_$SPRT_VERSION
   npm install
   npm i styled-components
   cp -r ./src/reusable/react-floating-label-input/dist/* node_modules/react-floating-label-input/dist/
}

function build_sprt {
   npm run build
   cp -r build ../build_$SPRT_VERSION
   cd ..
   rm Production
   ln -s build_$SPRT_VERSION Production
}

##############################################################################
# TASKS

git_clone_sprt || error_exit
install_sprt || error_exit
build_sprt || error_exit

finished
