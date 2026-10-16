@echo off
rem ===========================================================
rem  IELTS Band 8 Trainer - yerel sunucu baslatici
rem  Cift tiklayin. Python 3 kuruluysa yerel sunucu acar,
rem  kurulu degilse index.html dosyasini dogrudan tarayicida acar.
rem ===========================================================
setlocal
cd /d "%~dp0"

echo ============================================
echo   IELTS Band 8 Trainer
echo ============================================
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  echo Yerel sunucu baslatiliyor: http://localhost:8080/index.html
  echo Kapatmak icin bu pencerede Ctrl+C tuslayin.
  echo.
  start "" "http://localhost:8080/index.html?v=2"
  python -m http.server 8080
) else (
  echo Python bulunamadi. Uygulama dogrudan tarayicida aciliyor...
  echo.
  start "" "%~dp0index.html"
  timeout /t 3 >nul
)

endlocal
