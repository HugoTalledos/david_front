@echo off
set ENVIRONMENT=%1

echo ---  BORRANDO VARIABLES DE ENTORNO ---
del .\.env
del .\.firebaserc
del .\firebase.json

echo --- CREANDO ARCHIVO DE VARIABLES DE ENTORNO PARA %ENVIRONMENT% ---
if "%ENVIRONMENT%"=="dev" (
  copy .\deploy\environments\.env.dev .\.env
  copy .\deploy\credentials\.firebase-dev .\.firebaserc
  copy .\deploy\credentials\credentials-dev.json .\src\utils\firebase-config.json
)

if "%ENVIRONMENT%"=="prod" (
  copy .\deploy\environments\.env.prod .\.env
  copy .\deploy\credentials\.firebase-prod .\.firebaserc
  copy .\deploy\credentials\credentials-prod.json .\src\utils\firebase-config.json
)

echo --- CONSTRUYENDO OPTIMIZACION ---
react-scripts build
