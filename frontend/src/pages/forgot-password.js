"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordPage = void 0;
const react_1 = require("react");
const auth_store_1 = require("../components/store/auth-store");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const input_1 = require("../components/input");
const react_router_dom_1 = require("react-router-dom");
const ForgotPasswordPage = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [isSubmitted, setIsSubmitted] = (0, react_1.useState)(false);
    const { isLoading, forgotPassword } = (0, auth_store_1.useAuthStore)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield forgotPassword(email);
        setIsSubmitted(true);
    });
    return (<>
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <p className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text ">
                        Forgot Password
                    </p>
                    {!isSubmitted ? (<form onSubmit={handleSubmit}>
                            <p className="text-gray-300 mb-6 text-center">
                                Enter your email address and we'll sent you a link to reset your password
                            </p>
                            <input_1.InputComponent icon={lucide_react_1.Mail} name="Email" value={email} type='text' onChange={(e) => setEmail(e.target.value)}/>
                            <framer_motion_1.motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                                            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
                                                focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type='submit' disabled={isLoading}>
                                {isLoading ? <lucide_react_1.LoaderCircle className="size-6 animate-spin mx-auto"/> : 'Send Reset Link'}
                            </framer_motion_1.motion.button>
                        </form>) : (<div className="text-center">
                            <framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <lucide_react_1.Mail className="size-8 text-white"/>
                            </framer_motion_1.motion.div>
                            <p className="text-gray-300 mb-6">
                                If an account exists for <span className="text-green-500">{email}</span>, you will receice a password link shortly
                            </p>
                        </div>)}
                </div>
                <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                    <react_router_dom_1.Link to='/login' className="text-sm text-green-400 hover:underline flex items-center">
                        <lucide_react_1.ArrowLeft className="size-4 mr-2"/> Back to login
                    </react_router_dom_1.Link>
                </div>
            </framer_motion_1.motion.div>
        </>);
};
exports.ForgotPasswordPage = ForgotPasswordPage;
