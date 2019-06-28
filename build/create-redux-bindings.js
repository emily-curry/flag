"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = __importDefault(require("lodash/merge"));
var deep_computed_1 = __importDefault(require("deep-computed"));
var react_redux_1 = require("react-redux");
var utils_1 = require("./utils");
var MERGE_FLAGS_ACTION_TYPE = "@@FLAG/SET_FLAGS";
function isSetFlagsAction(obj) {
    return (utils_1.isObject(obj) &&
        obj.type === MERGE_FLAGS_ACTION_TYPE &&
        utils_1.isObject(obj.payload));
}
function createReduxBindings(FlagsProvider) {
    function setFlagsAction(payload) {
        return {
            type: MERGE_FLAGS_ACTION_TYPE,
            payload: payload
        };
    }
    function mapStateToProps(state) {
        return {
            flags: state.flags
        };
    }
    var prevFlags = null;
    var prevComputed = null;
    function getFlagsSelector(state) {
        if (prevFlags !== null &&
            prevComputed !== null &&
            prevFlags === state.flags) {
            return prevComputed;
        }
        prevFlags = state.flags;
        prevComputed = deep_computed_1.default(state.flags);
        return prevComputed;
    }
    function createFlagsReducer(initialFlags) {
        return function (state, action) {
            if (state === void 0) { state = initialFlags; }
            if (isSetFlagsAction(action)) {
                return merge_1.default({}, state, action.payload);
            }
            else {
                return state;
            }
        };
    }
    var ConnectedFlagsProvider = react_redux_1.connect(mapStateToProps, null)(FlagsProvider);
    return {
        setFlagsAction: setFlagsAction,
        getFlagsSelector: getFlagsSelector,
        createFlagsReducer: createFlagsReducer,
        ConnectedFlagsProvider: ConnectedFlagsProvider
    };
}
exports.createReduxBindings = createReduxBindings;
exports.default = createReduxBindings;
