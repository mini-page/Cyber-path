
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Answer, Role, Progress, Settings } from './types';
import { QUESTIONS } from './constants';
import DecisionTree from './components/DecisionTree';
import Results from './components/Results';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
    const getInitialAnswers = (): Answer => {
        const initial: Answer = {};
        QUESTIONS.forEach(q => {
            initial[q.id] = q.type === 'multiple' ? [] : null;
        });
        return initial;
    };

    const defaultSettings: Settings = {
        borderRadius: '2xl',
        accentColor: 'indigo',
    };

    const [view, setView] = useState<AppView>('quiz');
    const [answers, setAnswers] = useState<Answer>(getInitialAnswers());
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [progress, setProgress] = useState<Progress>({});
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedState = localStorage.getItem('cyberPathfinderState');
            if (savedState) {
                const data = JSON.parse(savedState);
                if (data.answers) setAnswers(data.answers);
                if (data.selectedRole) setSelectedRole(data.selectedRole);
                if (data.progress) setProgress(data.progress);
                if (data.settings) setSettings(data.settings);
                if (data.selectedRole) {
                    setView('results');
                }
            }
        } catch (error) {
            console.error("Failed to load state from localStorage", error);
            localStorage.removeItem('cyberPathfinderState');
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        try {
            const stateToSave = {
                answers,
                selectedRole,
                progress,
                settings,
            };
            localStorage.setItem('cyberPathfinderState', JSON.stringify(stateToSave));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, [answers, selectedRole, progress, settings, isLoaded]);
    
    useEffect(() => {
      const root = document.documentElement;

      const radii: Record<Settings['borderRadius'], string> = { lg: '0.75rem', '2xl': '1.25rem', '3xl': '1.75rem' };
      root.style.setProperty('--card-border-radius', radii[settings.borderRadius] || '1.25rem');

      const colors: Record<Settings['accentColor'], Record<string, string>> = {
        indigo: { '400': '#818cf8', '500': '#6366f1', '600': '#4f46e5', '700': '#4338ca' },
        teal: { '400': '#5eead4', '500': '#2dd4bf', '600': '#14b8a6', '700': '#0d9488' },
        rose: { '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c' },
      };
      const theme = colors[settings.accentColor] || colors.indigo;
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--accent-${key}`, value);
      });
    }, [settings]);

    const handleFinishQuiz = () => {
        setView('results');
    };
    
    const handleGoBackToQuiz = () => {
        setSelectedRole(null);
        setView('quiz');
    };

    const handleExport = useCallback(() => {
        const exportData = {
            exportVersion: '1.0',
            exportDate: new Date().toISOString(),
            answers,
            selectedRole,
            progress,
            settings,
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cyber-roadmap-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [answers, selectedRole, progress, settings]);

    const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                // Fix: Added a type check to ensure the file reader result is a string before parsing.
                // This prevents runtime errors and satisfies TypeScript's type safety.
                const fileContent = event.target?.result;
                if (typeof fileContent !== 'string') {
                    alert('Error reading import file.');
                    return;
                }
                const data = JSON.parse(fileContent);
                if (!data.exportVersion || !data.answers) {
                    alert('Invalid import file format.');
                    return;
                }
                if (window.confirm('This will overwrite your current progress. Continue?')) {
                    setAnswers(data.answers || getInitialAnswers());
                    setSelectedRole(data.selectedRole || null);
                    setProgress(data.progress || {});
                    setSettings(data.settings || defaultSettings);
                    setView('results');
                }
            } catch (error) {
                alert('Error reading import file.');
                console.error(error);
            }
        };
        reader.readAsText(file);
        e.target.value = ''; // Reset file input
    }, []);


    if (!isLoaded) {
        return <div className="flex items-center justify-center h-screen"><i className="fas fa-spinner fa-spin text-4xl"></i></div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <i className="fas fa-shield-alt text-[var(--accent-400)] mr-2"></i> Cyber Career Pathfinder
                </div>
                <button onClick={() => setIsSettingsOpen(true)} className="text-gray-400 hover:text-white text-2xl">
                    <i className="fas fa-cog"></i>
                </button>
            </header>
            <main>
                {view === 'quiz' && <DecisionTree answers={answers} setAnswers={setAnswers} onFinish={handleFinishQuiz} />}
                {view === 'results' && 
                    <Results 
                        answers={answers} 
                        onBack={handleGoBackToQuiz}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                        progress={progress}
                        setProgress={setProgress}
                        onExport={handleExport}
                        onImport={handleImport}
                    />
                }
            </main>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} setSettings={setSettings}/>
        </div>
    );
};

export default App;