import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Flag database with all country information
const flagDatabase = {
  flags: [
    { id: "US", code: "us", name: { en: "United States", el: "ΗΠΑ" }, continent: "North America", aspectRatio: "10:19", adoptionDate: "1960-07-04", designPattern: "Striped with canton", colors: [{ name: { en: "Red", el: "Κόκκινο" }, hex: "#B22234", percentage: 41, symbolism: { en: "Valor", el: "Ανδρεία" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 41, symbolism: { en: "Purity", el: "Αγνότητα" } }, { name: { en: "Blue", el: "Μπλε" }, hex: "#3C3B6E", percentage: 18, symbolism: { en: "Justice", el: "Δικαιοσύνη" } }], geometry: { stripes: { count: 13, orientation: "horizontal" }, stars: { count: 50, points: 5 }, canton: { present: true } }, symbols: { text: null }, symbolism: { en: "50 stars for states, 13 stripes for colonies", el: "50 αστέρια για πολιτείες, 13 λωρίδες για αποικίες" }, funFacts: [{ en: "Designed by a 17-year-old student", el: "Σχεδιάστηκε από 17χρονο μαθητή" }] },
    { id: "GR", code: "gr", name: { en: "Greece", el: "Ελλάδα" }, continent: "Europe", aspectRatio: "2:3", adoptionDate: "1978-12-22", designPattern: "Striped with canton and cross", colors: [{ name: { en: "Blue", el: "Μπλε" }, hex: "#0D5EAF", percentage: 55, symbolism: { en: "Sky and sea", el: "Ουρανός και θάλασσα" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 45, symbolism: { en: "Purity", el: "Αγνότητα" } }], geometry: { stripes: { count: 9, orientation: "horizontal" }, stars: null, canton: { present: true } }, symbols: { text: null }, symbolism: { en: "9 stripes for 'Freedom or Death' syllables", el: "9 λωρίδες για τις συλλαβές του 'Ελευθερία ή Θάνατος'" }, funFacts: [{ en: "Called 'Γαλανόλευκη' in Greek", el: "Ονομάζεται 'Γαλανόλευκη'" }] },
    { id: "JP", code: "jp", name: { en: "Japan", el: "Ιαπωνία" }, continent: "Asia", aspectRatio: "2:3", adoptionDate: "1999-08-13", designPattern: "Charged (circle)", colors: [{ name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 81, symbolism: { en: "Purity", el: "Αγνότητα" } }, { name: { en: "Red", el: "Κόκκινο" }, hex: "#BC002D", percentage: 19, symbolism: { en: "The sun", el: "Ο ήλιος" } }], geometry: { stripes: null, stars: null, canton: null }, symbols: { text: null }, symbolism: { en: "Land of the Rising Sun", el: "Χώρα του Ανατέλλοντος Ηλίου" }, funFacts: [{ en: "One of the simplest flags", el: "Μία από τις πιο απλές σημαίες" }] },
    { id: "BR", code: "br", name: { en: "Brazil", el: "Βραζιλία" }, continent: "South America", aspectRatio: "7:10", adoptionDate: "1992-05-11", designPattern: "Charged (rhombus)", colors: [{ name: { en: "Green", el: "Πράσινο" }, hex: "#009739", percentage: 55, symbolism: { en: "Forests", el: "Δάση" } }, { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FEDD00", percentage: 28, symbolism: { en: "Gold", el: "Χρυσός" } }, { name: { en: "Blue", el: "Μπλε" }, hex: "#002776", percentage: 12, symbolism: { en: "Sky", el: "Ουρανός" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 5, symbolism: { en: "Peace", el: "Ειρήνη" } }], geometry: { stripes: null, stars: { count: 27, points: 5 }, canton: null }, symbols: { text: { content: "ORDEM E PROGRESSO", meaning: { en: "Order and Progress", el: "Τάξη και Πρόοδος" } } }, symbolism: { en: "Stars show sky at Republic's proclamation", el: "Αστέρια δείχνουν τον ουρανό κατά την ανακήρυξη" }, funFacts: [{ en: "Only country with motto on flag", el: "Η μόνη χώρα με σύνθημα στη σημαία" }] },
    { id: "AU", code: "au", name: { en: "Australia", el: "Αυστραλία" }, continent: "Oceania", aspectRatio: "1:2", adoptionDate: "1954-04-14", designPattern: "Blue Ensign with stars", colors: [{ name: { en: "Blue", el: "Μπλε" }, hex: "#00008B", percentage: 70, symbolism: { en: "Seas", el: "Θάλασσες" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 18, symbolism: { en: "Purity", el: "Αγνότητα" } }, { name: { en: "Red", el: "Κόκκινο" }, hex: "#FF0000", percentage: 12, symbolism: { en: "British heritage", el: "Βρετανική κληρονομιά" } }], geometry: { stripes: null, stars: { count: 6, points: 7 }, canton: { present: true } }, symbols: { text: null }, symbolism: { en: "Southern Cross constellation", el: "Αστερισμός Νότιος Σταυρός" }, funFacts: [{ en: "Chosen from 32,000 designs", el: "Επιλέχθηκε από 32.000 σχέδια" }] },
    { id: "TR", code: "tr", name: { en: "Turkey", el: "Τουρκία" }, continent: "Asia", aspectRatio: "2:3", adoptionDate: "1936-05-29", designPattern: "Charged (crescent and star)", colors: [{ name: { en: "Red", el: "Κόκκινο" }, hex: "#E30A17", percentage: 85, symbolism: { en: "Blood of martyrs", el: "Αίμα μαρτύρων" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 15, symbolism: { en: "Peace", el: "Ειρήνη" } }], geometry: { stripes: null, stars: { count: 1, points: 5 }, canton: null }, symbols: { text: null }, symbolism: { en: "Star and crescent from Ottoman heritage", el: "Από οθωμανική κληρονομιά" }, funFacts: [{ en: "Called 'Ay Yıldız' (Moon Star)", el: "Ονομάζεται 'Ay Yıldız'" }] },
    { id: "CA", code: "ca", name: { en: "Canada", el: "Καναδάς" }, continent: "North America", aspectRatio: "1:2", adoptionDate: "1965-02-15", designPattern: "Vertical triband with leaf", colors: [{ name: { en: "Red", el: "Κόκκινο" }, hex: "#FF0000", percentage: 50, symbolism: { en: "Sacrifice", el: "Θυσία" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 50, symbolism: { en: "Peace", el: "Ειρήνη" } }], geometry: { stripes: { count: 3, orientation: "vertical" }, stars: null, canton: null }, symbols: { text: null }, symbolism: { en: "Maple leaf - national symbol", el: "Φύλλο σφενδάμου - εθνικό σύμβολο" }, funFacts: [{ en: "Maple leaf has 11 points", el: "Το φύλλο έχει 11 ακτίνες" }] },
    { id: "DE", code: "de", name: { en: "Germany", el: "Γερμανία" }, continent: "Europe", aspectRatio: "3:5", adoptionDate: "1949-05-23", designPattern: "Horizontal triband", colors: [{ name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 33.33, symbolism: { en: "Determination", el: "Αποφασιστικότητα" } }, { name: { en: "Red", el: "Κόκκινο" }, hex: "#DD0000", percentage: 33.33, symbolism: { en: "Bravery", el: "Γενναιότητα" } }, { name: { en: "Gold", el: "Χρυσό" }, hex: "#FFCC00", percentage: 33.34, symbolism: { en: "Freedom", el: "Ελευθερία" } }], geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, canton: null }, symbols: { text: null }, symbolism: { en: "Colors from 19th century unification", el: "Χρώματα ενοποίησης 19ου αιώνα" }, funFacts: [{ en: "Banned during Nazi era", el: "Απαγορεύτηκε στη ναζιστική περίοδο" }] },
    { id: "IN", code: "in", name: { en: "India", el: "Ινδία" }, continent: "Asia", aspectRatio: "2:3", adoptionDate: "1947-07-22", designPattern: "Horizontal triband with wheel", colors: [{ name: { en: "Saffron", el: "Κροκί" }, hex: "#FF9933", percentage: 33.33, symbolism: { en: "Courage", el: "Θάρρος" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 33.33, symbolism: { en: "Peace", el: "Ειρήνη" } }, { name: { en: "Green", el: "Πράσινο" }, hex: "#138808", percentage: 33.34, symbolism: { en: "Faith", el: "Πίστη" } }], geometry: { stripes: { count: 3, orientation: "horizontal" }, stars: null, shapes: [{ name: "Ashoka Chakra", spokes: 24 }], canton: null }, symbols: { text: null }, symbolism: { en: "Ashoka Chakra - wheel of dharma", el: "Τροχός Ashoka - τροχός του dharma" }, funFacts: [{ en: "24 spokes for 24 hours", el: "24 ακτίνες για 24 ώρες" }] },
    { id: "ZA", code: "za", name: { en: "South Africa", el: "Νότια Αφρική" }, continent: "Africa", aspectRatio: "2:3", adoptionDate: "1994-04-27", designPattern: "Y-shaped pall", colors: [{ name: { en: "Red", el: "Κόκκινο" }, hex: "#DE3831", percentage: 18, symbolism: { en: "Blood", el: "Αίμα" } }, { name: { en: "Blue", el: "Μπλε" }, hex: "#002395", percentage: 18, symbolism: { en: "Sky", el: "Ουρανός" } }, { name: { en: "Green", el: "Πράσινο" }, hex: "#007A4D", percentage: 28, symbolism: { en: "Land", el: "Γη" } }, { name: { en: "Yellow", el: "Κίτρινο" }, hex: "#FFB612", percentage: 8, symbolism: { en: "Gold", el: "Χρυσός" } }, { name: { en: "Black", el: "Μαύρο" }, hex: "#000000", percentage: 10, symbolism: { en: "People", el: "Λαός" } }, { name: { en: "White", el: "Λευκό" }, hex: "#FFFFFF", percentage: 18, symbolism: { en: "Peace", el: "Ειρήνη" } }], geometry: { stripes: null, stars: null, canton: null }, symbols: { text: null }, symbolism: { en: "Y-shape symbolizes unity", el: "Το Υ συμβολίζει ενότητα" }, funFacts: [{ en: "One of only two 6-color flags", el: "Μία από τις δύο σημαίες με 6 χρώματα" }] }
  ]
};

// Flag component using flag-icons library
const FlagImage = ({ code, width = 120 }) => {
  const height = Math.round(width * 0.75); // 4:3 aspect for flag display
  return (
    <span
      className={`fi fi-${code}`}
      style={{
        display: 'inline-block',
        width: width,
        height: height,
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default function FlagQuizApp() {
  const [screen, setScreen] = useState('menu');
  const [lang, setLang] = useState('el');
  const [diff, setDiff] = useState('easy');
  const [conts, setConts] = useState(['all']);
  const [curQ, setCurQ] = useState(null);
  const [curF, setCurF] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [sel, setSel] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(30);
  const [active, setActive] = useState(false);
  const [learnF, setLearnF] = useState(null);
  const [scores, setScores] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const flags = useMemo(() => flagDatabase.flags.filter(f => conts.includes('all') || conts.includes(f.continent)), [conts]);
  const shuffle = arr => { const a = [...arr]; for(let i = a.length-1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; };
  const numOpts = (c, p) => shuffle([c, ...p.filter(x => x !== c)].slice(0, 4));

  const genQ = useCallback((f) => {
    const qs = [];
    if (f.geometry?.stars?.count) qs.push({ q: lang === 'el' ? `Πόσα αστέρια έχει η σημαία ${f.name.el};` : `How many stars on ${f.name.en}'s flag?`, a: f.geometry.stars.count, o: numOpts(f.geometry.stars.count, [1, 5, 6, 7, 13, 27, 50]), d: 'easy' });
    if (f.geometry?.stars?.points) qs.push({ q: lang === 'el' ? `Πόσες ακτίνες ανά αστέρι;` : `Points per star?`, a: f.geometry.stars.points, o: numOpts(f.geometry.stars.points, [4, 5, 6, 7, 8]), d: 'medium' });
    if (f.geometry?.stripes) { qs.push({ q: lang === 'el' ? `Πόσες λωρίδες;` : `How many stripes?`, a: f.geometry.stripes.count, o: numOpts(f.geometry.stripes.count, [3, 5, 7, 9, 11, 13]), d: 'easy' }); qs.push({ q: lang === 'el' ? `Οριζόντιες ή κάθετες;` : `Horizontal or vertical?`, a: lang === 'el' ? (f.geometry.stripes.orientation === 'horizontal' ? 'Οριζόντιες' : 'Κάθετες') : f.geometry.stripes.orientation.charAt(0).toUpperCase() + f.geometry.stripes.orientation.slice(1), o: lang === 'el' ? ['Οριζόντιες', 'Κάθετες'] : ['Horizontal', 'Vertical'], d: 'easy' }); }
    if (f.colors?.length) { const dom = [...f.colors].sort((a, b) => b.percentage - a.percentage)[0]; qs.push({ q: lang === 'el' ? `Κυρίαρχο χρώμα;` : `Dominant color?`, a: dom.name[lang], o: shuffle(f.colors.map(c => c.name[lang])), d: 'medium' }); qs.push({ q: lang === 'el' ? `Πόσα χρώματα;` : `How many colors?`, a: f.colors.length, o: numOpts(f.colors.length, [2, 3, 4, 5, 6]), d: 'easy' }); }
    if (f.geometry?.canton !== undefined) qs.push({ q: lang === 'el' ? `Έχει canton;` : `Has canton?`, a: lang === 'el' ? (f.geometry.canton?.present ? 'Ναι' : 'Όχι') : (f.geometry.canton?.present ? 'Yes' : 'No'), o: lang === 'el' ? ['Ναι', 'Όχι'] : ['Yes', 'No'], d: 'medium' });
    qs.push({ q: lang === 'el' ? `Αναλογία διαστάσεων;` : `Aspect ratio?`, a: f.aspectRatio, o: shuffle(['1:2', '2:3', '3:5', '7:10', '10:19'].filter(r => r !== f.aspectRatio).slice(0, 3).concat([f.aspectRatio])), d: 'hard' });
    if (f.symbols?.text) qs.push({ q: lang === 'el' ? `Κείμενο στη σημαία;` : `Text on flag?`, a: f.symbols.text.content, o: shuffle([f.symbols.text.content, 'E PLURIBUS UNUM', 'LIBERTY', 'UNITY']), d: 'hard' });
    if (f.geometry?.shapes?.find(s => s.name === 'Ashoka Chakra')) qs.push({ q: lang === 'el' ? `Ακτίνες Τροχού Ashoka;` : `Ashoka Chakra spokes?`, a: 24, o: numOpts(24, [12, 18, 20, 24, 32]), d: 'hard' });
    const filt = qs.filter(x => diff === 'easy' ? x.d === 'easy' : diff === 'medium' ? x.d !== 'hard' : true);
    return filt.length ? filt[Math.floor(Math.random() * filt.length)] : qs[0];
  }, [lang, diff]);

  const next = useCallback(() => { const f = flags[Math.floor(Math.random() * flags.length)]; setCurF(f); setCurQ(genQ(f)); setSel(null); setShow(false); setTime(diff === 'easy' ? 30 : diff === 'medium' ? 25 : 20); setActive(true); }, [flags, genQ, diff]);
  const start = useCallback(() => { setScore(0); setStreak(0); setTotal(0); setCorrect(0); next(); setScreen('quiz'); }, [next]);

  useEffect(() => {
    if (active && time > 0) {
      const t = setTimeout(() => setTime(x => x - 1), 1000);
      return () => clearTimeout(t);
    } else if (time === 0 && active) {
      answer(null);
    }
  }, [time, active]);

  const answer = (a) => {
    setActive(false);
    setSel(a);
    setShow(true);
    setTotal(x => x + 1);
    const ok = a !== null && a === curQ.a;
    if (ok) {
      setScore(s => s + (diff === 'easy' ? 10 : diff === 'medium' ? 20 : 30) + Math.floor(time / 2));
      setStreak(s => s + 1);
      setBest(b => Math.max(b, streak + 1));
      setCorrect(c => c + 1);
      if ((streak + 1) % 5 === 0) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }
  };

  const end = () => {
    setScores(p => [...p, { score, correct, total, date: new Date().toLocaleDateString(), diff }].sort((a, b) => b.score - a.score).slice(0, 10));
    setScreen('results');
  };

  const t = {
    en: { title: 'Flag Master', sub: 'Test your flag knowledge', start: 'Start', learn: 'Learn', board: 'Scores', set: 'Settings', diff: 'Difficulty', easy: 'Easy', med: 'Medium', hard: 'Hard', cont: 'Continents', all: 'All', next: 'Next', finish: 'Finish', score: 'Score', streak: 'Streak', ok: 'Correct!', no: 'Wrong', up: "Time's up!", ans: 'Answer', res: 'Results', acc: 'Accuracy', best: 'Best', again: 'Again', back: 'Back', fact: 'Fun Fact', sym: 'Symbolism', col: 'Colors', date: 'Adopted', ratio: 'Ratio', design: 'Design' },
    el: { title: 'Flag Master', sub: 'Δοκίμασε τις γνώσεις σου', start: 'Έναρξη', learn: 'Μάθηση', board: 'Βαθμοί', set: 'Ρυθμίσεις', diff: 'Δυσκολία', easy: 'Εύκολο', med: 'Μέτριο', hard: 'Δύσκολο', cont: 'Ήπειροι', all: 'Όλες', next: 'Επόμενη', finish: 'Τέλος', score: 'Βαθμοί', streak: 'Σερί', ok: 'Σωστό!', no: 'Λάθος', up: 'Χρόνος!', ans: 'Απάντηση', res: 'Αποτελέσματα', acc: 'Ακρίβεια', best: 'Καλύτερο', again: 'Ξανά', back: 'Πίσω', fact: 'Fun Fact', sym: 'Συμβολισμός', col: 'Χρώματα', date: 'Υιοθέτηση', ratio: 'Αναλογία', design: 'Σχεδιασμός' }
  }[lang];

  const sty = {
    app: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', fontFamily: 'system-ui', color: '#fff', padding: 20 },
    btn: { padding: '12px 24px', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    btnP: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' },
    btnS: { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' },
    card: { background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20 }
  };

  return (
    <div style={sty.app}>
      <style>{`
        @keyframes confettiFall{to{transform:translateY(100vh) rotate(720deg);opacity:0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
      `}</style>

      {confetti && (
        <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1000}}>
          {[...Array(50)].map((_,i) => (
            <div
              key={i}
              style={{
                position:'absolute',
                width:10,
                height:10,
                top:-10,
                left:`${Math.random()*100}%`,
                background:['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7'][i%5],
                animation:`confettiFall 3s ease-out forwards`,
                animationDelay:`${Math.random()*0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Menu Screen */}
      {screen === 'menu' && (
        <div style={{maxWidth:420,margin:'0 auto',textAlign:'center',paddingTop:50}}>
          <div style={{fontSize:64,animation:'float 3s ease-in-out infinite'}}>🌍</div>
          <h1 style={{fontSize:48,background:'linear-gradient(135deg,#667eea,#764ba2,#f093fb)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>{t.title}</h1>
          <p style={{color:'rgba(255,255,255,0.7)',marginBottom:30}}>{t.sub}</p>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:30}}>
            {['en','el'].map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{...sty.btn, background: lang === l ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.1)'}}
              >
                {l === 'en' ? 'EN' : 'ΕΛ'}
              </button>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <button onClick={start} style={{...sty.btn,...sty.btnP,fontSize:18}}>🎯 {t.start}</button>
            <button onClick={() => setScreen('learn')} style={{...sty.btn,...sty.btnS}}>📚 {t.learn}</button>
            <button onClick={() => setScreen('board')} style={{...sty.btn,...sty.btnS}}>🏆 {t.board}</button>
            <button onClick={() => setScreen('set')} style={{...sty.btn,...sty.btnS}}>⚙️ {t.set}</button>
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:40,flexWrap:'wrap'}}>
            {flags.slice(0,5).map(f => <FlagImage key={f.id} code={f.code} width={70} />)}
          </div>
        </div>
      )}

      {/* Settings Screen */}
      {screen === 'set' && (
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>⚙️ {t.set}</h2>
          <div style={{...sty.card,marginBottom:20}}>
            <h3 style={{marginBottom:15}}>{t.diff}</h3>
            <div style={{display:'flex',gap:10}}>
              {[['easy','#4CAF50'],['medium','#FF9800'],['hard','#F44336']].map(([d,col]) => (
                <button
                  key={d}
                  onClick={() => setDiff(d)}
                  style={{
                    flex:1,
                    padding:16,
                    border:`2px solid ${diff === d ? col : 'rgba(255,255,255,0.2)'}`,
                    borderRadius:12,
                    background: diff === d ? `${col}33` : 'rgba(255,255,255,0.05)',
                    color:'#fff',
                    cursor:'pointer'
                  }}
                >
                  {t[d === 'medium' ? 'med' : d]}
                </button>
              ))}
            </div>
          </div>
          <div style={sty.card}>
            <h3 style={{marginBottom:15}}>{t.cont}</h3>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {['all','Africa','Asia','Europe','North America','South America','Oceania'].map(c => (
                <button
                  key={c}
                  onClick={() => c === 'all' ? setConts(['all']) : setConts(p => p.includes(c) ? p.filter(x => x !== c) : [...p.filter(x => x !== 'all'), c])}
                  style={{
                    padding:'8px 16px',
                    borderRadius:20,
                    border: conts.includes(c) ? 'none' : '1px solid rgba(255,255,255,0.2)',
                    background: conts.includes(c) ? 'linear-gradient(135deg,#667eea,#764ba2)' : 'rgba(255,255,255,0.05)',
                    color:'#fff',
                    cursor:'pointer'
                  }}
                >
                  {c === 'all' ? t.all : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Screen */}
      {screen === 'quiz' && curF && curQ && (
        <div style={{maxWidth:540,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-around',marginBottom:20}}>
            {[[t.score,score],[t.streak,`${streak > 0 ? '🔥' : ''}${streak}`],['Q',total+1]].map(([l,v],i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.6)',textTransform:'uppercase'}}>{l}</div>
                <div style={{fontSize:26,fontWeight:700,color: i === 1 && streak > 0 ? '#FF6B6B' : '#fff'}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{height:8,background:'rgba(255,255,255,0.1)',borderRadius:4,marginBottom:30,position:'relative'}}>
            <div style={{
              height:'100%',
              width:`${(time/(diff === 'easy' ? 30 : diff === 'medium' ? 25 : 20))*100}%`,
              background: time <= 5 ? 'linear-gradient(90deg,#F44336,#FF5722)' : 'linear-gradient(90deg,#4CAF50,#8BC34A)',
              borderRadius:4,
              transition:'width 1s linear',
              animation: time <= 5 ? 'pulse .5s infinite' : 'none'
            }}/>
            <span style={{position:'absolute',right:0,top:-24,fontSize:14}}>{time}s</span>
          </div>
          <div style={{textAlign:'center',marginBottom:25,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <FlagImage code={curF.code} width={300} />
            <div style={{marginTop:12,fontSize:22,fontWeight:600}}>{curF.name[lang]}</div>
          </div>
          <p style={{textAlign:'center',fontSize:18,marginBottom:24}}>{curQ.q}</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {curQ.o.map((opt,i) => {
              const ok = opt === curQ.a;
              const isSel = sel === opt;
              let bg = 'rgba(255,255,255,0.05)';
              let bord = 'rgba(255,255,255,0.2)';
              let anim = '';
              if (show) {
                if (ok) {
                  bg = 'rgba(76,175,80,0.4)';
                  bord = '#4CAF50';
                  anim = 'pop .4s';
                } else if (isSel) {
                  bg = 'rgba(244,67,54,0.4)';
                  bord = '#F44336';
                  anim = 'shake .4s';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => !show && answer(opt)}
                  disabled={show}
                  style={{
                    padding:16,
                    border:`2px solid ${bord}`,
                    borderRadius:12,
                    background:bg,
                    color:'#fff',
                    fontSize:15,
                    cursor: show ? 'default' : 'pointer',
                    animation:anim
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {show && (
            <div style={{
              marginTop:24,
              padding:20,
              borderRadius:12,
              textAlign:'center',
              background: sel && sel === curQ.a ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.2)',
              border:`1px solid ${sel && sel === curQ.a ? 'rgba(76,175,80,0.5)' : 'rgba(244,67,54,0.5)'}`
            }}>
              <p style={{fontSize:20,marginBottom:8}}>
                {sel === null ? `⏰ ${t.up}` : sel === curQ.a ? `✨ ${t.ok}` : `❌ ${t.no}`}
              </p>
              {(sel === null || sel !== curQ.a) && <p>{t.ans}: <strong>{curQ.a}</strong></p>}
            </div>
          )}
          {show && (
            <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:24}}>
              <button onClick={next} style={{...sty.btn,...sty.btnP}}>{t.next}</button>
              <button onClick={end} style={{...sty.btn,...sty.btnS}}>{t.finish}</button>
            </div>
          )}
        </div>
      )}

      {/* Results Screen */}
      {screen === 'results' && (
        <div style={{maxWidth:420,margin:'0 auto',textAlign:'center',paddingTop:40}}>
          <h2 style={{marginBottom:30}}>🎉 {t.res}</h2>
          <div style={{...sty.card,padding:40,marginBottom:30}}>
            <div style={{fontSize:72,fontWeight:700,background:'linear-gradient(135deg,#667eea,#764ba2,#f093fb)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{score}</div>
            <div style={{fontSize:18,color:'rgba(255,255,255,0.6)',marginBottom:30}}>{t.score}</div>
            <div style={{display:'flex',justifyContent:'space-around'}}>
              {[[`${correct}/${total}`,t.ok],[`${total ? Math.round(correct/total*100) : 0}%`,t.acc],[`🔥${best}`,t.best]].map(([v,l],i) => (
                <div key={i}>
                  <div style={{fontSize:28,fontWeight:700}}>{v}</div>
                  <div style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <button onClick={start} style={{...sty.btn,...sty.btnP}}>{t.again}</button>
            <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS}}>{t.back}</button>
          </div>
        </div>
      )}

      {/* Learn Screen */}
      {screen === 'learn' && (
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <button onClick={() => {setScreen('menu'); setLearnF(null);}} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>📚 {t.learn}</h2>
          {!learnF ? (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:16}}>
              {flags.map(f => (
                <div
                  key={f.id}
                  onClick={() => setLearnF(f)}
                  style={{...sty.card,textAlign:'center',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',padding:16}}
                >
                  <FlagImage code={f.code} width={120} />
                  <div style={{marginTop:10,fontSize:14}}>{f.name[lang]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setLearnF(null)} style={{...sty.btn,...sty.btnS,marginBottom:20,fontSize:14,padding:'8px 16px'}}>← Back</button>
              <div style={{textAlign:'center',marginBottom:30,display:'flex',flexDirection:'column',alignItems:'center'}}>
                <FlagImage code={learnF.code} width={340} />
                <h3 style={{marginTop:16,fontSize:32}}>{learnF.name[lang]}</h3>
                <p style={{color:'rgba(255,255,255,0.6)'}}>{learnF.continent}</p>
              </div>
              <div style={{display:'grid',gap:16}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <div style={sty.card}>
                    <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>📐 {t.ratio}</h4>
                    <p style={{fontSize:20,fontWeight:600}}>{learnF.aspectRatio}</p>
                  </div>
                  <div style={sty.card}>
                    <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>📅 {t.date}</h4>
                    <p style={{fontSize:20,fontWeight:600}}>{learnF.adoptionDate}</p>
                  </div>
                </div>
                <div style={sty.card}>
                  <h4 style={{marginBottom:8,color:'rgba(255,255,255,0.7)',fontSize:14}}>🎨 {t.design}</h4>
                  <p>{learnF.designPattern}</p>
                </div>
                <div style={sty.card}>
                  <h4 style={{marginBottom:12,color:'rgba(255,255,255,0.7)',fontSize:14}}>🎨 {t.col}</h4>
                  {learnF.colors.map((c,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
                      <div style={{width:40,height:40,borderRadius:8,background:c.hex,border:'2px solid rgba(255,255,255,0.2)',flexShrink:0}}/>
                      <div>
                        <div style={{fontWeight:600}}>{c.name[lang]} ({c.percentage}%)</div>
                        <div style={{fontSize:13,color:'rgba(255,255,255,0.6)'}}>{c.symbolism[lang]}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={sty.card}>
                  <h4 style={{marginBottom:10,color:'rgba(255,255,255,0.7)',fontSize:14}}>📖 {t.sym}</h4>
                  <p style={{lineHeight:1.7}}>{learnF.symbolism[lang]}</p>
                </div>
                {learnF.funFacts?.length > 0 && (
                  <div style={{...sty.card,background:'linear-gradient(135deg,rgba(102,126,234,0.2),rgba(118,75,162,0.2))',border:'1px solid rgba(102,126,234,0.3)'}}>
                    <h4 style={{marginBottom:12,fontSize:14}}>💡 {t.fact}</h4>
                    {learnF.funFacts.map((f,i) => (
                      <p key={i} style={{lineHeight:1.6,marginBottom: i < learnF.funFacts.length - 1 ? 10 : 0}}>• {f[lang]}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard Screen */}
      {screen === 'board' && (
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <button onClick={() => setScreen('menu')} style={{...sty.btn,...sty.btnS,marginBottom:20}}>← {t.back}</button>
          <h2 style={{textAlign:'center',marginBottom:30}}>🏆 {t.board}</h2>
          {scores.length === 0 ? (
            <div style={{textAlign:'center',padding:50,color:'rgba(255,255,255,0.5)'}}>
              <div style={{fontSize:48,marginBottom:16}}>🎮</div>
              <p>{lang === 'el' ? 'Παίξε ένα quiz!' : 'Play a quiz!'}</p>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {scores.map((s,i) => (
                <div
                  key={i}
                  style={{
                    display:'flex',
                    alignItems:'center',
                    gap:16,
                    padding:'16px 20px',
                    background: i < 3 ? `linear-gradient(135deg,${['rgba(255,215,0,0.15)','rgba(192,192,192,0.15)','rgba(205,127,50,0.15)'][i]},transparent)` : 'rgba(255,255,255,0.05)',
                    borderRadius:12
                  }}
                >
                  <span style={{fontSize:24,width:45,textAlign:'center'}}>{['🥇','🥈','🥉'][i] || `#${i+1}`}</span>
                  <span style={{fontSize:26,fontWeight:700}}>{s.score}</span>
                  <span style={{flex:1,color:'rgba(255,255,255,0.6)',fontSize:14}}>{s.correct}/{s.total}</span>
                  <span style={{fontSize:13,color:'rgba(255,255,255,0.4)'}}>{s.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
