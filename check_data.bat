@echo off
echo Checking PostgreSQL database for expenses...
echo.
psql -U postgres -d expense_manager -c "SELECT * FROM expenses ORDER BY created_at DESC;"
echo.
pause

