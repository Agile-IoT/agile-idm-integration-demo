/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Example Handler: Login screen and session/settings handling via database
 * PLEASE NOTE THAT THIS AN Agile ONLY, AND SHOUD BE MODIFIED BEFORE USAGE
 *
 * Copyright (c) 2011-2016, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */
(function() {
  'use strict';

  var idm;
  var tokenFile;
  /////////////////////////////////////////////////////////////////////////////
  // API
  /////////////////////////////////////////////////////////////////////////////

  /**
   * These methods will be added to the OS.js `API` namespace
   */
  var API = {
    login: function(server, args, callback) {
      console.log('idm: '+idm.toString());
      console.log('tokenLocation: '+tokenFile.toString());
      var auth = idm.authenticateEntityPromisse(args.password);
      auth.then(function(data){
        console.log('ok.. token is here!'+JSON.stringify(data));
        var fs = require('fs');
        fs.writeFile(tokenFile.toString(), data.token, function(err) {
          if(err) {
            return callback(err.toString());
          }
          server.handler.onLogin(server, {
            userSettings: {},
            userData: {
              id: data["user_id"]+"@"+data["auth_type"],
              username: data["user_id"]+"_"+data["auth_type"],
              name: data["user_id"],
              groups: ['admin']
            }
          }, callback);
         });
       }).catch(function(error){
         console.log('auth wrong '+error);
         callback('wrong agile user');
         return;
      });
    },

    logout: function(server, args, callback) {
      handler.onLogout(server, callback);
    },

    settings: function(server, args, callback) {
      callback(false, true);
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  /**
   * This is your handler class
   *
   * Out-of-the-box support for permissions! You just have to make sure your
   * login method returns the right groups.
   *
   * @link http://os.js.org/doc/tutorials/create-handler.html
   *
   * @api handler.AgileHandler
   * @see handler.Handler
   * @class
   */
  exports.register = function(instance, DefaultHandler) {
    function AgileHandler() {
      DefaultHandler.call(this, instance, API);
    }

    AgileHandler.prototype = Object.create(DefaultHandler.prototype);
    AgileHandler.constructor = DefaultHandler;

    AgileHandler.prototype.onServerStart = function(cb) {
      var cfg = instance.config.handlers.agile;
      var conf = {
        "authentication":{
          "web-server":cfg.idm
        }
      }
      var IDMHttpClient = require('agile-idm-client').http;
      idm = new IDMHttpClient(conf);
      tokenFile =cfg.tokenFile;
      //TODO construct IDM Client here...

      cb();
    };

    AgileHandler.prototype.onServerEnd = function(cb) {
      cb();
    };

    return new AgileHandler();
  };

})();
