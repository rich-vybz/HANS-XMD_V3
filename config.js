
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JFYyswU09OZUZHbWVyZUhGYUFicyt0MkxJbHhyTm9Tem94WUpzQk5VTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEQ5NlBybDFpdUVLdy9iRmdZWjAvd0JNMDVqZXlsbncrZkY1VjlZY0RDMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3R2lDQVg3RDJrT1JwNEpFbFdJdWlwb1piNjZ3M1ZKUVRIS09uSTZyS1VBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCSS9NL2JuRHMyeTEwV3NlYU8vUFpseTkxK1plWnQvRkJyLzhmblQvZ0ZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9PdGZSRG1TM1poOVhsMEo0MmVCbEFFYmFpRTJwb1BRMHlDaUNtS1FuVTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill6dEZ5UVh2RjI3K29rNnlJbU9YTm5FZElVV1gvSWFoRkwyOGV0S3llVlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid09URDhlVENoSDZyaWtKY3hsU0l1MnMvYzdUb0g1dFRyLzROdk82R3ptST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpQUTZmbGVXUW45NlVzb1pKQ0REMHlSK0dIWVR5Sk1yWlRtRXpYQ0RBbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlEMXBmTm5IZ0s4NDFsd3hhQy85RzgwN2pLQ0xDcUhSbWFOeWkwdTdZYS9yeWt0S0l3WW5qVjI4VS9aeUNBOXdIcXlLdlJqZ1JCNHorZUs4Y3FtQ0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiIvM2locGhyT0xNMkcyRGh6eFhsc0RzUFRKTjZqcHFaSjVQQUdncnVpK1lrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzI3NzgxNTc3NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDOTU2MTIzQjZDNDlFRUUyNjc4QUY2RjQ4QjU1NTRERiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MDU3ODYwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzMyNzc4MTU3NzRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUVCMTg0NjBGNDE3NzQ4RDM1OTAzNDVCNTI3RkREOEEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzA1Nzg2Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMzlha242MjZTTUc5eVkzQjJTSXhBdyIsInBob25lSWQiOiJmZjE3MmZjOS1iMjhlLTQyZjMtODYxYi1kNDE5ZTgwYjdiYTAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0IvUDBua0VXc0VIY004YTZSR1E1R3NUajdRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9ONS8rRXp2aVdwNmhTSFY4UWowRUpjakc0TT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJWWUg3QUdEQyIsIm1lIjp7ImlkIjoiMjMzMjc3ODE1Nzc0OjMwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKEnsmo4Y+o5Y2EIPCfkrAgVsa0xoF68J+kkSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSmpGOGk4UXN2bUh3UVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoid0dQRUhZQlU5eTdYRklLeXlKSmw1cDJVVld6MDhFazhBTlpha1VLWklpUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibTBMOUJTTjY4c1VvSGhVTTNoSDhERlV1VGJseVlDL29BQU9ZTzFJUWVRNE0vMGNyUVhFSDBQbWM2RjFkNE4xaTdIcmhZL1BuZFkxSEpZbjFESEpPQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImtIZnkvakdkRStWN2ZzTXRreW11YmJKN1VycHppdFRNR2VZZ24xdEo5eXQvT2ZIcy9RZFZ6MjJ0NTVRd0VSTUs5MGgxaTJOeGpkSGJsSTRzZS9raENnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzMjc3ODE1Nzc0OjMwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNCanhCMkFWUGN1MXhTQ3NzaVNaZWFkbEZWczlQQkpQQURXV3BGQ21TSWsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDcwNTc4NTUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSXNlIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "HANS-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 277815774",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'HANS-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/mn835l.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'off',
    AUTOREACT_STATUS : process.env.AUTOREACT_STATUS || 'on',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
