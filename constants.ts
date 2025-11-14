
import { Question, Role, Roadmap } from './types';

export const QUESTIONS: Question[] = [
  { id: 'q1', title: 'Offense or Defense?', icon: 'fa-shield-halved', description: 'This is the fundamental split. Do you enjoy breaking things to find weaknesses (Offense), or building and defending systems against attackers (Defense)? Engineering focuses on creating secure systems, while leadership involves strategy and management.', type: 'single', options: [{value: 'offense', label: 'Offense (Pentest/Red Team)'}, {value: 'defense', label: 'Defense (SOC/Blue Team)'}, {value: 'engineering', label: 'Engineering/Architecture'}, {value: 'leadership', label: 'Leadership/Strategy'}] },
  { id: 'q2', title: 'Math & Stats Comfort?', icon: 'fa-calculator', description: "Some specialized fields like cryptography and AI/ML security rely on strong mathematical concepts. Don't worry, most roles don't require advanced math, but this helps us pinpoint niche interests.", type: 'single', options: [{value: 'strong', label: 'Strong (algebra/calculus)'}, {value: 'some', label: 'Some comfort'}, {value: 'low', label: 'Not really'}] },
  { id: 'q3', title: 'Coding vs Analysis?', icon: 'fa-code', description: 'Are you more drawn to writing scripts and building tools (Coding), or piecing together clues from logs and data to uncover a story (Analysis)? Many roles involve both, but this reveals your primary inclination.', type: 'single', options: [{value: 'coding', label: 'Coding/Building'}, {value: 'analysis', label: 'Analysis/Investigation'}, {value: 'both', label: 'Both equally'}] },
  { id: 'q4', title: 'Leadership Interest?', icon: 'fa-user-tie', description: 'Do you see yourself managing teams, budgets, and strategy in the long run (Leadership), or becoming a deep technical expert in a specific domain (Individual Contributor)?', type: 'single', options: [{value: 'yes', label: 'Yes - leadership track'}, {value: 'no', label: 'No - individual contributor'}, {value: 'maybe', label: 'Maybe in the future'}] },
  { id: 'q5', title: 'Current Technical Level?', icon: 'fa-chart-line', description: 'This helps us tailor the starting point of your roadmap. Be honest about your background so we can recommend the right foundational skills without overwhelming you.', type: 'single', options: [{value: 'beginner', label: 'Complete beginner (no IT)'}, {value: 'some_it', label: 'Some IT background'}, {value: 'developer', label: 'Developer switching to security'}, {value: 'advancing', label: 'Security pro advancing'}] },
  { id: 'q6', title: 'Primary Interest Area?', icon: 'fa-crosshairs', description: 'Cybersecurity is vast! Where do you want to focus your skills? You can pick multiple areas. This is one of the most important factors in determining your ideal role.', type: 'multiple', options: [{value: 'web_apps', label: 'Web Applications'}, {value: 'networks', label: 'Networks & Infrastructure'}, {value: 'cloud', label: 'Cloud (AWS/Azure)'}, {value: 'mobile', label: 'Mobile Apps'}, {value: 'osint', label: 'Social Engineering/OSINT'}, {value: 'malware', label: 'Malware & Reverse Engineering'}] },
  { id: 'q7', title: 'Programming Experience?', icon: 'fa-terminal', description: 'From simple automation scripts to full-blown application development, your coding skill level opens up different career paths, especially in AppSec and DevSecOps.', type: 'single', options: [{value: 'none', label: 'None'}, {value: 'scripting', label: 'Basic scripting (Bash/PS)'}, {value: 'proficient', label: 'Proficient in 1-2 languages'}, {value: 'developer', label: 'Software developer'}] },
  { id: 'q8', title: 'Weekly Time Commitment?', icon: 'fa-clock', description: "This doesn't affect your role recommendation, but it helps us adjust the timeline of your learning roadmap to be realistic for your schedule.", type: 'single', options: [{value: '5_10', label: '5-10 hours'}, {value: '10_20', label: '10-20 hours'}, {value: '20_plus', label: '20+ hours'}] },
  { id: 'q9', title: 'Preferred Learning Style?', icon: 'fa-book-open', description: 'How do you learn best? By doing (Hands-on), watching (Videos), or reading? We\'ll use this to suggest the most effective resources for you.', type: 'single', options: [{value: 'hands_on', label: 'Hands-on labs (CTFs)'}, {value: 'video', label: 'Video tutorials & courses'}, {value: 'reading', label: 'Reading (books/blogs)'}, {value: 'mixed', label: 'Mixed approach'}] },
  { id: 'q10', title: 'Career Goal Timeline?', icon: 'fa-bullseye', description: "What's your motivation? Are you casually exploring, or on a mission to land a job? This helps set the pace and intensity of the recommended roadmap.", type: 'single', options: [{value: 'casual', label: 'Exploring casually'}, {value: '6_12_months', label: 'Job-ready in 6-12 months'}, {value: '1_2_years', label: 'Job-ready in 1-2 years'}] },
];

