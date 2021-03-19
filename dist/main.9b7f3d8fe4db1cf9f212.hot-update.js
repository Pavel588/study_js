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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar formValidation = function formValidation() {\n  document.addEventListener('input', function (event) {\n    var target = event.target;\n\n    if (target.matches('.calc-item')) {\n      target.value = target.value.replace(/[^\\d]/g, '');\n    }\n\n    if (target.matches('.form-phone')) {\n      target.value = target.value.replace(/[^+\\d]/g, '');\n\n      if (target.value.length > 12) {\n        target.value = target.value.slice(0, 13);\n      }\n    }\n\n    if (target.matches('.form-email')) {\n      target.value = target.value.replace(/[^a-z0-9@\\-_.!~*']/gi, '').replace(/-+/g, '-');\n    }\n\n    if (target.matches('.mess')) {\n      target.value = target.value.replace(/[^-а-яё\\s0-9.,?!;\"]/gi, '').replace(/-+/g, '-').replace(/\\s+/g, ' ');\n    }\n\n    if (target.matches('input[name=\"user_name\"]')) {\n      target.value = target.value.replace(/[^а-яё\\s]/gi, '').replace(/\\s+/g, ' ').replace(/^\\s/g, '');\n    }\n  });\n  document.addEventListener('blur', function (event) {\n    var target = event.target;\n\n    if (target.matches('input[name=\"user_name\"]')) {\n      if (target.value.trim() !== '') {\n        var temp = target.value.split(/\\s+/);\n\n        if (temp.length) {\n          var output = temp.map(function (item) {\n            if (item != '') {\n              item = item[0].toUpperCase() + item.slice(1).toLowerCase();\n              return item;\n            }\n          });\n          target.value = output.join(' ').replace(/\\s$/g, '');\n        }\n      }\n    }\n\n    if (target.matches('.form-email')) {\n      target.value = target.value.replace(/^-/g, '').replace(/-$/g, '');\n    } else {\n      alert('Введите корректный адрес электронной почты \"asd@qwer.ru\"');\n      target.value = '';\n    }\n\n    if (target.matches('.mess')) {\n      target.value = target.value.trim().replace(/^-/g, '').replace(/-$/g, '');\n    }\n  }, true);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formValidation);\n\n//# sourceURL=webpack://studyjs/./src/modules/formValidation.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8eaa9d46e11b399fff2a")
/******/ })();
/******/ 
/******/ }
);