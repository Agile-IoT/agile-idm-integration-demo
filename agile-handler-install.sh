source agile-osjs-install.sh

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
git checkout v1.0-alpha
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
git checkout v1.0-alpha
npm install
cd example
##Start proxy
#node app.js
#by default it runs on port 8080 and forwards everything after enforcement to the configuration property proxy.target
