@echo off
setlocal

REM Build output goes to Temp (avoids OneDrive file-lock issues on ./build).
set "BUILD_PATH=%TEMP%\bajaj-insurance-build"

if exist "%BUILD_PATH%" (
  rmdir /s /q "%BUILD_PATH%"
)

call npm run build

echo.
echo Build output: %BUILD_PATH%