export const ROLE_DATABASE: Role[] = [
    { id: 'web_app_pentester', name: 'Web Application Pentester', category: 'offense', description: 'Tests web apps for vulnerabilities (XSS, SQLi, auth bypass).', salaryRange: '$70k-120k', keySkills: ['Burp Suite', 'OWASP Top 10', 'Manual Testing'], certifications: ['OSWA', 'BSCP', 'OSWE'], roadmapId: 'WEB_APP_PENTESTER_ROADMAP' },
    { id: 'network_pentester', name: 'Network Pentester', category: 'offense', description: 'Assesses network infrastructure, firewalls, and VPNs.', salaryRange: '$80k-130k', keySkills: ['Nmap', 'Metasploit', 'Protocol Analysis'], certifications: ['OSCP', 'PNPT', 'eJPT'], roadmapId: 'WEB_APP_PENTESTER_ROADMAP' },
    { id: 'red_team_operator', name: 'Red Team Operator', category: 'offense', description: 'Simulates real-world attacks, targeting the full kill chain.', salaryRange: '$100k-160k', keySkills: ['C2 Frameworks', 'Evasion', 'Active Directory'], certifications: ['CRTO', 'OSEP'], roadmapId: 'WEB_APP_PENTESTER_ROADMAP' },
    { id: 'bug_bounty_hunter', name: 'Bug Bounty Hunter', category: 'offense', description: 'Freelance vulnerability discovery on platforms like HackerOne.', salaryRange: 'Varies', keySkills: ['Wide Attack Surface', 'Automation', 'Recon'], certifications: ['OSCP (helps)'], roadmapId: 'WEB_APP_PENTESTER_ROADMAP' },
    { id: 'soc_analyst', name: 'SOC Analyst', category: 'defense', description: 'Monitors SIEM, triages alerts, and hunts for threats.', salaryRange: '$60k-100k', keySkills: ['Splunk/ELK', 'Log Analysis', 'Incident Triage'], certifications: ['Security+', 'CySA+', 'BTL1'], roadmapId: 'SOC_ANALYST_ROADMAP' },
    { id: 'incident_responder', name: 'Incident Responder', category: 'defense', description: 'Investigates breaches, performs containment and remediation.', salaryRange: '$85k-140k', keySkills: ['Forensics', 'Malware Triage', 'IR Playbooks'], certifications: ['GCIH', 'ECIR'], roadmapId: 'SOC_ANALYST_ROADMAP' },
    { id: 'threat_hunter', name: 'Threat Hunter', category: 'defense', description: 'Proactively searches for undetected threats within networks.', salaryRange: '$90k-150k', keySkills: ['Threat Intel', 'Anomaly Detection', 'EDR'], certifications: ['GCTI', 'GCIA'], roadmapId: 'SOC_ANALYST_ROADMAP' },
    { id: 'appsec_engineer', name: 'AppSec Engineer', category: 'engineering', description: 'Focuses on secure SDLC, code review, and SAST/DAST tooling.', salaryRange: '$110k-170k', keySkills: ['Secure Coding', 'Dependency Scanning', 'DevSecOps'], certifications: ['CSSLP', 'GWAPT'], roadmapId: 'APPSEC_ENGINEER_ROADMAP' },
    { id: 'cloud_security_engineer', name: 'Cloud Security Engineer', category: 'engineering', description: 'Secures cloud infrastructure (AWS/Azure/GCP).', salaryRange: '$120k-180k', keySkills: ['IAM', 'CloudTrail', 'GuardDuty', 'Compliance'], certifications: ['AWS Security', 'Azure Security'], roadmapId: 'APPSEC_ENGINEER_ROADMAP' },
    { id: 'devsecops_engineer', name: 'DevSecOps Engineer', category: 'engineering', description: 'Secures CI/CD pipelines, IaC, and containers.', salaryRange: '$125k-190k', keySkills: ['Docker', 'Kubernetes', 'Terraform'], certifications: ['Kubernetes Security'], roadmapId: 'APPSEC_ENGINEER_ROADMAP' },
    { id: 'security_architect', name: 'Security Architect', category: 'engineering', description: 'Designs enterprise security architecture and strategy.', salaryRange: '$140k-220k', keySkills: ['Zero Trust', 'Risk Modeling', 'Strategy'], certifications: ['CISSP', 'SABSA'], roadmapId: 'APPSEC_ENGINEER_ROADMAP' },
    { id: 'malware_analyst', name: 'Malware Analyst', category: 'specialized', description: 'Reverse engineers malicious code to understand its function.', salaryRange: '$95k-155k', keySkills: ['IDA Pro', 'Ghidra', 'x86 Assembly'], certifications: ['GREM', 'GIAC'], roadmapId: 'SOC_ANALYST_ROADMAP' },
    { id: 'exploit_developer', name: 'Exploit Developer', category: 'specialized', description: 'Writes exploits for vulnerabilities.', salaryRange: '$130k-250k+', keySkills: ['C/C++', 'Memory Corruption', 'Shellcode'], certifications: ['OSED', 'OSEE'], roadmapId: 'WEB_APP_PENTESTER_ROADMAP' },
];

