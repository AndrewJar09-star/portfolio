import React, { useState, useRef } from 'react';
import stewardOsPreview from './assets/steward-os-preview.jpg';
import {
  Mail,
  ArrowDown,
  FileText,
  MapPin,
  Terminal,
  Server,
  Layout,
  Container,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code2,
  Cpu,
  Mic,
  Brain,
  Copy,
  Check,
  Camera,
  SlidersHorizontal,
  Layers,
  GitBranch,
  Workflow,
  Sun,
  Compass,
  Play,
  RotateCcw,
  Star,
  Activity,
  Zap,
  ChevronRight,
  Radio,
  ShieldCheck,
  Smartphone,
  Gamepad2,
  Trophy,
  Users
} from 'lucide-react';

function Github({ className = 'w-4 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className = 'w-4 h-4', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function App() {
  // 1. Theme Switch: 'paper' (Warm Editorial Alabaster + Emerald) vs 'blueprint' (Dark Technical Slate Grid)
  const [theme, setTheme] = useState('paper');
  const isDark = theme === 'blueprint';

  // Filter for Bento Grid
  const [activeFilter, setActiveFilter] = useState('all');

  // Photo & Contact State - Default to the uploaded profile photo in public/
  const [customPhoto, setCustomPhoto] = useState('/foto-profilo.jpg');
  const [emailAddress, setEmailAddress] = useState('andrea.barattolo@studenti.unina.it');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const fileInputRef = useRef(null);

  // --- INTERACTIVE WIDGET 1: CALENDARIO JARVIS / STEWARD OS VOICE TERMINAL ---
  const jarvisPresets = [
    {
      cmd: 'Jarvis, segna turno: Napoli vs Roma sabato alle 18:00',
      label: 'Turno SSC Napoli',
      sub: 'Sabato 18:00 • Stadio Maradona',
      dotColor: 'bg-sky-400',
      intent: 'REGISTER_WORK_SHIFT',
      entity: '{ evento: "SSC Napoli vs Roma", sede: "Stadio Maradona", orario: "18:00", status: "LAVORO" }',
      response: '✓ Turno steward confermato per Napoli vs Roma (18:00). Evento sincronizzato su Google Calendar API (200 OK).',
      statUpdate: (prev) => ({ ...prev, nextShift: 'Napoli vs Roma (Sab 18:00)', status: 'LAVORO • MARADONA', syncedEvents: prev.syncedEvents + 1 })
    },
    {
      cmd: 'Jarvis, fiera Tutto Sposi alla Mostra d\'Oltremare alle 10:30',
      label: 'Fiera Mostra d\'Oltremare',
      sub: 'Dom 10:30 • Padiglioni Fiera',
      dotColor: 'bg-emerald-400',
      intent: 'ADD_VENUE_EVENT',
      entity: '{ fiera: "TUTTO SPOSI 2026", location: "Mostra d\'Oltremare", orario: "10:30", note: "Fiera weekend" }',
      response: '✓ Evento fieristico registrato nel calendario Mostra d\'Oltremare e allineato con Google Calendar.',
      statUpdate: (prev) => ({ ...prev, nextShift: 'Tutto Sposi • Mostra (10:30)', status: 'LAVORO • FIERA', syncedEvents: prev.syncedEvents + 1 })
    },
    {
      cmd: 'Jarvis, registra compenso di 65€ per turno Casertana',
      label: 'Compenso turno +65€',
      sub: 'Casertana vs Bari • Accreditato',
      dotColor: 'bg-amber-400',
      intent: 'RECORD_EARNINGS',
      entity: '{ evento: "Casertana FC vs Bari", compenso: "65.00€", stato: "ACCREDITATO", categoria: "Sicurezza/Steward" }',
      response: '✓ Compenso di 65.00€ registrato nel riepilogo guadagni di STEWARD OS.',
      statUpdate: (prev) => ({ ...prev, earnings: prev.earnings + 65, status: 'COMPENSO SALVATO' })
    },
    {
      cmd: 'Jarvis, inserisci cena con amici venerdì alle 20:30',
      label: 'Evento personale (Cena)',
      sub: 'Venerdì 20:30 • Slot Riposo',
      dotColor: 'bg-purple-400',
      intent: 'CREATE_PERSONAL_EVENT',
      entity: '{ categoria: "Personale", evento: "Cena con amici", giorno: "Venerdì", orario: "20:30", stato: "RIPOSO" }',
      response: '✓ Evento personale salvato: verificata disponibilità (nessun conflitto con turni di lavoro).',
      statUpdate: (prev) => ({ ...prev, status: 'RIPOSO • VEN 20:30', syncedEvents: prev.syncedEvents + 1 })
    }
  ];

  const initialJarvisLogs = [
    { type: 'sys', text: '[jarvis_voice.py] STEWARD OS Core Engine online • SpeechRecognition + Google Calendar OAuth2...' },
    { type: 'in', text: '🎤 "Jarvis, segna turno: Napoli vs Roma sabato alle 18:00"' },
    { type: 'json', text: '→ Intent: REGISTER_WORK_SHIFT | { evento: "SSC Napoli vs Roma", sede: "Stadio Maradona", orario: "18:00", status: "LAVORO" }' },
    { type: 'ok', text: '✓ Turno steward registrato in STEWARD OS e sincronizzato con Google Calendar API (200 OK).' }
  ];

  const [jarvisLogs, setJarvisLogs] = useState(initialJarvisLogs);
  const [jarvisCustomInput, setJarvisCustomInput] = useState('');
  const [jarvisTab, setJarvisTab] = useState('pipeline');
  const [jarvisTerminalView, setJarvisTerminalView] = useState('cli'); // 'cli' | 'preview'
  const [isStewardLightboxOpen, setIsStewardLightboxOpen] = useState(false);
  const [stewardStats, setStewardStats] = useState({
    nextShift: 'Napoli vs Roma (Sab 18:00)',
    status: 'LAVORO • MARADONA',
    earnings: 260,
    syncedEvents: 14
  });
  const jarvisConsoleRef = useRef(null);

  const scrollJarvisConsoleToBottom = () => {
    setTimeout(() => {
      if (jarvisConsoleRef.current) {
        jarvisConsoleRef.current.scrollTop = jarvisConsoleRef.current.scrollHeight;
      }
    }, 30);
  };

  const triggerJarvisCommand = (preset) => {
    setJarvisLogs((prev) => [
      ...prev.slice(-8),
      { type: 'in', text: `🎤 "${preset.cmd}"` },
      { type: 'json', text: `→ Intent: ${preset.intent} | ${preset.entity}` },
      { type: 'ok', text: preset.response }
    ]);
    if (preset.statUpdate) {
      setStewardStats(preset.statUpdate);
    }
    scrollJarvisConsoleToBottom();
  };

  const resetJarvisTerminal = () => {
    setJarvisLogs(initialJarvisLogs);
    setStewardStats({
      nextShift: 'Napoli vs Roma (Sab 18:00)',
      status: 'LAVORO • MARADONA',
      earnings: 260,
      syncedEvents: 14
    });
  };

  const handleJarvisCustomSubmit = (e) => {
    e.preventDefault();
    if (!jarvisCustomInput.trim()) return;
    const clean = jarvisCustomInput.trim();
    const lower = clean.toLowerCase();

    let simulatedIntent = 'CUSTOM_VOICE_QUERY';
    let simulatedEntity = `{ query: "${clean.slice(0, 30)}", confidence: 0.98 }`;
    let simulatedResponse = '✓ Comando elaborato da jarvis_voice.py e sincronizzato nel database di STEWARD OS.';

    if (lower.includes('compenso') || lower.includes('euro') || lower.includes('€') || lower.includes('guadagn') || lower.includes('paga')) {
      const matchNum = clean.match(/\d+/);
      const added = matchNum ? parseInt(matchNum[0], 10) : 50;
      simulatedIntent = 'RECORD_EARNINGS';
      simulatedEntity = `{ input: "${clean.slice(0, 32)}", importo: "${added}.00€", stato: "ACCREDITATO" }`;
      simulatedResponse = `✓ Importo di ${added}.00€ registrato nel bilancio guadagni di STEWARD OS.`;
      setStewardStats((prev) => ({ ...prev, earnings: prev.earnings + added, status: 'COMPENSO SALVATO' }));
    } else if (lower.includes('napoli') || lower.includes('stabia') || lower.includes('casertana') || lower.includes('mostra') || lower.includes('turno') || lower.includes('fiera') || lower.includes('lavoro')) {
      simulatedIntent = 'REGISTER_WORK_SHIFT';
      simulatedEntity = `{ turno: "${clean.slice(0, 32)}", stato: "LAVORO", sync: "Google Calendar" }`;
      simulatedResponse = '✓ Turno di lavoro salvato in STEWARD OS e sincronizzato con Google Calendar.';
      setStewardStats((prev) => ({ ...prev, nextShift: clean.slice(0, 26), status: 'LAVORO ATTIVO', syncedEvents: prev.syncedEvents + 1 }));
    } else if (lower.includes('riposo') || lower.includes('cena') || lower.includes('esame') || lower.includes('personale') || lower.includes('studio')) {
      simulatedIntent = 'CREATE_PERSONAL_EVENT';
      simulatedEntity = `{ impegno: "${clean.slice(0, 32)}", stato: "RIPOSO/PERSONALE" }`;
      simulatedResponse = '✓ Evento personale salvato: verificata disponibilità (nessun conflitto turni).';
      setStewardStats((prev) => ({ ...prev, status: 'SLOT PERSONALE / RIPOSO', syncedEvents: prev.syncedEvents + 1 }));
    }

    setJarvisLogs((prev) => [
      ...prev.slice(-8),
      { type: 'in', text: `🎤 "${clean}"` },
      {
        type: 'json',
        text: `→ Intent: ${simulatedIntent} | ${simulatedEntity}`
      },
      {
        type: 'ok',
        text: simulatedResponse
      }
    ]);
    setJarvisCustomInput('');
    scrollJarvisConsoleToBottom();
  };

  // --- INTERACTIVE WIDGET 2: NEURONI K.O. (MOBILE PARTY GAME & STATE SIMULATOR) ---
  const neuroniAvatars = [
    { id: 'fox', name: 'Kitsune Shinobi', emoji: '🦊', role: 'Speedster', desc: 'Riflessi rapidi e bonus combo' },
    { id: 'cyber', name: 'Cyber Bot 2099', emoji: '🤖', role: 'Hacker', desc: 'Immunità al primo debuff nemico' },
    { id: 'mage', name: 'Mago Arcano', emoji: '🧙‍♂️', role: 'Debuff Master', desc: 'Debuff più potenti e duraturi' },
    { id: 'alien', name: 'Pixel Alien', emoji: '👾', role: 'Chaos Maker', desc: 'Raddoppia i punti nei round minigioco' }
  ];

  const neuroniDebuffs = [
    { id: 'fog', name: 'Nebbia Visiva', icon: '🌫️', desc: 'Offusca il testo delle risposte del rivale', target: 'Rival_Bot' },
    { id: 'freeze', name: 'Timer Freeze', icon: '⏱️', desc: 'Sottrae 5 secondi preziosi al countdown nemico', target: 'Shadow_Player' },
    { id: 'shock', name: 'Shock Neurone', icon: '⚡', desc: 'Rischio KO neurone immediato se sbaglia', target: 'Rival_Bot' },
    { id: 'shuffle', name: 'Mix Risposte', icon: '🌀', desc: 'Rimescola le opzioni a schermo rendendole caotiche', target: 'Shadow_Player' }
  ];

  const neuroniQuestions = [
    {
      category: 'Videogiochi',
      badgeColor: 'text-violet-400 bg-violet-950/80 border-violet-800',
      prompt: 'Quale studio di sviluppo ha creato capolavori epici come "Dark Souls" ed "Elden Ring"?',
      options: ['FromSoftware', 'CD Projekt Red', 'Capcom'],
      correct: 0,
      funFact: 'Game of the Year 2022'
    },
    {
      category: 'Anime & Manga',
      badgeColor: 'text-rose-400 bg-rose-950/80 border-rose-800',
      prompt: 'In "One Piece", qual è il nome del leggendario Re dei Pirati che ha dato inizio alla Grande Era?',
      options: ['Gol D. Roger', 'Portgas D. Ace', 'Silvers Rayleigh'],
      correct: 0,
      funFact: 'Il tesoro dello One Piece'
    },
    {
      category: 'Musica',
      badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800',
      prompt: 'Quale leggendaria rock band britannica ha composto e cantato il brano "Bohemian Rhapsody"?',
      options: ['Pink Floyd', 'Queen', 'The Rolling Stones'],
      correct: 1,
      funFact: 'Freddie Mercury, 1975'
    },
    {
      category: 'Storia',
      badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
      prompt: 'In quale anno è avvenuto lo sbarco in Normandia (D-Day) durante la Seconda Guerra Mondiale?',
      options: ['1944', '1940', '1948'],
      correct: 0,
      funFact: 'Operazione Overlord'
    },
    {
      category: 'Cultura Generale',
      badgeColor: 'text-sky-400 bg-sky-950/80 border-sky-800',
      prompt: 'Qual è la vetta più alta d\'Europa continentale situata nella catena montuosa delle Alpi (4.810 m)?',
      options: ['Monte Bianco', 'Monte Cervino', 'Monte Rosa'],
      correct: 0,
      funFact: 'Tetto d\'Europa'
    }
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(neuroniAvatars[0]);
  const [selectedDebuff, setSelectedDebuff] = useState(neuroniDebuffs[0]);
  const [activeTabNeuroni, setActiveTabNeuroni] = useState('match'); // 'match' | 'camerino' | 'debuffs'
  const [neuroniState, setNeuroniState] = useState({
    qIndex: 0,
    score: 180,
    streak: 2,
    pyramidLevel: 2, // 1 to 4 (4 is victory)
    neuronsLeft: 3,
    lastStatus: 'ROUND_PRONTO',
    activeDebuffSent: 'Nebbia Visiva su Rival_Bot',
    opponents: [
      { name: 'Rival_Bot', level: 1, avatar: '🤖', debuffed: true },
      { name: 'Shadow_Player', level: 2, avatar: '👾', debuffed: false }
    ],
    feedback: null,
    hmrMs: 14
  });

  const handleNeuroniAnswer = (idx) => {
    const currentQ = neuroniQuestions[neuroniState.qIndex];
    const isRight = idx === currentQ.correct;

    const nextPyramid = isRight
      ? Math.min(4, neuroniState.pyramidLevel + 1)
      : Math.max(1, neuroniState.pyramidLevel);

    const isVictory = nextPyramid === 4;

    setNeuroniState((prev) => ({
      ...prev,
      qIndex: (prev.qIndex + 1) % neuroniQuestions.length,
      score: isRight ? prev.score + 60 : Math.max(0, prev.score - 25),
      streak: isRight ? prev.streak + 1 : 0,
      pyramidLevel: isVictory ? 4 : nextPyramid,
      neuronsLeft: isRight ? prev.neuronsLeft : Math.max(1, prev.neuronsLeft - 1),
      lastStatus: isRight
        ? (isVictory ? '👑 PIRAMIDE SCALATA! VITTORIA K.O.!' : `ASCESA PIRAMIDE: LIVELLO ${nextPyramid}`)
        : 'RISPOSTA ERRATA (-1 ⚡ NEURONE)',
      feedback: isRight ? 'CORRETTO' : 'SBAGLIATO',
      opponents: prev.opponents.map((opp) => ({
        ...opp,
        level: Math.random() > 0.65 ? Math.min(3, opp.level + 1) : opp.level
      })),
      hmrMs: Math.floor(Math.random() * 6) + 10
    }));
  };

  const applyDebuffToOpponent = (debuff) => {
    setSelectedDebuff(debuff);
    setNeuroniState((prev) => ({
      ...prev,
      lastStatus: `DEBUFF LANCIATO: ${debuff.name} su ${debuff.target}!`,
      activeDebuffSent: `${debuff.name} (${debuff.target})`,
      opponents: prev.opponents.map((opp) =>
        opp.name === debuff.target ? { ...opp, debuffed: true } : opp
      )
    }));
  };

  const resetNeuroniGame = () => {
    setNeuroniState({
      qIndex: 0,
      score: 180,
      streak: 2,
      pyramidLevel: 2,
      neuronsLeft: 3,
      lastStatus: 'ROUND_PRONTO',
      activeDebuffSent: 'Nebbia Visiva su Rival_Bot',
      opponents: [
        { name: 'Rival_Bot', level: 1, avatar: '🤖', debuffed: true },
        { name: 'Shadow_Player', level: 2, avatar: '👾', debuffed: false }
      ],
      feedback: null,
      hmrMs: 12
    });
  };

  // --- INTERACTIVE WIDGET 3: LSO FORZA 4 C POSIX TCP TERMINAL ---
  const [forzaBoard, setForzaBoard] = useState([
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', 'O', '.', '.', '.'],
    ['.', '.', 'X', 'X', 'O', '.', '.']
  ]);
  const [forzaLogs, setForzaLogs] = useState([
    '[server.c:84] TCP Socket bound on 0.0.0.0:8080 (AF_INET)',
    '[lobby.c:142] pthread_create(&tid, NULL, match_worker, fd=5)',
    '[sync.c:59] pthread_mutex_lock(&board_mutex) -> Turn: Player 1 (X)'
  ]);
  const [forzaTurn, setForzaTurn] = useState('X');

  const dropForzaDisc = (colIdx) => {
    const nextBoard = forzaBoard.map((r) => [...r]);
    let placedRow = -1;
    for (let r = nextBoard.length - 1; r >= 0; r--) {
      if (nextBoard[r][colIdx] === '.') {
        nextBoard[r][colIdx] = forzaTurn;
        placedRow = r;
        break;
      }
    }
    const nextPlayer = forzaTurn === 'X' ? 'O' : 'X';
    if (placedRow !== -1) {
      setForzaBoard(nextBoard);
      setForzaTurn(nextPlayer);
      setForzaLogs((prev) => [
        ...prev.slice(-2),
        `[recv fd=${forzaTurn === 'X' ? 4 : 5}] MOVE col=${colIdx + 1} -> row=${placedRow + 1} (${forzaTurn})`,
        `[mutex] unlock(&board_mutex) -> broadcast state to 2 clients`
      ]);
    } else {
      // Reset column if full
      const resetBoard = [
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', 'O', '.', '.', '.'],
        ['.', '.', 'X', 'X', 'O', '.', '.']
      ];
      setForzaBoard(resetBoard);
      setForzaLogs((prev) => [
        ...prev.slice(-2),
        `[server.c] Colonna ${colIdx + 1} piena -> Reset griglia partita in corso...`
      ]);
    }
  };

  // --- INTERACTIVE WIDGET 4: QUICKSKETCH E2E TEST RUNNER ---
  const [e2eStatus, setE2eStatus] = useState([
    { name: 'GET /api/sketches (200 OK • TypeScript DTO)', ms: '18ms', passed: true },
    { name: 'POST /api/canvas/sync (Payload Validation)', ms: '24ms', passed: true },
    { name: 'E2E Spec: User draws & saves sketch flow', ms: '112ms', passed: true }
  ]);
  const [isRunningE2e, setIsRunningE2e] = useState(false);

  const runQuicksketchTests = () => {
    setIsRunningE2e(true);
    setTimeout(() => {
      setE2eStatus([
        {
          name: 'GET /api/sketches (200 OK • TypeScript DTO)',
          ms: `${Math.floor(Math.random() * 10) + 12}ms`,
          passed: true
        },
        {
          name: 'POST /api/canvas/sync (Payload Validation)',
          ms: `${Math.floor(Math.random() * 12) + 19}ms`,
          passed: true
        },
        {
          name: 'E2E Spec: User draws & saves sketch flow',
          ms: `${Math.floor(Math.random() * 35) + 95}ms`,
          passed: true
        }
      ]);
      setIsRunningE2e(false);
    }, 350);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const skillCategories = [
    {
      title: 'Backend & Systems',
      icon: Server,
      description:
        'Sviluppo di API REST modulari, programmazione di sistema concorrente in C su Linux, socket TCP e database relazionali.',
      skills: ['Python', 'C (POSIX C99)', 'Java', 'Node.js', 'Express.js', 'SQL', 'PostgreSQL', 'MySQL', 'SQLite']
    },
    {
      title: 'Frontend & Web UI',
      icon: Layout,
      description:
        'Single-Page Application reattive, architetture a componenti custom, stato prevedibile e tipizzazione TypeScript.',
      skills: ['React', 'Vite', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design']
    },
    {
      title: 'DevOps, QA & Linux',
      icon: Container,
      description:
        'Containerizzazione multi-servizio, automazione build con Makefile, linting statico ultraveloce e testing End-to-End.',
      skills: ['Docker', 'Docker Compose', 'Linux / Bash', 'Git & GitHub', 'E2E Testing', 'Oxlint', 'Makefile', 'Render']
    },
    {
      title: 'Voice AI & Automation',
      icon: Sparkles,
      description:
        'Pipeline di riconoscimento vocale, parsing di comandi in linguaggio naturale, web scraping e sincronizzazione cloud.',
      skills: ['Speech Recognition', 'Google Calendar API', 'Web Scraping', 'Python Automation', 'LLM Workflows']
    }
  ];

  const showPersonal = activeFilter === 'all' || activeFilter === 'personal';
  const showAcademic = activeFilter === 'all' || activeFilter === 'academic';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 selection:bg-teal-600 selection:text-white ${
        isDark ? 'bg-[#0B111E] text-slate-100 blueprint-dark-bg' : 'bg-[#F7F6F2] text-[#18181B] paper-light-bg'
      }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* Fonts & Custom Architectural Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        html {
          scroll-behavior: smooth;
        }
        .font-mono-code {
          font-family: 'JetBrains Mono', monospace;
        }
        .editorial-heading {
          letter-spacing: -0.03em;
        }
        .paper-light-bg {
          background-image: radial-gradient(rgba(15, 118, 110, 0.05) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .blueprint-dark-bg {
          background-image: 
            linear-gradient(to right, rgba(20, 184, 166, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 184, 166, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      {/* STICKY HEADER WITH PAPER / BLUEPRINT SWITCH */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#0B111E]/85 border-slate-800/90'
            : 'bg-[#F7F6F2]/85 border-stone-200/80'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-3">
          {/* Left Identity */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              className={`text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0F766E] inline-block" />
              <span>Andrea Barattolo</span>
            </a>
            <span
              className={`font-mono-code hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                isDark
                  ? 'bg-teal-950/60 text-teal-300 border-teal-800/70'
                  : 'bg-teal-50 text-[#0F766E] border-teal-200/80'
              }`}
            >
              @AndrewJar09-star
            </span>
          </div>

          {/* Center Navigation */}
          <nav
            className={`hidden md:flex items-center gap-7 text-sm font-medium ${
              isDark ? 'text-slate-300' : 'text-zinc-600'
            }`}
          >
            <a href="#progetti" className="hover:text-teal-500 transition-colors">
              Progetti
            </a>
            <a href="#stack" className="hover:text-teal-500 transition-colors">
              Stack
            </a>
            <a href="#metodo" className="hover:text-teal-500 transition-colors">
              Metodo
            </a>
            <a href="#contatti" className="hover:text-teal-500 transition-colors">
              Contatti
            </a>
          </nav>

          {/* Right Controls: Theme Switcher + GitHub */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'paper' : 'blueprint')}
              className={`font-mono-code inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-900 text-teal-300 border-teal-500/40 hover:border-teal-400 shadow-xs'
                  : 'bg-white text-zinc-800 border-stone-300/90 hover:bg-stone-100 shadow-2xs'
              }`}
              title="Cambia modalità visiva: Paper Editorial o Engineering Blueprint"
            >
              {isDark ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>Blueprint Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Paper Mode</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/AndrewJar09-star"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                  : 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* HERO SECTION WITH INTEGRATED SYSTEM TELEMETRY CARD */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Coordinate & Availability Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${
                    isDark
                      ? 'bg-emerald-950/50 border-emerald-700/60 text-emerald-300'
                      : 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono-code text-xs font-semibold">
                    Open to Work • Tirocinio & Posizioni Junior
                  </span>
                </div>

                <span
                  className={`font-mono-code text-[11px] px-2.5 py-1 rounded-md border ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                      : 'bg-stone-200/60 border-stone-300/70 text-zinc-600'
                  }`}
                >
                  SYS.LOC // 40.8518° N, 14.2681° E
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`editorial-heading text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.08] ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Ciao, sono{' '}
                <span className={isDark ? 'text-teal-400' : 'text-[#0F766E]'}>
                  Andrea Barattolo
                </span>
                . Progetto architetture Full-Stack, sistemi concorrenti e{' '}
                <span
                  className={`underline decoration-2 underline-offset-4 ${
                    isDark ? 'decoration-amber-400/80' : 'decoration-amber-600/70'
                  }`}
                >
                  automazioni intelligenti
                </span>
                .
              </h1>

              {/* Bio */}
              <p
                className={`text-base sm:text-[17px] leading-relaxed max-w-2xl ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                Laureando in Informatica presso l’
                <strong className={isDark ? 'text-white font-semibold' : 'text-zinc-900 font-semibold'}>
                  Università degli Studi di Napoli Federico II
                </strong>{' '}
                (pochi esami al traguardo). Divido il mio tempo tra{' '}
                <strong className={isDark ? 'text-teal-300 font-semibold' : 'text-[#0F766E] font-semibold'}>
                  progetti personali sperimentali
                </strong>{' '}
                — come assistenti vocali in Python e web app interattive in React/Vite — e ingegneria del software solida: server multithread in C su Linux, API REST in TypeScript e containerizzazione Docker.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#progetti"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                    isDark
                      ? 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                      : 'bg-[#0F766E] text-white hover:bg-teal-800'
                  }`}
                >
                  <span>Esplora i Progetti</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-stone-300/90 text-zinc-800 hover:bg-stone-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>Scarica CV (PDF)</span>
                </button>

                <a
                  href="https://github.com/AndrewJar09-star"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-stone-300/90 text-zinc-800 hover:bg-stone-100'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>AndrewJar09-star</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Portrait + Overlapping Live Git Telemetry Card */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px]">
                {/* Portrait Frame */}
                <div
                  className={`relative aspect-[4/5] rounded-3xl p-2 border shadow-xl transition-colors ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-700/80'
                      : 'bg-white border-stone-300/90'
                  }`}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 flex flex-col justify-between">
                    {customPhoto ? (
                      <img
                        src={customPhoto}
                        alt="Andrea Barattolo"
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          objectPosition: 'center 80%',
                          transform: 'scale(1.34) translateY(-54px)',
                          transformOrigin: 'center 62%'
                        }}
                      />
                    ) : (
                      /* Bespoke Architectural Monogram Placeholder until Andrea uploads his photo */
                      <div className="relative w-full h-full p-6 flex flex-col justify-between text-white select-none">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="font-mono-code text-[11px] text-teal-300 flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 text-emerald-400" />
                            PROFILE_PORTRAIT.RAW
                          </span>
                          <span className="font-mono-code text-[10px] text-slate-400">
                            UNINA // CS
                          </span>
                        </div>

                        <div className="my-auto flex flex-col items-center text-center py-4">
                          <div className="w-24 h-24 rounded-2xl bg-teal-500/15 border border-teal-400/40 flex items-center justify-center shadow-inner mb-3">
                            <span className="text-3xl font-extrabold tracking-tight text-teal-300">
                              AB
                            </span>
                          </div>
                          <div className="text-base font-bold text-white">Andrea Barattolo</div>
                          <div className="font-mono-code text-xs text-teal-300/90 mt-0.5">
                            Full-Stack • Systems • AI
                          </div>
                        </div>

                        <div className="h-16" />
                      </div>
                    )}

                    {/* Upload Photo Button */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-400" />
                      <span>{customPhoto ? 'Cambia foto' : 'Inserisci la tua foto'}</span>
                    </button>
                  </div>
                </div>

                {/* OVERLAPPING TECHNICAL TELEMETRY CARD */}
                <div
                  className={`relative sm:absolute sm:-bottom-6 sm:-left-6 z-30 mt-4 sm:mt-0 w-full sm:w-[320px] rounded-2xl p-4 border shadow-xl backdrop-blur-md transition-colors ${
                    isDark
                      ? 'bg-slate-900/95 border-teal-500/40 text-slate-100'
                      : 'bg-white/95 border-stone-300 text-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-stone-200/50 dark:border-slate-800 pb-2 mb-2.5">
                    <div className="flex items-center gap-1.5 font-mono-code text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>git status • main</span>
                    </div>
                    <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">
                      WIP ACTIVE
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono-code text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>focus:</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        Neuroni K.O. & Jarvis AI
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>degree:</span>
                      <span className="font-medium">CS @ Federico II (Final Mile)</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <MapPin className="w-3 h-3" /> Napoli, IT
                      </span>
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>
                        4 public repos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: ASYMMETRIC BENTO GRID FOR PROJECTS (Spotlight on Personal Projects) */}
        <section
          id="progetti"
          className={`py-16 sm:py-20 scroll-mt-16 border-t ${
            isDark ? 'border-slate-800/90' : 'border-stone-200/90'
          }`}
        >
          {/* Section Header + Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div
                className={`font-mono-code text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-2 ${
                  isDark ? 'text-teal-400' : 'text-[#0F766E]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>ARCHITETTURA SOFTWARE & DEMO LIVE</span>
              </div>
              <h2
                className={`editorial-heading text-3xl sm:text-4xl font-extrabold ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Progetti Personali & Ingegneria
              </h2>
              <p className={`text-base mt-1.5 ${isDark ? 'text-slate-400' : 'text-zinc-600'}`}>
                In primo piano i prodotti personali ideati da zero, seguiti dai sistemi concorrenti e full-stack universitari.
              </p>
            </div>

            {/* Filter Tabs */}
            <div
              className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border self-start ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-stone-200/70 border-stone-300/70'
              }`}
            >
              {[
                { id: 'all', label: 'Tutti i Progetti (4)' },
                { id: 'personal', label: '★ Progetti Personali (2)' },
                { id: 'academic', label: 'Sistemi & UniNa (2)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? isDark
                        ? 'bg-teal-500 text-slate-950 shadow-xs'
                        : 'bg-white text-zinc-900 shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* BENTO ROW 1: PERSONAL PROJECT SPOTLIGHT #1 — CALENDARIO JARVIS (FULL-WIDTH) */}
            {showPersonal && (
              <article
                className={`rounded-3xl p-6 sm:p-8 lg:p-9 border transition-all ${
                  isDark
                    ? 'bg-slate-900/80 border-teal-500/35 shadow-lg'
                    : 'bg-white border-stone-300/90 shadow-sm'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Narrative & Specs (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-mono-code inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                            isDark
                              ? 'bg-teal-950/80 text-teal-300 border-teal-700'
                              : 'bg-teal-50 text-[#0F766E] border-teal-200'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          PROGETTO PERSONALE • LIVE SU RENDER
                        </span>
                        <span
                          className={`font-mono-code text-[11px] px-2.5 py-1 rounded-full border ${
                            isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-stone-100 text-zinc-700 border-stone-200'
                          }`}
                        >
                          STEWARD OS ECOSYSTEM
                        </span>
                        <span
                          className={`font-mono-code text-[11px] px-2.5 py-1 rounded-full border ${
                            isDark
                              ? 'bg-teal-900/40 text-teal-300 border-teal-700/60'
                              : 'bg-teal-50 text-teal-700 border-teal-200'
                          }`}
                        >
                          Voice AI & Shift Management
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-50 text-[#0F766E]'
                          }`}
                        >
                          <Mic className="w-5 h-5" />
                        </div>
                        <div>
                          <h3
                            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                              isDark ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            Calendario Jarvis
                          </h3>
                          <p
                            className={`font-mono-code text-xs ${
                              isDark ? 'text-teal-400' : 'text-[#0F766E]'
                            }`}
                          >
                            Assistente Vocale Python & Sync Google Calendar integrato in STEWARD OS
                          </p>
                        </div>
                      </div>

                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-zinc-600'
                        }`}
                      >
                        Assistente vocale intelligente implementato all'interno di{' '}
                        <strong className={isDark ? 'text-teal-300 font-bold' : 'text-teal-800 font-bold'}>
                          STEWARD OS
                        </strong>
                        , applicazione concepita e sviluppata per pianificare e ottimizzare la gestione del lavoro da steward e dei servizi di sicurezza negli eventi. Il sistema si fonda su un database preconfigurato con i principali calendari del territorio — dalle partite al Maradona dell'
                        <strong className={isDark ? 'text-white' : 'text-zinc-900'}>SSC Napoli</strong>{' '}
                        e i match di Juve Stabia e Casertana FC, fino alle grandi manifestazioni della{' '}
                        <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Mostra d'Oltremare</strong>{' '}
                        e concerti. L'app nasce dall'esigenza reale di avere a portata di mano date, orari, stato del turno (
                        <span className="font-semibold text-emerald-500">Lavoro</span> vs{' '}
                        <span className="font-semibold text-amber-500">Riposo</span>) e calcolo immediato dei compensi economici maturati, offrendo al contempo la flessibilità di pianificare impegni personali (cene, esami, scadenze). Il motore vocale custom in Python (
                        <code className="font-mono-code text-xs px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-300">
                          jarvis_voice.py
                        </code>
                        ) sincronizza bidirezionalmente ogni evento con le Google Calendar API.
                      </p>

                      {/* Mini Switcher for Architecture vs Features */}
                      <div className="pt-1">
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => setJarvisTab('pipeline')}
                            className={`font-mono-code text-xs px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                              jarvisTab === 'pipeline'
                                ? isDark
                                  ? 'bg-teal-500 text-slate-950'
                                  : 'bg-zinc-900 text-white'
                                : isDark
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-stone-100 text-zinc-600'
                            }`}
                          >
                            Pipeline Architetturale
                          </button>
                          <button
                            type="button"
                            onClick={() => setJarvisTab('features')}
                            className={`font-mono-code text-xs px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                              jarvisTab === 'features'
                                ? isDark
                                  ? 'bg-teal-500 text-slate-950'
                                  : 'bg-zinc-900 text-white'
                                : isDark
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-stone-100 text-zinc-600'
                            }`}
                          >
                            Dettagli Ingegneristici
                          </button>
                        </div>

                        {jarvisTab === 'pipeline' ? (
                          <div className="grid grid-cols-3 gap-2.5">
                            {[
                              { step: '01 • INPUT', title: 'Speech-to-Text', sub: 'jarvis_voice.py' },
                              { step: '02 • CORE', title: 'STEWARD OS Engine', sub: 'Turni, Compensi & SQLite' },
                              { step: '03 • CLOUD', title: '2-Way Sync', sub: 'Google Cal API OAuth2' }
                            ].map((item) => (
                              <div
                                key={item.step}
                                className={`p-3 rounded-xl border ${
                                  isDark
                                    ? 'bg-slate-950/70 border-slate-800'
                                    : 'bg-stone-50 border-stone-200/90'
                                }`}
                              >
                                <div className="font-mono-code text-[10px] font-bold text-teal-600 dark:text-teal-400">
                                  {item.step}
                                </div>
                                <div
                                  className={`text-xs font-bold mt-0.5 ${
                                    isDark ? 'text-white' : 'text-zinc-900'
                                  }`}
                                >
                                  {item.title}
                                </div>
                                <div className="font-mono-code text-[10px] text-zinc-500 mt-0.5">
                                  {item.sub}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul
                            className={`space-y-1.5 text-xs sm:text-sm ${
                              isDark ? 'text-slate-300' : 'text-zinc-700'
                            }`}
                          >
                            <li className="flex items-start gap-2">
                              <span className="text-teal-500 font-bold">•</span>
                              <span>Parsing in linguaggio naturale di turni sul campo (SSC Napoli, Mostra d'Oltremare, concerti), compensi economici e disponibilità (lavoro / riposo).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-teal-500 font-bold">•</span>
                              <span>Database SQLite precaricato con calendari sportivi e fieristici, tracciamento storico compensi e compatibilità con impegni personali.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-teal-500 font-bold">•</span>
                              <span>Sincronizzazione bidirezionale con Google Calendar v3 e deploy cloud pronto per notificare scadenze e turni su mobile in tempo reale.</span>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Tags & GitHub Link */}
                    <div className="pt-4 border-t border-stone-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {['STEWARD OS', 'Python', 'Speech Recognition', 'Google Calendar API', 'SQLite', 'Turni & Compensi', 'Render'].map(
                          (t) => (
                            <span
                              key={t}
                              className={`font-mono-code text-[11px] px-2.5 py-1 rounded-md border ${
                                isDark
                                  ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                                  : 'bg-stone-100 text-zinc-800 border-stone-200'
                              }`}
                            >
                              {t}
                            </span>
                          )
                        )}
                      </div>

                      <a
                        href="https://github.com/AndrewJar09-star/calendario-jarvis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold shrink-0 ${
                          isDark
                            ? 'text-teal-400 hover:text-teal-300'
                            : 'text-[#0F766E] hover:text-teal-900'
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Codice su GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: INTERACTIVE JARVIS VOICE TERMINAL (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 text-slate-100 p-4 sm:p-5 flex flex-col h-full shadow-inner">
                      {/* Terminal Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
                          <span className="font-mono-code text-[11px] text-slate-300 ml-1.5 truncate">
                            jarvis_voice.py — STEWARD OS
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                            <button
                              type="button"
                              onClick={() => setJarvisTerminalView('cli')}
                              className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                                jarvisTerminalView === 'cli'
                                  ? 'bg-teal-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              CLI Terminal
                            </button>
                            <button
                              type="button"
                              onClick={() => setJarvisTerminalView('preview')}
                              className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                                jarvisTerminalView === 'preview'
                                  ? 'bg-teal-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              UI App
                            </button>
                          </div>
                          <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            ONLINE
                          </span>
                        </div>
                      </div>

                      {jarvisTerminalView === 'cli' ? (
                        <div className="flex-1 flex flex-col justify-between gap-3">
                          {/* Live Telemetry Strip (STEWARD OS Status) */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                              <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400">
                                Prossimo Turno
                              </div>
                              <div className="font-mono-code text-[11px] font-bold text-sky-300 truncate mt-0.5">
                                {stewardStats.nextShift}
                              </div>
                            </div>
                            <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                              <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400">
                                Stato Slot
                              </div>
                              <div className="font-mono-code text-[11px] font-bold text-emerald-400 truncate mt-0.5">
                                {stewardStats.status}
                              </div>
                            </div>
                            <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                              <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400">
                                Compensi Mese
                              </div>
                              <div className="font-mono-code text-[11px] font-bold text-amber-300 truncate mt-0.5">
                                € {stewardStats.earnings},00
                              </div>
                            </div>
                          </div>

                          {/* Preset Voice Commands */}
                          <div>
                            <div className="font-mono-code text-[10px] uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                              <span>Clicca un comando vocale per testare la pipeline:</span>
                              <span className="text-[10px] text-teal-400 font-mono-code">
                                {stewardStats.syncedEvents} eventi sync
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {jarvisPresets.map((p, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => triggerJarvisCommand(p)}
                                  className="font-mono-code px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-teal-950/90 hover:border-teal-500/50 text-slate-200 border border-slate-700/80 transition-all text-left cursor-pointer group"
                                  title={p.cmd}
                                >
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="text-[11px] font-bold text-white group-hover:text-teal-300 flex items-center gap-1.5 truncate">
                                      <span className={`w-2 h-2 rounded-full shrink-0 ${p.dotColor}`} />
                                      <span className="truncate">{p.label}</span>
                                    </span>
                                    <span className="text-[10px] text-slate-400 group-hover:text-teal-300 shrink-0">
                                      🎙️
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate mt-0.5 pl-3.5">
                                    {p.sub}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Live Console Output (Flex-1 fills remaining vertical space cleanly) */}
                          <div className="flex-1 flex flex-col bg-slate-950/95 border border-slate-800/90 rounded-xl overflow-hidden min-h-[195px]">
                            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 bg-slate-900/60">
                              <span className="font-mono-code text-[10px] text-slate-400">
                                stdout • SpeechRecognition + Google Calendar API v3
                              </span>
                              <button
                                type="button"
                                onClick={resetJarvisTerminal}
                                className="font-mono-code text-[10px] text-slate-400 hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                                Reset
                              </button>
                            </div>
                            <div
                              ref={jarvisConsoleRef}
                              className="flex-1 font-mono-code text-xs space-y-2 p-3.5 overflow-y-auto max-h-[260px]"
                            >
                              {jarvisLogs.map((log, index) => (
                                <div
                                  key={index}
                                  className={
                                    log.type === 'in'
                                      ? 'text-amber-300 font-semibold'
                                      : log.type === 'json'
                                      ? 'text-sky-300 text-[11px] leading-relaxed'
                                      : log.type === 'ok'
                                      ? 'text-emerald-400'
                                      : 'text-slate-400 text-[11px]'
                                  }
                                >
                                  {log.text}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Custom Voice Prompt Input */}
                          <form onSubmit={handleJarvisCustomSubmit} className="flex gap-2">
                            <input
                              type="text"
                              value={jarvisCustomInput}
                              onChange={(e) => setJarvisCustomInput(e.target.value)}
                              placeholder='Scrivi un comando (es. "Jarvis, turno Napoli" o "compenso 65€")...'
                              className="font-mono-code text-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 flex-1 focus:outline-none focus:border-teal-500"
                            />
                            <button
                              type="submit"
                              className="font-mono-code text-xs font-semibold px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shrink-0 cursor-pointer"
                            >
                              Invia
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col justify-between gap-3">
                          {/* Full-width Uncropped App Screenshot with Lightbox Trigger */}
                          <div
                            onClick={() => setIsStewardLightboxOpen(true)}
                            className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-lg group cursor-zoom-in"
                          >
                            <img
                              src={stewardOsPreview}
                              alt="STEWARD OS Dashboard Reale"
                              className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.015]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                              <span className="font-mono-code text-[10px] px-2.5 py-1 rounded-md bg-slate-900/95 text-teal-300 border border-teal-500/30">
                                STEWARD OS • Dashboard Turni & Eventi
                              </span>
                              <span className="font-mono-code text-[10px] px-2.5 py-1 rounded-md bg-teal-500 text-slate-950 font-bold shadow">
                                🔍 Ingrandisci HD
                              </span>
                            </div>
                          </div>

                          {/* Active Work Calendars Legend (matching real app sidebar) */}
                          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 space-y-2">
                            <div className="font-mono-code text-[10px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                              <span>Calendari Lavoro Integrati nella UI:</span>
                              <span className="text-teal-400">Reattore J.A.R.V.I.S. Attivo</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                { name: 'SSC Napoli', dot: 'bg-sky-400' },
                                { name: 'Juve Stabia', dot: 'bg-amber-400' },
                                { name: 'Casertana FC', dot: 'bg-rose-500' },
                                { name: "Mostra d'Oltremare", dot: 'bg-emerald-400' },
                                { name: 'Eventi Personali', dot: 'bg-purple-400' }
                              ].map((cal) => (
                                <span
                                  key={cal.name}
                                  className="font-mono-code text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 inline-flex items-center gap-1.5"
                                >
                                  <span className={`w-2 h-2 rounded-full ${cal.dot}`} />
                                  {cal.name}
                                </span>
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed pt-0.5">
                              Interfaccia web completa con vista mensile/settimanale, filtro rapido per società calcistiche e poli fieristici, box <strong>Prossimo Turno Lavoro</strong> e barra inferiore per gestione Turni, Avvisi e Sync.
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setIsStewardLightboxOpen(true)}
                              className="flex-1 font-mono-code text-xs font-semibold py-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition-colors cursor-pointer text-center"
                            >
                              🔍 Apri Schermata a Tutto Schermo
                            </button>
                            <button
                              type="button"
                              onClick={() => setJarvisTerminalView('cli')}
                              className="flex-1 font-mono-code text-xs font-semibold py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer text-center"
                            >
                              ← Torna al Terminale CLI
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fullscreen Lightbox Modal for STEWARD OS UI */}
                  {isStewardLightboxOpen && (
                    <div
                      onClick={() => setIsStewardLightboxOpen(false)}
                      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-6xl w-full bg-[#0D131F] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl cursor-default"
                      >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            <span className="font-mono-code text-xs font-bold text-white">
                              STEWARD OS // Dashboard Operativa Turni & Reattore Vocale J.A.R.V.I.S.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsStewardLightboxOpen(false)}
                            className="font-mono-code text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                          >
                            ✕ Chiudi
                          </button>
                        </div>
                        <div className="p-2 sm:p-4 bg-slate-950">
                          <img
                            src={stewardOsPreview}
                            alt="STEWARD OS Fullscreen"
                            className="w-full max-h-[80vh] object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* BENTO ROW 2: PERSONAL PROJECT SPOTLIGHT #2 — NEURONI K.O. (ACTIVE WIP + LIVE SANDBOX) */}
            {showPersonal && (
              <article
                className={`rounded-3xl p-6 sm:p-8 lg:p-9 border transition-all ${
                  isDark
                    ? 'bg-slate-900/80 border-amber-500/40 shadow-lg'
                    : 'bg-white border-amber-300/90 shadow-sm'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: WIP Story, Architecture & Roadmap Progress (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      {/* Prominent Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-mono-code inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                            isDark
                              ? 'bg-amber-950/80 text-amber-300 border-amber-600/70'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          🚧 IN FASE DI SVILUPPO (WIP) • PROGETTO PERSONALE
                        </span>
                        <span
                          className={`font-mono-code inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border ${
                            isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-stone-100 text-zinc-700 border-stone-200'
                          }`}
                        >
                          <Smartphone className="w-3 h-3 text-amber-400" />
                          Target: Mobile (iOS & Android)
                        </span>
                        <span
                          className={`font-mono-code inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border ${
                            isDark
                              ? 'bg-amber-900/30 text-amber-300 border-amber-700/50'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          <Users className="w-3 h-3 text-amber-500" />
                          Party Game Multiplayer
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                            isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          <Gamepad2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3
                            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                              isDark ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            Neuroni K.O.
                          </h3>
                          <p
                            className={`font-mono-code text-xs ${
                              isDark ? 'text-amber-400' : 'text-amber-700'
                            }`}
                          >
                            Mobile Party Game a Quiz & Minigiochi Multiplayer • Camerino Avatar, Debuff Tattici & Scalata Piramidale
                          </p>
                        </div>
                      </div>

                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-zinc-600'
                        }`}
                      >
                        Party game competitivo multiplayer concepito nativamente per il rilascio su dispositivi{' '}
                        <strong className={isDark ? 'text-white' : 'text-zinc-900'}>
                          mobile (iOS & Android)
                        </strong>
                        , attualmente in piena fase di sviluppo attivo. I giocatori iniziano la sessione accedendo al{' '}
                        <strong className={isDark ? 'text-amber-300' : 'text-amber-800'}>
                          Camerino Avatar
                        </strong>
                        , dove possono personalizzare e scegliere il proprio personaggio prima di tuffarsi nella lobby di partita. Il match si sviluppa in una sequenza serrata di quiz a tempo e minigiochi dinamici alimentati da un vasto database multidisciplinare ({' '}
                        <span className="font-semibold text-amber-500">Cultura Generale</span>,{' '}
                        <span className="font-semibold text-rose-400">Storia</span>,{' '}
                        <span className="font-semibold text-amber-400">Musica</span>,{' '}
                        <span className="font-semibold text-rose-500">Anime & Manga</span>,{' '}
                        <span className="font-semibold text-violet-400">Videogiochi</span>). La componente strategica culmina nel{' '}
                        <strong className={isDark ? 'text-amber-300' : 'text-amber-800'}>
                          sistema dei Debuff tattici
                        </strong>
                        : prima di ogni serie di domande, ciascun giocatore può scagliare malus ostacolanti sull'avversario prescelto (nebbia visiva, timer freeze, shock neurone) per sabotarlo e scalare per primo i gradini della{' '}
                        <strong className={isDark ? 'text-white' : 'text-zinc-900'}>
                          Piramide della Vittoria
                        </strong>{' '}
                        fino alla vetta finale.
                      </p>

                      {/* Development Roadmap Tracker */}
                      <div
                        className={`rounded-2xl p-4 border space-y-3 ${
                          isDark
                            ? 'bg-slate-950/60 border-slate-800'
                            : 'bg-amber-50/40 border-amber-200/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Roadmap & Stato Avanzamento Lavori
                          </span>
                          <span className="font-mono-code text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            Build v0.8-mobile-beta
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="flex justify-between font-mono-code text-[11px] mb-1">
                              <span>✓ Camerino Avatar, Room Multiplayer & Setup Mobile-First</span>
                              <span className="text-emerald-500 font-bold">100%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
                              <div className="h-full bg-emerald-500 w-full rounded-full" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between font-mono-code text-[11px] mb-1">
                              <span>⚡ Database Multidisciplinare (Anime, Gaming, Storia, Musica) & Debuff Engine</span>
                              <span className="text-amber-500 font-bold">85%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
                              <div className="h-full bg-amber-500 w-[85%] rounded-full" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between font-mono-code text-[11px] mb-1">
                              <span>🚧 Minigiochi Dinamici, Touch Gestures & Scalata Piramide Real-Time</span>
                              <span className="text-teal-500 font-bold">In Corso</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-slate-800 overflow-hidden">
                              <div className="h-full bg-teal-500 w-1/2 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags & Repo Link */}
                    <div className="pt-4 border-t border-stone-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {['Mobile Party Game', 'Multiplayer Online', 'Camerino Avatar', 'Debuff Engine', 'Database Multidisciplinare', 'React 19', 'Oxlint'].map(
                          (t) => (
                            <span
                              key={t}
                              className={`font-mono-code text-[11px] px-2.5 py-1 rounded-md border ${
                                isDark
                                  ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                                  : 'bg-stone-100 text-zinc-800 border-stone-200'
                              }`}
                            >
                              {t}
                            </span>
                          )
                        )}
                      </div>

                      <a
                        href="https://github.com/AndrewJar09-star/Neuroni-K.O."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold shrink-0 ${
                          isDark
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-amber-700 hover:text-amber-900'
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        <span>Segui gli sviluppi su GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: INTERACTIVE NEURONI K.O. STATE SANDBOX (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 text-slate-100 p-4 sm:p-5 flex flex-col justify-between h-full shadow-inner">
                      <div>
                        {/* Top Bar with Mode Switcher */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
                            <span className="font-mono-code text-[11px] text-slate-300 ml-1.5 truncate">
                              neuroni_ko_mobile.tsx — Engine
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                              <button
                                type="button"
                                onClick={() => setActiveTabNeuroni('match')}
                                className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                  activeTabNeuroni === 'match'
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                Arena Quiz
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveTabNeuroni('camerino')}
                                className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                  activeTabNeuroni === 'camerino'
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                Camerino
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveTabNeuroni('debuffs')}
                                className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                  activeTabNeuroni === 'debuffs'
                                    ? 'bg-amber-500 text-slate-950 font-bold'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                Debuff
                              </button>
                            </div>
                            <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                              HMR: {neuroniState.hmrMs}ms
                            </span>
                          </div>
                        </div>

                        {/* Top Game HUD Strip */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                            <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                              <span>Tuo Avatar</span>
                              <span className="text-[9px] text-amber-400">Lobby</span>
                            </div>
                            <div className="font-mono-code text-[11px] font-bold text-white truncate mt-0.5 flex items-center gap-1">
                              <span>{selectedAvatar.emoji}</span>
                              <span className="truncate">{selectedAvatar.name}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                            <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                              <span>Piramide</span>
                              <span className="text-[9px] text-emerald-400">Step</span>
                            </div>
                            <div className="font-mono-code text-[11px] font-bold text-amber-300 truncate mt-0.5 flex items-center gap-1">
                              <Trophy className="w-3 h-3 text-amber-400" />
                              <span>Livello {neuroniState.pyramidLevel}/4 {neuroniState.pyramidLevel === 4 ? '👑 CIMA!' : ''}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                            <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                              <span>Neuroni & PT</span>
                              <span className="text-[9px] text-sky-400">{neuroniState.streak}x combo</span>
                            </div>
                            <div className="font-mono-code text-[11px] font-bold text-emerald-400 truncate mt-0.5 flex items-center justify-between">
                              <span>{'⚡'.repeat(neuroniState.neuronsLeft)}</span>
                              <span className="text-white text-[10px]">{neuroniState.score} PT</span>
                            </div>
                          </div>
                        </div>

                        {/* Tab Content 1: MATCH LIVE & QUIZ */}
                        {activeTabNeuroni === 'match' && (
                          <div className="space-y-3">
                            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                              <div className="flex items-center justify-between text-[11px] font-mono-code mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-300">DOMANDA #{neuroniState.qIndex + 1}</span>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                                      neuroniQuestions[neuroniState.qIndex].badgeColor
                                    }`}
                                  >
                                    {neuroniQuestions[neuroniState.qIndex].category}
                                  </span>
                                </div>
                                <span className="text-[10px] text-amber-400 font-mono-code">
                                  🎯 {neuroniState.activeDebuffSent}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm font-bold text-white mb-3 leading-snug">
                                {neuroniQuestions[neuroniState.qIndex].prompt}
                              </p>

                              {/* Quiz Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {neuroniQuestions[neuroniState.qIndex].options.map((opt, i) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleNeuroniAnswer(i)}
                                    className="font-mono-code text-[11px] py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/90 transition-all font-medium text-center cursor-pointer truncate shadow-xs"
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Quick Tactical Debuff Launcher */}
                            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
                              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1.5">
                                <span>LANCIA UN DEBUFF SULL'AVVERSARIO (Rival_Bot):</span>
                                <span className="text-amber-400">Sabotaggio</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                {neuroniDebuffs.map((d) => (
                                  <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => applyDebuffToOpponent(d)}
                                    className={`font-mono-code text-[10px] p-1.5 rounded-lg border transition-all text-left cursor-pointer flex items-center gap-1.5 ${
                                      selectedDebuff.id === d.id
                                        ? 'bg-amber-950/80 text-amber-200 border-amber-500/60'
                                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                                    }`}
                                  >
                                    <span className="text-xs shrink-0">{d.icon}</span>
                                    <span className="truncate">{d.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Pyramid Climb Radar (Ascent Visualization) */}
                            <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
                              <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-2">
                                <span>SCALATA DELLA PIRAMIDE DELLA VITTORIA:</span>
                                <span className="text-emerald-400 font-bold">4 Round al Trionfo</span>
                              </div>

                              <div className="grid grid-cols-4 gap-1.5 text-center font-mono-code">
                                {[
                                  { lvl: 1, label: 'Base' },
                                  { lvl: 2, label: 'Gradino 2' },
                                  { lvl: 3, label: 'Gradino 3' },
                                  { lvl: 4, label: '👑 Vetta K.O.' }
                                ].map((step) => {
                                  const isUserHere = neuroniState.pyramidLevel === step.lvl;
                                  const isPast = neuroniState.pyramidLevel > step.lvl;
                                  return (
                                    <div
                                      key={step.lvl}
                                      className={`p-1.5 rounded-lg border transition-all ${
                                        isUserHere
                                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-xs'
                                          : isPast
                                          ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-400'
                                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                                      }`}
                                    >
                                      <div className="text-[10px]">{step.label}</div>
                                      <div className="text-[11px] mt-0.5">
                                        {isUserHere ? `${selectedAvatar.emoji} Tu` : isPast ? '✓ Superato' : '—'}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Tab Content 2: CAMERINO AVATAR */}
                        {activeTabNeuroni === 'camerino' && (
                          <div className="space-y-3">
                            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                              <div className="font-mono-code text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
                                <span>CAMERINO AVATAR • PERSONALIZZA IL TUO PERSONAGGIO</span>
                                <span className="text-[10px] text-slate-400">Pre-Game Lobby</span>
                              </div>
                              <p className="text-[11px] text-slate-300 mb-3">
                                Seleziona l'alter ego con cui scendere nell'arena e sfidare i tuoi avversari sui minigiochi e sulla piramide:
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {neuroniAvatars.map((av) => (
                                  <button
                                    key={av.id}
                                    type="button"
                                    onClick={() => setSelectedAvatar(av)}
                                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                      selectedAvatar.id === av.id
                                        ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                                    }`}
                                  >
                                    <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800">
                                      {av.emoji}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-mono-code text-xs font-bold flex items-center justify-between">
                                        <span className="truncate">{av.name}</span>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800">
                                          {av.role}
                                        </span>
                                      </div>
                                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                        {av.desc}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setActiveTabNeuroni('match')}
                              className="w-full font-mono-code text-xs font-semibold py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer text-center"
                            >
                              ✓ Conferma Avatar e Torna all'Arena Quiz
                            </button>
                          </div>
                        )}

                        {/* Tab Content 3: ARMERIA DEBUFF */}
                        {activeTabNeuroni === 'debuffs' && (
                          <div className="space-y-3">
                            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                              <div className="font-mono-code text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
                                <span>ARMERIA DEBUFF TATTICI • SABOTA GLI AVVERSARI</span>
                                <span className="text-[10px] text-slate-400">Strategia Turni</span>
                              </div>
                              <p className="text-[11px] text-slate-300 mb-3">
                                Prima delle domande lancia un debuff per ostacolare la scalata del tuo rivale e rubargli il tempo di risposta:
                              </p>

                              <div className="space-y-2">
                                {neuroniDebuffs.map((deb) => (
                                  <div
                                    key={deb.id}
                                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <span className="text-xl p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                                        {deb.icon}
                                      </span>
                                      <div className="min-w-0">
                                        <div className="font-mono-code text-xs font-bold text-white flex items-center gap-1.5">
                                          <span>{deb.name}</span>
                                          <span className="text-[9px] text-amber-400 font-normal">
                                            (Target: {deb.target})
                                          </span>
                                        </div>
                                        <div className="text-[10px] text-slate-400 truncate">
                                          {deb.desc}
                                        </div>
                                      </div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        applyDebuffToOpponent(deb);
                                        setActiveTabNeuroni('match');
                                      }}
                                      className="font-mono-code text-[11px] font-bold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shrink-0 cursor-pointer"
                                    >
                                      Lancia!
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setActiveTabNeuroni('match')}
                              className="w-full font-mono-code text-xs font-semibold py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer text-center"
                            >
                              ← Torna all'Arena Quiz
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Live React State Inspector & Footer */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-semibold">{neuroniState.lastStatus}</span>
                          <span>•</span>
                          <span className="text-emerald-400">oxlint: clean</span>
                        </div>
                        <button
                          type="button"
                          onClick={resetNeuroniGame}
                          className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          Reset Match
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* BENTO ROW 3: SYSTEMS & ACADEMIC ENGINEERING (2 ASYMMETRIC CARDS SIDE BY SIDE) */}
            {showAcademic && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                {/* LEFT CARD (7 cols): LSO FORZA 4 — CONCURRENT C SERVER & INTERACTIVE TCP TERMINAL */}
                <article
                  className={`lg:col-span-7 rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800'
                      : 'bg-white border-stone-300/90 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                          }`}
                        >
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-extrabold tracking-tight ${
                              isDark ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            LSO Forza 4 — Server C Concorrente
                          </h3>
                          <p className="font-mono-code text-[11px] text-indigo-500">
                            Sistemi Operativi (UniNa) • TCP Sockets, POSIX Threads & Docker
                          </p>
                        </div>
                      </div>

                      <span
                        className={`font-mono-code text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                          isDark
                            ? 'bg-indigo-950/70 text-indigo-300 border-indigo-700/70'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        C99 POSIX • Multi-Client
                      </span>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-zinc-600'
                      }`}
                    >
                      Architettura client-server multi-giocatore in C per Linux. Il server gestisce più partite simultanee tramite socket TCP e thread POSIX (
                      <code className="font-mono-code text-[11px]">pthread</code>), sincronizzando l’accesso alle stanze con mutex per prevenire race condition, con interfaccia ANSI e deploy Docker Compose.
                    </p>

                    {/* INTERACTIVE C POSIX TERMINAL & CONNECT-4 BOARD */}
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-4 text-slate-100 font-mono-code text-xs">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-[11px] text-slate-400">
                          ./forza4_server --port 8080 (Clicca una colonna per inviare pacchetto TCP)
                        </span>
                        <span className="text-[10px] text-emerald-400">
                          Turn: Player {forzaTurn}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Interactive Mini ANSI Board */}
                        <div className="sm:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center">
                          <div className="grid grid-cols-7 gap-1 mb-1.5">
                            {[0, 1, 2, 3, 4, 5, 6].map((col) => (
                              <button
                                key={col}
                                type="button"
                                onClick={() => dropForzaDisc(col)}
                                className="text-[10px] py-0.5 rounded bg-slate-800 hover:bg-indigo-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                                title={`Invia mossa TCP su colonna ${col + 1}`}
                              >
                                ↓{col + 1}
                              </button>
                            ))}
                          </div>
                          <div className="space-y-1">
                            {forzaBoard.map((row, rIdx) => (
                              <div key={rIdx} className="grid grid-cols-7 gap-1 text-xs">
                                {row.map((cell, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className={`py-0.5 rounded font-bold ${
                                      cell === 'X'
                                        ? 'text-rose-400 bg-rose-500/10'
                                        : cell === 'O'
                                        ? 'text-amber-300 bg-amber-500/10'
                                        : 'text-slate-600'
                                    }`}
                                  >
                                    {cell}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Live POSIX Mutex & Socket Log */}
                        <div className="sm:col-span-6 space-y-1.5 text-[11px] text-slate-300">
                          <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">
                            POSIX Thread & Socket Log:
                          </div>
                          {forzaLogs.map((l, i) => (
                            <div
                              key={i}
                              className="bg-slate-950/90 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed text-emerald-300"
                            >
                              {l}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {['C (POSIX)', 'TCP Sockets', 'Multi-Threading', 'Docker Compose', 'Makefile'].map(
                        (tag) => (
                          <span
                            key={tag}
                            className={`font-mono-code text-[10px] px-2 py-0.5 rounded border ${
                              isDark
                                ? 'bg-slate-800 text-slate-300 border-slate-700'
                                : 'bg-stone-100 text-zinc-700 border-stone-200'
                            }`}
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    <a
                      href="https://github.com/AndrewJar09-star/progetto-Lso-Forza-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repo GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>

                {/* RIGHT CARD (5 cols): QUICKSKETCH — FULL-STACK TS/NODE & E2E RUNNER */}
                <article
                  className={`lg:col-span-5 rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800'
                      : 'bg-white border-stone-300/90 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-50 text-sky-600'
                          }`}
                        >
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h3
                            className={`text-xl font-extrabold tracking-tight ${
                              isDark ? 'text-white' : 'text-zinc-900'
                            }`}
                          >
                            QuickSketch
                          </h3>
                          <p className="font-mono-code text-[11px] text-sky-500">
                            Tecnologie Web • Full-Stack & E2E
                          </p>
                        </div>
                      </div>

                      <span
                        className={`font-mono-code text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                          isDark
                            ? 'bg-sky-950/70 text-sky-300 border-sky-700/70'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}
                      >
                        TypeScript + E2E
                      </span>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-zinc-600'
                      }`}
                    >
                      Web application full-stack strutturata in 3 moduli disaccoppiati (
                      <code className="font-mono-code text-[11px]">frontend</code>,{' '}
                      <code className="font-mono-code text-[11px]">backend</code> REST in Node.js/TypeScript e suite automatizzata{' '}
                      <code className="font-mono-code text-[11px]">e2e</code>) per validare ogni flusso utente.
                    </p>

                    {/* Interactive E2E Test Suite Widget */}
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 p-4 text-slate-100 font-mono-code text-xs space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] text-slate-400">E2E & API Verification Suite</span>
                        <button
                          type="button"
                          onClick={runQuicksketchTests}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          <span>{isRunningE2e ? 'Running...' : 'Riesegui Test'}</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {e2eStatus.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-2 bg-slate-950/90 border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-[10px]"
                          >
                            <span className="text-emerald-400 truncate">✓ {spec.name}</span>
                            <span className="text-slate-400 shrink-0">{spec.ms}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {['TypeScript', 'Node.js', 'REST API', 'E2E Testing'].map((tag) => (
                        <span
                          key={tag}
                          className={`font-mono-code text-[10px] px-2 py-0.5 rounded border ${
                            isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-stone-100 text-zinc-700 border-stone-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="https://github.com/AndrewJar09-star/progetto-tech-web-quicksketch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        isDark ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-800'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repo GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* SECTION: TECH STACK & TOOLKIT */}
        <section
          id="stack"
          className={`py-16 sm:py-20 scroll-mt-16 border-t ${
            isDark ? 'border-slate-800/90' : 'border-stone-200/90'
          }`}
        >
          <div className="mb-10">
            <div
              className={`font-mono-code text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-2 ${
                isDark ? 'text-teal-400' : 'text-[#0F766E]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>COMPETENZE & TOOLKIT</span>
            </div>
            <h2
              className={`editorial-heading text-3xl sm:text-4xl font-extrabold ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Stack Tecnologico
            </h2>
            <p className={`text-base mt-1.5 ${isDark ? 'text-slate-400' : 'text-zinc-600'}`}>
              Strumenti utilizzati nei miei progetti personali e nel percorso accademico alla Federico II.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                    isDark
                      ? 'bg-slate-900/75 border-slate-800 hover:border-teal-500/40'
                      : 'bg-white border-stone-200/90 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${
                        isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-[#0F766E]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className={`text-lg font-bold tracking-tight mb-2 ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      {cat.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-[13px] leading-relaxed mb-6 ${
                        isDark ? 'text-slate-400' : 'text-zinc-600'
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className={`font-mono-code text-[11px] font-medium px-2.5 py-1 rounded-md border ${
                          isDark
                            ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                            : 'bg-stone-100 text-zinc-800 border-stone-200/80'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: PROFILO & METODO OPERATIVO */}
        <section
          id="metodo"
          className={`py-16 sm:py-20 scroll-mt-16 border-t ${
            isDark ? 'border-slate-800/90' : 'border-stone-200/90'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div
                className={`font-mono-code text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${
                  isDark ? 'text-teal-400' : 'text-[#0F766E]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>PROFILO & METODO INGEGNERISTICO</span>
              </div>

              <h2
                className={`editorial-heading text-3xl sm:text-4xl font-extrabold leading-[1.15] ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Iniziativa personale, basi solide e codice pensato per durare.
              </h2>

              <p
                className={`text-sm sm:text-[15px] leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                Accanto agli esami di Informatica all’
                <strong className={isDark ? 'text-white' : 'text-zinc-900'}>
                  Università di Napoli Federico II
                </strong>
                , amo aprire l’editor e costruire prodotti miei da zero: che si tratti di collegare un assistente vocale Python a Google Calendar (
                <em>Calendario Jarvis / STEWARD OS</em>) o sperimentare nuove meccaniche interattive in React e Vite (
                <em>Neuroni K.O.</em>).
              </p>

              <p
                className={`text-sm sm:text-[15px] leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-zinc-600'
                }`}
              >
                Questo doppio binario — rigore universitario sui sistemi operativi e libertà creativa sui progetti personali — mi permette di affrontare problemi tecnici con pragmatismo, curando sia l’esperienza utente sia la pulizia del backend.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Progetti Personali Continui</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>Testing E2E & Linting Rigoroso</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                className={`rounded-3xl p-6 sm:p-8 border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-stone-200/90 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-stone-200/70 dark:border-slate-800">
                  <div>
                    <div className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-teal-500">
                      WORKFLOW & PRINCIPI
                    </div>
                    <h3
                      className={`text-xl font-bold mt-0.5 ${
                        isDark ? 'text-white' : 'text-zinc-900'
                      }`}
                    >
                      Come lavoro sul codice
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center">
                    <Workflow className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      num: '01',
                      title: 'Dal Prototipo Personale al Deploy Reale',
                      desc: 'Non lascio le idee solo in locale: configuro pipeline su Render, container Docker Compose e database persistenti affinché ogni progetto sia realmente utilizzabile.'
                    },
                    {
                      num: '02',
                      title: 'Comprensione Profonda dello Stack (C → React)',
                      desc: 'Lavorare con socket TCP e mutex POSIX in C mi ha dato una consapevolezza della memoria e della concorrenza che applico anche quando scrivo API Node.js o interfacce React.'
                    },
                    {
                      num: '03',
                      title: 'Qualità Automatica: E2E Testing & Oxlint',
                      desc: 'Integro suite di test End-to-End (QuickSketch) e linter statici di nuova generazione (Oxlint su Neuroni K.O.) per mantenere il codice leggibile e privo di regressioni.'
                    }
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-4">
                      <span
                        className={`font-mono-code text-xs font-bold px-2.5 py-1.5 rounded-lg border shrink-0 ${
                          isDark
                            ? 'bg-slate-800 text-teal-300 border-slate-700'
                            : 'bg-stone-100 text-[#0F766E] border-stone-200'
                        }`}
                      >
                        {item.num}
                      </span>
                      <div>
                        <h4
                          className={`text-sm font-bold ${
                            isDark ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={`text-xs sm:text-[13px] leading-relaxed mt-1 ${
                            isDark ? 'text-slate-400' : 'text-zinc-600'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CONTATTI & COLLABORAZIONE */}
        <section id="contatti" className="py-12 sm:py-16 scroll-mt-16">
          <div
            className={`rounded-3xl p-7 sm:p-10 lg:p-12 border ${
              isDark
                ? 'bg-slate-900/90 border-teal-500/35 shadow-xl'
                : 'bg-white border-stone-300/90 shadow-sm'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono-code inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Aperto a Nuove Opportunità
                </span>

                <h2
                  className={`editorial-heading text-2xl sm:text-3xl font-extrabold leading-tight ${
                    isDark ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  Iniziamo a collaborare: Tirocinio curriculare, progetti & ruoli Junior
                </h2>

                <p
                  className={`text-sm sm:text-[15px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-zinc-600'
                  }`}
                >
                  Cerco un ambiente stimolante su Napoli o in modalità Remote / Ibrida dove portare entusiasmo, solide basi ingegneristiche e voglia di costruire software di qualità.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${emailAddress}`}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-xs ${
                      isDark
                        ? 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                        : 'bg-[#0F766E] text-white hover:bg-teal-800'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Invia una Mail Diretta</span>
                  </a>

                  <a
                    href="https://github.com/AndrewJar09-star"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                        : 'bg-stone-100 border-stone-200 text-zinc-800 hover:bg-stone-200/80'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    <span>Esplora GitHub</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-mono-code font-medium border transition-all cursor-pointer ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-teal-500'
                        : 'bg-white border-stone-200 text-zinc-700 hover:bg-stone-50'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copiata!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copia Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div
                  className={`rounded-2xl p-6 border space-y-4 ${
                    isDark
                      ? 'bg-slate-950/80 border-slate-800'
                      : 'bg-stone-100/80 border-stone-200/90'
                  }`}
                >
                  <div className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    SEDE & CONTATTI DIRETTI
                  </div>

                  <div className="flex items-center gap-2 text-lg font-bold">
                    <MapPin className="w-5 h-5 text-teal-500" />
                    <span>Napoli / Remote</span>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-stone-200/80 dark:border-slate-800 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>Status:</span>
                      <span className="font-semibold">Laureando Triennale Informatica</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>Ateneo:</span>
                      <span className="font-semibold">Federico II Napoli</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>GitHub:</span>
                      <a
                        href="https://github.com/AndrewJar09-star"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-code text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        github.com/AndrewJar09-star
                      </a>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className={isDark ? 'text-slate-400' : 'text-zinc-500'}>Email:</span>
                      {isEditingEmail ? (
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          onBlur={() => setIsEditingEmail(false)}
                          onKeyDown={(e) => e.key === 'Enter' && setIsEditingEmail(false)}
                          autoFocus
                          className="font-mono-code text-xs px-2 py-0.5 rounded bg-white text-zinc-900 border border-teal-500 w-full text-right"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditingEmail(true)}
                          title="Clicca per modificare l'email"
                          className="font-mono-code text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline truncate text-right cursor-pointer"
                        >
                          {emailAddress}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t mt-10 py-8 ${
          isDark ? 'border-slate-800/90 bg-[#0B111E]' : 'border-stone-200/80 bg-[#F7F6F2]'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className={isDark ? 'text-slate-400' : 'text-zinc-600'}>
              © 2026 Andrea Barattolo
            </span>
            <span>•</span>
            <span className="font-mono-code text-teal-600 dark:text-teal-400">
              Built with React & Vite
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#progetti" className="hover:text-teal-500 transition-colors">
              Progetti Personali
            </a>
            <a href="#stack" className="hover:text-teal-500 transition-colors">
              Stack
            </a>
            <a href="#metodo" className="hover:text-teal-500 transition-colors">
              Metodo
            </a>
            <a href="#contatti" className="hover:text-teal-500 transition-colors">
              Contatti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
