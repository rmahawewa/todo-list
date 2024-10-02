/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/todo_details.json":
/*!*******************************!*\
  !*** ./src/todo_details.json ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = [{\"name\":\"Ravini\",\"password\":\"123\",\"account_date\":\"2024-10-02\",\"account_time\":\"01:15:01\",\"projects\":[{\"project_name\":\"project abc\",\"project_description\":\"project abc description\",\"project_start_date\":\"2024-09-15\",\"project_end_date\":\"2026-04-10\",\"project_priority\":\"high\",\"project_is_completed\":\"no\",\"project_completed_date\":\"\",\"todos\":[{\"todo_name\":\"todo1\",\"todo_description\":\"todo1 description\",\"todo_start_date\":\"2024-10-01\",\"todo_end_date\":\"2025-12-10\",\"todo_start_time\":\"10:11:12\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"medium\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"},{\"todo_name\":\"todo2\",\"todo_description\":\"todo2 description\",\"todo_start_date\":\"2024-10-11\",\"todo_end_date\":\"2025-12-16\",\"todo_start_time\":\"10:11:12\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"medium\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"},{\"todo_name\":\"todo3\",\"todo_description\":\"todo3 description\",\"todo_start_date\":\"2024-10-05\",\"todo_end_date\":\"2025-12-05\",\"todo_start_time\":\"10:11:00\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"high\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"}]},{\"project_name\":\"project pqr\",\"project_description\":\"project pqr description\",\"project_start_date\":\"2025-09-15\",\"project_end_date\":\"2027-04-10\",\"project_priority\":\"high\",\"project_is_completed\":\"no\",\"project_completed_date\":\"\",\"todos\":[{\"todo_name\":\"todo1\",\"todo_description\":\"todo1 description\",\"todo_start_date\":\"2025-10-01\",\"todo_end_date\":\"2026-12-10\",\"todo_start_time\":\"10:11:12\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"medium\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"},{\"todo_name\":\"todo2\",\"todo_description\":\"todo2 description\",\"todo_start_date\":\"2025-10-11\",\"todo_end_date\":\"2026-12-16\",\"todo_start_time\":\"10:11:12\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"medium\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"},{\"todo_name\":\"todo3\",\"todo_description\":\"todo3 description\",\"todo_start_date\":\"2025-10-05\",\"todo_end_date\":\"2026-12-05\",\"todo_start_time\":\"10:11:00\",\"todo_end_time\":\"16:00:00\",\"todo_priority\":\"high\",\"todo_is_completed\":\"no\",\"todo_completed_date\":\"\",\"todo_completed_time\":\"\"}]}]}]\n\n//# sourceURL=webpack://todo-list/./src/todo_details.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// import json from './todo_details.json';\nconst json = __webpack_require__(/*! ./todo_details.json */ \"./src/todo_details.json\");\nconsole.log(json);\n\nfor (const entry of json){\n    console.log(entry.name);\n}\n// console.log(JSON.stringify(json));\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;