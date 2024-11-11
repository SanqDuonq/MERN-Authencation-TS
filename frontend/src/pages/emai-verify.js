"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerifyPage = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const auth_store_1 = require("../components/store/auth-store");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const lucide_react_1 = require("lucide-react");
const EmailVerifyPage = () => {
    const [code, setCode] = (0, react_1.useState)(["", "", "", "", "", ""]);
    const inputRefs = (0, react_1.useRef)([]);
    const { verifyEmail, isLoading, error } = (0, auth_store_1.useAuthStore)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChange = (index, value) => {
        var _a, _b;
        const newCode = [...code];
        //Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            //Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            (_a = inputRefs.current[focusIndex]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else {
            newCode[index] = value;
            setCode(newCode);
            //Move focus to the next input field if value is entered
            if (value && index < 5) {
                (_b = inputRefs.current[index + 1]) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }
    };
    const handleKeyDown = (index, e) => {
        var _a;
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const verifyCode = code.join('');
        try {
            yield verifyEmail(verifyCode);
            navigate('/');
            react_hot_toast_1.default.success('Email verified successfully');
        }
        catch (error) {
            console.log(error);
        }
    });
    //Auto submit 
    (0, react_1.useEffect)(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit({ preventDefault: () => { } });
        }
    }, [code]);
    return (<>
            <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <p className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                            Verify Your Email
                        </p>
                        <p className="text-gray-300 text-center mb-6">
                            Enter the 6-digits code sent to your email address
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-between">
                                {code.map((digit, index) => (<input key={index} type="text" ref={(el) => (inputRefs.current[index] = el)} maxLength={6} value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} className="size-12 text-center text-2xl font-bold bg-gray-700 text-white borde-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"/>))}
                            </div>
                            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                            <framer_motion_1.motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                                            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-500
                                            transition-all duration-200 disabled:opacity-50' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type='submit' disabled={isLoading || code.some((digit => !digit))}>
                                {isLoading ? <lucide_react_1.LoaderCircle className="size-6 animate-spin mx-auto"/> : 'Verify Email'}
                            </framer_motion_1.motion.button>
                        </form>
                    </div>
                </framer_motion_1.motion.div>
            </div>
        </>);
};
exports.EmailVerifyPage = EmailVerifyPage;
