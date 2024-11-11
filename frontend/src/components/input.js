"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = void 0;
const InputComponent = ({ icon: Icon, name, value, type, onChange }) => {
    return (<>
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className='size-5 text-green-500'/>
            </div>
            <input type={type} placeholder={name} value={value} onChange={onChange} className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700
                           focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition-all duration-200 outline-none"/>
        </div>  
    </>);
};
exports.InputComponent = InputComponent;
