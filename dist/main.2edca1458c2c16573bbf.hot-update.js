/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatestudyjs"]("main",{

/***/ "./src/modules/formValidation.js":
/*!***************************************!*\
  !*** ./src/modules/formValidation.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar formValidation = function formValidation() {\n  var calcItems = document.querySelectorAll('.calc-item'),\n      inputName = document.querySelectorAll('input[name=\"user_name\"]'),\n      inputEmail = document.querySelectorAll('.form-email'),\n      inputPhone = document.querySelectorAll('.form-phone'),\n      inputMessage = document.querySelector('.mess');\n  calcItems.forEach(function (item, index) {\n    item.addEventListener('input', function () {\n      if (index === 0) {\n        return;\n      }\n\n      item.value = item.value.replace(/[^\\d]/g, '');\n    });\n  });\n  inputName.forEach(function (item) {\n    item.addEventListener('input', function () {\n      item.value = item.value.replace(/[^а-я\\s]/gi, '').replace(/\\s+/g, \" \");\n    });\n  });\n  inputMessage.addEventListener('input', function () {\n    inputMessage.value = inputMessage.value.replace(/[^-а-я\\s0-9.,?!]/gi, '').replace(/-+/g, '-');\n  });\n  inputEmail.forEach(function (item) {\n    item.addEventListener('input', function () {\n      item.value = item.value.replace(/[^a-z@\\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');\n    });\n  });\n  inputPhone.forEach(function (item) {\n    item.addEventListener('input', function () {\n      item.value = item.value.replace(/[^+\\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');\n\n      if (item.value.length > 16) {\n        item.value = item.value.slice(0, 15);\n      }\n    });\n  });\n  document.addEventListener('blur', function (event) {\n    var target = event.target;\n\n    if (target.matches(\"input[name='user_name']\")) {\n      if (target.value.trim() !== \"\") {\n        var temp = target.value.split(/\\s+/);\n\n        if (temp.length) {\n          var output = temp.map(function (item) {\n            if (item != '') {\n              item = item[0].toUpperCase() + item.slice(1).toLowerCase();\n              return item;\n            }\n          });\n          target.value = output.join(' ').replace(/\\s$/g, '');\n        }\n      }\n    }\n\n    if (target.matches('.form-email')) {\n      target.value = target.value.replace(/^-/g, '').replace(/-$/g, '');\n    }\n  }, true);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formValidation);\n\n//# sourceURL=webpack://studyjs/./src/modules/formValidation.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0321a093ed9dce3142ac")
/******/ })();
/******/ 
/******/ }
);