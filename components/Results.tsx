
import React, { useState, useMemo } from 'react';
import { Role, Roadmap, Answer, Progress, RoadmapTopic, ProgressDetails } from '../types';
import { ROLE_DATABASE, ROADMAPS } from '../constants';
import AiMentor from './AiMentor';

interface RoleCardProps {
    role: Role;
    score: number;
    onSelect: (role: Role) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, score, onSelect }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-[var(--card-border-radius)] shadow-xl border border-gray-700 flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-[var(--accent-500)] hover:border-opacity-50 hover:-translate-y-1">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--accent-400)]">{role.name}</h3>
                    <span className="bg-[var(--accent-600)] text-white text-sm font-semibold px-3 py-1 rounded-full">{score}% Match</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                        {role.keySkills.map(skill => <span key={skill} className="bg-gray-700 text-xs px-2 py-1 rounded">{skill}</span>)}
                    </div>
                </div>
                <p className="text-sm text-gray-400"><span className="font-semibold text-gray-300">Salary Range:</span> {role.salaryRange}</p>
            </div>
            <button onClick={() => onSelect(role)} className="mt-6 w-full bg-[var(--accent-600)] text-white font-bold py-2 px-4 rounded-lg hover:bg-[var(--accent-700)] transition-colors">
                Select This Path
            </button>
        </div>
    );
};

interface RoadmapTopicProps {
    topic: RoadmapTopic;
    progress: Progress[string];
    onToggleComplete: (topicId: string, completed: boolean) => void;
    onLogHours: (topicId: string, hours: number) => void;
    onSaveNotes: (topicId: string, notes: string) => void;
    onAskAi: (topic: RoadmapTopic) => void;
    completedTopicIds: Set<string>;
    topicTitleMap: { [key: string]: string };
}

const RoadmapTopicComponent: React.FC<RoadmapTopicProps> = ({ topic, progress, onToggleComplete, onLogHours, onSaveNotes, onAskAi, completedTopicIds, topicTitleMap }) => {
    const [notes, setNotes] = useState(progress?.notes || '');
    const [hours, setHours] = useState(progress?.hoursLogged || '');
    const [isExpanded, setIsExpanded] = useState(false);

    const missingPrerequisites = useMemo(() => {
        return topic.prerequisites.filter(id => !completedTopicIds.has(id));
    }, [topic.prerequisites, completedTopicIds]);

    const handleNotesBlur = () => {
        onSaveNotes(topic.id, notes);
    };
    
    const handleHoursBlur = () => {
        onLogHours(topic.id, Number(hours));
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center">
                    <input type="checkbox" checked={progress?.completed || false} onChange={e => onToggleComplete(topic.id, e.target.checked)} className="h-5 w-5 rounded mr-4" />
                    <h4 className={`text-md font-semibold ${progress?.completed ? 'line-through text-gray-500' : ''}`}>{topic.title}</h4>
                </div>
                <i className={`fas fa-chevron-down transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
            </div>
            {isExpanded && (
                <div className="mt-4 pl-9 space-y-4">
                    {missingPrerequisites.length > 0 && !progress?.completed && (
                        <div className="bg-yellow-900 border-l-4 border-yellow-500 text-yellow-200 p-3 rounded-r-lg mb-4">
                            <p className="font-bold flex items-center gap-2"><i className="fas fa-exclamation-triangle"></i>Prerequisites Incomplete</p>
                            <ul className="list-disc list-inside text-sm mt-1">
                                {missingPrerequisites.map(id => (
                                    <li key={id}>{topicTitleMap[id] || id}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p className="text-sm text-gray-400">{topic.description}</p>
                    <p className="text-sm text-gray-400"><strong className="text-gray-300">Why it's important:</strong> {topic.whyImportant}</p>
                    <div>
                        <h5 className="text-sm font-semibold mb-2">Resources:</h5>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {topic.resources.map(res => (
                                <li key={res.title}>
                                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-400)] hover:underline">{res.title}</a>
                                    <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${res.type === 'FREE' ? 'bg-green-800' : 'bg-yellow-800'}`}>{res.type}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-full sm:w-auto">
                            <label className="text-xs text-gray-400 block mb-1">Hours Logged ({topic.estimatedHours} est.)</label>
                            <input type="number" value={hours} onChange={e => setHours(e.target.value)} onBlur={handleHoursBlur} className="bg-gray-700 p-2 rounded w-24 text-sm" />
                        </div>
                        <div className="flex-grow w-full">
                            <label className="text-xs text-gray-400 block mb-1">Notes</label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} onBlur={handleNotesBlur} className="bg-gray-700 p-2 rounded w-full text-sm h-24" placeholder="Your notes..."></textarea>
                        </div>
                    </div>
                     <button onClick={() => onAskAi(topic)} className="mt-2 text-sm bg-gray-700 hover:bg-gray-600 text-[var(--accent-400)] font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                        <i className="fas fa-robot"></i> Ask AI Mentor
                    </button>
                </div>
            )}
        </div>
    );
};