export const ROADMAPS: Roadmap[] = [
  {
    id: 'WEB_APP_PENTESTER_ROADMAP',
    name: 'Web Application Pentester Roadmap',
    phases: [
      {
        id: 'foundations', title: 'Foundations', duration: 'Month 1-3', estimatedHours: '100-150 hours',
        topics: [
          { id: 'networking_basics', title: 'Networking Fundamentals', description: 'Understand TCP/IP, DNS, HTTP/HTTPS.', estimatedHours: 20, prerequisites: [], whyImportant: 'Understand how web traffic flows.', resources: [{title: 'TryHackMe: Network Fundamentals', url: 'https://tryhackme.com/room/networkfundamentals', type: 'FREE', format: 'Interactive Labs'}]},
          { id: 'linux_fundamentals', title: 'Linux Command Line', description: 'Master bash and file system navigation.', estimatedHours: 30, prerequisites: [], whyImportant: 'Most security tools run on Linux.', resources: [{title: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/', type: 'FREE', format: 'CTF Challenges'}]},
          { id: 'web_fundamentals', title: 'HTTP & Web Fundamentals', description: 'Learn the core of how the web works.', estimatedHours: 15, prerequisites: [], whyImportant: 'Essential for any web-based role.', resources: [{title: 'PortSwigger: How The Web Works', url: 'https://portswigger.net/web-security/how-the-web-works', type: 'FREE', format: 'Reading'}]},
          { id: 'scripting_basics', title: 'HTML, CSS, JS Basics', description: 'Basic understanding of frontend code.', estimatedHours: 40, prerequisites: [], whyImportant: 'Helps in identifying client-side vulnerabilities.', resources: [{title: 'freeCodeCamp: Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', type: 'FREE', format: 'Course'}]}
        ],
      },
      {
        id: 'core_skills', title: 'Core Skills', duration: 'Month 4-8', estimatedHours: '200-300 hours',
        topics: [
          { id: 'owasp_top10', title: 'OWASP Top 10', description: 'Master critical web vulnerabilities.', estimatedHours: 80, prerequisites: ['web_fundamentals'], whyImportant: 'This is the bread and butter of web pentesting.', resources: [{title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'FREE', format: 'Labs & Reading'}]},
          { id: 'burp_suite', title: 'Burp Suite Mastery', description: 'Learn the industry-standard tool.', estimatedHours: 50, prerequisites: ['web_fundamentals'], whyImportant: 'Your primary tool for web application testing.', resources: [{title: 'TryHackMe: Burp Suite Rooms', url: 'https://tryhackme.com/paths', type: 'FREE', format: 'Labs'}]},
          { id: 'manual_testing', title: 'Manual Testing Methodology', description: 'Develop a systematic testing process.', estimatedHours: 60, prerequisites: ['owasp_top10'], whyImportant: 'Tools find some things, manual testing finds the rest.', resources: [{title: 'OWASP Testing Guide v4', url: 'https://owasp.org/www-project-web-security-testing-guide/v4.2/', type: 'FREE', format: 'Reading'}]}
        ],
      },
       {
        id: 'advanced', title: 'Advanced', duration: 'Month 9-12', estimatedHours: '150-250 hours',
        topics: [
            { id: 'advanced_attacks', title: 'Advanced Web Attacks', description: 'Explore SSTI, Deserialization, XXE, SSRF.', estimatedHours: 60, prerequisites: ['owasp_top10'], whyImportant: 'Move beyond the basics to find more complex bugs.', resources: [{title: 'PortSwigger Advanced Labs', url: 'https://portswigger.net/web-security', type: 'FREE', format: 'Labs'}]},
            { id: 'api_security', title: 'API Security Testing', description: 'Learn to test modern APIs (REST, GraphQL).', estimatedHours: 40, prerequisites: ['owasp_top10'], whyImportant: 'APIs are a huge and often overlooked attack surface.', resources: [{title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/', type: 'FREE', format: 'Reading'}]},
            { id: 'cert_prep', title: 'Certification Prep: OSWA/BSCP', description: 'Prepare for a respected industry certification.', estimatedHours: 80, prerequisites: [], whyImportant: 'Certs can help you get your first job.', resources: [{title: 'OffSec Web Assessor (OSWA)', url: 'https://www.offsec.com/courses/web-200/', type: 'PAID', format: 'Course'}]}
        ],
       }
    ]
  },
  {
    id: 'SOC_ANALYST_ROADMAP',
    name: 'SOC Analyst Roadmap',
    phases: [
        {
            id: 'foundations', title: 'Foundations', duration: 'Month 1-3', estimatedHours: '120-180 hours',
            topics: [
                { id: 'networking_basics_soc', title: 'Networking Fundamentals', description: 'Deep dive into TCP/IP, DNS, DHCP, and logs.', estimatedHours: 40, prerequisites: [], whyImportant: 'You cannot defend what you do not understand.', resources: [{title: 'Professor Messer Network+', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/', type: 'FREE', format: 'Video Series'}]},
                { id: 'os_fundamentals', title: 'OS Fundamentals (Windows/Linux)', description: 'Understand operating system processes, logs, and security.', estimatedHours: 50, prerequisites: [], whyImportant: 'Most alerts originate from endpoints.', resources: [{title: 'TryHackMe: Windows Fundamentals', url: 'https://tryhackme.com/module/windows-fundamentals', type: 'FREE', format: 'Labs'}]},
                { id: 'security_plus', title: 'Security+ Concepts', description: 'Learn the core vocabulary and concepts of cybersecurity.', estimatedHours: 40, prerequisites: [], whyImportant: 'The baseline knowledge for any security role.', resources: [{title: 'Professor Messer Security+', url: 'https://www.professormesser.com/security-plus/sy0-601/sy0-601-video/sy0-601-comptia-security-plus-course/', type: 'FREE', format: 'Video Series'}]}
            ]
        },
        {
            id: 'core_skills', title: 'Core SOC Skills', duration: 'Month 4-8', estimatedHours: '200-300 hours',
            topics: [
                { id: 'siem_basics', title: 'SIEM and Log Analysis', description: 'Learn to use tools like Splunk or ELK to analyze logs.', estimatedHours: 80, prerequisites: ['networking_basics_soc'], whyImportant: 'The SIEM is your primary tool as a SOC analyst.', resources: [{title: 'Splunk Free Fundamentals', url: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html', type: 'FREE', format: 'Course'}]},
                { id: 'incident_response', title: 'Incident Response Lifecycle', description: 'Learn the PICERL framework for handling incidents.', estimatedHours: 60, prerequisites: ['security_plus'], whyImportant: 'Provides a structured way to handle security events.', resources: [{title: 'LetsDefend.io', url: 'https://letsdefend.io/', type: 'PAID', format: 'Interactive Platform'}]},
                { id: 'threat_intel', title: 'Cyber Threat Intelligence', description: 'Understand how to use threat intel to identify threats.', estimatedHours: 40, prerequisites: [], whyImportant: 'Contextualizes alerts and helps in proactive defense.', resources: [{title: 'SANS CTI YouTube Playlist', url: 'https://www.youtube.com/watch?v=g8u0I-242gE&list=PLaWqaI_B1im9ryd5k3s31p_m8a-Y27s-z', type: 'FREE', format: 'Video Series'}]}
            ]
        }
    ]
  },
  {
    id: 'APPSEC_ENGINEER_ROADMAP',
    name: 'Application Security Engineer Roadmap',
    phases: [
        {
            id: 'foundations', title: 'Developer Foundations', duration: 'Month 1-2', estimatedHours: '80-120 hours',
            topics: [
                { id: 'sdlc_basics', title: 'Secure SDLC', description: 'Learn how security fits into the software development lifecycle.', estimatedHours: 30, prerequisites: [], whyImportant: 'The core philosophy of shifting security left.', resources: [{title: 'OWASP SAMM', url: 'https://owaspsamm.org/', type: 'FREE', format: 'Reading'}]},
                { id: 'secure_coding', title: 'Secure Coding Principles', description: 'Understand principles like input validation, output encoding, least privilege.', estimatedHours: 50, prerequisites: [], whyImportant: 'Prevent vulnerabilities before they are written.', resources: [{title: 'OWASP Secure Coding Practices', url: 'https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/', type: 'FREE', format: 'Reading'}]},
            ]
        },
        {
            id: 'core_skills', title: 'Core AppSec Skills', duration: 'Month 3-7', estimatedHours: '200-300 hours',
            topics: [
                { id: 'sast_dast', title: 'SAST, DAST, and IAST', description: 'Learn to use and interpret results from AppSec tools.', estimatedHours: 70, prerequisites: ['secure_coding'], whyImportant: 'Automated tooling is key to scaling AppSec.', resources: [{title: 'SonarQube Documentation', url: 'https://docs.sonarqube.org/latest/', type: 'FREE', format: 'Reading'}]},
                { id: 'dependency_scanning', title: 'Software Composition Analysis (SCA)', description: 'Find and manage vulnerabilities in third-party libraries.', estimatedHours: 50, prerequisites: [], whyImportant: 'You are responsible for the security of your dependencies.', resources: [{title: 'OWASP Dependency-Check', url: 'https://owasp.org/www-project-dependency-check/', type: 'FREE', format: 'Tool'}]},
                { id: 'threat_modeling', title: 'Threat Modeling', description: 'Proactively identify threats in application design.', estimatedHours: 60, prerequisites: ['sdlc_basics'], whyImportant: 'Find and fix design flaws before a line of code is written.', resources: [{title: 'OWASP Threat Modeling Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html', type: 'FREE', format: 'Reading'}]}
            ]
        }
    ]
  }
];