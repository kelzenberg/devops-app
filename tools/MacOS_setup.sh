#!/bin/sh
PROGNAME=$0

########################################################
##################  HELPER FUNCTIONS  ##################
########################################################

helper() {
  cat <<EOF >&2
Usage: $PROGNAME [OPTIONS] [MESSAGE]

  Install individual dependencies for the project & commit everything (or not).

Options:
  -v                install NVM (Node Version Manager)          (requires Brew)
  -n                install latest Node version & create .nvmrc (requires NVM)
  -y                install Yarn globally                       (requires NPM)
  -d                install latest project dependencies         (requires Yarn)
  -c MESSAGE        commit all additional project files         (requires Git)

  -a MESSAGE        do all of the above at once
  -h                display this help

EOF
}

installNVM() {
  echo "Installing NVM...\n"
  brew install nvm
  source $(brew --prefix nvm)/nvm.sh
}

installNode() {
  echo "Installing Node...\n"
  nvm install node

  echo "Saving to .nvmrc ...\n"
  node -v >.nvmrc
}

installYarn() {
  echo "Installing Yarn...\n"
  npm install --location=global yarn
}

installDeps() {
  echo "Installing latest Dependencies...\n"
  yarn install
  yarn upgrade --latest --caret
}

commitProject() {
  echo "Committing current project files..."
  echo " ↳ Commit message: '$1'\n"
  git add .
  git commit -m "$1"
}

#########################################################
####################  MAIN FUNCTION  ####################
#########################################################

[ $# -eq 0 ] && helper && exit 1

echo "\n------------\nInit setup script...\n------------\n"

while getopts a:vnydhc: dashArg; do
  case $dashArg in
  a)
    installNVM
    installNode
    installYarn
    installDeps
    commitProject ${OPTARG}

    echo "\n------------\n...setup script finished.\n------------"
    exit 0
    ;;
  v) installNVM ;;
  n) installNode ;;
  y) installYarn ;;
  d) installDeps ;;
  c) commitProject ${OPTARG} ;;
  h)
    helper
    exit 0
    ;;
  *)
    helper
    exit 1
    ;;
  esac
done
shift "$((OPTIND - 1))"

echo "\n------------\n...setup script finished.\n------------"
exit 0
