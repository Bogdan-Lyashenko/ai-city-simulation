(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AiCitySimulation", [], factory);
	else if(typeof exports === 'object')
		exports["AiCitySimulation"] = factory();
	else
		root["AiCitySimulation"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ObjectsTypeMap = exports.ObjectsTypeMap = {
    CAR: 'Car',
    ROAD_MAP: 'RoadMap'
};

var DataLoadType = exports.DataLoadType = {
    IMG: 'img'
};

var CarIdMap = exports.CarIdMap = {
    VOLVO_XC_90: 'VolvoXC90'
};

var DEVICE_TYPES = exports.DEVICE_TYPES = {
    CAMERA: 'camera',
    NAVIGATOR: 'navigator',
    AUTOPILOT: 'autopilot'
};

var STATS_CONFIG = exports.STATS_CONFIG = {
    CAMERA_SIZE: 144,
    IMAGE_TYPE: 'image/jpeg',
    ROAD_IMAGE_SCALE: 0.5
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getCanvasHandlers = exports.getCanvasHandlers = function getCanvasHandlers(canvas) {
    var ctx = canvas.getContext('2d');

    var canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    return {
        canvas: canvas,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        ctx: ctx,
        clear: function clear() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
    };
};

var drawFillRect = exports.drawFillRect = function drawFillRect(ctx, _ref) {
    var x = _ref.x,
        y = _ref.y,
        w = _ref.w,
        h = _ref.h;

    ctx.fillStyle = 'rgba(255, 235, 59, 0.1)'; //TODO: config
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
};

var createTempCanvas = exports.createTempCanvas = function createTempCanvas() {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;

    //document.body.appendChild(c)

    return c;
};

var createCanvasForImageTransfer = exports.createCanvasForImageTransfer = function createCanvasForImageTransfer(_ref2) {
    var size = _ref2.size,
        imageType = _ref2.imageType,
        _ref2$scale = _ref2.scale,
        scale = _ref2$scale === undefined ? 0.5 : _ref2$scale;

    var scaleSize = size * scale;
    var canvasForScale = createTempCanvas(scaleSize, scaleSize);

    var _getCanvasHandlers = getCanvasHandlers(canvasForScale),
        ctx = _getCanvasHandlers.ctx,
        clear = _getCanvasHandlers.clear;

    return {
        covertImageDataToBase64: function covertImageDataToBase64(img) {
            clear();
            ctx.drawImage(img, 0, 0, scaleSize, scaleSize);

            var b64str = canvasForScale.toDataURL(imageType);
            return {
                image: b64str.split('base64,')[1],
                type: imageType.split('image/')[1]
            };
        }
    };
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["h"] = h;
/* harmony export (immutable) */ __webpack_exports__["app"] = app;
function h(name, attributes /*, ...rest*/) {
  var node
  var rest = []
  var children = []
  var length = arguments.length

  while (length-- > 2) rest.push(arguments[length])

  while (rest.length) {
    if ((node = rest.pop()) && node.pop /* Array? */) {
      for (length = node.length; length--; ) {
        rest.push(node[length])
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node)
    }
  }

  return typeof name === "function"
    ? name(attributes || {}, children)
    : {
        nodeName: name,
        attributes: attributes || {},
        children: children,
        key: attributes && attributes.key
      }
}

function app(state, actions, view, container) {
  var renderLock
  var invokeLaterStack = []
  var rootElement = (container && container.children[0]) || null
  var oldNode = rootElement && toVNode(rootElement, [].map)
  var globalState = clone(state)
  var wiredActions = clone(actions)

  scheduleRender(wireStateToActions([], globalState, wiredActions))

  return wiredActions

  function toVNode(element, map) {
    return {
      nodeName: element.nodeName.toLowerCase(),
      attributes: {},
      children: map.call(element.childNodes, function(element) {
        return element.nodeType === 3 // Node.TEXT_NODE
          ? element.nodeValue
          : toVNode(element, map)
      })
    }
  }

  function render() {
    renderLock = !renderLock

    var next = view(globalState, wiredActions)
    if (container && !renderLock) {
      rootElement = patch(container, rootElement, oldNode, (oldNode = next))
    }

    while ((next = invokeLaterStack.pop())) next()
  }

  function scheduleRender() {
    if (!renderLock) {
      renderLock = !renderLock
      setTimeout(render)
    }
  }

  function clone(target, source) {
    var obj = {}

    for (var i in target) obj[i] = target[i]
    for (var i in source) obj[i] = source[i]

    return obj
  }

  function set(path, value, source) {
    var target = {}
    if (path.length) {
      target[path[0]] =
        path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value
      return clone(source, target)
    }
    return value
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]]
    }
    return source
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ? (function(key, action) {
            actions[key] = function(data) {
              if (typeof (data = action(data)) === "function") {
                data = data(get(path, globalState), actions)
              }

              if (
                data &&
                data !== (state = get(path, globalState)) &&
                !data.then // Promise
              ) {
                scheduleRender(
                  (globalState = set(path, clone(state, data), globalState))
                )
              }

              return data
            }
          })(key, actions[key])
        : wireStateToActions(
            path.concat(key),
            (state[key] = state[key] || {}),
            (actions[key] = clone(actions[key]))
          )
    }
  }

  function getKey(node) {
    return node ? node.key : null
  }

  function setElementProp(element, name, value, isSVG, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in clone(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i]
      }
    } else {
      if (typeof value === "function" || (name in element && !isSVG)) {
        element[name] = value == null ? "" : value
      } else if (value != null && value !== false) {
        element.setAttribute(name, value)
      }

      if (value == null || value === false) {
        element.removeAttribute(name)
      }
    }
  }

  function createElement(node, isSVG) {
    var element =
      typeof node === "string" || typeof node === "number"
        ? document.createTextNode(node)
        : (isSVG = isSVG || node.nodeName === "svg")
          ? document.createElementNS(
              "http://www.w3.org/2000/svg",
              node.nodeName
            )
          : document.createElement(node.nodeName)

    if (node.attributes) {
      if (node.attributes.oncreate) {
        invokeLaterStack.push(function() {
          node.attributes.oncreate(element)
        })
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG))
      }

      for (var name in node.attributes) {
        setElementProp(element, name, node.attributes[name], isSVG)
      }
    }

    return element
  }

  function updateElement(element, oldProps, attributes, isSVG) {
    for (var name in clone(oldProps, attributes)) {
      if (
        attributes[name] !==
        (name === "value" || name === "checked"
          ? element[name]
          : oldProps[name])
      ) {
        setElementProp(element, name, attributes[name], isSVG, oldProps[name])
      }
    }

    if (attributes.onupdate) {
      invokeLaterStack.push(function() {
        attributes.onupdate(element, oldProps)
      })
    }
  }

  function removeChildren(element, node, attributes) {
    if ((attributes = node.attributes)) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i])
      }

      if (attributes.ondestroy) {
        attributes.ondestroy(element)
      }
    }
    return element
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }

    if (node.attributes && (cb = node.attributes.onremove)) {
      cb(element, done)
    } else {
      done()
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {
    } else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element)
    } else if (node.nodeName && node.nodeName === oldNode.nodeName) {
      updateElement(
        element,
        oldNode.attributes,
        node.attributes,
        (isSVG = isSVG || node.nodeName === "svg")
      )

      var oldElements = []
      var oldKeyed = {}
      var newKeyed = {}

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i]

        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < node.children.length) {
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKey(oldChild)
        var newKey = getKey(newChild)

        if (newKeyed[oldKey]) {
          i++
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG)
            j++
          }
          i++
        } else {
          var recyledNode = oldKeyed[newKey] || []

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG)
            i++
          } else if (recyledNode[0]) {
            patch(
              element,
              element.insertBefore(recyledNode[0], oldElements[i]),
              recyledNode[1],
              newChild,
              isSVG
            )
          } else {
            patch(element, oldElements[i], null, newChild, isSVG)
          }

          j++
          newKeyed[newKey] = newChild
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i]
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
        }
      }
    } else if (node.nodeName === oldNode.nodeName) {
      element.nodeValue = node
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      )
      removeElement(parent, nextSibling, oldNode)
    }
    return element
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var initRequestAnimationFrameLoop = exports.initRequestAnimationFrameLoop = function initRequestAnimationFrameLoop(animateFn) {
    function helperFn(ts) {
        animateFn(ts);
        window.requestAnimationFrame(helperFn);
    }

    window.requestAnimationFrame(helperFn);
};

