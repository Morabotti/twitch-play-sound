cd ../client
call npm install
cd ../server
call npm install
IF NOT EXIST ".env" (
  echo F | xcopy .env.example .env
  echo ======================
  echo .env file was created.
  echo ======================
)
npm run production
@pause