interface RoadmapComponentProps {
    roadmap: Roadmap;
    progress: Progress;
    onProgressChange: (newProgress: Progress) => void;
    onAskAi: (topic: RoadmapTopic) => void;
}

const RoadmapComponent: React.FC<RoadmapComponentProps> = ({ roadmap, progress, onProgressChange, onAskAi }) => {
    const handleToggleComplete = (topicId: string, completed: boolean) => {
        const newProgress = {
            ...progress,
            [topicId]: {
                ...(progress[topicId] || { completed: false }),
                completed,
                dateCompleted: completed ? new Date().toISOString() : undefined
            }
        };
        onProgressChange(newProgress);
    };

    const handleLogHours = (topicId: string, hours: number) => {
        const newProgress = {
            ...progress,
            [topicId]: {
                ...(progress[topicId] || { completed: false }),
                hoursLogged: hours
            }
        };
        onProgressChange(newProgress);
    };
    
    const handleSaveNotes = (topicId: string, notes: string) => {
         const newProgress = {
            ...progress,
            [topicId]: {
                ...(progress[topicId] || { completed: false }),
                notes
            }
        };
        onProgressChange(newProgress);
    };

    const completedTopicIds = useMemo(() => 
        new Set(Object.keys(progress).filter(id => progress[id]?.completed))
    , [progress]);

    const topicTitleMap = useMemo(() => {
        const map: { [key: string]: string } = {};
        roadmap.phases.forEach(phase => {
            phase.topics.forEach(topic => {
                map[topic.id] = topic.title;
            });
        });
        return map;
    }, [roadmap]);

    const nextSuggestedTopic = useMemo(() => {
        for (const phase of roadmap.phases) {
            for (const topic of phase.topics) {
                if (completedTopicIds.has(topic.id)) {
                    continue;
                }
                
                const prereqsMet = topic.prerequisites.every(prereqId => completedTopicIds.has(prereqId));
                
                if (prereqsMet) {
                    return topic;
                }
            }
        }
        return null;
    }, [roadmap, completedTopicIds]);

    const totalTopics = roadmap.phases.reduce((sum, phase) => sum + phase.topics.length, 0);
    const completedTopics = Object.values(progress).filter((p: ProgressDetails) => p.completed).length;
    const totalHours = Object.values(progress).reduce((sum: number, p: ProgressDetails) => sum + (p.hoursLogged || 0), 0);
    const completionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">{roadmap.name}</h2>
            
            <div className="bg-gray-800 p-6 rounded-[var(--card-border-radius)] mb-8 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Progress Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="text-sm text-gray-400">Completion</div>
                        <div className="text-2xl font-bold">{completionPercentage}%</div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                            <div className="bg-[var(--accent-600)] h-2.5 rounded-full" style={{width: `${completionPercentage}%`}}></div>
                        </div>
                    </div>
                     <div>
                        <div className="text-sm text-gray-400">Topics Completed</div>
                        <div className="text-2xl font-bold">{completedTopics} / {totalTopics}</div>
                    </div>
                     <div>
                        <div className="text-sm text-gray-400">Total Hours Logged</div>
                        <div className="text-2xl font-bold">{totalHours}</div>
                    </div>
                </div>

                {nextSuggestedTopic && (
                    <div className="mt-6 border-t border-gray-700 pt-4">
                        <h4 className="text-md font-semibold text-gray-300 mb-2 flex items-center gap-2"><i className="fas fa-lightbulb text-yellow-400"></i>Next Suggested Topic</h4>
                        <p className="text-[var(--accent-400)] font-bold text-lg">{nextSuggestedTopic.title}</p>
                        <p className="text-sm text-gray-400 mt-1">{nextSuggestedTopic.description}</p>
                    </div>
                )}
                 {totalTopics > 0 && completedTopics === totalTopics && (
                     <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                        <h4 className="text-lg font-bold text-green-400 flex items-center justify-center gap-2">
                           <i className="fas fa-check-circle"></i>Congratulations! You've completed this roadmap!
                        </h4>
                    </div>
                )}
            </div>

            {roadmap.phases.map(phase => (
                <div key={phase.id} className="mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-[var(--accent-400)]">{phase.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{phase.duration} ({phase.estimatedHours})</p>
                    <div>
                        {phase.topics.map(topic => (
                            <RoadmapTopicComponent key={topic.id} topic={topic} progress={progress[topic.id]} onToggleComplete={handleToggleComplete} onLogHours={handleLogHours} onSaveNotes={handleSaveNotes} onAskAi={onAskAi} completedTopicIds={completedTopicIds} topicTitleMap={topicTitleMap}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


interface ResultsProps {
    answers: Answer;
    onBack: () => void;
    selectedRole: Role | null;
    setSelectedRole: (role: Role | null) => void;
    progress: Progress;
    setProgress: (progress: Progress) => void;
    onExport: () => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Results: React.FC<ResultsProps> = ({ answers, onBack, selectedRole, setSelectedRole, progress, setProgress, onExport, onImport }) => {
    const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
    const [aiMentorTopic, setAiMentorTopic] = useState<RoadmapTopic | null>(null);

    const recommendedRoles = useMemo(() => {
        const scores: { [roleId: string]: number } = {};
        ROLE_DATABASE.forEach(role => scores[role.id] = 50);

        // Scoring logic
        const q1 = answers.q1 as string;
        if (q1) {
            ROLE_DATABASE.forEach(role => {
                if (q1 === 'offense' && role.category === 'offense') scores[role.id] += 30;
                if (q1 === 'defense' && role.category === 'defense') scores[role.id] += 30;
                if (q1 === 'engineering' && role.category === 'engineering') scores[role.id] += 30;
            });
        }
        
        const q3 = answers.q3 as string;
        if (q3) {
            if (q3 === 'coding') {
                ['appsec_engineer', 'devsecops_engineer', 'exploit_developer', 'web_app_pentester'].forEach(id => scores[id] += 25);
            }
            if (q3 === 'analysis') {
                 ['soc_analyst', 'threat_hunter', 'incident_responder', 'malware_analyst'].forEach(id => scores[id] += 25);
            }
            if (q3 === 'both') {
                Object.keys(scores).forEach(id => scores[id] += 10);
            }
        }

        const q5 = answers.q5 as string;
        if (q5 === 'beginner') {
            ['exploit_developer', 'security_architect', 'red_team_operator'].forEach(id => scores[id] -= 20);
        }

        const q6 = answers.q6 as string[];
        if (q6) {
            if (q6.includes('web_apps')) { scores['web_app_pentester'] += 40; scores['appsec_engineer'] += 35; scores['bug_bounty_hunter'] += 20;}
            if (q6.includes('networks')) { scores['network_pentester'] += 40; scores['soc_analyst'] += 30; }
            if (q6.includes('cloud')) { scores['cloud_security_engineer'] += 40; scores['devsecops_engineer'] += 20; }
            if (q6.includes('malware')) { scores['malware_analyst'] += 40; }
        }

        const sortedRoles = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([id, score]) => ({
                role: ROLE_DATABASE.find(r => r.id === id)!,
                score: Math.min(99, Math.round(score / 1.5))
            }));
            
        return sortedRoles;
    }, [answers]);

    const roadmap = useMemo(() => {
        if (!selectedRole) return null;
        return ROADMAPS.find(r => r.id === selectedRole.roadmapId) || null;
    }, [selectedRole]);
    
    const handleAskAi = (topic: RoadmapTopic) => {
        setAiMentorTopic(topic);
        setIsAiMentorOpen(true);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 relative">
            {!selectedRole ? (
                <>
                    <h1 className="text-3xl font-bold text-center mb-8">Your Top 3 Recommended Roles</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendedRoles.map(({ role, score }) => (
                            <RoleCard key={role.id} role={role} score={score} onSelect={setSelectedRole} />
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <button onClick={onBack} className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors">
                            <i className="fas fa-arrow-left mr-2"></i> Back to Questions
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => setSelectedRole(null)} className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors text-sm">
                           <i className="fas fa-arrow-left mr-2"></i>Change Role
                        </button>
                        <div className="flex gap-2">
                             <button onClick={onExport} className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors text-sm">
                                <i className="fas fa-download mr-2"></i>Export
                            </button>
                            <label htmlFor="import-file" className="cursor-pointer px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors text-sm">
                                <i className="fas fa-upload mr-2"></i>Import
                            </label>
                            <input id="import-file" type="file" accept=".json" className="hidden" onChange={onImport}/>
                        </div>
                    </div>
                    {roadmap ? <RoadmapComponent roadmap={roadmap} progress={progress} onProgressChange={setProgress} onAskAi={handleAskAi} /> : <p>Roadmap not found.</p>}
                </>
            )}
             <AiMentor isOpen={isAiMentorOpen} setIsOpen={setIsAiMentorOpen} topic={aiMentorTopic} role={selectedRole} answers={answers} progress={progress}/>
        </div>
    );
};

export default Results;