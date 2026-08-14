import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const careers = [
  {
    id: 'dev',
    title: 'Desenvolvimento de Software',
    area: 'Tecnologia',
    salary: 'R$ 4.000 a R$ 10.000+',
    icon: '💻',
    description: 'Cria aplicações, sistemas e soluções digitais para resolver problemas reais.',
    skills: ['Lógica', 'Programação', 'Resolução de problemas'],
    formation: 'Tecnólogo, bacharelado ou cursos técnicos e livres.'
  },
  {
    id: 'design',
    title: 'Design Digital',
    area: 'Criatividade',
    salary: 'R$ 3.000 a R$ 8.000+',
    icon: '🎨',
    description: 'Desenha experiências, interfaces e soluções visuais para pessoas e empresas.',
    skills: ['Criatividade', 'Comunicação visual', 'UX/UI'],
    formation: 'Tecnólogo, graduação ou formação especializada.'
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    area: 'Comunicação',
    salary: 'R$ 3.000 a R$ 9.000+',
    icon: '📣',
    description: 'Planeja estratégias para marcas, conteúdos, campanhas e relacionamento com o público.',
    skills: ['Comunicação', 'Análise', 'Criatividade'],
    formation: 'Graduação, tecnólogo ou cursos de especialização.'
  }
];

const courses = [
  {
    id: 'ads',
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Centro Universitário UNA',
    location: 'Contagem - MG',
    price: 'R$ 399/mês',
    modality: 'Presencial e Híbrido',
    duration: '2,5 anos',
    badge: 'Tecnologia',
    compatibility: '92%',
    description: 'Curso focado em desenvolvimento de sistemas, programação, bancos de dados e soluções digitais.',
    highlights: ['Programação', 'Banco de dados', 'Projetos práticos', 'Desenvolvimento web']
  },
  {
    id: 'adm',
    title: 'Administração',
    institution: 'PUC Minas',
    location: 'Contagem / Belo Horizonte - MG',
    price: 'R$ 600/mês',
    modality: 'Presencial',
    duration: '4 anos',
    badge: 'Negócios',
    compatibility: '82%',
    description: 'Formação para gestão, estratégia, empreendedorismo e tomada de decisões.',
    highlights: ['Gestão', 'Empreendedorismo', 'Finanças', 'Estratégia']
  },
  {
    id: 'design',
    title: 'Design Digital',
    institution: 'Centro Universitário UNA',
    location: 'Belo Horizonte - MG',
    price: 'R$ 500/mês',
    modality: 'Híbrido',
    duration: '2 anos',
    badge: 'Criatividade',
    compatibility: '78%',
    description: 'Curso voltado para criação de interfaces, experiências digitais e comunicação visual.',
    highlights: ['UX/UI', 'Prototipação', 'Pesquisa', 'Design']
  }
];

const defaultGoals = [
  { id: 1, title: 'Conhecer 3 profissões da área de tecnologia', done: true },
  { id: 2, title: 'Pesquisar um curso de programação', done: true },
  { id: 3, title: 'Conversar com a Lumi sobre minhas dúvidas', done: false },
  { id: 4, title: 'Realizar uma atividade prática de lógica', done: false }
];



function DemoScreen({start}) {
  return <div className="demo-screen">
    <div className="demo-card">
      <img src="/futuriza-logo.png" className="demo-logo"/>
      <h1>Sua jornada profissional começa aqui</h1>
      <p>Uma experiência personalizada com inteligência artificial para conectar você ao seu futuro.</p>
      <div className="demo-steps">
        <span>1. Descobrir perfil</span><span>2. Encontrar caminhos</span><span>3. Acompanhar evolução</span>
      </div>
      <button className="primary" onClick={start}>🚀 Iniciar experiência</button>
    </div>
  </div>
}

