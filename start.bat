@echo off
echo ==========================================
echo Pomoclock - Setup e Inicializacao
echo ==========================================
echo.

REM Verifica se o Node.js esta instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado: 
node --version
echo.

REM Verifica se as dependencias estao instaladas
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar dependencias
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas!
    echo.
)

REM Compila o TypeScript
echo [INFO] Compilando TypeScript...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao compilar TypeScript
    pause
    exit /b 1
)
echo [OK] TypeScript compilado!
echo.

REM Inicia o servidor
echo [INFO] Iniciando servidor...
echo.
echo O projeto sera aberto no navegador em http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
call npm run serve
