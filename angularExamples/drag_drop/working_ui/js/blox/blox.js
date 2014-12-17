/* blox.js - v0.0.1 - 2014-02-18 owned by Moonraft Innovation Labs*/
/*
 *
 * Blox Bootstrap
 * @desc : Blox App inititalization. Entry point to blox application
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
 *
 */

(function() {
  window.blox = window.blox || {};


  /*
   * Bootstrapping angular app
   */

  blox.app = angular.module("bloxApp", []);

  blox.initializeApp = function() {
    return angular.bootstrap(document, ["bloxApp"]);
  };


  /*
   * Save references to angular providers
   */

  blox.app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
    blox.app.controllerProvider = $controllerProvider;
    blox.app.compileProvider = $compileProvider;
  });


  /*
   * document ready. Honestly this doesnt deserve a comment.
   */

  angular.element(document).ready(function() {
    blox.initializeApp();
  });


  /*
   * Blox widget interfacing
   */

  blox.widget = (function() {
    function widget() {
      this.app = blox.app;
    }

    widget.prototype.controller = function() {
      return this.app.controller.apply(this, arguments);
    };

    return widget;

  })();

}).call(this);

//# sourceMappingURL=../../build/core/blox.bootstrap.js.map


/*
 *
 * bxWidgetLoad : Widget loader.
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
 *
 */

