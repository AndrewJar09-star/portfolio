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
  const [emailAddress, setEmailAddress] = useState('barattoloandrea7@gmail.com');
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

  // --- INTERACTIVE WIDGET 2: NEURONI K.O. (REAL REPO ENGINE & COMIC NEO-BRUTALIST MOBILE UI) ---
  const neuroniAvatars = [
    {
      id: 'ragnatela',
      name: "L'Uomo Ragnatela",
      emoji: '🕷️',
      role: 'Parodia Eroe',
      themeColor: '#FF2A85',
      desc: 'Con grandi neuroni arrivano grandi figuracce!'
    },
    {
      id: 'pipistrello',
      name: 'Il Cavaliere Pipistrello',
      emoji: '🦇',
      role: 'Parodia Eroe',
      themeColor: '#00E5FF',
      desc: 'Io sono la notte... ma sbaglio sempre le date storiche!'
    },
    {
      id: 'imperatore',
      name: 'Il Piccolo Imperatore',
      emoji: '👑',
      role: 'Parodia Storica',
      themeColor: '#FFD600',
      desc: 'Pronto a conquistare la vetta o finisci in esilio?'
    },
    {
      id: 'idraulico',
      name: 'Idraulico Baffuto',
      emoji: '🍄',
      role: 'Parodia Gaming',
      themeColor: '#00E5FF',
      desc: 'Mamma mia! Qui non bastano i funghetti per vincere!'
    },
    {
      id: 'saiyan',
      name: 'Guerriero Saiyan',
      emoji: '🔥',
      role: 'Parodia Anime',
      themeColor: '#FF8800',
      desc: 'Il tuo livello di neuroni è sopra i 9000?!'
    },
    {
      id: 'mela',
      name: 'La Mela Sburritos',
      emoji: '🍎',
      role: 'Meme Cult',
      themeColor: '#D90429',
      desc: 'Con quello sguardo serio e le mani incrociate... non perdona nessuno!'
    },
    {
      id: 'genio',
      name: 'Genio Ribelle',
      emoji: '🧪',
      role: 'Parodia Scienziato',
      themeColor: '#00FF87',
      desc: 'Tutto è relativo, tranne le torte in faccia che prenderai!'
    },
    {
      id: 'vedova',
      name: 'La Vedova Letale',
      emoji: '🕸️',
      role: 'Parodia Marvel',
      themeColor: '#FF2A85',
      desc: 'Attenzione! La spia più letale del fumetto è pronta a sabotarvi tutti!'
    }
  ];

  const neuroniDebuffs = [
    {
      id: 'cake',
      name: 'Torta in Faccia',
      subtitle: 'Vernice & Panna',
      icon: '🥧',
      soundText: 'SPLAT!',
      color: '#FF2A85',
      desc: 'Copre i bottoni con panna e vernice densa da pulire col dito!',
      target: 'Brainiac99'
    },
    {
      id: 'cage',
      name: 'Gabbia Cartoon',
      subtitle: 'Assi di Legno & Catene',
      icon: '🪵',
      soundText: 'CRACK!',
      color: '#FF8800',
      desc: 'Inchioda i bottoni con assi di legno: servono 3 martellate per spaccarle!',
      target: 'Quizzo'
    },
    {
      id: 'earthquake',
      name: 'Bottoni Impazziti',
      subtitle: 'Terremoto Incontenibile',
      icon: '🌀',
      soundText: 'KABOOM!',
      color: '#00E5FF',
      desc: 'I bottoni A/B/C/D non stanno fermi e si scambiano ogni 1.2 secondi!',
      target: 'Cervellone'
    },
    {
      id: 'upside_down',
      name: 'Sottosopra & Pop-up',
      subtitle: 'Testo 180° + Spam',
      icon: '🙃',
      soundText: 'TILT!',
      color: '#8A2BE2',
      desc: 'Capovolge il testo di 180° e scatena pop-up demenziali da chiudere!',
      target: 'Brainiac99'
    }
  ];

  const neuroniQuestions = [
    {
      id: 1,
      category: 'Trash, TV & Nostalgia',
      emoji: '📺',
      themeHex: '#FFD600',
      badgeColor: 'text-amber-300 bg-amber-950/80 border-amber-700',
      prompt: 'A Bim Bum Bam, di che colore era la pelliccia del celebre pupazzo Uan?',
      options: ['Gialla', 'Rosa', 'Azzurra', 'Verde'],
      correct: 1,
      funFact: 'cult_italia.json #1'
    },
    {
      id: 102,
      category: 'Gaming & Nerd',
      emoji: '🎮',
      themeHex: '#00E5FF',
      badgeColor: 'text-cyan-300 bg-cyan-950/80 border-cyan-700',
      prompt: 'Quale celebre videogioco di Naughty Dog ha come protagonista un marsupiale arancione amante delle mele Wumpa?',
      options: ['Spyro the Dragon', 'Crash Bandicoot', 'Jak and Daxter', 'Ratchet & Clank'],
      correct: 1,
      funFact: 'gaming_nerd.json #102'
    },
    {
      id: 51,
      category: 'Cinema & Serie TV',
      emoji: '🎬',
      themeHex: '#FF2A85',
      badgeColor: 'text-pink-300 bg-pink-950/80 border-pink-700',
      prompt: "In 'Tre uomini e una gamba', di quale celebre scultore era l'opera d'arte lignea a forma di gamba?",
      options: ['Garbagnati', 'Michelangelo', 'Ringhio', 'Canova'],
      correct: 0,
      funFact: 'cinema_serie.json #51'
    },
    {
      id: 153,
      category: 'Assurdo ma Vero!',
      emoji: '🤯',
      themeHex: '#8A2BE2',
      badgeColor: 'text-purple-300 bg-purple-950/80 border-purple-700',
      prompt: 'Di quale colore bizzarro è il latte prodotto da una femmina di ippopotamo?',
      options: ['Bianco candido', 'Rosa brillante', 'Giallo paglierino', 'Verde acqua'],
      correct: 1,
      funFact: 'assurdo_vero.json #153'
    },
    {
      id: 201,
      category: 'Cervelloni & Forchette',
      emoji: '🍕',
      themeHex: '#00FF87',
      badgeColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-700',
      prompt: 'Quale ingrediente è severamente vietato nella vera ricetta tradizionale della Carbonara romana?',
      options: ['Panna da cucina', 'Guanciale', 'Pecorino Romano', 'Pepe nero macinato'],
      correct: 0,
      funFact: 'cibo_scienza.json #201'
    }
  ];

  const [neuroniViewMode, setNeuroniViewMode] = useState('ui'); // 'terminal' | 'ui'
  const [selectedAvatar, setSelectedAvatar] = useState(neuroniAvatars[0]);
  const [selectedDebuff, setSelectedDebuff] = useState(neuroniDebuffs[0]);
  const [activeTabNeuroni, setActiveTabNeuroni] = useState('match'); // 'match' | 'camerino' | 'debuffs'
  const [neuroniUiScreen, setNeuroniUiScreen] = useState('quiz'); // 'camerino' | 'quiz' | 'tower'
  const [neuroniUiSabotage, setNeuroniUiSabotage] = useState('cake'); // 'none' | 'cake' | 'cage' | 'upside_down' | 'earthquake'
  const [neuroniCakeCleaned, setNeuroniCakeCleaned] = useState(false);
  const [neuroniCageHitsLeft, setNeuroniCageHitsLeft] = useState(3);
  const [neuroniPopupOpen, setNeuroniPopupOpen] = useState(false);
  const [neuroniShuffledOrder, setNeuroniShuffledOrder] = useState([0, 1, 2, 3]);

  const [neuroniState, setNeuroniState] = useState({
    qIndex: 0,
    score: 14,
    streak: 2,
    floorLevel: 11, // P1 to P15 (Grattacielo K.O.)
    fsmState: 'QUESTION',
    lastStatus: 'STATE: QUESTION (15s Timer • SPEED_POINTS [5,4,3,2])',
    activeDebuffSent: 'Torta in Faccia (SPLAT!) → Brainiac99',
    opponents: [
      { id: 'bot-1', name: 'Brainiac99', floor: 10, avatar: '🦇', debuffed: true, accuracy: '35%' },
      { id: 'bot-2', name: 'Quizzo', floor: 9, avatar: '👑', debuffed: false, accuracy: '65%' },
      { id: 'bot-3', name: 'Cervellone', floor: 7, avatar: '🍄', debuffed: false, accuracy: '65%' }
    ],
    feedback: null,
    hmrMs: 12
  });

  const triggerNeuroniUiSabotage = (sabId) => {
    setNeuroniUiSabotage(sabId);
    if (sabId === 'cake') {
      setNeuroniCakeCleaned(false);
      setNeuroniPopupOpen(false);
    } else if (sabId === 'cage') {
      setNeuroniCageHitsLeft(3);
      setNeuroniPopupOpen(false);
    } else if (sabId === 'upside_down') {
      setNeuroniPopupOpen(true);
    } else if (sabId === 'earthquake') {
      setNeuroniPopupOpen(false);
      setNeuroniShuffledOrder((prev) => [...prev].reverse());
    } else {
      setNeuroniPopupOpen(false);
    }
  };

  const handleNeuroniAnswer = (idx) => {
    // Check active interactive obstacles in UI mode
    if (neuroniViewMode === 'ui') {
      if (neuroniUiSabotage === 'cake' && !neuroniCakeCleaned) {
        setNeuroniCakeCleaned(true);
        return;
      }
      if (neuroniUiSabotage === 'cage' && neuroniCageHitsLeft > 0) {
        setNeuroniCageHitsLeft((prev) => Math.max(0, prev - 1));
        return;
      }
      if (neuroniUiSabotage === 'upside_down' && neuroniPopupOpen) {
        return;
      }
    }

    const currentQ = neuroniQuestions[neuroniState.qIndex];
    const isRight = idx === currentQ.correct;

    const gainedFloors = isRight ? 2 : 0;
    const nextFloor = Math.min(15, neuroniState.floorLevel + gainedFloors);
    const isVictory = nextFloor === 15;

    if (neuroniUiSabotage === 'earthquake') {
      setNeuroniShuffledOrder([2, 0, 3, 1]);
    }

    setNeuroniState((prev) => ({
      ...prev,
      qIndex: (prev.qIndex + 1) % neuroniQuestions.length,
      score: isRight ? prev.score + 5 : prev.score,
      streak: isRight ? prev.streak + 1 : 0,
      floorLevel: nextFloor,
      fsmState: isVictory ? 'CLIMB_VICTORY' : 'RESULT -> QUESTION',
      lastStatus: isRight
        ? isVictory
          ? '🏆 P15 TETTO K.O. RAGGIUNTO! CAMPIONE DEL GRATTACIELO!'
          : `✓ CORRETTO! +5 PT VELOCITÀ • SALI AL PIANO P${nextFloor}/15`
        : '✗ ERRATO! 0 PT • RESTI AL PIANO P' + prev.floorLevel,
      feedback: isRight ? 'CORRETTO (+5 PT • +2 PIANI)' : 'ERRATO (0 PT)',
      opponents: prev.opponents.map((opp) => ({
        ...opp,
        floor: Math.min(14, opp.floor + (Math.random() > 0.5 ? 1 : 0))
      })),
      hmrMs: Math.floor(Math.random() * 6) + 9
    }));
  };

  const applyDebuffToOpponent = (debuff) => {
    setSelectedDebuff(debuff);
    setNeuroniState((prev) => ({
      ...prev,
      fsmState: 'SABOTAGE_IMPACT',
      lastStatus: `${debuff.soundText} Colpo Basso "${debuff.name}" su ${debuff.target} (Accuracy Bot: 65% → 35%)`,
      activeDebuffSent: `${debuff.icon} ${debuff.name} (${debuff.target})`,
      opponents: prev.opponents.map((opp) =>
        opp.name === debuff.target
          ? { ...opp, debuffed: true, accuracy: '35%' }
          : { ...opp, debuffed: false, accuracy: '65%' }
      )
    }));
  };

  const resetNeuroniGame = () => {
    setNeuroniCakeCleaned(false);
    setNeuroniCageHitsLeft(3);
    setNeuroniPopupOpen(false);
    setNeuroniShuffledOrder([0, 1, 2, 3]);
    setNeuroniState({
      qIndex: 0,
      score: 14,
      streak: 2,
      floorLevel: 11,
      fsmState: 'QUESTION',
      lastStatus: 'STATE: QUESTION (15s Timer • SPEED_POINTS [5,4,3,2])',
      activeDebuffSent: 'Torta in Faccia (SPLAT!) → Brainiac99',
      opponents: [
        { id: 'bot-1', name: 'Brainiac99', floor: 10, avatar: '🦇', debuffed: true, accuracy: '35%' },
        { id: 'bot-2', name: 'Quizzo', floor: 9, avatar: '👑', debuffed: false, accuracy: '65%' },
        { id: 'bot-3', name: 'Cervellone', floor: 7, avatar: '🍄', debuffed: false, accuracy: '65%' }
      ],
      feedback: null,
      hmrMs: 11
    });
  };

  // --- INTERACTIVE WIDGET 3: LSO FORZA 4 C99 POSIX TCP SERVER & ANSI UI ---
  const createEmptyForzaBoard = () =>
    Array.from({ length: 6 }, () => Array(7).fill('.'));

  const [forzaBoard, setForzaBoard] = useState(createEmptyForzaBoard);
  const [forzaLogs, setForzaLogs] = useState([
    '[server.c] socket(AF_INET, SOCK_STREAM) bound on :8888 • SO_KEEPALIVE active',
    '[protocol.h] Fixed binary Packet (sizeof=2048B) • Griglia 6x7 vuota inizializzata',
    '[pthread] client_handler(fd=4, "Andrea") & (fd=5, "Marco") -> MATCH #1 IN_PROGRESS',
    '[sync] lock(server_mutex) -> lock(match[1].mutex) • In attesa della prima mossa (Host 🔴)'
  ]);
  const [forzaTurn, setForzaTurn] = useState('X');
  const [forzaWinner, setForzaWinner] = useState(null);
  const [forzaTab, setForzaTab] = useState('arch'); // 'arch' | 'specs'
  const [forzaView, setForzaView] = useState('cli'); // 'cli' | 'ui'
  const [forzaLobbyMatches, setForzaLobbyMatches] = useState([
    { id: 1, host: 'Andrea', guest: 'Marco', state: 'IN CORSO', color: 'text-rose-400' },
    { id: 2, host: 'Luigi_99', guest: '—', state: 'IN ATTESA', color: 'text-emerald-400' },
    { id: 3, host: 'Sara_Dev', guest: ' Guest_42', state: 'RICHIESTA IN CORSO', color: 'text-amber-300' }
  ]);
  const [forzaPromptHandled, setForzaPromptHandled] = useState(false);

  const checkForzaWin = (b, r, c, sym) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];
    for (const [dr, dc] of dirs) {
      let count = 1;
      for (let step = 1; step < 4; step++) {
        const nr = r + dr * step;
        const nc = c + dc * step;
        if (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && b[nr][nc] === sym) count++;
        else break;
      }
      for (let step = 1; step < 4; step++) {
        const nr = r - dr * step;
        const nc = c - dc * step;
        if (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && b[nr][nc] === sym) count++;
        else break;
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const dropForzaDisc = (colIdx) => {
    // Se la partita è terminata (vittoria, pareggio o resa), blocca l'inserimento di nuovi gettoni
    if (forzaWinner) {
      setForzaLogs((prev) => [
        ...prev.slice(-3),
        `[game.c] Partita conclusa! Clicca "Nuova Partita ( da 0 )" per svuotare la griglia 6x7.`
      ]);
      return;
    }
    const nextBoard = forzaBoard.map((r) => [...r]);
    let placedRow = -1;
    for (let r = nextBoard.length - 1; r >= 0; r--) {
      if (nextBoard[r][colIdx] === '.') {
        nextBoard[r][colIdx] = forzaTurn;
        placedRow = r;
        break;
      }
    }
    if (placedRow !== -1) {
      const won = checkForzaWin(nextBoard, placedRow, colIdx, forzaTurn);
      const isDraw = !won && nextBoard.every((row) => row.every((cell) => cell !== '.'));
      const nextPlayer = forzaTurn === 'X' ? 'O' : 'X';
      setForzaBoard(nextBoard);
      if (won) {
        setForzaWinner(forzaTurn);
        const winnerNick = forzaTurn === 'X' ? 'Andrea (Host 🔴)' : 'Marco (Guest 🟡)';
        setForzaLogs((prev) => [
          ...prev.slice(-3),
          `[game.c] check_win O(1) -> 4 IN FILA! Vincitore: ${winnerNick} (Griglia bloccata)`,
          `[server.c] send_packet(MSG_GAME_OVER) • Ownership Transfer -> ${forzaTurn === 'O' ? 'Marco diventa nuovo Host!' : 'Andrea mantiene Host'}`
        ]);
      } else if (isDraw) {
        setForzaWinner('DRAW');
        setForzaLogs((prev) => [
          ...prev.slice(-3),
          `[game.c] Griglia 6x7 completata (42/42): PAREGGIO! Clicca Nuova Partita per ripartire da 0.`
        ]);
      } else {
        setForzaTurn(nextPlayer);
        setForzaLogs((prev) => [
          ...prev.slice(-3),
          `[recv_packet fd=${forzaTurn === 'X' ? 4 : 5}] MSG_MOVE_REQ (col=${colIdx + 1}) -> gravità row=${placedRow + 1} (${forzaTurn === 'X' ? '🔴' : '🟡'})`,
          `[match->mutex] MSG_GRID_UPDATE broadcast (2048B) -> Turno: ${nextPlayer === 'X' ? 'Host 🔴' : 'Guest 🟡'}`
        ]);
      }
    } else {
      setForzaLogs((prev) => [
        ...prev.slice(-3),
        `[game.c] MSG_MOVE_RESP (status=INVALID): Colonna ${colIdx + 1} piena! Scegli un'altra colonna.`
      ]);
    }
  };

  const surrenderForzaMatch = () => {
    if (forzaWinner) return;
    const surrendering = forzaTurn === 'X' ? 'Andrea (Host)' : 'Marco (Guest)';
    const winner = forzaTurn === 'X' ? 'Marco (Guest 🟡)' : 'Andrea (Host 🔴)';
    setForzaWinner('SURRENDER');
    setForzaLogs((prev) => [
      ...prev.slice(-3),
      `[client.c] Input "00" rilevato da select(STDIN_FILENO) -> send(MSG_LEAVE_MATCH)`,
      `[server.c] Resa immediata di ${surrendering}! Vittoria a ${winner} • Griglia bloccata`
    ]);
  };

  const resetForzaMatch = () => {
    setForzaBoard(createEmptyForzaBoard());
    setForzaTurn('X');
    setForzaWinner(null);
    setForzaLogs((prev) => [
      ...prev.slice(-3),
      `[server.c] MSG_POST_GAME_CHOICE -> Griglia 6x7 azzerata (0 gettoni) • Nuova Partita avviata!`
    ]);
  };

  const handleForzaHostDecision = (accept) => {
    setForzaPromptHandled(true);
    setForzaLobbyMatches((prev) =>
      prev.map((m) =>
        m.id === 3
          ? {
              ...m,
              guest: accept ? 'Guest_42' : '—',
              state: accept ? 'IN CORSO' : 'IN ATTESA',
              color: accept ? 'text-rose-400' : 'text-emerald-400'
            }
          : m
      )
    );
    setForzaLogs((prev) => [
      ...prev.slice(-3),
      accept
        ? `[server.c] MSG_JOIN_RESP (1=ACCETTA) -> Partita #3 avviata! Auto-reject altre richieste pendenti.`
        : `[server.c] MSG_JOIN_RESP (0=RIFIUTA) -> Guest_42 riportato in lobby • Partita #3 torna IN ATTESA.`
    ]);
  };

  // --- INTERACTIVE WIDGET 4: QUICKSKETCH FULL-STACK & 14 PLAYWRIGHT E2E SUITE ---
  const initialE2eSpecs = [
    { id: 1, name: '1. Home Page, Navbar & Hero "Disegna, Indovina, Sfida il Mondo"', ms: '42ms', tag: 'UI/SPA' },
    { id: 2, name: '2. Auth Validation: blocco password non coincidenti (#register-error)', ms: '38ms', tag: 'Auth' },
    { id: 3, name: '3. Registrazione nuovo utente (JWT + bcrypt + SQLite users)', ms: '84ms', tag: 'Auth' },
    { id: 4, name: '4. Ciclo completo Login / Logout e persistenza sessione', ms: '65ms', tag: 'Session' },
    { id: 5, name: '5. Fetch 5 parole ibride: Wikipedia IT MediaWiki API + Nerd Dict', ms: '118ms', tag: 'API' },
    { id: 6, name: '6. Disegno su HTML5 Canvas (SignaturePad 60s) & POST /api/sketches', ms: '145ms', tag: 'Canvas' },
    { id: 7, name: '7. Galleria pubblica con paginazione e stato guest non autenticato', ms: '51ms', tag: 'Gallery' },
    { id: 8, name: '8. Tentativo errato incrementa contatore (9/10 vite ♥ HeartLives)', ms: '73ms', tag: 'Game' },
    { id: 9, name: '9. Parola indovinata svela soluzione ("Hai indovinato!") e aggiorna score', ms: '89ms', tag: 'Game' },
    { id: 10, name: '10. Doppia Classifica: 🎨 Artisti (% successo) & 🎯 Giocatori', ms: '62ms', tag: 'Rank' },
    { id: 11, name: '11. Profilo Utente: statistiche Artista/Giocatore & Avatar Emoji', ms: '77ms', tag: 'Profile' },
    { id: 12, name: '12. Eliminazione proprio sketch e Cleanup atomico DB SQLite', ms: '54ms', tag: 'CRUD' }
  ];
  const [e2eStatus, setE2eStatus] = useState(initialE2eSpecs);
  const [isRunningE2e, setIsRunningE2e] = useState(false);
  const [qsTab, setQsTab] = useState('arch'); // 'arch' | 'specs'
  const [qsView, setQsView] = useState('cli'); // 'cli' | 'ui'
  const [qsUiMode, setQsUiMode] = useState('guess'); // 'guess' | 'draw'

  // QuickSketch Interactive UI State (Play / Guess Mode & Draw Mode)
  const qsSampleSketches = [
    {
      id: 1,
      word: 'Pikachu',
      hint: 'Pokémon Elettrico #025 (Dizionario Nerd & Gaming)',
      author: 'Andrea_Art',
      attemptsUsed: 2,
      totalPlayers: 14,
      timesGuessed: 11,
      svgType: 'pikachu'
    },
    {
      id: 2,
      word: 'Spider-Man',
      hint: 'Eroe Marvel lancia-ragnatele (Dizionario Nerd & Comics)',
      author: 'Marco_Sketch',
      attemptsUsed: 1,
      totalPlayers: 19,
      timesGuessed: 16,
      svgType: 'spiderman'
    },
    {
      id: 3,
      word: 'Piramide',
      hint: 'Monumento dell\'Antico Egitto (Wikipedia IT Random API)',
      author: 'Elena_Draw',
      attemptsUsed: 3,
      totalPlayers: 9,
      timesGuessed: 7,
      svgType: 'pyramid'
    }
  ];
  const [qsActiveSketchIdx, setQsActiveSketchIdx] = useState(0);
  const [qsGuessInput, setQsGuessInput] = useState('');
  const [qsHeartsUsed, setQsHeartsUsed] = useState(2);
  const [qsGuessedSuccess, setQsGuessedSuccess] = useState(false);
  const [qsGuessHistory, setQsGuessHistory] = useState(['Raichu', 'Charmander']);
  const [qsDrawWord, setQsDrawWord] = useState('One Piece');
  const [qsDrawColor, setQsDrawColor] = useState('#1a1a1a');
  const qsCanvasRef = useRef(null);
  const [isDrawingQs, setIsDrawingQs] = useState(false);

  const runQuicksketchTests = () => {
    setIsRunningE2e(true);
    setTimeout(() => {
      setE2eStatus((prev) =>
        prev.map((spec) => ({
          ...spec,
          ms: `${Math.floor(Math.random() * 60) + 32}ms`
        }))
      );
      setIsRunningE2e(false);
    }, 400);
  };

  const handleQsSelectSketch = (idx) => {
    setQsActiveSketchIdx(idx);
    setQsHeartsUsed(qsSampleSketches[idx].attemptsUsed);
    setQsGuessedSuccess(false);
    setQsGuessInput('');
    setQsGuessHistory(
      idx === 0 ? ['Raichu', 'Charmander'] : idx === 1 ? ['Batman'] : ['Sfinge', 'Faraone', 'Deserto']
    );
  };

  const handleQsGuessSubmit = (e) => {
    e.preventDefault();
    if (!qsGuessInput.trim() || qsGuessedSuccess || qsHeartsUsed >= 10) return;
    const currentSketch = qsSampleSketches[qsActiveSketchIdx];
    const clean = qsGuessInput.trim();
    if (clean.toLowerCase() === currentSketch.word.toLowerCase()) {
      setQsGuessedSuccess(true);
      setQsGuessHistory((prev) => [clean, ...prev]);
    } else {
      setQsHeartsUsed((prev) => Math.min(10, prev + 1));
      setQsGuessHistory((prev) => [clean, ...prev.slice(0, 3)]);
    }
    setQsGuessInput('');
  };

  const startQsCanvasDraw = (e) => {
    const canvas = qsCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.strokeStyle = qsDrawColor;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawingQs(true);
  };

  const moveQsCanvasDraw = (e) => {
    if (!isDrawingQs) return;
    const canvas = qsCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopQsCanvasDraw = () => {
    setIsDrawingQs(false);
  };

  const clearQsCanvas = () => {
    const canvas = qsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
                . Progetto app mobile, architetture Full-Stack, sistemi concorrenti e{' '}
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

                <a
                  href="/CV-Andrea-Barattolo.pdf"
                  download="CV-Andrea-Barattolo.pdf"
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-stone-300/90 text-zinc-800 hover:bg-stone-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>Scarica CV (PDF)</span>
                </a>

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

                  {/* Right Column: INTERACTIVE NEURONI K.O. ENGINE & COMIC NEO-BRUTALIST UI APP (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col">
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 text-slate-100 p-4 sm:p-5 flex flex-col justify-between h-full shadow-inner">
                      <div className="flex-1 flex flex-col">
                        {/* Top Bar with Mode Switcher (CLI Engine vs UI App Mobile Party) */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
                            <span className="font-mono-code text-[11px] text-slate-300 ml-1.5 truncate">
                              {neuroniViewMode === 'terminal'
                                ? 'neuroni-ko/src/App.jsx — FSM & Quiz Engine'
                                : 'Neuroni K.O.! — Comic Neo-Brutalist Mobile UI'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                              <button
                                type="button"
                                onClick={() => setNeuroniViewMode('terminal')}
                                className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                  neuroniViewMode === 'terminal'
                                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                CLI Engine
                              </button>
                              <button
                                type="button"
                                onClick={() => setNeuroniViewMode('ui')}
                                className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                                  neuroniViewMode === 'ui'
                                    ? 'bg-[#FF2A85] text-white font-bold shadow-xs'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                UI App (Mobile Party)
                              </button>
                            </div>
                            <span className="font-mono-code text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 whitespace-nowrap">
                              250 QUIZ
                            </span>
                          </div>
                        </div>

                        {neuroniViewMode === 'terminal' ? (
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              {/* CLI Sub-navigation */}
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                                  <button
                                    type="button"
                                    onClick={() => setActiveTabNeuroni('match')}
                                    className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                      activeTabNeuroni === 'match'
                                        ? 'bg-amber-500 text-slate-950 font-bold'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    Arena Quiz (FSM)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveTabNeuroni('camerino')}
                                    className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                      activeTabNeuroni === 'camerino'
                                        ? 'bg-amber-500 text-slate-950 font-bold'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    Camerino (8 SVG)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveTabNeuroni('debuffs')}
                                    className={`font-mono-code text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                      activeTabNeuroni === 'debuffs'
                                        ? 'bg-amber-500 text-slate-950 font-bold'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    Colpi Bassi (4)
                                  </button>
                                </div>
                                <span className="font-mono-code text-[10px] text-slate-400">
                                  FSM: <strong className="text-amber-300">{neuroniState.fsmState}</strong>
                                </span>
                              </div>

                              {/* Top Game HUD Strip */}
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                                  <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                    <span>Avatar VIP</span>
                                    <span className="text-[9px] text-amber-400">{selectedAvatar.role}</span>
                                  </div>
                                  <div className="font-mono-code text-[11px] font-bold text-white truncate mt-0.5 flex items-center gap-1">
                                    <span>{selectedAvatar.emoji}</span>
                                    <span className="truncate">{selectedAvatar.name}</span>
                                  </div>
                                </div>

                                <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                                  <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                    <span>Grattacielo K.O.</span>
                                    <span className="text-[9px] text-emerald-400">Target P15</span>
                                  </div>
                                  <div className="font-mono-code text-[11px] font-bold text-amber-300 truncate mt-0.5 flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-amber-400" />
                                    <span>
                                      Piano P{neuroniState.floorLevel}/15 {neuroniState.floorLevel === 15 ? '👑' : ''}
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl px-2.5 py-2">
                                  <div className="font-mono-code text-[9px] uppercase tracking-wider text-slate-400 flex items-center justify-between">
                                    <span>Speed Points</span>
                                    <span className="text-[9px] text-sky-400">[5, 4, 3, 2]</span>
                                  </div>
                                  <div className="font-mono-code text-[11px] font-bold text-emerald-400 truncate mt-0.5 flex items-center justify-between">
                                    <span>🔥 {neuroniState.streak}x</span>
                                    <span className="text-white text-[10px]">{neuroniState.score} PT</span>
                                  </div>
                                </div>
                              </div>

                              {/* Tab Content 1: MATCH LIVE & QUIZ */}
                              {activeTabNeuroni === 'match' && (
                                <div className="space-y-3">
                                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono-code mb-2">
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-300">
                                          {neuroniQuestions[neuroniState.qIndex].funFact}
                                        </span>
                                        <span
                                          className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                                            neuroniQuestions[neuroniState.qIndex].badgeColor
                                          }`}
                                        >
                                          {neuroniQuestions[neuroniState.qIndex].emoji}{' '}
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

                                    {/* 4 Quiz Options (A, B, C, D) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {neuroniQuestions[neuroniState.qIndex].options.map((opt, i) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() => handleNeuroniAnswer(i)}
                                          className="font-mono-code text-[11px] py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/90 transition-all font-medium text-left cursor-pointer flex items-center gap-2 shadow-xs"
                                        >
                                          <span className="w-4 h-4 rounded bg-slate-950 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                                            {['A', 'B', 'C', 'D'][i]}
                                          </span>
                                          <span className="truncate">{opt}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Quick Tactical Colpi Bassi Launcher */}
                                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
                                    <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-1.5">
                                      <span>SABOTAGE SELECTION (COLPI BASSI SU BOT):</span>
                                      <span className="text-amber-400">Bot Accuracy: 65% → 35%</span>
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

                                  {/* Live Bot Leaderboard & Skyscraper Floors */}
                                  <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5">
                                    <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-400 mb-2">
                                      <span>SCALATA GRATTACIELO K.O. (PLAYERS & BOT ENGINE):</span>
                                      <span className="text-emerald-400 font-bold">15 Piani al Tetto K.O.</span>
                                    </div>

                                    <div className="grid grid-cols-4 gap-1.5 text-center font-mono-code">
                                      <div className="p-1.5 rounded-lg border bg-amber-500/20 border-amber-500 text-amber-300 font-bold">
                                        <div className="text-[10px] truncate">{selectedAvatar.emoji} Tu</div>
                                        <div className="text-[11px] mt-0.5">P{neuroniState.floorLevel}/15</div>
                                      </div>
                                      {neuroniState.opponents.map((opp) => (
                                        <div
                                          key={opp.id}
                                          className={`p-1.5 rounded-lg border ${
                                            opp.debuffed
                                              ? 'bg-rose-950/40 border-rose-700/70 text-rose-300'
                                              : 'bg-slate-900/70 border-slate-800 text-slate-300'
                                          }`}
                                        >
                                          <div className="text-[10px] truncate">
                                            {opp.avatar} {opp.name}
                                          </div>
                                          <div className="text-[10px] mt-0.5 text-slate-400">
                                            P{opp.floor} • {opp.accuracy}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Tab Content 2: CAMERINO AVATAR PARODIA */}
                              {activeTabNeuroni === 'camerino' && (
                                <div className="space-y-3">
                                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                                    <div className="font-mono-code text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
                                      <span>CAMERINO VIP • AVATAR SVG PARODIA (avatars.jsx)</span>
                                      <span className="text-[10px] text-slate-400">HomeScreen.jsx</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 mb-2.5">
                                      Seleziona uno dei personaggi parodia disegnati in vettoriale SVG con la battuta del Presentatore Showman:
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[210px] overflow-y-auto pr-1">
                                      {neuroniAvatars.map((av) => (
                                        <button
                                          key={av.id}
                                          type="button"
                                          onClick={() => setSelectedAvatar(av)}
                                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                            selectedAvatar.id === av.id
                                              ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                                          }`}
                                        >
                                          <span className="text-xl p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                                            {av.emoji}
                                          </span>
                                          <div className="min-w-0 flex-1">
                                            <div className="font-mono-code text-[11px] font-bold flex items-center justify-between gap-1">
                                              <span className="truncate">{av.name}</span>
                                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 shrink-0">
                                                {av.role}
                                              </span>
                                            </div>
                                            <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                              &ldquo;{av.desc}&rdquo;
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
                                    ✓ Conferma Avatar nel Camerino VIP e Torna al Match
                                  </button>
                                </div>
                              )}

                              {/* Tab Content 3: COLPI BASSI (SABOTAGES) */}
                              {activeTabNeuroni === 'debuffs' && (
                                <div className="space-y-3">
                                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
                                    <div className="font-mono-code text-xs font-bold text-amber-400 mb-1 flex items-center justify-between">
                                      <span>SABOTAGE SELECTION • 4 COLPI BASSI INTERATTIVI</span>
                                      <span className="text-[10px] text-slate-400">gameData.js</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 mb-2.5">
                                      Prima della domanda scegli quale sabotaggio fisico scagliare contro i bot o prova gli effetti nella vista UI App:
                                    </p>

                                    <div className="space-y-2">
                                      {neuroniDebuffs.map((deb) => (
                                        <div
                                          key={deb.id}
                                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2.5"
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="text-lg p-1.5 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
                                              {deb.icon}
                                            </span>
                                            <div className="min-w-0">
                                              <div className="font-mono-code text-[11px] font-bold text-white flex items-center gap-1.5">
                                                <span>{deb.name}</span>
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                                  {deb.soundText}
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-normal">
                                                  → {deb.target}
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
                                            className="font-mono-code text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shrink-0 cursor-pointer"
                                          >
                                            Sabota!
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Live React State Inspector & Footer */}
                            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                              <div className="flex items-center gap-2 truncate">
                                <span className="text-amber-400 font-semibold truncate">{neuroniState.lastStatus}</span>
                              </div>
                              <button
                                type="button"
                                onClick={resetNeuroniGame}
                                className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 shrink-0 ml-2"
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                                Reset
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* UI APP VIEW: AUTHENTIC COMIC NEO-BRUTALIST MOBILE PARTY GAME */
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="rounded-xl bg-gradient-to-b from-[#2A0E4A] via-[#1B0933] to-[#120623] border-3 border-black p-3 text-white shadow-[5px_5px_0px_#000] flex-1 flex flex-col justify-between relative overflow-hidden">
                              {/* Top Mobile Party Header + Screen Switcher */}
                              <div>
                                <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 mb-2.5 border-b-2 border-black/60">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className="font-black text-base tracking-wider text-white px-2 py-0.5 rounded bg-[#FF2A85] border-2 border-black shadow-[2px_2px_0_#000] -rotate-1"
                                    >
                                      NEURONI <span className="text-[#FFD600]">K.O.!</span>
                                    </span>
                                    <span className="font-mono-code text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFD600] text-black border-2 border-black shadow-[2px_2px_0_#000]">
                                      P{neuroniState.floorLevel}/15 🏆
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    {[
                                      { id: 'quiz', label: '🥧 Quiz & Colpi' },
                                      { id: 'camerino', label: '🎭 Camerino VIP' },
                                      { id: 'tower', label: '🏢 Grattacielo' }
                                    ].map((tab) => (
                                      <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setNeuroniUiScreen(tab.id)}
                                        className={`text-[10px] font-extrabold px-2 py-1 rounded-lg border-2 border-black transition-all cursor-pointer ${
                                          neuroniUiScreen === tab.id
                                            ? 'bg-[#FFD600] text-black shadow-[2px_2px_0_#000] -translate-y-0.5'
                                            : 'bg-[#12121A] text-white/80 hover:text-white'
                                        }`}
                                      >
                                        {tab.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* SCREEN 1: QUESTION SCREEN + LIVE INTERACTIVE SABOTAGES */}
                                {neuroniUiScreen === 'quiz' && (
                                  <div className="space-y-2.5">
                                    {/* Interactive Sabotage Selector Bar */}
                                    <div className="bg-[#12121A] border-2 border-black rounded-xl p-2 shadow-[3px_3px_0_#000]">
                                      <div className="flex items-center justify-between text-[10px] font-bold text-[#FFD600] mb-1.5">
                                        <span>💥 ATTIVA UN COLPO BASSO SUI BOTTONI RISPOSTA:</span>
                                        <span className="text-white/70 font-mono-code">QuestionScreen.jsx</span>
                                      </div>
                                      <div className="grid grid-cols-5 gap-1">
                                        {[
                                          { id: 'none', label: 'Pulito', icon: '✨', bg: '#00FF87', text: '#000' },
                                          { id: 'cake', label: 'Torta', icon: '🥧', bg: '#FF2A85', text: '#FFF' },
                                          { id: 'cage', label: 'Gabbia', icon: '🪵', bg: '#FF8800', text: '#000' },
                                          { id: 'upside_down', label: '180° Pop', icon: '🙃', bg: '#8A2BE2', text: '#FFF' },
                                          { id: 'earthquake', label: 'Mix', icon: '🌀', bg: '#00E5FF', text: '#000' }
                                        ].map((sab) => (
                                          <button
                                            key={sab.id}
                                            type="button"
                                            onClick={() => triggerNeuroniUiSabotage(sab.id)}
                                            style={{
                                              backgroundColor: neuroniUiSabotage === sab.id ? sab.bg : '#1E1E2C',
                                              color: neuroniUiSabotage === sab.id ? sab.text : '#E2E8F0'
                                            }}
                                            className="text-[10px] font-extrabold py-1 px-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer flex items-center justify-center gap-1 transition-transform active:translate-y-0.5"
                                          >
                                            <span>{sab.icon}</span>
                                            <span className="truncate">{sab.label}</span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Comic Question Card */}
                                    <div className="bg-[#FFFDF5] text-black border-3 border-black rounded-xl p-3 shadow-[4px_4px_0_#000] relative">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span
                                          style={{ backgroundColor: neuroniQuestions[neuroniState.qIndex].themeHex }}
                                          className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md border-2 border-black text-black shadow-[2px_2px_0_#000]"
                                        >
                                          {neuroniQuestions[neuroniState.qIndex].emoji}{' '}
                                          {neuroniQuestions[neuroniState.qIndex].category}
                                        </span>
                                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-black text-[#FFD600]">
                                          ⏱️ 15s • +5 PT
                                        </span>
                                      </div>
                                      <p
                                        className={`text-xs sm:text-sm font-extrabold leading-snug text-black transition-transform duration-300 ${
                                          neuroniUiSabotage === 'upside_down' ? 'rotate-180' : ''
                                        }`}
                                      >
                                        {neuroniQuestions[neuroniState.qIndex].prompt}
                                      </p>
                                    </div>

                                    {/* Spam Pop-up Overlay when Upside-Down is active */}
                                    {neuroniUiSabotage === 'upside_down' && neuroniPopupOpen && (
                                      <div className="bg-[#FFD600] text-black border-3 border-black rounded-xl p-2.5 shadow-[4px_4px_0_#000] flex items-center justify-between gap-2 animate-bounce">
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span className="text-xl shrink-0">🐔</span>
                                          <div className="min-w-0">
                                            <div className="text-[11px] font-black leading-tight">
                                              HAI VINTO UN POLLO DI GOMMA!
                                            </div>
                                            <div className="text-[10px] font-bold leading-tight truncate">
                                              Starnazza se lo premi! Chiudi con X per rispondere!
                                            </div>
                                          </div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setNeuroniPopupOpen(false)}
                                          className="px-2.5 py-1 rounded-lg bg-[#FF2A85] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer shrink-0"
                                        >
                                          ✖ CHIUDI
                                        </button>
                                      </div>
                                    )}

                                    {/* 4 Neo-Brutalist Answer Buttons with Sabotage Overlays */}
                                    <div className="grid grid-cols-2 gap-2 relative">
                                      {(neuroniUiSabotage === 'earthquake'
                                        ? neuroniShuffledOrder
                                        : [0, 1, 2, 3]
                                      ).map((origIdx) => {
                                        const opt = neuroniQuestions[neuroniState.qIndex].options[origIdx];
                                        const btnColors = ['#FF2A85', '#00E5FF', '#FFD600', '#00FF87'];
                                        const btnTextColors = ['#FFF', '#000', '#000', '#000'];

                                        return (
                                          <button
                                            key={origIdx}
                                            type="button"
                                            onClick={() => handleNeuroniAnswer(origIdx)}
                                            style={{
                                              backgroundColor: btnColors[origIdx],
                                              color: btnTextColors[origIdx]
                                            }}
                                            className="relative overflow-hidden py-2.5 px-2.5 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] active:translate-y-0.5 font-extrabold text-xs text-left flex items-center gap-2 cursor-pointer transition-all"
                                          >
                                            <span className="w-5 h-5 rounded-md bg-black text-[#FFD600] font-black text-[11px] flex items-center justify-center shrink-0">
                                              {['A', 'B', 'C', 'D'][origIdx]}
                                            </span>
                                            <span
                                              className={`truncate font-bold ${
                                                neuroniUiSabotage === 'upside_down' ? 'rotate-180 inline-block' : ''
                                              }`}
                                            >
                                              {opt}
                                            </span>

                                            {/* Overlay 1: Torta in Faccia (PieSplatterCanvas simulation) */}
                                            {neuroniUiSabotage === 'cake' && !neuroniCakeCleaned && (
                                              <span className="absolute inset-0 bg-[#FF2A85] border border-white/40 flex items-center justify-center text-white font-black text-[11px] tracking-wider">
                                                🥧 SPLAT! (Clicca per pulire)
                                              </span>
                                            )}

                                            {/* Overlay 2: Gabbia Cartoon (Wooden Planks) */}
                                            {neuroniUiSabotage === 'cage' && neuroniCageHitsLeft > 0 && (
                                              <span className="absolute inset-0 bg-[#B45309]/95 border-2 border-amber-950 flex items-center justify-center text-amber-100 font-black text-[11px] tracking-wider">
                                                🪵 GABBIA! ({neuroniCageHitsLeft} 🔨 colpi)
                                              </span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* SCREEN 2: CAMERINO VIP (HomeScreen.jsx + HostSvg + 8 Parody Avatars) */}
                                {neuroniUiScreen === 'camerino' && (
                                  <div className="space-y-2.5">
                                    {/* Presentatore Showman con Nuvoletta a Fumetti */}
                                    <div className="flex items-center gap-2.5 bg-[#12121A] border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0_#000]">
                                      <div className="w-12 h-12 rounded-xl bg-[#FF2A85] border-2 border-black shadow-[2px_2px_0_#000] flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xl leading-none">🧠</span>
                                        <span className="text-[8px] font-black bg-black text-[#FFD600] px-1 rounded mt-0.5">
                                          HOST
                                        </span>
                                      </div>
                                      <div className="flex-1 bg-[#FFFDF5] text-black border-2 border-black rounded-xl px-2.5 py-1.5 shadow-[2px_2px_0_#000]">
                                        <p className="text-[11px] font-extrabold leading-tight">
                                          &ldquo;{selectedAvatar.desc}&rdquo;
                                        </p>
                                        <span className="text-[9px] font-black uppercase text-[#FF2A85] block mt-0.5">
                                          — Il Presentatore Showman (HostSvg)
                                        </span>
                                      </div>
                                    </div>

                                    {/* Specchio del Camerino VIP con Lampadine */}
                                    <div className="bg-[#12121A] border-3 border-black rounded-xl p-3 shadow-[4px_4px_0_#000]">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-black tracking-wider text-[#FFD600]">
                                          ★ CAMERINO VIP ★
                                        </span>
                                        <div className="flex items-center gap-1">
                                          {[0, 1, 2, 3, 4].map((bulb) => (
                                            <span
                                              key={bulb}
                                              className="w-2.5 h-2.5 rounded-full bg-[#FFD600] border border-black shadow-[0_0_6px_#FFD600]"
                                            />
                                          ))}
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                        {neuroniAvatars.map((av) => (
                                          <button
                                            key={av.id}
                                            type="button"
                                            onClick={() => setSelectedAvatar(av)}
                                            style={{
                                              borderColor: '#000',
                                              backgroundColor:
                                                selectedAvatar.id === av.id ? av.themeColor : '#1C1F2E',
                                              color:
                                                selectedAvatar.id === av.id &&
                                                (av.themeColor === '#FFD600' ||
                                                  av.themeColor === '#00E5FF' ||
                                                  av.themeColor === '#00FF87')
                                                  ? '#000'
                                                  : '#FFF'
                                            }}
                                            className="p-2 rounded-xl border-2 shadow-[2px_2px_0_#000] text-center cursor-pointer transition-transform hover:-translate-y-0.5 flex flex-col items-center"
                                          >
                                            <span className="text-xl">{av.emoji}</span>
                                            <span className="text-[10px] font-black leading-tight mt-1 line-clamp-1">
                                              {av.name}
                                            </span>
                                            <span className="text-[8px] opacity-80 font-bold">{av.role}</span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* SCREEN 3: LA SCALATA DEL GRATTACIELO K.O. (SkyscraperTower.jsx) */}
                                {neuroniUiScreen === 'tower' && (
                                  <div className="space-y-2">
                                    {/* Riscossa degli Ultimi Banner */}
                                    <div className="bg-[#FFD600] text-black border-3 border-black rounded-xl p-2.5 shadow-[3px_3px_0_#000]">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs font-black uppercase tracking-wide">
                                          🚀 RISCOSSA DEGLI ULTIMI! (SkyscraperTower.jsx)
                                        </span>
                                        <span className="text-[10px] font-black bg-[#FF2A85] text-white px-2 py-0.5 rounded border border-black">
                                          OBIETTIVO: P15
                                        </span>
                                      </div>
                                      <p className="text-[10px] font-bold mt-0.5 leading-snug">
                                        Sei in testa al Piano P{neuroniState.floorLevel}! Gli ultimi in classifica lanciano sabotaggi a raffica prima del quiz!
                                      </p>
                                    </div>

                                    {/* Floors P15 down to P9 visualization */}
                                    <div className="space-y-1 max-h-[195px] overflow-y-auto pr-1">
                                      {[15, 14, 13, 12, 11, 10, 9, 7].map((floorNum) => {
                                        const isRoof = floorNum === 15;
                                        const isUserHere = neuroniState.floorLevel === floorNum;
                                        const botsHere = neuroniState.opponents.filter((b) => b.floor === floorNum);

                                        return (
                                          <div
                                            key={floorNum}
                                            style={{
                                              backgroundColor: isRoof
                                                ? '#FFD600'
                                                : floorNum >= 12
                                                ? '#FF2A85'
                                                : '#00E5FF',
                                              color: floorNum >= 12 && !isRoof ? '#FFF' : '#000'
                                            }}
                                            className="flex items-center justify-between px-2.5 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0_#000] text-xs font-extrabold"
                                          >
                                            <div className="flex items-center gap-1.5">
                                              <span className="px-1.5 py-0.5 rounded bg-black text-[#FFD600] font-mono-code text-[10px] font-black">
                                                P{floorNum}
                                              </span>
                                              {isRoof && (
                                                <span className="text-[10px] font-black tracking-wide">
                                                  TETTO K.O.! RING DEI CAMPIONI 🏆
                                                </span>
                                              )}
                                            </div>

                                            <div className="flex items-center gap-1 flex-wrap justify-end">
                                              {isUserHere && (
                                                <span className="px-2 py-0.5 rounded bg-[#FFD600] text-black border-2 border-black text-[10px] font-black shadow-[1px_1px_0_#000]">
                                                  👑 {selectedAvatar.emoji} TU
                                                </span>
                                              )}
                                              {botsHere.map((b) => (
                                                <span
                                                  key={b.id}
                                                  className="px-1.5 py-0.5 rounded bg-white text-black border border-black text-[10px] font-bold"
                                                >
                                                  {b.avatar} {b.name}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Bottom Mobile Status Bar */}
                              <div className="mt-2.5 pt-2 border-t-2 border-black/60 flex items-center justify-between text-[10px] font-mono-code">
                                <span className="text-[#FFD600] font-bold truncate">
                                  {neuroniState.feedback || 'Tocca una risposta o prova i Colpi Bassi!'}
                                </span>
                                <button
                                  type="button"
                                  onClick={resetNeuroniGame}
                                  className="px-2 py-0.5 rounded bg-black text-white border border-white/30 hover:bg-white hover:text-black font-bold transition-colors cursor-pointer shrink-0"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* BENTO ROW 3: ACADEMIC & FULL-STACK SIDE-BY-SIDE (2 COLS) — LSO FORZA 4 & QUICKSKETCH */}
            {showAcademic && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* CARD #3 — LSO FORZA 4 (C99 POSIX SERVER + ANSI UI) */}
                <article
                  className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/80 border-indigo-500/40 shadow-lg'
                      : 'bg-white border-indigo-200/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`font-mono-code inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                          isDark
                            ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        SISTEMI OPERATIVI (LSO) • UNINA
                      </span>
                      <span
                        className={`font-mono-code text-[11px] px-2.5 py-0.5 rounded-full border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-stone-100 text-zinc-700 border-stone-200'
                        }`}
                      >
                        C99 POSIX • Docker
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                        }`}
                      >
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                            isDark ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          LSO Forza 4 — Server C Concorrente
                        </h3>
                        <p
                          className={`font-mono-code text-[11px] ${
                            isDark ? 'text-indigo-400' : 'text-indigo-700'
                          }`}
                        >
                          Socket TCP (Packet 2048B), Thread-per-Client, Locking Gerarchico & ANSI TUI
                        </p>
                      </div>
                    </div>

                    {/* Concise Rich Description */}
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-zinc-600'
                      }`}
                    >
                      Piattaforma <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Client-Server multi-utente in C99 POSIX</strong> su <strong className={isDark ? 'text-indigo-300' : 'text-indigo-700'}>Socket TCP Stream</strong> (<code className="font-mono-code text-xs">porta 8888</code>). Il server adotta un modello <strong>Thread-per-Client</strong> (<code className="font-mono-code text-xs">pthread</code>) con gerarchia rigorosa di mutex (<code className="font-mono-code text-xs">server_mutex → match-&gt;mutex</code>), protocollo binario fisso da <strong>2048 byte</strong>, verifica vincita radiale <code className="font-mono-code text-xs">O(1)</code> e client non-bloccante con <code className="font-mono-code text-xs">select()</code> su STDIN e socket.
                    </p>

                    {/* Compact 3-Pillar Strip */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { step: '01 • NET', title: 'Packet 2048B', sub: 'TCP + Keepalive' },
                        { step: '02 • SYNC', title: 'Gerarchia Lock', sub: 'Zero Deadlock' },
                        { step: '03 • CLIENT', title: 'select() TUI', sub: 'ANSI + Tasto 00' }
                      ].map((item) => (
                        <div
                          key={item.step}
                          className={`p-2.5 rounded-xl border ${
                            isDark
                              ? 'bg-slate-950/70 border-slate-800'
                              : 'bg-stone-50 border-stone-200/90'
                          }`}
                        >
                          <div className="font-mono-code text-[9px] font-bold text-indigo-500 dark:text-indigo-400">
                            {item.step}
                          </div>
                          <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                            {item.title}
                          </div>
                          <div className="font-mono-code text-[9px] text-zinc-500 truncate">{item.sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive C99 Terminal + UI App Box */}
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 text-slate-100 p-3.5 shadow-inner">
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
                          <span className="font-mono-code text-[10px] text-slate-300 ml-1 truncate">
                            ./server 8888 & ./client
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                            <button
                              type="button"
                              onClick={() => setForzaView('cli')}
                              className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                forzaView === 'cli'
                                  ? 'bg-indigo-500 text-white font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              CLI Match 6x7
                            </button>
                            <button
                              type="button"
                              onClick={() => setForzaView('ui')}
                              className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                forzaView === 'ui'
                                  ? 'bg-indigo-500 text-white font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              UI App (Lobby)
                            </button>
                          </div>
                        </div>
                      </div>

                      {forzaView === 'cli' ? (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[10px] font-mono-code">
                            <span className="text-slate-300">
                              Stato:{' '}
                              <strong className="text-emerald-400">
                                {forzaWinner === 'SURRENDER'
                                  ? '🏳️ RESA (00) — Fine Match'
                                  : forzaWinner === 'DRAW'
                                  ? '🤝 PAREGGIO (42/42)'
                                  : forzaWinner
                                  ? `🏆 VINCE ${forzaWinner === 'X' ? 'ANDREA 🔴 (Host)' : 'MARCO 🟡 (Guest)'}`
                                  : forzaTurn === 'X'
                                  ? 'Turno: Andrea 🔴 (Host)'
                                  : 'Turno: Marco 🟡 (Guest)'}
                              </strong>
                            </span>
                            <div className="flex items-center gap-1.5">
                              {!forzaWinner && (
                                <button
                                  type="button"
                                  onClick={surrenderForzaMatch}
                                  className="px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 cursor-pointer"
                                >
                                  🏳️ Resa (00)
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={resetForzaMatch}
                                className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                  forzaWinner
                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 font-bold animate-pulse'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                                }`}
                              >
                                {forzaWinner ? '🔄 Riparti da 0' : 'Svuota (da 0)'}
                              </button>
                            </div>
                          </div>

                          {/* Column Drop Buttons & 6x7 Grid */}
                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5">
                            <div className="grid grid-cols-7 gap-1 mb-1.5">
                              {[0, 1, 2, 3, 4, 5, 6].map((col) => (
                                <button
                                  key={col}
                                  type="button"
                                  disabled={Boolean(forzaWinner)}
                                  onClick={() => dropForzaDisc(col)}
                                  className={`font-mono-code text-[10px] font-bold py-0.5 rounded border transition-all ${
                                    forzaWinner
                                      ? 'bg-slate-900/40 text-slate-600 border-slate-800/60 cursor-not-allowed'
                                      : 'bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white border-slate-700/80 cursor-pointer'
                                  }`}
                                >
                                  ↓{col + 1}
                                </button>
                              ))}
                            </div>
                            <div className="space-y-1 bg-[#070B12] p-1.5 rounded-lg border border-slate-800/90">
                              {forzaBoard.map((row, rIdx) => (
                                <div key={rIdx} className="grid grid-cols-7 gap-1 text-center">
                                  {row.map((cell, cIdx) => (
                                    <div
                                      key={cIdx}
                                      onClick={() => {
                                        if (!forzaWinner) dropForzaDisc(cIdx);
                                      }}
                                      className={`h-5 flex items-center justify-center rounded border text-[11px] ${
                                        cell === 'X'
                                          ? 'bg-rose-500/15 border-rose-500/40'
                                          : cell === 'O'
                                          ? 'bg-amber-500/15 border-amber-500/40'
                                          : forzaWinner
                                          ? 'bg-slate-900/40 border-slate-800/50 cursor-not-allowed'
                                          : 'bg-slate-900/60 border-slate-800/70 hover:border-indigo-500/40 cursor-pointer'
                                      }`}
                                    >
                                      {cell === 'X' ? '🔴' : cell === 'O' ? '🟡' : '·'}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Compact Server Log */}
                          <div className="bg-slate-950/95 border border-slate-800/90 rounded-lg p-2 font-mono-code text-[10px] space-y-1 max-h-[64px] overflow-y-auto">
                            {forzaLogs.slice(-2).map((l, i) => (
                              <div key={i} className="text-emerald-300/95 truncate">
                                {l}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Compact UI App (Lobby ANSI from client/ui.c) */
                        <div className="space-y-2.5 font-mono-code">
                          <div className="bg-[#070B12] border border-cyan-500/40 rounded-lg p-2 text-center">
                            <div className="text-white text-xs font-extrabold">
                              <span className="text-cyan-400">│</span> 🔴 🟡 &nbsp; F O R Z A &nbsp; 4 &nbsp; 🟡 🔴 <span className="text-cyan-400">│</span>
                            </div>
                            <div className="text-[9px] text-slate-400 mt-0.5">
                              <code className="text-cyan-300">client/ui.c</code> • ELENCO PARTITE SUL SERVER
                            </div>
                          </div>

                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-2">
                            <table className="w-full text-left text-[10px]">
                              <thead>
                                <tr className="text-slate-400 border-b border-slate-800">
                                  <th className="py-1">ID</th>
                                  <th className="py-1">Host</th>
                                  <th className="py-1">Guest</th>
                                  <th className="py-1">Stato</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/50">
                                {forzaLobbyMatches.map((m) => (
                                  <tr key={m.id}>
                                    <td className="py-1 font-bold text-white">#{m.id}</td>
                                    <td className="py-1 text-slate-200">{m.host}</td>
                                    <td className="py-1 text-slate-300">{m.guest}</td>
                                    <td className={`py-1 font-bold ${m.color}`}>{m.state}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="bg-slate-950/90 border border-amber-500/30 rounded-lg p-2 space-y-1.5">
                            <div className="text-[10px] text-amber-300 font-bold">
                              ⚡ MSG_JOIN_PROMPT (Partita #3 • Guest_42):
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleForzaHostDecision(true)}
                                className="flex-1 text-[10px] font-bold py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer"
                              >
                                [1] ACCETTA
                              </button>
                              <button
                                type="button"
                                onClick={() => handleForzaHostDecision(false)}
                                className="flex-1 text-[10px] font-bold py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 cursor-pointer"
                              >
                                [0] RIFIUTA
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Tags & GitHub */}
                  <div className="pt-4 mt-4 border-t border-stone-200/70 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {['C99 POSIX', 'TCP 2048B', 'pthread & Mutex', 'select()', 'Docker'].map((t) => (
                        <span
                          key={t}
                          className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                              : 'bg-stone-100 text-zinc-800 border-stone-200'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="https://github.com/AndrewJar09-star/progetto-Lso-Forza-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ${
                        isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>

                {/* CARD #4 — QUICKSKETCH (FULL-STACK PICTIONARY + NEO-BRUTALIST UI APP) */}
                <article
                  className={`rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between ${
                    isDark
                      ? 'bg-slate-900/80 border-sky-500/40 shadow-lg'
                      : 'bg-white border-sky-200/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`font-mono-code inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full border ${
                          isDark
                            ? 'bg-sky-950/80 text-sky-300 border-sky-700'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        TECNOLOGIE WEB • FULL-STACK & E2E
                      </span>
                      <span
                        className={`font-mono-code text-[11px] px-2.5 py-0.5 rounded-full border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-stone-100 text-zinc-700 border-stone-200'
                        }`}
                      >
                        React 19 + TS + SQLite
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-50 text-sky-600'
                        }`}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                            isDark ? 'text-white' : 'text-zinc-900'
                          }`}
                        >
                          QuickSketch — Web Pictionary
                        </h3>
                        <p
                          className={`font-mono-code text-[11px] ${
                            isDark ? 'text-sky-400' : 'text-sky-700'
                          }`}
                        >
                          HTML5 Canvas (60s), MediaWiki API + Nerd Dict, SQLite & 14 Test Playwright
                        </p>
                      </div>
                    </div>

                    {/* Concise Rich Description */}
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-zinc-600'
                      }`}
                    >
                      Web app full-stack ispirata a <strong className={isDark ? 'text-white' : 'text-zinc-900'}>Pictionary</strong> con design <strong className={isDark ? 'text-sky-300' : 'text-sky-700'}>Neo-Brutalist & Doodle</strong>. Gli utenti scelgono 1 parola su 5 generate da un motore ibrido (<strong className={isDark ? 'text-white' : 'text-zinc-900'}>Wikipedia IT API</strong> + dizionario Nerd/Pop Culture) e la disegnano in <strong>60s</strong> su canvas HTML5 (<code className="font-mono-code text-xs">SignaturePad</code>). La community sfida gli sketch con <strong>10 vite a cuore ♥</strong>, scalando la doppia classifica Artisti e Giocatori.
                    </p>

                    {/* Compact 3-Pillar Strip */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { step: '01 • SPA', title: 'React 19 + TS', sub: 'Canvas 60s + 10 ♥' },
                        { step: '02 • API', title: 'Express + SQLite', sub: 'JWT & Wiki API' },
                        { step: '03 • QA', title: '14 Test E2E', sub: 'Playwright Suite' }
                      ].map((item) => (
                        <div
                          key={item.step}
                          className={`p-2.5 rounded-xl border ${
                            isDark
                              ? 'bg-slate-950/70 border-slate-800'
                              : 'bg-stone-50 border-stone-200/90'
                          }`}
                        >
                          <div className="font-mono-code text-[9px] font-bold text-sky-500 dark:text-sky-400">
                            {item.step}
                          </div>
                          <div className={`text-[11px] font-bold mt-0.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                            {item.title}
                          </div>
                          <div className="font-mono-code text-[9px] text-zinc-500 truncate">{item.sub}</div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Playwright CLI + Neo-Brutalist UI App Box */}
                    <div className="rounded-2xl bg-[#0D131F] border border-slate-800 text-slate-100 p-3.5 shadow-inner">
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
                          <span className="font-mono-code text-[10px] text-slate-300 ml-1 truncate">
                            quicksketch.spec.js — 14/14 Passed
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                            <button
                              type="button"
                              onClick={() => setQsView('cli')}
                              className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                qsView === 'cli'
                                  ? 'bg-sky-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              CLI 14 E2E
                            </button>
                            <button
                              type="button"
                              onClick={() => setQsView('ui')}
                              className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                                qsView === 'ui'
                                  ? 'bg-sky-500 text-slate-950 font-bold'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              UI App (Pictionary)
                            </button>
                          </div>
                        </div>
                      </div>

                      {qsView === 'cli' ? (
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-[10px] font-mono-code">
                            <span className="text-slate-300">
                              Suite: <strong className="text-emerald-400">14 Specs OK</strong> (Auth, Canvas, 10 ♥)
                            </span>
                            <button
                              type="button"
                              onClick={runQuicksketchTests}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold cursor-pointer"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>{isRunningE2e ? 'Run...' : 'Riesegui'}</span>
                            </button>
                          </div>

                          <div className="bg-slate-950 border border-slate-800 rounded-xl p-2 space-y-1 max-h-[195px] overflow-y-auto font-mono-code">
                            {e2eStatus.map((spec) => (
                              <div
                                key={spec.id}
                                className="flex items-center justify-between gap-2 bg-slate-900/80 border border-slate-800/80 rounded px-2 py-1 text-[10px]"
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                  <span className="text-slate-200 truncate">{spec.name}</span>
                                </div>
                                <span className="text-slate-400 text-[9px] shrink-0">{spec.ms}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Compact Neo-Brutalist UI App (#FFF8F0 paper, 2px black border) */
                        <div className="rounded-xl bg-[#FFF8F0] text-[#1a1a1a] border-2 border-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] overflow-hidden">
                          <div className="bg-[#FFFDF7] border-b-2 border-[#1a1a1a] px-2.5 py-1.5 flex items-center justify-between gap-1">
                            <span className="font-extrabold text-xs underline decoration-[#FF3CAC] decoration-2">
                              🎨 QuickSketch
                            </span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => setQsUiMode('guess')}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border border-[#1a1a1a] cursor-pointer ${
                                  qsUiMode === 'guess' ? 'bg-[#FFE156]' : 'bg-white'
                                }`}
                              >
                                🎯 Indovina
                              </button>
                              <button
                                type="button"
                                onClick={() => setQsUiMode('draw')}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border border-[#1a1a1a] cursor-pointer ${
                                  qsUiMode === 'draw' ? 'bg-[#00E5CC]' : 'bg-white'
                                }`}
                              >
                                ✏️ Crea (60s)
                              </button>
                            </div>
                          </div>

                          {qsUiMode === 'guess' ? (
                            <div className="p-2.5 space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <div className="flex gap-1">
                                  {qsSampleSketches.map((s, idx) => (
                                    <button
                                      key={s.id}
                                      type="button"
                                      onClick={() => handleQsSelectSketch(idx)}
                                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1a1a1a] cursor-pointer ${
                                        qsActiveSketchIdx === idx ? 'bg-[#FF3CAC] text-white' : 'bg-white'
                                      }`}
                                    >
                                      #{s.id}
                                    </button>
                                  ))}
                                </div>
                                <div className="text-[10px] font-bold text-[#FF3333]">
                                  {'♥'.repeat(Math.max(0, 10 - qsHeartsUsed))} ({10 - qsHeartsUsed}/10)
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5">
                                <div className="bg-white border-2 border-[#1a1a1a] rounded-lg p-1.5 shadow-[2px_2px_0px_#1a1a1a] flex flex-col items-center justify-center shrink-0 w-24 h-20">
                                  {qsSampleSketches[qsActiveSketchIdx].svgType === 'pikachu' && (
                                    <svg viewBox="0 0 120 90" className="w-20 h-14">
                                      <path d="M35 20 L25 5 L45 15 Z" fill="#FFE156" stroke="#1a1a1a" strokeWidth="2.5" />
                                      <path d="M85 20 L95 5 L75 15 Z" fill="#FFE156" stroke="#1a1a1a" strokeWidth="2.5" />
                                      <circle cx="60" cy="48" r="28" fill="#FFE156" stroke="#1a1a1a" strokeWidth="2.5" />
                                      <circle cx="50" cy="42" r="3.5" fill="#1a1a1a" />
                                      <circle cx="70" cy="42" r="3.5" fill="#1a1a1a" />
                                      <circle cx="42" cy="54" r="5" fill="#FF3333" stroke="#1a1a1a" strokeWidth="1.5" />
                                      <circle cx="78" cy="54" r="5" fill="#FF3333" stroke="#1a1a1a" strokeWidth="1.5" />
                                    </svg>
                                  )}
                                  {qsSampleSketches[qsActiveSketchIdx].svgType === 'spiderman' && (
                                    <svg viewBox="0 0 120 90" className="w-20 h-14">
                                      <ellipse cx="60" cy="45" rx="26" ry="32" fill="#ef4444" stroke="#1a1a1a" strokeWidth="2.5" />
                                      <path d="M42 38 Q50 28 56 42 Z" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2.5" />
                                      <path d="M78 38 Q70 28 64 42 Z" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2.5" />
                                    </svg>
                                  )}
                                  {qsSampleSketches[qsActiveSketchIdx].svgType === 'pyramid' && (
                                    <svg viewBox="0 0 120 90" className="w-20 h-14">
                                      <polygon points="60,15 20,75 100,75" fill="#f59e0b" stroke="#1a1a1a" strokeWidth="2.5" />
                                    </svg>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0 space-y-1.5">
                                  <div className="text-[10px] bg-[#FFF3B0] border border-[#1a1a1a] rounded px-2 py-0.5 font-semibold truncate">
                                    💡 {qsSampleSketches[qsActiveSketchIdx].hint}
                                  </div>
                                  {qsGuessedSuccess ? (
                                    <div className="bg-[#2ECC71] border border-[#1a1a1a] rounded p-1.5 font-extrabold text-[10px] text-center">
                                      🎉 Indovinato: "{qsSampleSketches[qsActiveSketchIdx].word}"!
                                    </div>
                                  ) : (
                                    <form onSubmit={handleQsGuessSubmit} className="flex gap-1">
                                      <input
                                        type="text"
                                        value={qsGuessInput}
                                        onChange={(e) => setQsGuessInput(e.target.value)}
                                        placeholder={`Prova "${qsSampleSketches[qsActiveSketchIdx].word}"...`}
                                        className="flex-1 min-w-0 text-[11px] bg-white border border-[#1a1a1a] rounded px-2 py-1 font-bold focus:outline-none"
                                      />
                                      <button
                                        type="submit"
                                        className="text-[10px] font-extrabold px-2 py-1 rounded bg-[#FFE156] border border-[#1a1a1a] cursor-pointer"
                                      >
                                        Invia
                                      </button>
                                    </form>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-2.5 space-y-1.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <div className="flex gap-1">
                                  {['One Piece', 'Pikachu', 'Batman'].map((w) => (
                                    <button
                                      key={w}
                                      type="button"
                                      onClick={() => setQsDrawWord(w)}
                                      className={`px-1.5 py-0.5 rounded border border-[#1a1a1a] font-bold cursor-pointer ${
                                        qsDrawWord === w ? 'bg-[#FFE156]' : 'bg-white'
                                      }`}
                                    >
                                      {w}
                                    </button>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={clearQsCanvas}
                                  className="px-1.5 py-0.5 rounded bg-white border border-[#1a1a1a] font-bold cursor-pointer"
                                >
                                  🗑️ Pulisci
                                </button>
                              </div>
                              <div className="relative bg-white border-2 border-[#1a1a1a] rounded-lg overflow-hidden">
                                <canvas
                                  ref={qsCanvasRef}
                                  width={380}
                                  height={95}
                                  onMouseDown={startQsCanvasDraw}
                                  onMouseMove={moveQsCanvasDraw}
                                  onMouseUp={stopQsCanvasDraw}
                                  onMouseLeave={stopQsCanvasDraw}
                                  onTouchStart={startQsCanvasDraw}
                                  onTouchMove={moveQsCanvasDraw}
                                  onTouchEnd={stopQsCanvasDraw}
                                  className="w-full h-[95px] cursor-crosshair block"
                                />
                                <span className="absolute top-1 right-1.5 text-[9px] font-bold text-zinc-400 pointer-events-none">
                                  ✏️ Disegna "{qsDrawWord}"
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,#FFE156_0px,#FFE156_20px,#00E5CC_20px,#00E5CC_40px,#FF3CAC_40px,#FF3CAC_60px)] border-t border-[#1a1a1a]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Tags & GitHub */}
                  <div className="pt-4 mt-4 border-t border-stone-200/70 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {['TypeScript', 'React 19', 'Express + SQLite', 'Playwright (14 E2E)', 'Canvas'].map((t) => (
                        <span
                          key={t}
                          className={`font-mono-code text-[10px] px-2 py-0.5 rounded-md border ${
                            isDark
                              ? 'bg-slate-800/90 text-slate-200 border-slate-700'
                              : 'bg-stone-100 text-zinc-800 border-stone-200'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="https://github.com/AndrewJar09-star/progetto-tech-web-quicksketch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ${
                        isDark ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-800'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
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
