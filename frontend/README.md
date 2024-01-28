# Netmonk Analytics

Frontend web of **Netmonk Analytics**. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisite

- Nodejs

### Run Development

`npm install`

Create .env file in the project root folder or copy it from .env.example file

`npm start`

Go to your browser then access url http://localhost:3001.

### Run Production

Create .env file in the project root folder or copy it from .env.example file

`npm run build`

`pm2 --name netmonk-analytics serve --spa build 3001`

Go to your browser then access url https://app.netmonk.id/tech/web-analytics/

### Update Development --> Production

`git pull`

`npm run build`

`pm2 restart netmonk-analytics || pm2 restart 0`