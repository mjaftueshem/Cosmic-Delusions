// scripts/update-horoscopes.js
const fs = require('fs');
const path = require('path');

const zodiacData = {
  "Aries": {
    symbol: "♈",
    dates: "Mar 21 - Apr 19", 
    gradient: "from-red-500 to-orange-500",
    mockery: [
      "Your hustle culture addiction will manifest as reorganizing productivity apps while actual goals collect dust. Society celebrates your 'entrepreneurial mindset' - code for unemployed with opinions. You mistake motion for progress, urgency for importance. The universe notes your startup ideas are expensive therapy sessions.",
      
      "Today you'll launch three projects before finishing yesterday's abandoned dreams. Leadership skills shine brightest when there's nobody left to lead. Initiative became identity until follow-through demanded effort. Mars suggests being first means nothing if you never cross finish lines.",
      
      "Your competitive nature drives you to optimize morning routines while life optimization remains theoretical. Impulse control is for people without vision, apparently. You've branded recklessness as boldness, impatience as passion. The ram reminds you that charging forward blindly isn't the same as having direction."
    ]
  },
  
  "Taurus": {
    symbol: "♉",
    dates: "Apr 20 - May 20",
    gradient: "from-green-500 to-emerald-500", 
    mockery: [
      "Your luxury minimalism aesthetic will be achieved through purchasing seventeen organizational systems. Comfort zone imprisonment comes with premium amenities and five-star reviews. Stubbornness rebranded as 'having principles' fools absolutely nobody. Venus suggests your routine is fear wearing designer pajamas.",
      
      "Today you'll spend more organizing possessions than the possessions originally cost. Quality appreciation means researching coffee setups for six hours instead of drinking coffee. Materialism disguised as mindfulness remains materialism with better marketing. The bull notes that accumulating experiences still counts as accumulating.",
      
      "Your stability obsession stems from unstable foundations you refuse to examine. Change resistance masquerades as consistency, inflexibility as reliability. You've confused being grounded with being stuck in concrete. Earth energy suggests that growth requires occasional discomfort."
    ]
  },

  "Gemini": {
    symbol: "♊",
    dates: "May 21 - Jun 20", 
    gradient: "from-yellow-500 to-amber-500",
    mockery: [
      "Your intellectual curiosity leads down seventeen Wikipedia rabbit holes while responsibilities multiply exponentially. Communication mastery paired with inability to hold authentic conversations. You've perfected knowing enough about everything to contribute nothing meaningful. Mercury notes that being interesting differs from being interested.",
      
      "Today you'll start four books, finish none, recommend all confidently to unsuspecting friends. Information became your drug, knowledge your performance enhancement supplement. Multi-faceted personality is inconsistency with a marketing team. The twins suggest picking lanes occasionally reveals actual depth.",
      
      "Your social skills enable surface-level connections with profound emotional distance. Adaptability means changing opinions based on audience, not evidence. You've commodified curiosity while avoiding uncomfortable truths about yourself. The messenger god wonders when you'll deliver news to yourself."
    ]
  },

  "Cancer": {
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    gradient: "from-blue-500 to-cyan-500",
    mockery: [
      "Your emotional intelligence showcases itself through crafting perfect passive-aggressive text messages over thirty-seven minutes. Vulnerability weaponized as social strategy while remaining genuinely closed off. Empathy became your brand until including yourself felt optional. The moon wonders when feelings became competitive sports.",
      
      "Today you'll provide unsolicited emotional labor while strategically ignoring personal needs requiring attention. Nurturing others proves easier than examining validation dependency patterns. Intuition excellently detects everyone else's problems exclusively. The tides remind you that high maintenance differs from emotional depth.",
      
      "Your protective instincts manifest as controlling behaviors disguised as care and concern. Nostalgia addiction prevents present-moment engagement with actual reality. You've confused emotional availability with emotional performance art. The crab suggests that shells protect but also isolate."
    ]
  },

  "Leo": {
    symbol: "♌", 
    dates: "Jul 23 - Aug 22",
    gradient: "from-orange-500 to-red-500",
    mockery: [
      "Your natural confidence channels into perfecting personal brands while actual personalities atrophy steadily. Audience confused with community, performance with presence, applause with affection. Authenticity became another role in your elaborate one-person show. The sun suggests spotlights cast shadows on everything meaningful.",
      
      "Today you'll spend longer choosing Instagram filters than engaging with moments being filtered. Recognition became currency while meaningful connections declared bankruptcy proceedings. Magnetic personality attracts attention but repels genuine intimacy consistently. Stage lights wonder when applause became more important than performances.",
      
      "Your leadership qualities emerge strongest when nobody needs leading toward anything important. Charisma masks insecurity, confidence performs vulnerability avoidance. You've confused being seen with being known, being admired with being loved. The lion suggests that ruling requires subjects worth governing."
    ]
  },

  "Virgo": {
    symbol: "♍",
    dates: "Aug 23 - Sep 22", 
    gradient: "from-green-600 to-teal-500",
    mockery: [
      "Your perfectionist tendencies manifest as reorganizing optimization systems while chaos reigns everywhere else. Anxiety elevated to artform, called 'high standards' for social acceptability. Productivity became personality until efficiency without purpose revealed itself as expensive procrastination. The harvest reminds you that perfect seeds never planted yield nothing.",
      
      "Today you'll create perfect systems for tracking habits you'll abandon by Tuesday's reality check. Critical thinking works overtime on everyone except yourself, conveniently. Service to others masks inability to accept personal imperfections gracefully. Earth energy suggests practical wisdom includes self-compassion occasionally.",
      
      "Your attention to detail scrutinizes everything except the patterns keeping you stuck. Perfectionism prevents starting, fear of failure ensures never finishing anything meaningful. You've confused having standards with having impossible expectations. The virgin archetype suggests purity includes accepting imperfection."
    ]
  },

  "Libra": {
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    gradient: "from-pink-500 to-rose-500", 
    mockery: [
      "Your diplomatic nature gets tested choosing between fifteen mediocre options while good choices expire. Indecision aestheticized, paralysis called 'thorough consideration' for appearances. Balance obsession achieved equal weighting toward nothing meaningful whatsoever. The scales suggest avoiding conflict creates internal warfare.",
      
      "Today you'll research perfect responses for three hours to messages requiring thirty seconds of sincerity. Harmony addiction prevents experiencing authentic disagreement or genuine accord. People-pleasing skills pleased everyone except the person who matters most - yourself. Justice reminds you fairness includes self-inclusion.",
      
      "Your aesthetic sense prioritizes appearance over substance, form over function, perception over reality. Conflict avoidance masquerades as peacekeeping, indecision as consideration. You've confused being nice with being good, being liked with being respected. The balance beam suggests equilibrium requires choosing sides occasionally."
    ]
  },

  "Scorpio": {
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    gradient: "from-purple-600 to-red-600",
    mockery: [
      "Your transformative energy directs toward stalking your own 2019 social media while avoiding present-moment growth. Emotional unavailability branded as mysterious depth, distance as wisdom disguised. Intensity became aesthetic while emotional range remained surprisingly narrow throughout. The underworld wonders when you'll investigate personal psychological basements.",
      
      "Today you'll excavate everyone else's motivations while yours remain conveniently buried beneath layers. Transformation specialist yet stubbornly attached to patterns that stopped serving years ago. Psychological insights razor-sharp for everyone except yourself, naturally. The phoenix suggests rising from ashes requires acknowledging current ash status.",
      
      "Your investigative nature uncovers secrets while hiding from uncomfortable truths about yourself. Depth performance masks surface-level self-awareness, mystery cultivated as intimacy substitute. You've confused being complex with being evolved, being intense with being genuine. The scorpion reminds you that stingers can wound the wielder."
    ]
  },

  "Sagittarius": {
    symbol: "♐",
    dates: "Nov 22 - Dec 21", 
    gradient: "from-purple-500 to-indigo-500",
    mockery: [
      "Your philosophical nature expresses itself through sharing inspirational quotes while avoiding inspirational action entirely. Motion confused with meaning, exploration with escapism, seeking with finding. Freedom became your cage when true liberty required choosing something meaningful. The archer suggests targets keep moving because you never learned proper aim.",
      
      "Today you'll plan seventeen adventures while remaining geographically and emotionally stationary. Wanderlust masks inability to find meaning in present circumstances requiring attention. Truth quest conveniently avoids truths about yourself demanding acknowledgment. The horizon reminds you that constantly seeking new perspectives indicates current viewpoint examination avoidance.",
      
      "Your adventurous spirit manifests as consuming travel content while avoiding local experiences requiring engagement. Wisdom collection prioritized over wisdom application, knowledge accumulation over understanding integration. You've confused being well-traveled with being well-developed. Jupiter suggests expansion includes internal exploration occasionally."
    ]
  },

  "Capricorn": {
    symbol: "♑", 
    dates: "Dec 22 - Jan 19",
    gradient: "from-gray-600 to-slate-600",
    mockery: [
      "Your ambitious drive propels you toward optimizing optimization while actual goals remain mysteriously undefined. Busy confused with important, climbing with having destinations worth reaching. Success became identity until forgetting what you were succeeding at exactly. The mountain suggests reaching summits means nothing without remembering why climbing started.",
      
      "Today you'll create detailed plans for achieving goals you haven't questioned since college orientation. Authority provides comfort when you're afraid to question personal direction honestly. Responsibility became excuse for avoiding risks that might lead to actual fulfillment. The goat reminds you sure footing means nothing when walking toward cliffs.",
      
      "Your work ethic impresses everyone while your work's meaning impresses nobody, including yourself. Achievement addiction masks fear of discovering what you actually want from life. You've confused being productive with being purposeful, being busy with being effective. The taskmaster suggests that climbing ladders requires knowing where they lead."
    ]
  },

  "Aquarius": {
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    gradient: "from-cyan-500 to-blue-500", 
    mockery: [
      "Your innovative thinking channels into designing solutions for nonexistent problems while ignoring existing ones. Intellectual arrogance branded as progressive thinking, detachment as objectivity performed. Uniqueness became conformity, rebellion your uniform worn proudly. The water-bearer wonders when being different became more important than being useful.",
      
      "Today you'll revolutionize everything except outdated assumptions about yourself requiring examination. Humanitarian ideals mask difficulty connecting with actual humans requiring actual help. Future vision conveniently excludes present-moment personal accountability demands. The stars suggest world-changing might start with self-pattern changing first.",
      
      "Your independent nature manifests as emotional unavailability disguised as intellectual superiority complex. Innovation focused on systems while personal relationships remain surprisingly traditional. You've confused being ahead of your time with being disconnected from current time. The revolutionary archetype suggests that real change starts within."
    ]
  },

  "Pisces": {
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    gradient: "from-blue-600 to-purple-600",
    mockery: [
      "Your intuitive gifts guide you toward spending four hours researching mercury retrograde while avoiding mercury-level responsibilities. Avoidance spiritualized, escapism called 'self-care' for social acceptability. Dreams became refuge when reality demanded participation in actual life. The fish remind you that deep waters require surfacing for air occasionally.",
      
      "Today you'll manifest everything except discipline required to manifest anything meaningful whatsoever. Sensitivity superpower when not excuse for avoiding life's rougher textures entirely. Emotional depth remains largely uncharted by yourself, ironically enough. The ocean suggests diving deep requires knowing how to swim back to shore.",
      
      "Your empathetic nature absorbs everyone else's energy while neglecting personal boundaries requiring maintenance. Intuition trusted more than evidence, feelings prioritized over facts consistently. You've confused being spiritual with being practical, being sensitive with being wise. The mystic archetype suggests that true vision includes seeing yourself clearly."
    ]
  }
};

