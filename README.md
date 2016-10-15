# Demo with IDM and basic enforcement

In the default configuration these are the loactions of the components:

* localhost:3000/ http port for IDM
* localhost:1443/ https with Client-TLS validation for IDM (required for Webid)
* localhost:8000/ Os.js
* localhost:8080 Enforcement proxy

## agile-handler-install.sh

This scripts sets up everything (except Oauth2 provider configurations -- see https://github.com/Agile-IoT/agile-idm-web-ui) with OS.js and Node-red single-user integration.
Specifically, this script gets OS.js and installs the agile handler and configures redirection in case OS.js is called without a token, configuration for the API of IDM (to authenticate users)
It installs the Node-red integration from muka in OS.js
It installs AGILE-IDM in a way that it integrates nicely with OS.js
It modifies installs a modified version of node-red that takes the token from IDM (through a file)
It installs the enforcement proxy (where calls should be directed with thte token to test enforcement based on users (see example of configuration of allowed users in example/conf/ in )

## How to Run it

From the root of this directory:

* idm:

    $ cd agile-idm-web-ui/example/
    $ node app

* enforcement-proxy:

    $ cd agile-enforcement-proxy/example
    $ node app

* Os.js:  

    $ cd OS.js
    $ ./bin/start-dev.sh

* Node-RED:

    $ cd node-red
    $ node red

## How to test it

Deploy the flows in the test-flows folder in node red.
* echo-example: just echoes everything is OK. The idea is to test whether this is actually called from the proxy, depending on whether the user is allowed to access the url or not.
* request-proxy.json is the flow that picks up the token and sends it to the proxy. When you click on the inject node

So, the flow of calls is:

* Inject triggers request (that includes the token since the function picked it up from the message object). This request goes to the enforcement proxy
* the enforcement proxy receives the request, checks the token and validates against the list of allowed users (see example/conf file in the proxy)
* If it is ok, it forwards the request to the echo example (configured as default endpoint to redirect http calls in example/conf in the proxy)



## Additional contents (not needed to run it)

### agile-idm-install.sh

Gets IDM and installs the web interface. Although local authentication works out of the box (with pre-filled password in the UI), this requires the generation of client ids and secrets if Oauth2 providers are to be used (see https://github.com/Agile-IoT/agile-idm-web-ui/blob/master/README.md)
In the step to generate client ids and passwords to use Google and Github (for example) you need to provide the url where IDM is running (and finish the url in the same way callback_github or whatever).
Also, this value needs to be configured in the configuration for the ui in the conf directory of agile-idm-web-ui/example/conf. So, if IDM runs elsewhere (not localhost:3000) this needs to be updated there too.

### node-red-integration.txt

This file describes the single line of code that you need for the integration of node-red to get the token.

Otherwise, you can copy Node.js in  node-red/red/runtime/nodes/Node.js. And this will include the token in every message in the property msg.token :)