var stopAnimationFrameLoop = function stopAnimationFrameLoop(id) {
    return window.cancelAnimationFrame(id);
};

var slowDown = exports.slowDown = function slowDown(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
    var prevTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return function () {
        var newTime = Date.now();

        if (newTime - prevTime > delay) {
            fn();

            prevTime = newTime;
        }
    };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _maintainer = __webpack_require__(11);

var isInit = false;

var createConnection = function createConnection() {
    return {
        init: function init() {
            var _this = this;

            var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ws://127.0.0.1:8765/';

            this.ws = new WebSocket(route);
            this.ws.onmessage = function (event) {
                return _this.onMessage(event.data);
            };

            isInit = true;
        },
        onMessage: function onMessage(msg) {
            try {
                this.safeCheck();
                (0, _maintainer.maintain)(msg);
            } catch (e) {}
        },
        sendMessage: function sendMessage(msg) {
            try {
                this.safeCheck();
                this.ws.send(msg);
            } catch (e) {}
        },
        safeCheck: function safeCheck() {
            if (!isInit) throw new Error('connection is not init');
        }
    };
};

var connection = createConnection();
exports.default = connection;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseReceivedData = exports.sendData = undefined;

var _connection = __webpack_require__(4);

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendData = exports.sendData = function sendData(type, data) {
    var json = JSON.stringify({ type: type, data: data });
    return _connection2.default.sendMessage(json);
};

var parseReceivedData = exports.parseReceivedData = function parseReceivedData(data) {
    return JSON.parse(data);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(0);

var _composition = __webpack_require__(15);

var _CarPhysics = __webpack_require__(17);

var _EquipmentBus = __webpack_require__(20);

var DefaultCarState = {
    type: _constants.ObjectsTypeMap.CAR,
    isVisible: true,
    initialPhysics: {
        x: 50,
        y: 50,
        smoothSteer: true,
        safeSteer: true,
        config: { maxSteer: 0.5, maxSpeed: 10 }
    }
};

var Car = function Car(world, state) {
    return {
        setup: function setup() {
            var _this = this;

            this.physicalInstance = (0, _CarPhysics.createCarPhysics)(state.initialPhysics);
            this.equipmentBus = (0, _EquipmentBus.createEquipmentBus)(world, this);

            world.addDynamicEntry(this);
            world.onTick(function (ts) {
                return _this.onTick(ts);
            });
        },
        hasVisualView: function hasVisualView() {
            return state.isVisible;
        },
        getType: function getType() {
            return state.type;
        },
        getCarPhysData: function getCarPhysData() {
            var _physicalInstance = this.physicalInstance,
                position = _physicalInstance.position,
                heading = _physicalInstance.heading;


            return {
                position: position,
                heading: heading
            };
        },
        getVisualData: function getVisualData() {
            var scale = 12;
            var _physicalInstance2 = this.physicalInstance,
                config = _physicalInstance2.config,
                position = _physicalInstance2.position,
                heading = _physicalInstance2.heading;


            return {
                cgToRear: scale * config.cgToRear,
                halfWidth: scale * config.halfWidth,

                position: position,
                heading: heading
            };
        },
        getStatsData: function getStatsData() {
            var _physicalInstance3 = this.physicalInstance,
                velocity_c = _physicalInstance3.velocity_c,
                steerAngle = _physicalInstance3.steerAngle,
                inputs = _physicalInstance3.inputs;


            return {
                speed: (velocity_c.x / 2 * 3.6).toFixed(1),
                steerAngle: steerAngle.toFixed(3),

                left: inputs.left,
                right: inputs.right,
                throttle: inputs.throttle,
                brake: inputs.brake
            };
        },
        onTick: function onTick(ts) {
            this.physicalInstance.update(ts, 2, 0.6);
        },
        setDrivingInput: function setDrivingInput(input) {
            return this.physicalInstance.setInput(input);
        },
        accessRoadCamera: function accessRoadCamera() {
            return this.equipmentBus.getRoadCamera();
        }
    };
};

var createCar = exports.createCar = function createCar(world) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var car = Car(world, _extends({}, (0, _composition.mergeObjectStructures)(DefaultCarState, state)));

    car.setup();

    return car;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var uiActions = exports.uiActions = {
    learning: {
        stats: {
            defineTableModel: function defineTableModel(tableHead) {
                return function (state) {
                    return { tableHead: tableHead };
                };
            },
            setTableRows: function setTableRows(tableRows) {
                return function (state) {
                    return { tableRows: tableRows };
                };
            }
        },
        cameraMonitor: {
            setContext: function setContext(el) {
                return function (state) {
                    return { context: el.getContext('2d') };
                };
            },
            setImageData: function setImageData(imageData) {
                return function (state) {
                    return { imageData: imageData };
                };
            }
        }
    }
};

var linkActionsCopy = exports.linkActionsCopy = function linkActionsCopy(newActionsObject) {
    return exports.uiActions = uiActions = newActionsObject;
};

var defineTableModel = exports.defineTableModel = function defineTableModel(tableModel) {
    return uiActions.learning.stats.defineTableModel(tableModel);
};

var setTableRows = exports.setTableRows = function setTableRows(rows) {
    return uiActions.learning.stats.setTableRows(rows);
};

var setImageData = exports.setImageData = function setImageData(imageData) {
    return uiActions.learning.cameraMonitor.setImageData(imageData);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _World = __webpack_require__(9);

var _World2 = _interopRequireDefault(_World);

var _connection = __webpack_require__(4);

var _connection2 = _interopRequireDefault(_connection);

var _City = __webpack_require__(13);

var _Render = __webpack_require__(25);

var _Learning = __webpack_require__(28);

var _storage = __webpack_require__(33);

var _UiLayer = __webpack_require__(35);

var _events = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    start: function start(mountNode) {
        (0, _UiLayer.createUiLayer)(mountNode);
        //connection.init(); //TODO: uncomment when need socket

        var city = (0, _City.createCity)(_World2.default);
        var render = (0, _Render.createRender)(_World2.default);
        //TODO: moving this line breaks car rendering
        //also, it should init only if it's learning mode
        var learningDriving = (0, _Learning.setupLearningDriving)(_World2.default);
        (0, _events.onUiEvent)(_events.EVENTS.START_LEARN, function () {
            return learningDriving.start();
        });
        (0, _events.onUiEvent)(_events.EVENTS.STOP_LEARN, function () {
            return learningDriving.stop();
        });

        var storage = (0, _storage.createStorage)();
        storage.setData(render.getInitialVisualData());

        Promise.all([storage.load()]).then(function () {
            city.init();

            _World2.default.startTime();
            render.start();
        });
    }
};
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWorld = undefined;

var _animation = __webpack_require__(3);

var _View = __webpack_require__(10);

var worldConfig = {
    TICK_TIME: 10 //5000
};

var createWorld = exports.createWorld = function createWorld(config) {
    var worldView = (0, _View.createWorldView)();

    var previousTs = 0,
        isWorldStarted = false;

    var listeners = [];

    var dynamicEntries = [];
    var staticEntries = [];

    return {
        startTime: function startTime() {
            if (isWorldStarted) return;
            isWorldStarted = true;

            (0, _animation.initRequestAnimationFrameLoop)(function (currentTs) {
                var delta = currentTs - previousTs;

                if (delta >= config.TICK_TIME) {
                    listeners.forEach(function (l) {
                        return l(delta);
                    });
                    previousTs = currentTs;
                }
            });
        },
        onTick: function onTick(fn) {
            listeners.push(fn);
            return listeners.length - 1;
        },
        removeListener: function removeListener(id) {
            listeners.splice(id, 1);
        },
        addDynamicEntry: function addDynamicEntry(entry) {
            dynamicEntries.push(entry);
        },
        getDynamicEntries: function getDynamicEntries() {
            return dynamicEntries;
        },
        addStaticEntry: function addStaticEntry(entry) {
            staticEntries.push(entry);
        },
        getStaticEntries: function getStaticEntries() {
            return staticEntries;
        },
        getView: function getView() {
            return worldView;
        }
    };
};

var world = createWorld(worldConfig);
exports.default = world;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWorldView = exports.ViewMap = undefined;

var _canvas = __webpack_require__(1);

var getView2D = function getView2D() {
    //TODO: IDs to config
    var roadCanvas = document.getElementById('static-stage');
    var helperCanvas = document.getElementById('helper-stage');

    return {
        getRoadView: function getRoadView() {
            var roadStage = (0, _canvas.getCanvasHandlers)(roadCanvas);

            return {
                getImageData: function getImageData(x, y, w, h) {
                    return roadStage.ctx.getImageData(x, y, w, h);
                }
            };
        },
        getHelperView: function getHelperView() {
            var helperStage = (0, _canvas.getCanvasHandlers)(helperCanvas);

            return {
                highlightArea: function highlightArea(x, y, w, h) {
                    helperStage.clear();
                    (0, _canvas.drawFillRect)(helperStage.ctx, { x: x, y: y, w: w, h: h });
                }
            };
        }
    };
};

var ViewMap = exports.ViewMap = {
    view2D: getView2D()
};

//TODO: config
var CurrentView = ViewMap.view2D;

var createWorldView = exports.createWorldView = function createWorldView() {
    return CurrentView;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.on = exports.maintain = undefined;

var _events = __webpack_require__(12);

var _adapter = __webpack_require__(5);

var publishSubscriber = (0, _events.createPublishSubscriber)();

var maintain = exports.maintain = function maintain(response) {
    var _parseReceivedData = (0, _adapter.parseReceivedData)(response),
        type = _parseReceivedData.type,
        data = _parseReceivedData.data;

    //TODO: smart handling blah-blah


    publishSubscriber.publish(type, data);
};

var on = exports.on = function on(event, fn) {
    publishSubscriber.subscribe(event, fn);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var createPublishSubscriber = exports.createPublishSubscriber = function createPublishSubscriber() {
    var subscribersMap = {};

    return {
        publish: function publish(event, data) {
            var subscribers = subscribersMap[event] || [];
            subscribers.forEach(function (s) {
                return s(data);
            });
        },
        subscribe: function subscribe(event, fn) {
            if (!subscribersMap[event]) {
                subscribersMap[event] = [];
            }

            subscribersMap[event].push(fn);
        }
    };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCity = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Traffic = __webpack_require__(14);

var _Map = __webpack_require__(24);

var City = function City(world, state) {
    return {
        init: function init() {
            //TODO: now is learning
            var traffic = (0, _Traffic.createTraffic)(world);
            //traffic.init();
            var map = (0, _Map.createMap)(world);
        }
    };
};

var createCity = exports.createCity = function createCity(world) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return City(world, _extends({}, state));
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTraffic = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Car = __webpack_require__(6);

var DefaultTrafficState = {
    cars: [],
    TRAFFIC_LIGHTS: true
};

var Traffic = function Traffic(world, state) {
    return {
        init: function init() {
            this.createCars();
        },
        createCars: function createCars() {
            var myCar = (0, _Car.createCar)(world, {
                registrationNumber: '1',
                model: 'Volvo XC90'
            });

            this.addCar(myCar);
        },
        addCar: function addCar(car) {
            state.cars.push(car);
        }
    };
};

var createTraffic = exports.createTraffic = function createTraffic(world) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return Traffic(world, _extends({}, DefaultTrafficState, state));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mergeObjectStructures = undefined;

var _deepmerge = __webpack_require__(16);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeObjectStructures = exports.mergeObjectStructures = function mergeObjectStructures(destination, source) {
    return (0, _deepmerge2.default)(destination, source);
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument)
	})
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument)
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument)
	} else {
		return mergeObject(target, source, optionsArgument)
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument)
	}, {})
};

