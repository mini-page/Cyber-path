
export interface Answer {
  [key: string]: string | string[];
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  title: string;
  icon: string;
  description: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export interface Role {
  id:string;
  name: string;
  category: 'offense' | 'defense' | 'engineering' | 'specialized';
  description: string;
  salaryRange: string;
  keySkills: string[];
  certifications: string[];
  roadmapId: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'FREE' | 'PAID';
  format: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  resources: Resource[];
  whyImportant: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  duration: string;
  estimatedHours: string;
  topics: RoadmapTopic[];
}

export interface Roadmap {
  id: string;
  name: string;
  phases: RoadmapPhase[];
}

// Fix: Extracted the progress details into its own interface for better type inference.
export interface ProgressDetails {
  completed: boolean;
  hoursLogged?: number;
  dateCompleted?: string;
  notes?: string;
}

export interface Progress {
  [topicId: string]: ProgressDetails;
}

export type AppView = 'quiz' | 'results';

export interface Settings {
    borderRadius: 'lg' | '2xl' | '3xl';
    accentColor: 'indigo' | 'teal' | 'rose';
}
