@echo off
set ENVIRONMENT=%1

echo --- CREANDO ARCHIVO DE VARIABLES DE ENTORNO PARA %ENVIRONMENT% ---
if "%ENVIRONMENT%"=="dev" (
  copy .\deploy\credentials\firebase-dev.json .\firebase.json
)

if "%ENVIRONMENT%"=="prod" (
  copy .\deploy\credentials\firebase-prod.json .\.firebase.json
)

rmdir /s /q test

firebase deploy --only hosting:enhacoread