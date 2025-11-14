
import React from 'react';
import { Settings } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

interface SettingOptionProps<T> {
    label: string;
    value: T;
    // Fix: The type of currentValue was changed from T to string to handle the union type of settings.borderRadius,
    // which was causing a type conflict with the more specific type T inferred from the `value` prop. This likely
    // caused the misleading "missing children" error.
    currentValue: string;
    onClick: (value: T) => void;
    children: React.ReactNode;
}

const SettingOption = <T extends string>({ label, value, currentValue, onClick, children }: SettingOptionProps<T>) => (
    <div
        onClick={() => onClick(value)}
        className={`cursor-pointer p-2 rounded-lg text-center transition-all ${
            currentValue === value ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
    >
        {children}
        <span className="text-xs text-gray-400 mt-1 block">{label}</span>
    </div>
);


const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, setSettings }) => {
    if (!isOpen) return null;

    const accentColors: Settings['accentColor'][] = ['indigo', 'teal', 'rose'];
    const colorClasses: Record<Settings['accentColor'], string> = {
        indigo: 'bg-indigo-500',
        teal: 'bg-teal-500',
        rose: 'bg-rose-500',
    };
    
    const borderRadii: Settings['borderRadius'][] = ['lg', '2xl', '3xl'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-700" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-300">Accent Color</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {accentColors.map(color => (
                                <div key={color} className="flex flex-col items-center">
                                    <button
                                        onClick={() => setSettings(s => ({ ...s, accentColor: color }))}
                                        className={`w-12 h-12 rounded-full transition-all ${colorClasses[color]} ${
                                            settings.accentColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''
                                        }`}
                                        aria-label={`Select ${color} accent color`}
                                    />
                                    <span className="text-sm mt-2 text-gray-400 capitalize">{color}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                         <h3 className="text-lg font-semibold mb-3 text-gray-300">Card Roundness</h3>
                         <div className="grid grid-cols-3 gap-4">
                            <SettingOption
                                label="Subtle"
                                value="lg"
                                currentValue={settings.borderRadius}
                                onClick={(val) => setSettings(s => ({ ...s, borderRadius: val }))}
                            >
                                <div className="w-16 h-10 bg-gray-500 border-2 border-gray-400 rounded-lg mx-auto"></div>
                            </SettingOption>
                             <SettingOption
                                label="Default"
                                value="2xl"
                                currentValue={settings.borderRadius}
                                onClick={(val) => setSettings(s => ({ ...s, borderRadius: val }))}
                            >
                                <div className="w-16 h-10 bg-gray-500 border-2 border-gray-400 rounded-2xl mx-auto"></div>
                            </SettingOption>
                             <SettingOption
                                label="Extra"
                                value="3xl"
                                currentValue={settings.borderRadius}
                                onClick={(val) => setSettings(s => ({ ...s, borderRadius: val }))}
                            >
                                <div className="w-16 h-10 bg-gray-500 border-2 border-gray-400 rounded-3xl mx-auto"></div>
                            </SettingOption>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700 text-right">
                    <button onClick={onClose} className="px-6 py-2 bg-[var(--accent-600)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--accent-700)] transition-colors">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;