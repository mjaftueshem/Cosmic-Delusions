// src/SatiricalHoroscope.jsx - Copy this entire code block
import React, { useState, useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';

const SatiricalHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Europe/Berlin'
    };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  const horoscopes = [
    {
        "sign": "Aries",
        "dates": "Mar 21 - Apr 19",
        "symbol": "♈",
        "gradient": "from-red-500 to-orange-500",
        "text": "Your hustle culture addiction will manifest as reorganizing productivity apps while actual goals collect dust. Society celebrates your 'entrepreneurial mindset' - code for unemployed with opinions. You mistake motion for progress, urgency for importance. The universe notes your startup ideas are expensive therapy sessions."
    },
    {
        "sign": "Taurus",
        "dates": "Apr 20 - May 20",
        "symbol": "♉",
        "gradient": "from-green-500 to-emerald-500",
        "text": "Your luxury minimalism aesthetic will be achieved through purchasing seventeen organizational systems. Comfort zone imprisonment comes with premium amenities and five-star reviews. Stubbornness rebranded as 'having principles' fools absolutely nobody. Venus suggests your routine is fear wearing designer pajamas."
    },
    {
        "sign": "Gemini",
        "dates": "May 21 - Jun 20",
        "symbol": "♊",
        "gradient": "from-yellow-500 to-amber-500",
        "text": "Your intellectual curiosity leads down seventeen Wikipedia rabbit holes while responsibilities multiply exponentially. Communication mastery paired with inability to hold authentic conversations. You've perfected knowing enough about everything to contribute nothing meaningful. Mercury notes that being interesting differs from being interested."
    },
    {
        "sign": "Cancer",
        "dates": "Jun 21 - Jul 22",
        "symbol": "♋",
        "gradient": "from-blue-500 to-cyan-500",
        "text": "Your emotional intelligence showcases itself through crafting perfect passive-aggressive text messages over thirty-seven minutes. Vulnerability weaponized as social strategy while remaining genuinely closed off. Empathy became your brand until including yourself felt optional. The moon wonders when feelings became competitive sports."
    },
    {
        "sign": "Leo",
        "dates": "Jul 23 - Aug 22",
        "symbol": "♌",
        "gradient": "from-orange-500 to-red-500",
        "text": "Your natural confidence channels into perfecting personal brands while actual personalities atrophy steadily. Audience confused with community, performance with presence, applause with affection. Authenticity became another role in your elaborate one-person show. The sun suggests spotlights cast shadows on everything meaningful."
    },
    {
        "sign": "Virgo",
        "dates": "Aug 23 - Sep 22",
        "symbol": "♍",
        "gradient": "from-green-600 to-teal-500",
        "text": "Your perfectionist tendencies manifest as reorganizing optimization systems while chaos reigns everywhere else. Anxiety elevated to artform, called 'high standards' for social acceptability. Productivity became personality until efficiency without purpose revealed itself as expensive procrastination. The harvest reminds you that perfect seeds never planted yield nothing."
    },
    {
        "sign": "Libra",
        "dates": "Sep 23 - Oct 22",
        "symbol": "♎",
        "gradient": "from-pink-500 to-rose-500",
        "text": "Your diplomatic nature gets tested choosing between fifteen mediocre options while good choices expire. Indecision aestheticized, paralysis called 'thorough consideration' for appearances. Balance obsession achieved equal weighting toward nothing meaningful whatsoever. The scales suggest avoiding conflict creates internal warfare."
    },
    {
        "sign": "Scorpio",
        "dates": "Oct 23 - Nov 21",
        "symbol": "♏",
        "gradient": "from-purple-600 to-red-600",
        "text": "Your transformative energy directs toward stalking your own 2019 social media while avoiding present-moment growth. Emotional unavailability branded as mysterious depth, distance as wisdom disguised. Intensity became aesthetic while emotional range remained surprisingly narrow throughout. The underworld wonders when you'll investigate personal psychological basements."
    },
    {
        "sign": "Sagittarius",
        "dates": "Nov 22 - Dec 21",
        "symbol": "♐",
        "gradient": "from-purple-500 to-indigo-500",
        "text": "Your philosophical nature expresses itself through sharing inspirational quotes while avoiding inspirational action entirely. Motion confused with meaning, exploration with escapism, seeking with finding. Freedom became your cage when true liberty required choosing something meaningful. The archer suggests targets keep moving because you never learned proper aim."
    },
    {
        "sign": "Capricorn",
        "dates": "Dec 22 - Jan 19",
        "symbol": "♑",
        "gradient": "from-gray-600 to-slate-600",
        "text": "Your ambitious drive propels you toward optimizing optimization while actual goals remain mysteriously undefined. Busy confused with important, climbing with having destinations worth reaching. Success became identity until forgetting what you were succeeding at exactly. The mountain suggests reaching summits means nothing without remembering why climbing started."
    },
    {
        "sign": "Aquarius",
        "dates": "Jan 20 - Feb 18",
        "symbol": "♒",
        "gradient": "from-cyan-500 to-blue-500",
        "text": "Your innovative thinking channels into designing solutions for nonexistent problems while ignoring existing ones. Intellectual arrogance branded as progressive thinking, detachment as objectivity performed. Uniqueness became conformity, rebellion your uniform worn proudly. The water-bearer wonders when being different became more important than being useful."
    },
    {
        "sign": "Pisces",
        "dates": "Feb 19 - Mar 20",
        "symbol": "♓",
        "gradient": "from-blue-600 to-purple-600",
        "text": "Your intuitive gifts guide you toward spending four hours researching mercury retrograde while avoiding mercury-level responsibilities. Avoidance spiritualized, escapism called 'self-care' for social acceptability. Dreams became refuge when reality demanded participation in actual life. The fish remind you that deep waters require surfacing for air occasionally."
    }
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Sparkles className="text-yellow-300 w-8 h-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Cosmic Delusions
          </h1>
          <Sparkles className="text-yellow-300 w-8 h-8" />
        </div>
        <p className="text-xl md:text-2xl text-purple-200 font-light mb-2">
          Daily Horoscopes for the Intellectually Superior
        </p>
        <p className="text-purple-300 text-sm md:text-base">
          {currentDate} • Updated daily at 7:00 CEST
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Zodiac Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {horoscopes.map((horoscope, index) => (
          <div
            key={horoscope.sign}
            className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
              selectedSign === horoscope.sign ? 'ring-2 ring-yellow-300 scale-105' : ''
            }`}
            onClick={() => setSelectedSign(selectedSign === horoscope.sign ? null : horoscope.sign)}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${horoscope.gradient} opacity-20 rounded-2xl group-hover:opacity-30 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{horoscope.sign}</h3>
                  <p className="text-sm text-purple-200">{horoscope.dates}</p>
                </div>
                <div className="text-3xl opacity-80">{horoscope.symbol}</div>
              </div>
              
              {selectedSign === horoscope.sign ? (
                <div className="mt-4">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {horoscope.text}
                  </p>
                </div>
              ) : (
                <div className="flex items-center text-purple-200 text-sm">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Tap to reveal your cosmic mockery</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto text-center mt-16 pb-8">
        <p className="text-purple-300 text-sm">
          Satirical astrology for the modern existential crisis
        </p>
        <p className="text-purple-400 text-xs mt-2">
          "Because if you're going to believe in nonsense, at least make it intellectually honest nonsense."
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SatiricalHoroscope;