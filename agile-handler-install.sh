git clone https://github.com/os-js/OS.js
cd OS.js
npm install --save https://github.com/Agile-IoT/agile-idm-client
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

grunt dist-dev
##################### NODE RED in OS.js #########################33
cd src/packages/default
git clone https://github.com/muka/osjs-nodered NodeRed
cd ../../../
grunt manifest config packages:default/NodeRed
grunt dist
cd ..

##################### NODE RED  #########################33
git clone https://github.com/node-red/node-red
cd node-red
cp ../node-red-changes/Node.js  red/runtime/nodes/Node.js
npm install
grunt build
cd ..

##################### IDM  #########################33
git clone https://github.com/Agile-IoT/agile-idm-web-ui
cd agile-idm-web-ui
npm install
cd example
npm install
cp conf/agile-ui-conf-demo-osjs.js conf/agile-ui-conf.js

##start IDM :
#cd agile-idm-web-ui/example/
#node app
cd ../../
##################### PROXY  #########################

git clone https://github.com/Agile-IoT/agile-enforcement-proxy
cd agile-enforcement-proxy
npm install
cd example
##Start proxy
#node app.js
#by default it runs on port 8080 and forwards everything after enforcement to the configuration property proxy.target