var deepmerge_1 = deepmerge;

/* harmony default export */ __webpack_exports__["default"] = (deepmerge_1);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCarPhysics = exports.getCarConfig = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Code is heavily based on source from
                                                                                                                                                                                                                                                                   * https://github.com/spacejack/carphysics2d
                                                                                                                                                                                                                                                                   */

var _Vec = __webpack_require__(18);

var _GMath = __webpack_require__(19);

var getInputState = function getInputState() {
    return {
        left: 0,
        right: 0,
        throttle: 0,
        brake: 0,
        ebrake: 0
    };
};

/**
 *  Car setup params and magic constants.
 */
var getCarConfig = exports.getCarConfig = function getCarConfig() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var state = {};

    //  Defaults approximate a lightweight sports-sedan.
    state.gravity = opts.gravity || 9.81; // m/s^2
    state.mass = opts.mass || 1200.0; // kg
    state.inertiaScale = opts.inertiaScale || 1.0; // Multiply by mass for inertia
    state.halfWidth = opts.halfWidth || 0.8; // Centre to side of chassis (metres)
    state.cgToFront = opts.cgToFront || 2.0; // Centre of gravity to front of chassis (metres)
    state.cgToRear = opts.cgToRear || 2.0; // Centre of gravity to rear of chassis
    state.cgToFrontAxle = opts.cgToFrontAxle || 1.25; // Centre gravity to front axle
    state.cgToRearAxle = opts.cgToRearAxle || 1.25; // Centre gravity to rear axle
    state.cgHeight = opts.cgHeight || 0.55; // Centre gravity height
    state.wheelRadius = opts.wheelRadius || 0.3; // Includes tire (also represents height of axle)
    state.wheelWidth = opts.wheelWidth || 0.2; // Used for render only
    state.tireGrip = opts.tireGrip || 2.0; // How much grip tires have
    state.lockGrip = typeof opts.lockGrip === 'number' ? _GMath.GMath.clamp(opts.lockGrip, 0.01, 1.0) : 0.7; // % of grip available when wheel is locked
    state.engineForce = opts.engineForce || 8000.0;
    state.brakeForce = opts.brakeForce || 4000.0;
    state.eBrakeForce = opts.eBrakeForce || state.brakeForce / 2.5;
    state.weightTransfer = typeof opts.weightTransfer === 'number' ? opts.weightTransfer : 0.2; // How much weight is transferred during acceleration/braking
    state.maxSteer = opts.maxSteer || 0.6; // Maximum steering angle in radians
    state.cornerStiffnessFront = opts.cornerStiffnessFront || 5.0;
    state.cornerStiffnessRear = opts.cornerStiffnessRear || 5.2;
    state.airResist = typeof opts.airResist === 'number' ? opts.airResist : 2.5; // air resistance (* vel)
    state.rollResist = typeof opts.rollResist === 'number' ? opts.rollResist : 8.0; // rolling resistance force (* vel)

    return state;
};

