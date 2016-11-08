/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** PF Utilization Bar Chart **/
	__webpack_require__(12);

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PfUtilizationBarChart = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pfUtilizationBarChartDefault = __webpack_require__(13);

	var _pfUtilizationBarChartDefault2 = _interopRequireDefault(_pfUtilizationBarChartDefault);

	var _pfUtilizationBarChartInline = __webpack_require__(14);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PfUtilizationBarChart = exports.PfUtilizationBarChart = function (_HTMLElement) {
	  _inherits(PfUtilizationBarChart, _HTMLElement);

	  function PfUtilizationBarChart() {
	    _classCallCheck(this, PfUtilizationBarChart);

	    return _possibleConstructorReturn(this, (PfUtilizationBarChart.__proto__ || Object.getPrototypeOf(PfUtilizationBarChart)).apply(this, arguments));
	  }

	  _createClass(PfUtilizationBarChart, [{
	    key: 'createdCallback',
	    value: function createdCallback() {
	      this._lastThresholdClass;
	      this._layout;
	    }
	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      this._layout = this.getAttribute('layout');
	      if (this._layout && this._layout === 'inline') {
	        this.innerHTML = _pfUtilizationBarChartInline.inline;
	      } else {
	        this.innerHTML = _pfUtilizationBarChartDefault2.default;
	      }
	      this.updateChart();
	    }
	  }, {
	    key: 'attributeChangedCallback',
	    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
	      this.updateChart();
	    }
	  }, {
	    key: 'updateChart',
	    value: function updateChart() {
	      var chartTitle = this.getAttribute('chart-title');
	      if (chartTitle) {
	        this.querySelector('.progress-description').innerText = chartTitle;
	      }

	      var usedBar = this.querySelector('.progress-bar-used');
	      var remainingBar = this.querySelector('.progress-bar-remaining');

	      var usedValue = this.getAttribute('used');
	      var totalValue = this.getAttribute('total');
	      var units = this.getAttribute('units') !== null ? this.getAttribute('units') : "";

	      if (this._layout && this._layout === 'inline') {
	        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " " + units;
	      } else {
	        usedBar.querySelector('.utiliz-bar-strong-label').innerText = usedValue + " of " + totalValue + " " + units;
	      }

	      var percentageUsed = Math.round(100 * (usedValue / totalValue));

	      usedBar.setAttribute("style", "width: " + percentageUsed + "%;");
	      remainingBar.setAttribute("style", "width: " + (100 - percentageUsed) + "%;");

	      var errorThreshold = this.getAttribute('threshold-error');
	      var warnThreshold = this.getAttribute('threshold-warning');

	      if (errorThreshold || warnThreshold) {
	        this.setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold);
	      }
	    }
	  }, {
	    key: 'setUsedBarThresholdColor',
	    value: function setUsedBarThresholdColor(usedBar, percentageUsed, errorThreshold, warnThreshold) {
	      var thresholdClass = void 0;

	      if (errorThreshold || warnThreshold) {
	        if (percentageUsed >= errorThreshold) {
	          thresholdClass = "progress-bar-danger";
	        } else if (percentageUsed >= warnThreshold && percentageUsed < errorThreshold) {
	          thresholdClass = "progress-bar-warning";
	        } else if (percentageUsed < warnThreshold) {
	          thresholdClass = "progress-bar-success";
	        }

	        if (thresholdClass !== this._lastThresholdClass) {
	          var event = new CustomEvent('thresholdSet', { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
	          event.initCustomEvent('thresholdSet', true, true, { 'id': this.getAttribute('id'), 'threshold': thresholdClass });
	          usedBar.classList.remove(this._lastThresholdClass);
	          usedBar.classList.add(thresholdClass);
	          this._lastThresholdClass = thresholdClass;
	          usedBar.dispatchEvent(event);
	        }
	      }
	    }
	  }]);

	  return PfUtilizationBarChart;
	}(HTMLElement);

	(function () {
	  document.registerElement('pf-utilization-bar-chart', PfUtilizationBarChart);
	})();

/***/ },

/***/ 13:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pfUtilzBarChartDefault = "\n  <div class=\"utilization-bar-chart-pf\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress progress-label-top-right\">\n      <div class=\"progress\">\n        <div class=\"progress-bar progress-bar-used\">\n          <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n        </div>\n        <div class=\"progress-bar progress-bar-remaining\"></div>\n      </div>\n    </div>\n  </div>\n";
	exports.default = pfUtilzBarChartDefault;

/***/ },

/***/ 14:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pfUtilzBarChartInline = "\n  <div class=\"progress-container progress-description-left progress-label-right\">\n    <div class=\"progress-description\"></div>\n    <div class=\"progress\">\n      <div class=\"progress-bar progress-bar-used\">\n        <span><strong class=\"utiliz-bar-strong-label\"></strong> Used</span>\n      </div>\n      <div class=\"progress-bar progress-bar-remaining\"></div>\n    </div>\n  </div>\n";
	exports.inline = pfUtilzBarChartInline;

/***/ }

/******/ });