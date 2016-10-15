git clone https://github.com/doitdagi/OS.js
#git clone https://github.com/os-js/OS.js
cd OS.js
git checkout 3e9a9e4dcd72e8b4cc666e57e0088c675c449062
npm install --save git@https://github.com/Agile-IoT/agile-idm-client
npm install
#npm install --production
grunt create-handler:Agile
#put handlers!
cp ../os-js-changes/src/client/javascript/handlers/agile/handler.js  ./src/client/javascript/handlers/agile/handler.js
cp ../os-js-changes/src/server/node/handlers/agile/handler.js ./src/server/node/handlers/agile/handler.js
#set agile handler
grunt config --set=handler --value=agile
#Configure AGILE IDM part
grunt config --set=server.handlers.agile.idm --value=http://localhost:3000/api
grunt config --set=server.handlers.agile.tokenFile --value=/tmp/token.txt
grunt config -set=client.Connection.RedirectIDM --value=http://localhost:3000/

grunt