function Car() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scale = arguments[1];

    //  State of inputs
    this.inputs = getInputState();

    //  Car state variables
    this.heading = opts.heading || 0.0; // angle car is pointed at (radians)
    this.position = new _Vec.Vec2(opts.x, opts.y); // metres in world coords
    this.velocity = new _Vec.Vec2(); // m/s in world coords
    this.velocity_c = new _Vec.Vec2(); // m/s in local car coords (x is forward y is sideways)
    this.accel = new _Vec.Vec2(); // acceleration in world coords
    this.accel_c = new _Vec.Vec2(); // acceleration in local car coords
    this.absVel = 0.0; // absolute velocity m/s
    this.yawRate = 0.0; // angular velocity in radians
    this.steer = 0.0; // amount of steering input (-1.0..1.0)
    this.steerAngle = 0.0; // actual front wheel steer angle (-maxSteer..maxSteer)

    //  Use input smoothing (on by default)
    this.smoothSteer = opts.smoothSteer === undefined ? true : !!opts.smoothSteer;
    //  Use safe steering (angle limited by speed)
    this.safeSteer = opts.safeSteer === undefined ? true : !!opts.safeSteer;

    //  Setup car configuration
    this.config = getCarConfig(opts.config);

    // Re-calculate these
    this.inertia = this.config.mass * this.config.inertiaScale;
    this.wheelBase = this.config.cgToFrontAxle + this.config.cgToRearAxle;
    this.axleWeightRatioFront = this.config.cgToRearAxle / this.wheelBase; // % car weight on the front axle
    this.axleWeightRatioRear = this.config.cgToFrontAxle / this.wheelBase; // % car weight on the rear axle
}

/**
 *  @param dt Floating-point Delta Time in seconds
 */