function LoginScreen({onLogin}) {
  return <div className="login-screen">
    <div className="login-card">
      <img src="/futuriza-logo.png" className="login-logo" alt="Futuriza" />
      <h1>Bem-vindo à Futuriza</h1>
      <p>Antes de explorar oportunidades, vamos conhecer seu perfil profissional.</p>
      <input placeholder="E-mail" />
      <input placeholder="Senha" type="password" />
      <label className="remember"><input type="checkbox"/> Lembrar de mim</label>
      <button className="primary-btn" onClick={onLogin}>Entrar</button>
      <span className="login-link">Esqueci minha senha</span>
    </div>
  </div>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [demoStarted, setDemoStarted] = useState(false);
  const [page, setPage] = useState('test');
  const [testStep, setTestStep] = useState(0);
  const [resultReady, setResultReady] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(careers[0]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [courseOpen, setCourseOpen] = useState(null);
  const [goals, setGoals] = useState(defaultGoals);
  const [journeyChatOpen, setJourneyChatOpen] = useState(false);
  const [journeyStep, setJourneyStep] = useState(0);
  const [resultChatOpen, setResultChatOpen] = useState(false);
  const [lumiStep, setLumiStep] = useState(0);
  const [savedCourses, setSavedCourses] = useState([]);

  const progress = useMemo(() => {
    const done = goals.filter(g => g.done).length;
    return Math.round((done / goals.length) * 100);
  }, [goals]);

  const go = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleGoal = (id) => {
    setGoals(gs => gs.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const openJourneyChat = () => {
    setJourneyChatOpen(true);
    setJourneyStep(0);
  };

  const openResultChat = () => {
    setResultChatOpen(true);
    setLumiStep(0);
  };

  const saveCourse = (id) => {
    setSavedCourses(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const testQuestions = [
    { q: 'Você se identifica mais com qual atividade?', options: ['Criar soluções no computador', 'Comunicar ideias', 'Criar peças visuais', 'Ajudar pessoas'] },
    { q: 'Em um projeto, o que mais chama sua atenção?', options: ['Resolver problemas', 'Trabalhar em equipe', 'Criar algo novo', 'Organizar informações'] },
    { q: 'Qual ambiente parece mais interessante?', options: ['Tecnologia e inovação', 'Agência e comunicação', 'Estúdio e criação', 'Educação e pessoas'] }
  ];

  if (!demoStarted) {
    return <DemoScreen start={() => setDemoStarted(true)} />;
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <Header page={page} go={go} />
      <main className="main-content">
        {page === 'home' && <Home go={go} progress={progress} />}
        {page === 'test' && (
          <Test
            step={testStep}
            setStep={setTestStep}
            questions={testQuestions}
            resultReady={resultReady}
            setResultReady={setResultReady}
            go={go}
          />
        )}
        {page === 'result' && (
          <Result
            go={go}
            openResultChat={openResultChat}
            resultChatOpen={resultChatOpen}
            lumiStep={lumiStep}
            setLumiStep={setLumiStep}
            setResultChatOpen={setResultChatOpen}
            setSelectedCareer={setSelectedCareer}
          />
        )}
        {page === 'careers' && (
          <Careers
            setSelectedCareer={setSelectedCareer}
            selectedCareer={selectedCareer}
            go={go}
          />
        )}
        {page === 'careerDetail' && (
          <CareerDetail career={selectedCareer} go={go} setSelectedCourse={setSelectedCourse} />
        )}
        {page === 'courses' && (
          <Courses
            courses={courses}
            courseOpen={courseOpen}
            setCourseOpen={setCourseOpen}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            go={go}
            savedCourses={savedCourses}
            saveCourse={saveCourse}
          />
        )}
        {page === 'journey' && (
          <Journey
            goals={goals}
            progress={progress}
            toggleGoal={toggleGoal}
            openJourneyChat={openJourneyChat}
            journeyChatOpen={journeyChatOpen}
            journeyStep={journeyStep}
            setJourneyStep={setJourneyStep}
            setJourneyChatOpen={setJourneyChatOpen}
            go={go}
          />
        )}
        {page === 'profile' && <Profile progress={progress} savedCourses={savedCourses} go={go} />}
      </main>
      <BottomNav page={page} go={go} />
    </div>
  );
}

function Header({ page, go }) {
  return (
    <header className="topbar">
      <div className="brand" onClick={() => go('home')} role="button" tabIndex={0}>
        <img className="brand-logo" src="/futuriza-logo.png" alt="Futuriza" />
      </div>
      <div className="topbar-actions">
        <button className="icon-button" onClick={() => go('journey')} aria-label="Minha jornada">✨</button>
        <button className="avatar" onClick={() => go('profile')}>TS</button>
      </div>
    </header>
  );
}

function BottomNav({ page, go }) {
  const items = [
    ['home', '⌂', 'Início'], ['careers', '⌕', 'Carreiras'], ['courses', '🎓', 'Cursos'], ['journey', '◔', 'Jornada']
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([id, icon, label]) => (
        <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}>
          <span>{icon}</span><small>{label}</small>
        </button>
      ))}
    </nav>
  );
}

function Home({ go, progress }) {
  return (
    <div className="page">
      <section className="hero-card">
        <div className="eyebrow">SUA JORNADA PROFISSIONAL</div>
        <h1>Olá, Tiago 👋<br/>Vamos continuar construindo seu futuro?</h1>
        <p>A Lumi continua acompanhando sua evolução e encontrando caminhos profissionais alinhados ao seu perfil.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => go('journey')}>Continuar jornada</button>
          <button className="secondary" onClick={() => go('careers')}>Explorar carreiras</button>
        </div>
      </section>

      <section className="ai-banner" onClick={() => go('result')}>
        <div className="ai-orb">🤖</div>
        <div><strong>A Lumi tem uma sugestão para você ✨</strong><p>Analisei seu perfil e encontrei caminhos que podem combinar com seus objetivos.</p></div>
        <span>→</span>
      </section>

      <section className="journey-head">
        <div><span className="eyebrow">MINHA EVOLUÇÃO</span><h1>{progress}% concluído</h1><p>Você já deu os primeiros passos. Continue explorando para descobrir novas possibilidades.</p></div>
      </section>

      <div className="home-grid">
        <button className="feature-card" onClick={() => go('journey')}><span className="card-icon orange">🎯</span><div><strong>Minha Jornada</strong><p>Acompanhe suas metas e evolução</p></div><span className="arrow">→</span></button>
        <button className="feature-card" onClick={() => go('careers')}><span className="card-icon blue">💼</span><div><strong>Explorar carreiras</strong><p>Veja áreas compatíveis com você</p></div><span className="arrow">→</span></button>
        <button className="feature-card" onClick={() => go('courses')}><span className="card-icon green">🎓</span><div><strong>Cursos</strong><p>Encontre formações ideais</p></div><span className="arrow">→</span></button>
      </div>

      <section className="reflection-card">
        <span className="eyebrow">CONQUISTA RECENTE</span>
        <h2>🏆 Você completou seu teste vocacional!</h2>
        <p>A Lumi transformou suas respostas em possibilidades para ajudar você a tomar decisões mais conscientes.</p>
      </section>
    </div>
  );
}
function Test({ step, setStep, questions, resultReady, setResultReady, go }) {
  if (step === 0 && !resultReady) {
    return (
      <div className="page narrow">
        <div className="onboarding-card">
          <div className="lumi-bubble">🤖</div>
          <span className="eyebrow">BEM-VINDO À FUTURIZA</span>
          <h1>Vamos descobrir caminhos que combinam com você.</h1>
          <p>A Lumi fará algumas perguntas rápidas para entender seus interesses, habilidades e possíveis áreas profissionais.</p>
          <div className="onboarding-info">
            <div><strong>3</strong><span>Perguntas</span></div>
            <div><strong>1 min</strong><span>Tempo</span></div>
            <div><strong>IA</strong><span>Análise</span></div>
          </div>
          <button className="primary full" onClick={() => setStep(0.5)}>Começar descoberta 🚀</button>
        </div>
      </div>
    );
  }

  if (step === 0.5) {
    return (
      <div className="page narrow">
        <div className="test-card">
          <div className="progress-head"><span>1 de {questions.length}</span></div>
          <div className="progress-line"><span style={{width: `${(1 / questions.length) * 100}%`}} /></div>
          <span className="eyebrow">LUMI PERGUNTA</span>
          <h1>{questions[0].q}</h1>
          <div className="option-list">
            {questions[0].options.map((opt, i) => <button className="option" key={opt} onClick={() => setStep(1)}><span>{String.fromCharCode(65+i)}</span>{opt}<b>→</b></button>)}
          </div>
        </div>
      </div>
    );
  }

  if (resultReady) {
    return (
      <div className="page narrow">
        <div className="result-preview-card">
          <span className="eyebrow">RESULTADO PRONTO</span>
          <div className="result-icon">🧭</div>
          <h1>Seu perfil está pronto.</h1>
          <p>Você demonstrou uma combinação de curiosidade, criatividade e interesse por tecnologia.</p>
          <button className="primary full" onClick={() => go('result')}>Ver meu resultado</button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="page narrow">
      <div className="progress-head"><button className="back-button" onClick={() => go('home')}>←</button><span>{step + 1} de {questions.length}</span></div>
      <div className="progress-line"><span style={{width: `${((step + 1) / questions.length) * 100}%`}} /></div>
      <div className="test-card">
        <span className="eyebrow">TESTE DE AUTOCONHECIMENTO</span>
        <h1>{q.q}</h1>
        <div className="option-list">
          {q.options.map((opt, i) => <button className="option" key={opt} onClick={() => {
            if (step < questions.length - 1) setStep(step + 1); else setResultReady(true);
          }}><span>{String.fromCharCode(65 + i)}</span>{opt}<b>→</b></button>)}
        </div>
      </div>
      <p className="hint">As respostas são parte da demonstração do protótipo.</p>
    </div>
  );
}

function Result({ go, openResultChat, resultChatOpen, lumiStep, setLumiStep, setResultChatOpen, setSelectedCareer }) {
  return (
    <div className="page">
      <section className="result-hero">
        <span className="eyebrow">SEU RESULTADO</span>
        <div className="result-avatar">🤖</div>
        <span className="ai-analysis">Lumi analisou suas respostas ✨</span>
        <h1>Explorador Criativo</h1>
        <p>Seu perfil combina criatividade, tecnologia e vontade de transformar ideias em soluções.</p>
        <div className="compatibility-card">
          <strong>Compatibilidade de áreas</strong>
          <div><span>Tecnologia</span><b>87%</b></div>
          <div><span>Design e Criatividade</span><b>78%</b></div>
          <div><span>Gestão e Estratégia</span><b>70%</b></div>
        </div>
      </section>

      <div className="tag-row"><span>Tecnologia</span><span>Criatividade</span><span>Resolução de problemas</span></div>

      <section className="insight-grid">
        <div className="insight-card"><strong>Seu destaque</strong><p>Gosta de entender como as coisas funcionam e experimentar novas possibilidades.</p></div>
        <div className="insight-card"><strong>Ambientes que podem combinar</strong><p>Times de tecnologia, criação digital e projetos com impacto.</p></div>
      </section>

      <section className="not-match-card">
        <div><span className="eyebrow">NÃO SE IDENTIFICOU?</span><h3>O resultado é só um ponto de partida.</h3><p>A Lumi pode conversar com você para entender melhor o que faz sentido na sua realidade.</p></div>
        <button className="primary" onClick={openResultChat}>Conversar com a Lumi</button>
      </section>

      <section className="section-head"><div><span className="eyebrow">PRÓXIMO PASSO</span><h2>Carreiras para explorar</h2></div><button className="text-button" onClick={() => go('careers')}>Ver todas →</button></section>
      <div className="career-grid">
        {careers.slice(0,3).map(c => <CareerMiniCard key={c.id} career={c} onClick={() => { setSelectedCareer(c); go('careerDetail'); }} />)}
      </div>

      {resultChatOpen && <LumiModal type="result" step={lumiStep} setStep={setLumiStep} close={() => setResultChatOpen(false)} go={go} />}
    </div>
  );
}

function LumiModal({ type, step, setStep, close, go }) {
  const resultFlow = [
    { who: 'lumi', text: 'Analisei seu perfil e encontrei caminhos que podem combinar com seus objetivos. Vamos descobrir juntos?' },
    { who: 'lumi', text: 'O que mais importa para você em uma carreira?', options: ['💰 Ter boa remuneração', '❤️ Fazer algo que gosto', '🚀 Criar coisas novas', '🌎 Impactar pessoas'] },
    { who: 'user', text: 'Gosto de criar coisas no computador' },
    { who: 'lumi', text: 'Isso reforça um interesse por tecnologia e criação de soluções. Quer explorar profissões que unem essas características?', options: ['Explorar Desenvolvimento de Software', 'Ver outras profissões'] }
  ];
  const journeyFlow = [
    { who: 'lumi', text: 'Vi que você teve uma nova experiência. Quer me contar como foi?', options: ['Participei de uma palestra sobre tecnologia', 'Conheci uma profissão', 'Fiz um curso'] },
    { who: 'user', text: 'Participei de uma palestra sobre tecnologia' },
    { who: 'lumi', text: 'Que interessante! O que mais chamou sua atenção?', options: ['A criação de aplicativos', 'A parte de programação', 'O impacto da tecnologia'] },
    { who: 'user', text: 'A criação de aplicativos' },
    { who: 'lumi', text: 'Isso reforça seu interesse em criar soluções digitais. Essa experiência pode ajudar você a transformar curiosidade em uma direção mais concreta.', options: ['Criar uma nova meta'] },
    { who: 'lumi', text: 'Meta adicionada: explorar cursos de Desenvolvimento de Software. ✅', options: ['Voltar para Minha Jornada'] }
  ];
  const flow = type === 'result' ? resultFlow : journeyFlow;
  const current = flow[Math.min(step, flow.length - 1)];

  const next = (opt) => {
    if (type === 'result' && step === 1) setStep(2);
    else if (type === 'result' && step === 3) { go('careerDetail'); close(); }
    else if (type === 'journey' && step === 0) setStep(1);
    else if (type === 'journey' && step === 2) setStep(3);
    else if (type === 'journey' && step === 4) setStep(5);
    else if (type === 'journey' && step === 5) close();
    else setStep(step + 1);
  };

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="lumi-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-top"><div className="lumi-title"><span className="lumi-icon">🤖</span><div><strong>Lumi ✨</strong><small>Sua mentora de carreira</small></div></div><button onClick={close}>×</button></div>
        <div className="chat-body">
          <div className={current.who === 'lumi' ? 'bubble lumi' : 'bubble user'}>{current.text}</div>
          {current.options && <div className="chat-options">{current.options.map(o => <button key={o} onClick={() => next(o)}>{o}<span>→</span></button>)}</div>}
        </div>
      </div>
    </div>
  );
}

function Careers({ setSelectedCareer, selectedCareer, go }) {
  return (
    <div className="page">
      <section className="page-intro"><span className="eyebrow">EXPLORAR</span><h1>Carreiras que podem combinar com você.</h1><p>Informações para comparar possibilidades antes de tomar uma decisão.</p></section>
      <div className="filter-row"><button>Todos</button><button>Tecnologia</button><button>Criatividade</button><button>Comunicação</button></div>
      <div className="career-list">
        {careers.map(c => <CareerCard key={c.id} career={c} onClick={() => { setSelectedCareer(c); go('careerDetail'); }} />)}
      </div>
      <button className="ai-banner compact" onClick={() => go('journey')}><span className="ai-orb">✦</span><div><strong>Não sabe por onde começar?</strong><p>Converse com a Lumi.</p></div><span>→</span></button>
    </div>
  );
}

function CareerMiniCard({ career, onClick }) { return <button className="career-mini" onClick={onClick}><span className="career-icon">{career.icon}</span><div><strong>{career.title}</strong><small>{career.area}</small></div><span>→</span></button>; }
function CareerCard({ career, onClick }) { return <button className="career-card" onClick={onClick}><span className="career-icon big">{career.icon}</span><div className="career-content"><div className="badge">{career.area}</div><h3>{career.title}</h3><p>{career.description}</p><div className="meta-row"><span>💰 {career.salary}</span><span>→ Ver detalhes</span></div></div></button>; }

function CareerDetail({ career, go, setSelectedCourse }) {
  return (
    <div className="page">
      <button className="back-link" onClick={() => go('careers')}>← Voltar para carreiras</button>
      <section className="detail-hero"><span className="career-icon big">{career.icon}</span><span className="badge">{career.area}</span><h1>{career.title}</h1><p>{career.description}</p></section>
      <div className="detail-grid">
        <div className="detail-card"><span className="eyebrow">O QUE FAZ</span><p>{career.description} Em diferentes contextos, pode participar de projetos, pesquisas e entregas digitais.</p></div>
        <div className="detail-card"><span className="eyebrow">HABILIDADES</span><div className="tag-row">{career.skills.map(s => <span key={s}>{s}</span>)}</div></div>
        <div className="detail-card"><span className="eyebrow">FORMAÇÃO</span><p>{career.formation}</p></div>
        <div className="detail-card"><span className="eyebrow">FAIXA SALARIAL</span><h2>{career.salary}</h2><small>Valor ilustrativo do protótipo.</small></div>
      </div>
      <div className="cta-strip"><div><span className="eyebrow">QUER IR ALÉM?</span><h3>Encontre cursos relacionados.</h3><p>Compare formação, modalidade, localização e valor.</p></div><button className="primary" onClick={() => { setSelectedCourse(courses[0]); go('courses'); }}>Explorar cursos</button></div>
    </div>
  );
}

function Courses({ courses, courseOpen, setCourseOpen, selectedCourse, setSelectedCourse, go, savedCourses, saveCourse }) {
  return (
    <div className="page">
      <section className="page-intro"><span className="eyebrow">FORMAÇÃO</span><h1>Encontre cursos para o próximo passo.</h1><p>Compare opções de forma simples e veja o que cabe no seu momento.</p></section>
      <div className="location-banner">📍 Cursos próximos: <strong>Contagem - MG</strong></div><div className="filter-row"><button>Todos</button><button>📍 Contagem</button><button>Presencial</button><button>Híbrido</button><button>EAD</button></div>
      <div className="course-grid">
        {courses.map(c => <div className="course-card" key={c.id}>
          <div className="course-top"><span className="badge">{c.badge}</span><button className="save" onClick={() => saveCourse(c.id)}>{savedCourses.includes(c.id) ? '★' : '☆'}</button></div>
          <h3>{c.title}</h3><p className="institution">🏫 {c.institution}</p><span className="compatibility">⭐ {c.compatibility} compatibilidade</span>
          <div className="course-meta"><span>📍 {c.location}</span><span>💰 {c.price}</span></div>
          <button className="secondary full" onClick={() => { setCourseOpen(courseOpen === c.id ? null : c.id); setSelectedCourse(c); }}>{courseOpen === c.id ? 'Fechar detalhes' : 'Ver detalhes'}</button>
          {courseOpen === c.id && <CourseDetails course={c} go={go} />}
        </div>)}
      </div>
    </div>
  );
}

function CourseDetails({ course, go }) {
  return <div className="course-details"><div className="detail-line"><span>Modalidade</span><strong>{course.modality}</strong></div><div className="detail-line"><span>Duração</span><strong>{course.duration}</strong></div><div className="detail-line"><span>Localização</span><strong>{course.location}</strong></div><div className="detail-line"><span>Investimento</span><strong>{course.price}</strong></div><p>{course.description}</p><div className="mini-list">{course.highlights.map(h => <span key={h}>✓ {h}</span>)}</div><button className="text-button" onClick={() => go('journey')}>Salvar e acompanhar na jornada →</button></div>;
}

function Journey({ goals, progress, toggleGoal, openJourneyChat, journeyChatOpen, journeyStep, setJourneyStep, setJourneyChatOpen, go }) {
  return (
    <div className="page">
      <section className="journey-head">
        <div><span className="eyebrow">MINHA JORNADA</span><h1>Sua evolução continua aqui.</h1><p>A Futuriza acompanha cada passo enquanto você descobre e constrói seu futuro.</p></div>
        <div className="progress-ring"><strong>{progress}%</strong><span>concluído</span></div>
      </section>

      <section className="lumi-journey-card">
        <span className="eyebrow">LUMI AI</span>
        <h2>Tenho uma nova sugestão para você ✨</h2>
        <p>Continue explorando tecnologia e criatividade. Pequenas ações ajudam a confirmar seus caminhos profissionais.</p>
        <button className="primary" onClick={openJourneyChat}>Conversar com Lumi</button>
      </section>

      <section className="goals-panel">
        <div className="panel-title"><div><span className="eyebrow">OBJETIVOS</span><h2>Minhas metas</h2></div><button className="secondary" onClick={openJourneyChat}>＋ Fiz algo!</button></div>
        <div className="goal-list">{goals.map(g => <button className={'goal-row ' + (g.done ? 'done' : '')} key={g.id} onClick={() => toggleGoal(g.id)}><span className="check">{g.done ? '✓' : ''}</span><span>{g.title}</span><span className="goal-arrow">{g.done ? 'Concluída' : 'Marcar'}</span></button>)}</div>
      </section>

      <section className="achievement-card">
        <span>🏆</span><div><small>CONQUISTA RECENTE</small><h3>Você completou seu teste vocacional!</h3><p>A Lumi usou suas respostas para criar seu primeiro caminho profissional.</p></div>
      </section>

      <section className="timeline"><div className="section-head"><div><span className="eyebrow">HISTÓRICO</span><h2>Minha evolução</h2></div></div><div className="timeline-item"><span className="dot purple-dot">✦</span><div><small>Hoje</small><h3>Você registrou uma nova descoberta.</h3><p>A Lumi identificou avanços no seu interesse profissional.</p></div></div><div className="timeline-item"><span className="dot blue-dot">✓</span><div><small>Ontem</small><h3>Você concluiu uma etapa da sua jornada.</h3></div></div></section>

      <section className="reflection-card"><span className="eyebrow">COM A LUMI</span><h2>Seu acompanhamento vai além de metas.</h2><p>Conte algo que você fez. A Lumi entende sua experiência e mostra como isso ajuda no seu futuro.</p><button className="primary" onClick={openJourneyChat}>Fiz algo!</button></section>
      {journeyChatOpen && <LumiModal type="journey" step={journeyStep} setStep={setJourneyStep} close={() => setJourneyChatOpen(false)} go={go} />}
    </div>
  );
}

function Profile({ progress, savedCourses, go }) {
  return <div className="page narrow"><section className="profile-hero"><div className="avatar large">TS</div><span className="eyebrow">MEU PERFIL</span><h1>Tiago Souza</h1><p>Explorador Criativo · Tecnologia</p></section><div className="profile-stats"><div><strong>{progress}%</strong><span>Jornada</span></div><div><strong>{savedCourses.length}</strong><span>Cursos salvos</span></div><div><strong>3</strong><span>Carreiras</span></div></div><div className="profile-list"><button onClick={() => go('journey')}>📈 Minha Jornada <span>→</span></button><button onClick={() => go('courses')}>🎓 Cursos salvos <span>→</span></button><button onClick={() => go('result')}>🧠 Meu resultado <span>→</span></button></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