function generateDailyHoroscope(sign) {
  const signData = zodiacData[sign];
  const mockeryOptions = signData.mockery;
  return mockeryOptions[Math.floor(Math.random() * mockeryOptions.length)];
}

function updateReactComponent() {
  const componentPath = path.join(__dirname, '..', 'src', 'SatiricalHoroscope.jsx');
  
  if (!fs.existsSync(componentPath)) {
    console.error('React component not found. Corporate infrastructure incomplete.');
    process.exit(1);
  }
  
  let componentContent = fs.readFileSync(componentPath, 'utf8');
  
  // Generate today's cosmic mockery
  const updatedHoroscopes = Object.keys(zodiacData).map(sign => ({
    sign: sign,
    dates: zodiacData[sign].dates,
    symbol: zodiacData[sign].symbol,
    gradient: zodiacData[sign].gradient,
    text: generateDailyHoroscope(sign)
  }));
  
  // Replace horoscope array with fresh cynicism
  const horoscopeArrayRegex = /const horoscopes = \[[\s\S]*?\];/;
  const newHoroscopeArray = `const horoscopes = ${JSON.stringify(updatedHoroscopes, null, 4)};`;
  
  componentContent = componentContent.replace(horoscopeArrayRegex, newHoroscopeArray);
  
  fs.writeFileSync(componentPath, componentContent);
  console.log(`Cosmic mockery successfully updated for ${new Date().toLocaleDateString()}. Intellectual superiority served fresh.`);
}

// Execute corporate algorithm hijacking
updateReactComponent();