Car.prototype.doPhysics = function (dt, dtHeading) {
    // Shorthand
    var cfg = this.config;

    // Pre-calc heading vector
    var sn = Math.sin(this.heading);
    var cs = Math.cos(this.heading);

    // Get velocity in local car coordinates
    this.velocity_c.x = cs * this.velocity.x + sn * this.velocity.y;
    this.velocity_c.y = cs * this.velocity.y - sn * this.velocity.x;

    // Weight on axles based on centre of gravity and weight shift due to forward/reverse acceleration
    var axleWeightFront = cfg.mass * (this.axleWeightRatioFront * cfg.gravity - cfg.weightTransfer * this.accel_c.x * cfg.cgHeight / this.wheelBase);
    var axleWeightRear = cfg.mass * (this.axleWeightRatioRear * cfg.gravity + cfg.weightTransfer * this.accel_c.x * cfg.cgHeight / this.wheelBase);

    // Resulting velocity of the wheels as result of the yaw rate of the car body.
    // v = yawrate * r where r is distance from axle to CG and yawRate (angular velocity) in rad/s.
    var yawSpeedFront = cfg.cgToFrontAxle * this.yawRate;
    var yawSpeedRear = -cfg.cgToRearAxle * this.yawRate;

    // Calculate slip angles for front and rear wheels (a.k.a. alpha)
    var slipAngleFront = Math.atan2(this.velocity_c.y + yawSpeedFront, Math.abs(this.velocity_c.x)) - _GMath.GMath.sign(this.velocity_c.x) * this.steerAngle;
    var slipAngleRear = Math.atan2(this.velocity_c.y + yawSpeedRear, Math.abs(this.velocity_c.x));

    var tireGripFront = cfg.tireGrip;
    var tireGripRear = cfg.tireGrip * (1.0 - this.inputs.ebrake * (1.0 - cfg.lockGrip)); // reduce rear grip when ebrake is on

    var frictionForceFront_cy = _GMath.GMath.clamp(-cfg.cornerStiffnessFront * slipAngleFront, -tireGripFront, tireGripFront) * axleWeightFront;
    var frictionForceRear_cy = _GMath.GMath.clamp(-cfg.cornerStiffnessRear * slipAngleRear, -tireGripRear, tireGripRear) * axleWeightRear;

    //  Get amount of brake/throttle from our inputs
    var brake = Math.min(this.inputs.brake * cfg.brakeForce + this.inputs.ebrake * cfg.eBrakeForce, cfg.brakeForce);
    var throttle = this.inputs.throttle * cfg.engineForce;

    //  Resulting force in local car coordinates.
    //  This is implemented as a RWD car only.
    var tractionForce_cx = throttle - brake * _GMath.GMath.sign(this.velocity_c.x);
    var tractionForce_cy = 0;

    var dragForce_cx = -cfg.rollResist * this.velocity_c.x - cfg.airResist * this.velocity_c.x * Math.abs(this.velocity_c.x);
    var dragForce_cy = -cfg.rollResist * this.velocity_c.y - cfg.airResist * this.velocity_c.y * Math.abs(this.velocity_c.y);

    // total force in car coordinates
    var totalForce_cx = dragForce_cx + tractionForce_cx;
    var totalForce_cy = dragForce_cy + tractionForce_cy + Math.cos(this.steerAngle) * frictionForceFront_cy + frictionForceRear_cy;

    // acceleration along car axes
    this.accel_c.x = totalForce_cx / cfg.mass; // forward/reverse accel
    this.accel_c.y = totalForce_cy / cfg.mass; // sideways accel

    // acceleration in world coordinates
    this.accel.x = cs * this.accel_c.x - sn * this.accel_c.y;
    this.accel.y = sn * this.accel_c.x + cs * this.accel_c.y;

    // update velocity
    this.velocity.x += this.accel.x * dt;
    this.velocity.y += this.accel.y * dt;

    this.absVel = this.velocity.len();

    // calculate rotational forces
    var angularTorque = (frictionForceFront_cy + tractionForce_cy) * cfg.cgToFrontAxle - frictionForceRear_cy * cfg.cgToRearAxle;

    //  Sim gets unstable at very slow speeds, so just stop the car
    if (Math.abs(this.absVel) < 0.5 && !throttle) {
        this.velocity.x = this.velocity.y = this.absVel = 0;
        angularTorque = this.yawRate = 0;
    }

    var angularAccel = angularTorque / this.inertia;

    this.yawRate += angularAccel * dtHeading;
    this.heading += this.yawRate * dtHeading;

    //  finally we can update position
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
};

/**
 *  Smooth Steering
 *  Apply maximum steering angle change velocity.
 */
Car.prototype.applySmoothSteer = function (steerInput, dt) {
    var steer = 0;

    if (Math.abs(steerInput) > 0.001) {
        //  Move toward steering input
        steer = _GMath.GMath.clamp(this.steer + steerInput * dt * 2.0, -1.0, 1.0); // -inp.right, inp.left);
    } else {
        //  No steer input - move toward centre (0)
        if (this.steer > 0) {
            steer = Math.max(this.steer - dt * 1.0, 0);
        } else if (this.steer < 0) {
            steer = Math.min(this.steer + dt * 1.0, 0);
        }
    }

    return steer;
};

/**
 *  Safe Steering
 *  Limit the steering angle by the speed of the car.
 *  Prevents oversteer at expense of more understeer.
 */
Car.prototype.applySafeSteer = function (steerInput) {
    var avel = Math.min(this.absVel, 250.0); // m/s
    return steerInput * (1.0 - avel / 280.0);
};

/**
 *  @param dtms Delta Time in milliseconds
 */
Car.prototype.update = function (dtms, m, h) {
    var dt = m * dtms / 1000.0; // delta T in seconds
    var dtHeading = h * dtms / 1000.0; // delta T in seconds

    this.throttle = this.inputs.throttle;
    this.brake = this.inputs.brake;

    var steerInput = this.inputs.left - this.inputs.right;

    //  Perform filtering on steering...
    if (this.smoothSteer) this.steer = this.applySmoothSteer(steerInput, dtHeading);else this.steer = steerInput;

    if (this.safeSteer) this.steer = this.applySafeSteer(this.steer);

    //  Now set the actual steering angle
    this.steerAngle = this.steer * this.config.maxSteer;

    //
    //  Now that the inputs have been filtered and we have our throttle,
    //  brake and steering values, perform the car physics update...
    //
    this.doPhysics(dt, dtHeading);
};

Car.prototype.setInput = function () {
    var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.inputs = _extends({}, this.inputs, inputs);
};