(function() {
  blox.app.directive("bxWidgetLoad", [
    '$compile', function($compile) {
      return {
        replace: true,
        restrict: 'AE',
        scope: false,
        link: function(scope, ele, attrs, ctlr) {
          var classList, e, html, posClass, posFlag, widthClass;
          classList = (attrs["class"] != null ? attrs["class"] : '');
          posFlag = attrs.bxWidgetPosition;

          /* 
           * Position Widget
           */
          if (angular.isDefined(posFlag) && posFlag !== '') {
            posClass = '';
            widthClass = '';
            if (posFlag.indexOf("x") !== -1) {
              posClass = (attrs.bxWidgetX != null ? ' medium-offset-' + attrs.bxWidgetX : '');
            }
            if (posFlag.indexOf("y") !== -1) {
              posClass += (attrs.bxWidgetY != null ? ' widget-pos-y-' + attrs.bxWidgetY : '');
            }
            if (posFlag.indexOf("w") !== -1) {
              widthClass = attrs.bxWidgetWidth != null ? 'medium-' + attrs.bxWidgetWidth : '';
            }
            classList = classList + (" " + posClass + " " + widthClass);
          }

          /* 
           * Prepare html template
           */
          html = '<div bx-widget-id="' + attrs.bxWidgetId + '" class="' + classList + '" ng-include  src="htmlUrl"></div><link rel="stylesheet" type="text/css" href="{{cssUrl}}">';
          e = $compile(html)(scope);
          ele.replaceWith(e);

          /* 
           * fetch widget app.js
           */
          require(['../widgets/' + attrs.bxWidgetId + '/js/app.js'], function() {
            scope.$apply(function() {
              scope.htmlUrl = '../widgets/' + attrs.bxWidgetId + '/app.html';
              scope.cssUrl = '../widgets/' + attrs.bxWidgetId + '/css/app.css';
              return false;
            });
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../../build/core/blox.loader.js.map


/*
 *
 * bxServer
 * @desc: Service for server interactions.Caching will be supported in future 
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
 *
 */

(function() {
  blox.app.service("bxServer", [
    '$http', '$q', '$window', function($http, $q, $window) {
      return {
        baseUrl: "/blox/sc/api",

        /*
         * strip debug info from responce
         */
        stripHeader: function(result) {
          if (result.responseData.status !== "ok") {
            return -1;
          }
          return result.responseData.data;
        },

        /*
         * Get request high level api
         */
        get: function(url, data) {
          var deferred;
          if (data == null) {
            data = '';
          }
          deferred = $q.defer();
          console.log("Server Get submit:(" + url + ")", data);
          $http({
            method: 'GET',
            url: this.baseUrl + url
          }).success((function(_this) {
            return function(result) {
              var strippedResult;
              console.log("Server GET Recieve(" + url + "):", result);
              strippedResult = _this.stripHeader(result);
              if (strippedResult === -1) {
                console.log("Failed Response");
              }
              return deferred.resolve(strippedResult);
            };
          })(this));
          return deferred.promise;
        },

        /*
         * Post request high level api
         */
        post: function(url, data) {
          var deferred;
          deferred = $q.defer();
          console.log("Server POST submit:(" + url + ")", data);
          $http({
            method: 'POST',
            url: this.baseUrl + url,
            data: data,
            headers: {
              'Content-Type': 'application/json'
            }
          }).success((function(_this) {
            return function(result) {
              var strippedResult;
              console.log("Server POST Recieve(" + url + "):", result);
              strippedResult = _this.stripHeader(result);
              if (strippedResult === -1) {
                console.log("Failed Response");
              }
              return deferred.resolve(strippedResult);
            };
          })(this));
          return deferred.promise;
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../../build/core/blox.server.js.map


/*
 *
 * bxCurrency -  A currency directive for blox
 *
 */

(function() {
  blox.app.directive('bxCurrency', [
    function() {
      return {
        scope: true,
        restrict: 'A',
        link: function(scope, ele, attrs, ctlr) {
          ele.addClass('dashboard-amt');
          return attrs.$observe('bxCurrency', function(val) {
            var amtParts, currency, firstVal, lastThree, otherNumbers, secondVal, tarHtml;
            if (val === "") {
              tarHtml = val;
            } else {
              amtParts = val.split(".");

              /*
               * Currency hard coded.Make it configurable
               * TODO: Configurable currency
               */
              currency = "&#8377;";
              firstVal = amtParts[0] !== "" ? amtParts[0] : "0";
              if (val.indexOf(',') === -1 && firstVal.length > 3) {
                lastThree = firstVal.substring(firstVal.length - 3);
                otherNumbers = firstVal.substring(0, firstVal.length - 3);
                if (otherNumbers !== "") {
                  lastThree = "," + lastThree;
                }
                firstVal = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
              }
              secondVal = amtParts[1] != null ? amtParts[1] : "00";
              tarHtml = "<span class=\"currency-sign\">" + currency + "</span> <span class=\"currency-number\"> " + firstVal + "<span class=\"currency-sub\">." + secondVal + "</span></span>";
            }
            return ele.html(tarHtml);
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../../build/core/blox.utility.js.map

(function() {
  blox.app.directive("bxSelectbx", [
    '$compile', '$timeout', function($compile, $timeout) {
      return {
        template: '<div class="bx-selectbx"><select></select></div>',
        replace: true,
        restrict: 'AE',
        require: ['?ngModel'],
        link: function(scope, ele, attrs, ctlr) {
          var $content, $select, getRandomInt, optionsName;
          getRandomInt = function(min, max) {
            if (min == null) {
              min = 0;
            }
            if (max == null) {
              max = 600000;
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
          };
          optionsName = "options" + getRandomInt();
          $select = ele.find('select').addClass('bx-selectbx-input');
          $content = angular.element('<div class="bx-selectbx-content" bx-selectbx-content></div>');
          $content.attr('ng-model', attrs.ngModel).attr('bx-selectbx-options', optionsName);
          ele.append($content);
          scope[optionsName] = [];
          if (attrs.bxSelectbxOptions != null) {
            $select.attr('ng-options', attrs.bxSelectbxOptions);
            $select.attr('ng-model', attrs.ngModel);
            if (attrs.bxSelectbxPlaceholder != null) {
              $select.html('<option value="" >' + attrs.bxSelectbxPlaceholder + '</option>');
            }
            $select = $compile($select)(scope);
            $content = $compile($content)(scope);
          }
          $timeout(function() {
            var $optionsEle;
            $optionsEle = void 0;
            return scope.$watch((function() {
              return $select.html();
            }), (function() {
              var $option, i, options, text, _i, _ref;
              options = [];
              $optionsEle = $select.children('option,optgroup');
              for (i = _i = 0, _ref = $optionsEle.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                $option = angular.element($optionsEle[i]);
                text = $option.text();
                options.push(text);
              }
              if (scope[attrs.ngModel] == null) {
                options.splice(0, 1);
              }
              return scope[optionsName] = options;
            }), true);
          }, 0);
          return false;
        }
      };
    }
  ]);

  blox.app.directive("bxSelectbxContent", [
    '$compile', '$timeout', function($compile, $timeout) {
      return {
        scope: {
          ngModel: '=',
          bxSelectbxOptions: '='
        },
        template: '<div class="bx-selectbx-content theme-primary-bdrcolor"><div class="bx-selectbx-box"  ng-hide="isActive" ng-click="toggleActive()">{{ngModel}}</div><ul class="bx-selectbx-options bx-selectbx-detail theme-link-bdrcolor" ng-show="isActive"><li ng-repeat="option in bxSelectbxOptions" ng-mouseenter="hover = true"  ng-class="{\'theme-link-bgcolor\': hover,\'theme-link-color \': !hover}" ng-mouseleave="hover = false" ng-click="optionClicked($index)">{{option}}</li></ul></div>',
        replace: true,
        restrict: 'AE',
        require: ['?ngModel'],
        link: function(scope, ele, attrs, ctlr) {
          var isClicked;
          isClicked = false;
          scope.$watch('bxSelectbxOptions', function() {
            if ((scope.bxSelectbxOptions != null) && scope.bxSelectbxOptions.length > 0 && (scope.ngModel == null)) {
              return scope.ngModel = scope.bxSelectbxOptions[0];
            }
          });
          scope.toggleActive = function() {
            isClicked = true;
            return scope.isActive = !scope.isActive;
          };
          scope.optionClicked = function(index) {
            scope.isActive = false;
            isClicked = true;
            scope.ngModel = scope.bxSelectbxOptions[index];
            return true;
          };
          angular.element(document).bind("click", function(event) {
            if (isClicked) {
              isClicked = false;
              return;
            }
            if (!scope.isActive) {
              return;
            }
            return scope.$apply(function() {
              return scope.isActive = false;
            });
          });
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=../../../build/core/modules/blox.selectbx.js.map
