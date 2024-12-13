@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\node\node.exe"
IF NOT EXIST "%NODE_EXE%" (
  SET "NODE_EXE=node"
)
SET "NPM_CLI_JS=%~dp0\node_modules\@angular\cli\bin\ng.js"

"%NODE_EXE%" "%NPM_CLI_JS%" %*