var createCarPhysics = exports.createCarPhysics = function createCarPhysics(opts, scale) {
    return new Car(opts, scale);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Code is heavily based on source from
 * https://github.com/spacejack/carphysics2d
 */

var Vec2 = exports.Vec2 = function Vec2(x, y) {
    this.x = x || 0.0;
    this.y = y || 0.0;
};

Vec2.prototype = {
    set: function set(x, y) {
        this.x = x;
        this.y = y;
    },
    copy: function copy(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    len: function len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    dot: function dot(v) {
        return this.x * v.x + this.y * v.y;
    },
    det: function det(v) {
        return this.x * v.y - this.y * v.x;
    },
    rotate: function rotate(r) {
        var x = this.x,
            y = this.y,
            c = Math.cos(r),
            s = Math.sin(r);
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    },
    angle: function angle() {
        return Math.atan2(this.y, this.x);
    },
    setLen: function setLen(l) {
        var s = this.len();

        if (s > 0.0) {
            s = l / s;
            this.x *= s;
            this.y *= s;
        } else {
            this.x = l;
            this.y = 0.0;
        }
    },
    normalize: function normalize() {
        this.setLen(1.0);
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Code is heavily based on source from
 * https://github.com/spacejack/carphysics2d
 */

var GMath = exports.GMath = {
    sign: function sign(n) {
        return typeof n === 'number' ? n ? n < 0 ? -1 : 1 : n === n ? 0 : NaN : NaN;
    },
    clamp: function clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
    },
    pmod: function pmod(n, m) {
        return (n % m + m) % m;
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEquipmentBus = undefined;

var _Camera = __webpack_require__(21);

var _Navigator = __webpack_require__(22);

var _AutoPilot = __webpack_require__(23);

var EquipmentBus = function EquipmentBus(world, car) {
    var devices = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return {
        accessCar: function accessCar() {
            return car;
        },
        getRoadCamera: function getRoadCamera() {
            return devices.roadCamera;
        },
        connectDevice: function connectDevice(_ref) {
            var type = _ref.type,
                device = _ref.device;

            devices[type] = device;
        },
        setup: function setup() {
            var equipmentBus = this;
            var worldView = world.getView();

            this.connectDevice({
                type: 'roadCamera',
                device: (0, _Camera.createCamera)({
                    equipmentBus: equipmentBus,
                    targetView: worldView.getRoadView(),
                    helperView: worldView.getHelperView()
                })
            });

            this.connectDevice({
                type: 'navigator',
                device: (0, _Navigator.createNavigator)({
                    equipmentBus: equipmentBus
                })
            });

            this.connectDevice({
                type: 'autopilot',
                device: (0, _AutoPilot.createAutoPilot)({
                    equipmentBus: equipmentBus
                })
            });
        }
    };
};

var createEquipmentBus = exports.createEquipmentBus = function createEquipmentBus(world, car) {
    var equipmentBus = EquipmentBus(world, car);

    equipmentBus.setup();

    return equipmentBus;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCamera = undefined;

var _constants = __webpack_require__(0);

var _canvas = __webpack_require__(1);

var addCarHeading = function addCarHeading(ctx, rSideBack, heading, cgToRear, halfWidth, twoCgToRear) {
    ctx.save();
    ctx.translate(rSideBack, rSideBack);
    ctx.rotate(heading);
    ctx.fillRect(-cgToRear, -halfWidth, twoCgToRear, cgToRear);
    ctx.restore();
};

var Camera = function Camera(_ref) {
    var targetView = _ref.targetView,
        helperView = _ref.helperView,
        car = _ref.car;

    var _car$getVisualData = car.getVisualData(),
        cgToRear = _car$getVisualData.cgToRear,
        halfWidth = _car$getVisualData.halfWidth,
        position = _car$getVisualData.position;

    var twoCgToRear = 2 * cgToRear,
        rSideBack = 3 * cgToRear,
        rSideForward = 2 * rSideBack;

    var tmpCanvas = (0, _canvas.createTempCanvas)(rSideForward, rSideForward);

    var _getCanvasHandlers = (0, _canvas.getCanvasHandlers)(tmpCanvas),
        ctx = _getCanvasHandlers.ctx,
        clear = _getCanvasHandlers.clear;

    //TODO: theme


    ctx.fillStyle = 'red';

    return {
        highlightPhotoArea: function highlightPhotoArea() {
            var x = position.x,
                y = position.y;


            return helperView.highlightArea(x - rSideBack, y - rSideBack, rSideForward, rSideForward);
        },
        takePhoto: function takePhoto() {
            var x = position.x,
                y = position.y;

            var _car$getCarPhysData = car.getCarPhysData(),
                heading = _car$getCarPhysData.heading;

            var imageData = targetView.getImageData(x - rSideBack, y - rSideBack, rSideForward, rSideForward);

            clear();
            ctx.putImageData(imageData, 0, 0);

            //draw car rectangle
            addCarHeading(ctx, rSideBack, heading, cgToRear, halfWidth, twoCgToRear);

            return ctx.canvas;
        }
    };
};

var createCamera = exports.createCamera = function createCamera(_ref2) {
    var targetView = _ref2.targetView,
        helperView = _ref2.helperView,
        equipmentBus = _ref2.equipmentBus;

    return Camera({ targetView: targetView, helperView: helperView, car: equipmentBus.accessCar() });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createNavigator = undefined;

var _constants = __webpack_require__(0);

var createNavigator = exports.createNavigator = function createNavigator() {
    return {
        type: _constants.DEVICE_TYPES.NAVIGATOR,

        getCurrentPosition: function getCurrentPosition() {
            return {};
        }
    };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAutoPilot = undefined;

var _constants = __webpack_require__(0);

var createAutoPilot = exports.createAutoPilot = function createAutoPilot() {
    var state = {};

    return {
        type: _constants.DEVICE_TYPES.AUTOPILOT
    };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMap = undefined;

var _constants = __webpack_require__(0);

var createMap = exports.createMap = function createMap(world) {
    var map = {
        hasVisualView: function hasVisualView() {
            return true;
        },
        getVisualData: function getVisualData() {
            return {
                pt: {
                    x: 0,
                    y: 0
                }
            };
        },
        getType: function getType() {
            return _constants.ObjectsTypeMap.ROAD_MAP;
        }
    };

    world.addStaticEntry(map);

    return map;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRender = exports.RenderMap = undefined;

var _Canvas2dRender = __webpack_require__(26);

var _Canvas2dRender2 = _interopRequireDefault(_Canvas2dRender);

var _VisualConfig = __webpack_require__(27);

var _VisualConfig2 = _interopRequireDefault(_VisualConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * It should be easy to switch to 3d render, etc
 */

var RenderMap = exports.RenderMap = {
    render2D: {
        createRender: function createRender(id, visual) {
            var canvas = document.getElementById(id);
            return (0, _Canvas2dRender2.default)(canvas, visual);
        },
        visual: function visual() {
            return (0, _VisualConfig2.default)();
        }
    }
};

//TODO: config
var CurrentRender = RenderMap.render2D;

var createRender = exports.createRender = function createRender(world) {
    var visual = CurrentRender.visual();
    //TODO: IDs move to config
    var dRender = CurrentRender.createRender('dynamic-stage', visual);
    var sRender = CurrentRender.createRender('static-stage', visual);

    return {
        start: function start() {
            this.renderDynamics();
            this.renderStatics();
        },
        renderDynamics: function renderDynamics() {
            var visualEntries = world.getDynamicEntries().filter(function (e) {
                return e.hasVisualView && e.hasVisualView();
            }); //TODO: think how it will be dynamically updated if some of entries get view

            world.onTick(function () {
                dRender.clear();
                visualEntries.forEach(function (e) {
                    return dRender.renderEntry(e.getType(), e.getVisualData());
                });
            });
        },
        renderStatics: function renderStatics() {
            var visualEntries = world.getStaticEntries().filter(function (e) {
                return e.hasVisualView && e.hasVisualView();
            });

            visualEntries.forEach(function (e) {
                return sRender.renderEntry(e.getType(), e.getVisualData());
            });
        },
        getInitialVisualData: function getInitialVisualData() {
            return visual.getInitialDataConfig();
        }
    };
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getEntryRenderMethod = exports.EntriesRenders = undefined;

var _EntriesRenders;

var _canvas = __webpack_require__(1);

var _constants = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EntriesRenders = exports.EntriesRenders = (_EntriesRenders = {}, _defineProperty(_EntriesRenders, _constants.ObjectsTypeMap.CAR, function (ctx, state, visualModel) {
    ctx.save();

    ctx.translate(state.position.x, state.position.y);
    ctx.rotate(state.heading);

    ctx.drawImage(visualModel.data, -state.cgToRear, -state.halfWidth);

    ctx.restore();
}), _defineProperty(_EntriesRenders, _constants.ObjectsTypeMap.ROAD_MAP, function (ctx, state, visualModel) {
    ctx.drawImage(visualModel.data, state.pt.x, state.pt.y);
}), _EntriesRenders);

var getEntryRenderMethod = exports.getEntryRenderMethod = function getEntryRenderMethod(type) {
    if (!EntriesRenders[type]) {
        return function () {
            //TODO: add logger
            console.log('Opps, got lost by type' + type);
        };
    }

    return EntriesRenders[type];
};

exports.default = function (canvas, visual) {
    var _getCanvasHandlers = (0, _canvas.getCanvasHandlers)(canvas),
        ctx = _getCanvasHandlers.ctx,
        clear = _getCanvasHandlers.clear;

    return {
        clear: clear,

        renderEntry: function renderEntry(type, visualState) {
            var render = getEntryRenderMethod(type),
                visualData = visual.getVisualData();

            render(ctx, visualState, visualData[type]);
        }
    };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var RoadMap = {
    id: 'RoadMap',
    src: '/image/map.png',
    type: 'img'
};

var Car = {
    id: 'Car',
    src: '/image/car.png',
    type: 'img'
};

exports.default = function () {
    return {
        getInitialDataConfig: function getInitialDataConfig() {
            return [RoadMap, Car];
        },
        getVisualData: function getVisualData() {
            return {
                RoadMap: RoadMap,
                Car: Car
            };
        }
    };
};

module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setupLearningDriving = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _animation = __webpack_require__(3);

var _Driving = __webpack_require__(29);

var _Car = __webpack_require__(6);

var _Stats = __webpack_require__(31);

var SLOW_WORLD = 250;

var CAR_POSITION = { x: 200, y: 60 };

var setupLearningDriving = exports.setupLearningDriving = function setupLearningDriving(world) {
    var learningCar = (0, _Car.createCar)(world, {
        initialPhysics: _extends({}, CAR_POSITION)
    });

    var roadCamera = learningCar.accessRoadCamera();
    var learningStatsCollector = (0, _Stats.createStatsCollector)();

    (0, _Driving.startDriving)(learningCar);

    return {
        start: function start() {
            this.listenerID = world.onTick((0, _animation.slowDown)(function () {
                roadCamera.highlightPhotoArea();

                learningStatsCollector.collect({
                    carStats: learningCar.getStatsData(),
                    roadPhoto: roadCamera.takePhoto()
                });
            }, SLOW_WORLD));
        },
        stop: function stop() {
            Number.isInteger(this.listenerID) && world.removeListener(this.listenerID);
        }
    };
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stopDriving = exports.startDriving = undefined;

var _Input = __webpack_require__(30);

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionMap = {
    39: 'left',
    37: 'right',
    38: 'throttle',
    40: 'brake',
    32: 'ebrake'
};

var startDriving = exports.startDriving = function startDriving(car) {
    _Input2.default.onKeyDown(function (code) {
        if (ActionMap[code]) car.setDrivingInput(_defineProperty({}, ActionMap[code], 1));
    });

    _Input2.default.onKeyUp(function (code) {
        if (ActionMap[code]) car.setDrivingInput(_defineProperty({}, ActionMap[code], 0));
    });
};

var stopDriving = exports.stopDriving = function stopDriving() {
    _Input2.default.removeListeners();
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var preventDefaultList = [32, 37, 38, 39, 40];
var createInput = exports.createInput = function createInput() {
    var document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    return {
        onKeyDown: function onKeyDown(fn) {
            this.keyDownFn = function (e) {
                preventDefaultList.includes(e.keyCode) && e.preventDefault();
                fn(e.keyCode);
            };
            document.addEventListener('keydown', this.keyDownFn);
        },
        onKeyUp: function onKeyUp(fn) {
            this.keyUpFn = function (e) {
                return fn(e.keyCode);
            };
            document.addEventListener('keyup', this.keyUpFn);
        },
        removeListeners: function removeListeners() {
            this.keyDownFn && document.removeEventListener('keydown', this.keyDownFn);
            this.keyUpFn && document.removeEventListener('keyup', this.keyUpFn);
        }
    };
};

var input = createInput(document);
exports.default = input;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStatsCollector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(0);

var _canvas = __webpack_require__(1);

var _learning = __webpack_require__(32);

var _actions = __webpack_require__(7);

var TableModel = ['speed', 'steerAngle', 'left', 'right', 'throttle', 'brake'];

var createStatsCollector = exports.createStatsCollector = function createStatsCollector() {
    var canvasForImageTransfer = (0, _canvas.createCanvasForImageTransfer)({
        size: _constants.STATS_CONFIG.CAMERA_SIZE,
        imageType: _constants.STATS_CONFIG.IMAGE_TYPE,
        scale: _constants.STATS_CONFIG.ROAD_IMAGE_SCALE
    });

    var store = {
        limit: 20,
        data: []
    };

    (0, _actions.defineTableModel)(TableModel);

    return {
        manageStore: function manageStore(dataRecord) {
            if (store.data.length >= store.limit) {
                (0, _learning.sendLearningModelOneData)(store.data);
                store.data = [];
            }

            store.data.push(dataRecord);
        },
        visualize: function visualize(carStats, photo) {
            var row = TableModel.map(function (field) {
                return carStats[field];
            });
            (0, _actions.setTableRows)([row]);
            (0, _actions.setImageData)(photo);
        },
        collect: function collect(_ref) {
            var carStats = _ref.carStats,
                roadPhoto = _ref.roadPhoto;

            this.manageStore({
                id: Date.now(),
                carStats: carStats,
                roadPhoto: _extends({}, canvasForImageTransfer.covertImageDataToBase64(roadPhoto))
            });

            this.visualize(carStats, roadPhoto);
        }
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendLearningModelOneData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _adapter = __webpack_require__(5);

var prepareData = function prepareData(data) {
    return {
        stats: data.map(function (_ref) {
            var id = _ref.id,
                carStats = _ref.carStats;
            return _extends({ id: id }, carStats);
        }),
        images: data.map(function (_ref2) {
            var id = _ref2.id,
                roadPhoto = _ref2.roadPhoto;
            return {
                name: id + '.' + roadPhoto.type,
                base64: roadPhoto.image
            };
        })
    };
};

var sendLearningModelOneData = exports.sendLearningModelOneData = function sendLearningModelOneData(data) {
    return (0, _adapter.sendData)('learning_model_one_data', prepareData(data));
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createStorage = undefined;

var _loader = __webpack_require__(34);

var _constants = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var loadDataModel = function loadDataModel(root, model) {
    if (model.data) return Promise.resolve(model.data);

    var load = null;
    switch (model.type) {
        case _constants.DataLoadType.IMG:
            load = (0, _loader.loadImage)(root + model.src);
            break;
    }

    if (load) {
        return load.then(function (r) {
            model.data = r;
            return model;
        });
    }

    return Promise.reject({ data: model, msg: 'Model type unknown' });
};

var createStorage = exports.createStorage = function createStorage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$root = _ref.root,
        root = _ref$root === undefined ? 'resource' : _ref$root;

    var dataToLoad = [];

    return {
        setData: function setData(data) {
            dataToLoad = [].concat(_toConsumableArray(dataToLoad), _toConsumableArray(data));
        },
        load: function load() {
            return Promise.all(dataToLoad.filter(function (m) {
                return !m.data;
            }).map(function (m) {
                return loadDataModel(root, m);
            }));
        }
    };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var loadImage = exports.loadImage = function loadImage(path) {
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.src = path;
        img.onload = function () {
            return resolve(img);
        };
        img.onerror = reject;
    });
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUiLayer = undefined;

var _hyperapp = __webpack_require__(2);

var _Table = __webpack_require__(36);

var _Canvas = __webpack_require__(37);

var _EventButton = __webpack_require__(39);

var _state = __webpack_require__(38);

var _actions = __webpack_require__(7);

var _events = __webpack_require__(40);

var _constants = __webpack_require__(0);

var SIZE = _constants.STATS_CONFIG.CAMERA_SIZE;

var onCanvasUpdate = function onCanvasUpdate(el, oldAttributes, state) {
    var subState = state.learning.cameraMonitor;
    if (oldAttributes.imageData !== subState.imageData && subState.context && subState.imageData) {
        (0, _Canvas.clearRect)(subState.context, SIZE);
        (0, _Canvas.putImageData)(subState.context, subState.imageData);
    }
};

var view = function view(state, actions) {
    return (0, _hyperapp.h)(
        'div',
        { className: 'ui-controls' },
        (0, _hyperapp.h)(_Table.Table, {
            className: 'stats',
            head: state.learning.stats.tableHead,
            rows: state.learning.stats.tableRows
        }),
        (0, _hyperapp.h)(_Canvas.Canvas, {
            width: SIZE,
            height: SIZE,
            className: 'camera-monitor',
            onCreate: function onCreate(el) {
                return actions.learning.cameraMonitor.setContext(el);
            },
            onUpdate: function onUpdate(el, oldAttr) {
                return onCanvasUpdate(el, oldAttr, state);
            }
        }),
        (0, _hyperapp.h)(
            'div',
            { className: 'buttons' },
            (0, _hyperapp.h)(_EventButton.EventButton, {
                title: 'start learn',
                eventName: _events.EVENTS.START_LEARN,
                onClick: _events.triggerUiEvent
            }),
            (0, _hyperapp.h)(_EventButton.EventButton, {
                title: 'stop learn',
                eventName: _events.EVENTS.STOP_LEARN,
                onClick: _events.triggerUiEvent
            })
        )
    );
};

var createUiLayer = exports.createUiLayer = function createUiLayer(node) {
    var actionsCopy = (0, _hyperapp.app)(_state.state, _actions.uiActions, view, node);
    (0, _actions.linkActionsCopy)(actionsCopy);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Table = undefined;

var _hyperapp = __webpack_require__(2);

var Table = exports.Table = function Table(_ref) {
    var head = _ref.head,
        rows = _ref.rows,
        className = _ref.className;
    return (0, _hyperapp.h)(
        'table',
        { className: className },
        (0, _hyperapp.h)(
            'thead',
            null,
            head.map(function (column) {
                return (0, _hyperapp.h)(
                    'th',
                    null,
                    column
                );
            })
        ),
        (0, _hyperapp.h)(
            'tbody',
            null,
            rows.map(function (row) {
                return (0, _hyperapp.h)(
                    'tr',
                    null,
                    row.map(function (value) {
                        return (0, _hyperapp.h)(
                            'td',
                            null,
                            value
                        );
                    })
                );
            })
        )
    );
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.putImageData = exports.clearRect = exports.Canvas = undefined;

var _hyperapp = __webpack_require__(2);

var Canvas = exports.Canvas = function Canvas(_ref) {
    var imageData = _ref.imageData,
        width = _ref.width,
        height = _ref.height,
        className = _ref.className,
        onCreate = _ref.onCreate,
        onUpdate = _ref.onUpdate;
    return (0, _hyperapp.h)('canvas', {
        oncreate: onCreate,
        onupdate: onUpdate,
        className: className,
        width: width,
        height: height
    });
};

var clearRect = exports.clearRect = function clearRect(ctx, size) {
    ctx.clearRect(0, 0, size, size);
};

var putImageData = exports.putImageData = function putImageData(ctx, imageData) {
    ctx.drawImage(imageData, 0, 0);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var state = exports.state = {
    learning: {
        stats: {
            tableHead: [],
            tableRows: []
        },
        cameraMonitor: {
            context: null,
            imageData: null
        }
    }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventButton = undefined;

var _hyperapp = __webpack_require__(2);

var EventButton = exports.EventButton = function EventButton(_ref) {
    var title = _ref.title,
        eventName = _ref.eventName,
        onClick = _ref.onClick;
    return (0, _hyperapp.h)(
        'button',
        { onclick: function onclick(data) {
                return onClick(eventName, data);
            }, title: eventName },
        title
    );
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENTS = exports.onUiEvent = exports.triggerUiEvent = undefined;

var _events = __webpack_require__(12);

var publishSubscriber = (0, _events.createPublishSubscriber)();

var triggerUiEvent = exports.triggerUiEvent = function triggerUiEvent(type) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    publishSubscriber.publish(type, data);
};

var onUiEvent = exports.onUiEvent = function onUiEvent(event, fn) {
    publishSubscriber.subscribe(event, fn);
};

var EVENTS = exports.EVENTS = {
    START_LEARN: 'START_LEARN',
    STOP_LEARN: 'STOP_LEARN'
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=ai-city-simulation.js.map