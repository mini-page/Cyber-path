
import React, { useState, useEffect, useRef } from 'react';
import { getAiMentorResponse, getComplexAiResponse } from '../services/geminiService';
import { RoadmapTopic, Role, Answer, Progress, ProgressDetails } from '../types';

interface AiMentorProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    topic: RoadmapTopic | null;
    role: Role | null;
    answers: Answer;
    progress: Progress;
}

interface GroundingChunkWeb {
    uri: string;
    title: string;
}

interface GroundingChunk {
    web?: GroundingChunkWeb;
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    sources?: GroundingChunk[];
}

const AiMentor: React.FC<AiMentorProps> = ({ isOpen, setIsOpen, topic, role, answers, progress }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([]);
        }
    }, [isOpen, topic]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const buildContext = (userQuestion: string) => {
        if (!role || !topic) return userQuestion;

        const completedTopics = Object.values(progress).filter((p: ProgressDetails) => p.completed).length;
        // Fix: Explicitly type `p` as `ProgressDetails` to resolve TypeScript error on `hoursLogged`.
        const totalHours = Object.values(progress).reduce((sum: number, p: ProgressDetails) => sum + (p.hoursLogged || 0), 0);

        return `You are a cybersecurity mentor helping a student learn to become a ${role.name}.

        Student Profile:
        - Current Level: ${answers.q5}
        - Primary Interests: ${(answers.q6 as string[]).join(', ')}
        - Learning Style: ${answers.q9}
        - Progress: ${completedTopics} topics completed, ${totalHours} hours logged
        
        Current Topic: ${topic.title}
        - Description: ${topic.description}
        - Prerequisites: ${topic.prerequisites.join(', ') || 'None'}
        - Estimated Time: ${topic.estimatedHours} hours
        
        Provide beginner-friendly, actionable advice. Include specific free resource recommendations when relevant. Keep responses concise and use markdown for formatting.
        
        Student Question: "${userQuestion}"`;
    };

    const sendMessage = async (question: string, useProModel = false) => {
        if (!question.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: question };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const prompt = buildContext(question);

        try {
            const stream = useProModel
                ? await getComplexAiResponse(prompt)
                : await getAiMentorResponse(prompt);

            let fullResponse = '';
            let sources: GroundingChunk[] = [];
            setMessages(prev => [...prev, { role: 'model', text: '', sources: [] }]);

            for await (const chunk of stream) {
                fullResponse += chunk.text;
                
                if (!useProModel) {
                    const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
                    if (groundingChunks) {
                        sources.push(...groundingChunks);
                    }
                }

                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.text = fullResponse;
                    return newMessages;
                });
            }
            
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                
                const uniqueSources: GroundingChunk[] = [];
                if (sources.length > 0) {
                    const seenUris = new Set<string>();
                    sources.forEach(source => {
                        if (source.web && !seenUris.has(source.web.uri)) {
                            uniqueSources.push(source);
                            seenUris.add(source.web.uri);
                        }
                    });
                }
                
                lastMessage.sources = uniqueSources;
                return newMessages;
            });

        } catch (error) {
            console.error("AI mentor error:", error);
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleQuickAction = (action: string) => {
        let question = '';
        switch(action) {
            case 'explain': question = `Explain the topic "${topic?.title}" in simple terms.`; break;
            case 'resources': question = `What are the best free resources for learning about "${topic?.title}"?`; break;
            case 'plan': question = `Give me a mini study plan for "${topic?.title}".`; break;
            case 'quiz': question = `Quiz me on "${topic?.title}" with one multiple choice question.`; break;
        }
        sendMessage(question);
    };

    return (
        <div className={`fixed top-0 right-0 h-full bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full md:w-1/3 lg:w-1/4 border-l-2 border-[var(--accent-500)]`}>
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold flex items-center gap-3"><i className="fas fa-robot text-[var(--accent-400)]"></i> AI Mentor</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white"><i className="fas fa-times text-2xl"></i></button>
                </div>
                <div className="p-4 text-sm bg-gray-800">
                    <p><strong className="text-[var(--accent-400)]">Current Topic:</strong> {topic?.title || 'General'}</p>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${msg.role === 'user' ? 'bg-[var(--accent-600)]' : 'bg-gray-700'}`}>
                                <div className="prose prose-sm prose-invert" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br />')}}></div>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-3 pt-2 border-t border-gray-600">
                                        <h4 className="text-xs font-semibold text-gray-400 mb-1">
                                            <i className="fab fa-google mr-1"></i> Sources from Google Search:
                                        </h4>
                                        <ul className="list-none p-0 m-0 space-y-1">
                                            {msg.sources.map((source, i) => source.web && (
                                                <li key={i} className="text-xs">
                                                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-400)] hover:underline truncate block" title={source.web.uri}>
                                                        {i+1}. {source.web.title || source.web.uri}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="mb-4 flex justify-start">
                            <div className="p-3 rounded-lg bg-gray-700">
                                <i className="fas fa-spinner fa-spin"></i>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {topic && <div className="p-4 border-t border-gray-700 flex flex-wrap gap-2">
                    <button onClick={() => handleQuickAction('explain')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">💡 Explain Simply</button>
                    <button onClick={() => handleQuickAction('resources')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">📚 Free Resources</button>
                    <button onClick={() => handleQuickAction('plan')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">🎯 Study Plan</button>
                    <button onClick={() => handleQuickAction('quiz')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full">❓ Quiz Me</button>
                </div>}

                <div className="p-4 border-t border-gray-700">
                    <form onSubmit={e => { e.preventDefault(); sendMessage(input); }}>
                        <div className="flex gap-2">
                            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question..." className="flex-grow bg-gray-700 p-2 rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent-500)] focus:outline-none" />
                            <button type="submit" disabled={isLoading} className="bg-[var(--accent-600)] px-4 py-2 rounded-lg disabled:opacity-50" title="Send with Gemini Flash">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                            <button type="button" onClick={() => sendMessage(input, true)} disabled={isLoading} className="bg-purple-600 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-purple-700" title="Send with Gemini Pro (Deep Thought)">
                               <i className="fas fa-brain"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiMentor;