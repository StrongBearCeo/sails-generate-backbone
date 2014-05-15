/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');
var language = '.js';
var fs = require('fs');


/**
 * sails-generate-backbone
 *
 * Usage:
 * `sails generate backbone`
 *
 * @description Generates a backbone
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate backbone user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this backbone.') );
    } else {
        scope.model = [scope.args[0],'Model'].join('');
        scope.collection = [scope.args[0],'Collection'].join('');
        scope.router = [scope.args[0],'Router'].join('');
        scope.view = [scope.args[0],'View'].join('');
    }


    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }


    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    // Decide the output filename for use in targets below:

    // Add other stuff to the scope for use in our templates:
    scope.whatIsThis = 'a backbone file created at '+scope.createdAt;

    // capitalize and decapitalize the first letter, this function will be used in templates
    scope.capitalize = function(s) {
      return s[0].toUpperCase() + s.slice(1);
    }
    scope.lowerFirstCharacter = function(s) {
      return s[0].toLowerCase() + s.slice(1);
    }
    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    console.log(cb+'');
    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: new (function() {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    // Creates folders at a static path
    if (!fs.existsSync('./assets/js/models'))
      this.targets['./assets/js/models'] = {folder: {}};
    if (!fs.existsSync('./assets/js/views'))
      this.targets['./assets/js/views'] = {folder: {}};
    if (!fs.existsSync('./assets/js/collections'))
      this.targets['./assets/js/collections'] = {folder: {}};
    if (!fs.existsSync('./assets/js/routers'))
      this.targets['./assets/js/routers'] = {folder: {}};

    // creates files
    this['./assets/js/models/:model:' + language] = { template: 'model' + language};
    this['./assets/js/views/:view' + language] = { template: 'view' + language};
    this['./assets/js/collections/:collection' + language] = { template: 'collection' + language};
    this['./assets/js/routers/:router' + language] = { template: 'router' + language};
  })(),


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};


/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "backbone":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-backbone`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
