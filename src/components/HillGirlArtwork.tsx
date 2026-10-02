import React from 'react';

export const HillGirlArtwork: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <svg
      viewBox="0 0 800 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Sky gradient with golden dawn mist */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="35%" stopColor="#c2410c" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="85%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>

        {/* Morning Sun Glow */}
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
          <stop offset="30%" stopColor="#FDE68A" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
        </radialGradient>

        {/* Distant Hills Gradient */}
        <linearGradient id="hillDistant" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4338ca" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#065f46" stopOpacity="0.9" />
        </linearGradient>

        {/* Mid Hills Gradient */}
        <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        {/* Foreground Lush Hill Slope */}
        <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="60%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>

        {/* River Chengi Glisten */}
        <linearGradient id="chengiRiver" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#fef08a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
        </linearGradient>

        {/* Indigenous Pinon (Skirt) Traditional Handloom Pattern Gradient */}
        <linearGradient id="pinonFabric" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="30%" stopColor="#dc2626" />
          <stop offset="60%" stopColor="#b45309" />
          <stop offset="85%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        {/* Hadi (Scarf / Stole) Indigenous Geometric Weave */}
        <linearGradient id="hadiFabric" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Skin Tone of Hill Maiden */}
        <linearGradient id="skinTone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Silver Jewelry Shimmer (Hasli / Coins) */}
        <linearGradient id="silverGleam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Traditional Woven Basket (Thum / Kayang) */}
        <pattern id="basketWeave" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#78350f" />
          <path d="M0 5h10M5 0v10" stroke="#b45309" strokeWidth="1" />
          <path d="M0 0l10 10M10 0L0 10" stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
        </pattern>
      </defs>

      {/* Sky backdrop */}
      <rect width="800" height="650" rx="20" fill="url(#skyGrad)" />

      {/* Morning Rising Golden Sun over CHT ridges */}
      <circle cx="480" cy="220" r="140" fill="url(#sunGlow)" />
      <circle cx="480" cy="220" r="48" fill="#FFFBEB" opacity="0.95" />

      {/* Sun rays over hills */}
      <g stroke="#FEF08A" strokeWidth="1.5" opacity="0.25">
        <line x1="480" y1="220" x2="280" y2="80" />
        <line x1="480" y1="220" x2="380" y2="50" />
        <line x1="480" y1="220" x2="480" y2="30" />
        <line x1="480" y1="220" x2="580" y2="50" />
        <line x1="480" y1="220" x2="680" y2="80" />
      </g>

      {/* Distant Blue-Purple Mountain Ridges (Sajek & Tarak Ranges) */}
      <path
        d="M 0,320 Q 120,240 240,280 T 480,240 T 700,270 L 800,260 L 800,650 L 0,650 Z"
        fill="url(#hillDistant)"
        opacity="0.8"
      />

      {/* Morning Valley Mist Band */}
      <path
        d="M 0,330 Q 200,290 400,340 T 800,310 L 800,370 Q 550,330 350,370 T 0,350 Z"
        fill="#FFFFFF"
        opacity="0.35"
      />

      {/* Mid-range Verdant Hills of Khagrachari */}
      <path
        d="M 0,380 Q 160,300 340,360 T 640,320 T 800,360 L 800,650 L 0,650 Z"
        fill="url(#hillMid)"
        opacity="0.9"
      />

      {/* Winding Chengi (Chengmi) River in the Valley Basin */}
      <path
        d="M 280,360 Q 320,400 310,430 T 360,470 T 340,510 T 420,560 T 390,650"
        fill="none"
        stroke="url(#chengiRiver)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Mountain River Glints */}
      <path
        d="M 290,375 Q 315,405 310,430 T 355,470"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        opacity="0.6"
      />

      {/* Wild Nal Khagra Catkin Reeds on Riverbanks */}
      <g stroke="#fef08a" strokeWidth="1.5" opacity="0.7">
        {/* Reeds left */}
        <path d="M 270,440 Q 260,410 255,395" />
        <ellipse cx="255" cy="392" rx="4" ry="10" fill="#fef9c3" stroke="none" transform="rotate(-15 255 392)" />
        <path d="M 280,450 Q 275,420 270,405" />
        <ellipse cx="270" cy="402" rx="3.5" ry="9" fill="#fef9c3" stroke="none" transform="rotate(-10 270 402)" />
        <path d="M 290,460 Q 288,430 285,415" />
        <ellipse cx="285" cy="412" rx="3" ry="8" fill="#fef9c3" stroke="none" />
      </g>

      {/* Immediate Foreground Hill Promontory (Right to Left) */}
      <path
        d="M 180,650 Q 340,480 620,410 Q 720,380 800,390 L 800,650 Z"
        fill="url(#hillFront)"
      />

      {/* Tropical bamboo groves and wild banana leaves on the slope */}
      <g opacity="0.85">
        <path d="M 720,430 Q 750,370 780,360 Q 770,390 730,440 Z" fill="#22c55e" />
        <path d="M 730,440 Q 780,390 800,395 Q 770,420 740,455 Z" fill="#16a34a" />
        <path d="M 700,450 Q 740,400 760,410 Q 735,435 710,460 Z" fill="#4ade80" />
      </g>

      {/* Wild Mountain Flowers (Terracotta & Gold) on Hill Crest */}
      <g>
        <circle cx="640" cy="460" r="4" fill="#f43f5e" />
        <circle cx="648" cy="458" r="3.5" fill="#fbbf24" />
        <circle cx="670" cy="475" r="4.5" fill="#f43f5e" />
        <circle cx="678" cy="472" r="3" fill="#fb923c" />
        <circle cx="610" cy="510" r="4" fill="#fbbf24" />
        <circle cx="590" cy="530" r="5" fill="#e11d48" />
      </g>

      {/* ============================================================== */}
      {/* INDIGENOUS HILL GIRL (Marma / Tripuri / Chakma Maiden of CHT)   */}
      {/* Standing majestically on the ridge gazing over the Chengi Valley */}
      {/* ============================================================== */}
      <g transform="translate(480, 240)">
        {/* Soft shadow cast on the hillside */}
        <ellipse cx="60" cy="380" rx="42" ry="12" fill="#022c22" opacity="0.6" />

        {/* Traditional Bamboo Basket (Thum) slung with a forehead strap */}
        <g id="basketThum">
          {/* Basket Body */}
          <path
            d="M 5,160 L -18,270 Q 2,295 40,290 L 45,170 Z"
            fill="url(#basketWeave)"
            stroke="#451a03"
            strokeWidth="2"
          />
          {/* Fresh harvest leaves & wild catkin reeds peeking out */}
          <path d="M -5,160 Q -25,120 -30,110 Q -15,130 5,150 Z" fill="#22c55e" />
          <path d="M 12,155 Q 0,110 -5,95 Q 15,120 25,150 Z" fill="#4ade80" />
          <ellipse cx="-28" cy="108" rx="4" ry="12" fill="#fef08a" transform="rotate(-30 -28 108)" />
          <ellipse cx="-5" cy="92" rx="4" ry="12" fill="#fef08a" transform="rotate(-15 -5 92)" />
          {/* Forehead/Shoulder woven cane strap */}
          <path
            d="M -10,180 Q 20,130 45,100"
            fill="none"
            stroke="#b45309"
            strokeWidth="3.5"
            strokeDasharray="4,2"
          />
        </g>

        {/* Lower Body: Traditional Indigenous Woven Pinon (Handloom Skirt) */}
        <g id="pinonSkirt">
          <path
            d="M 28,240 Q 60,240 85,250 L 95,375 Q 55,385 20,375 Z"
            fill="url(#pinonFabric)"
            stroke="#450a0a"
            strokeWidth="1.5"
          />
          {/* Traditional Chaboki / Anji border embroidery on the Pinon */}
          <g stroke="#fef08a" strokeWidth="2" opacity="0.9">
            <line x1="22" y1="360" x2="93" y2="360" />
            <line x1="24" y1="348" x2="90" y2="348" stroke="#38bdf8" />
            <path d="M 25,354 L 30,349 L 35,354 L 40,349 L 45,354 L 50,349 L 55,354 L 60,349 L 65,354 L 70,349 L 75,354 L 80,349 L 85,354" fill="none" strokeWidth="1.5" />
          </g>
        </g>

        {/* Bare Ankles & Feet resting gracefully on the grassy bluff */}
        <g fill="url(#skinTone)">
          <path d="M 38,370 L 36,388 Q 45,392 52,388 L 48,370 Z" />
          <path d="M 68,370 L 66,388 Q 75,392 82,388 L 78,370 Z" />
        </g>
        {/* Silver Ankle Ornaments (Banki / Ankle Bell Bells) */}
        <ellipse cx="44" cy="384" rx="7" ry="2" fill="url(#silverGleam)" stroke="#475569" strokeWidth="0.8" />
        <ellipse cx="74" cy="384" rx="7" ry="2" fill="url(#silverGleam)" stroke="#475569" strokeWidth="0.8" />

        {/* Upper Body & Hadi (Handloom Cross-body Breastcloth / Stole) */}
        <g id="upperTorso">
          {/* Traditional Blouse / Fitted Undergarment */}
          <path
            d="M 32,160 Q 60,155 80,165 L 85,245 Q 60,248 30,242 Z"
            fill="#064e3b"
          />

          {/* Golden-Orange Indigenous Handwoven "Hadi" Draped Diagonally across chest */}
          <path
            d="M 40,150 Q 82,185 92,250 L 74,258 Q 62,205 28,168 Z"
            fill="url(#hadiFabric)"
            stroke="#9a3412"
            strokeWidth="1"
          />
          {/* Traditional diamond geometric motif on Hadi */}
          <g stroke="#fef08a" strokeWidth="1.2" opacity="0.85">
            <polygon points="46,175 51,180 46,185 41,180" fill="#dc2626" />
            <polygon points="58,195 63,200 58,205 53,200" fill="#dc2626" />
            <polygon points="70,215 75,220 70,225 65,220" fill="#dc2626" />
          </g>

          {/* Flowing end of the Hadi fluttering gently in mountain breeze */}
          <path
            d="M 28,168 Q 0,185 -15,175 Q -5,195 25,200 Z"
            fill="url(#hadiFabric)"
            opacity="0.9"
          />
        </g>

        {/* Graceful Arms & Hands */}
        <g fill="url(#skinTone)">
          {/* Right Arm resting along the basket cane */}
          <path d="M 30,165 Q 12,200 18,245 Q 24,248 26,240 Q 22,205 38,175 Z" />
          {/* Left Arm slightly forward holding a wildflower */}
          <path d="M 76,168 Q 98,198 102,235 Q 96,240 92,232 Q 88,202 70,178 Z" />
        </g>

        {/* Silver Coin Necklaces (Chandrahar / Taka Mala) */}
        <g>
          {/* Inner silver choker necklace (Hasli) */}
          <path d="M 46,145 Q 58,155 70,146" fill="none" stroke="url(#silverGleam)" strokeWidth="3" />
          {/* Cascading traditional silver coin beads */}
          <path d="M 42,152 Q 58,168 74,154" fill="none" stroke="url(#silverGleam)" strokeWidth="2.5" strokeDasharray="3,2" />
          <path d="M 38,160 Q 58,180 78,162" fill="none" stroke="url(#silverGleam)" strokeWidth="2" strokeDasharray="3,2" />
        </g>

        {/* Silver Bracelets / Bangles (Bala / Sankha) */}
        <g fill="url(#silverGleam)">
          <rect x="15" y="235" width="8" height="5" rx="2" />
          <rect x="94" y="225" width="8" height="5" rx="2" />
        </g>

        {/* Neck & Graceful Profile Face */}
        <g fill="url(#skinTone)">
          {/* Slender neck */}
          <path d="M 50,122 L 50,146 Q 58,150 66,146 L 66,122 Z" />
          {/* Face looking in serene profile towards the sunlit valley */}
          <path d="M 46,80 Q 72,70 78,92 Q 82,106 76,120 Q 64,130 52,122 Q 42,112 46,80 Z" />
        </g>

        {/* Facial Features (Eyes closed or tranquil profile gaze, serene smile) */}
        <g stroke="#451a03" strokeWidth="1.2" strokeLinecap="round">
          {/* Eyebrow */}
          <path d="M 64,88 Q 72,86 77,89" fill="none" />
          {/* Eye - subtle peaceful almond curve */}
          <path d="M 66,96 Q 73,94 77,98" fill="none" strokeWidth="1.5" />
          {/* Eyelashes */}
          <path d="M 75,98 L 78,96" />
          {/* Nose tip in 3/4 angle */}
          <path d="M 79,97 Q 82,103 79,106" fill="none" />
          {/* Gentle lips */}
          <path d="M 72,112 Q 77,112 79,110" fill="none" stroke="#be123c" strokeWidth="1.5" />
          {/* Rosy blush on the cheek */}
          <ellipse cx="68" cy="106" rx="5" ry="3" fill="#fb7185" opacity="0.4" stroke="none" />
        </g>

        {/* Elegant Silver Earring (Jhumka / Kanchik) */}
        <circle cx="50" cy="104" r="3" fill="url(#silverGleam)" />
        <path d="M 50,107 L 50,118" stroke="url(#silverGleam)" strokeWidth="1.5" />
        <circle cx="50" cy="119" r="2.5" fill="#f59e0b" />

        {/* Luscious Dark Hair styled in traditional coiled chignon bun with fresh wild orchids */}
        <g>
          {/* Front hairline & smooth swept crown */}
          <path
            d="M 46,80 Q 58,68 74,80 Q 66,95 56,92 Q 48,88 46,80 Z"
            fill="#0f172a"
          />
          {/* Traditional high coiled chignon hair bun at back */}
          <ellipse cx="36" cy="85" rx="16" ry="14" fill="#020617" />
          {/* Golden/Silver hair pin (Khopa Kata) */}
          <path d="M 22,70 L 48,102" stroke="url(#silverGleam)" strokeWidth="2.5" />
          <circle cx="21" cy="69" r="3.5" fill="#f59e0b" />

          {/* Fresh white & purple mountain orchid blossoms tucked into hair */}
          <g>
            {/* Wild orchid petals */}
            <circle cx="34" cy="74" r="4.5" fill="#fdf4ff" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="39" cy="71" r="4" fill="#fdf4ff" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="30" cy="78" r="3.5" fill="#fdf4ff" stroke="#c084fc" strokeWidth="0.8" />
            <circle cx="35" cy="74" r="2" fill="#e11d48" />
          </g>

          {/* Soft strands of hair drifting in the gentle mountain wind */}
          <path d="M 40,98 Q 28,115 22,135" fill="none" stroke="#0f172a" strokeWidth="1.2" opacity="0.8" />
          <path d="M 42,95 Q 32,112 28,125" fill="none" stroke="#0f172a" strokeWidth="1" opacity="0.7" />
        </g>

        {/* Single Golden Wild Lily held in left hand */}
        <g>
          <path d="M 102,230 Q 112,215 118,205" fill="none" stroke="#15803d" strokeWidth="1.5" />
          <circle cx="118" cy="204" r="4" fill="#fbbf24" />
          <circle cx="116" cy="201" r="3.5" fill="#f59e0b" />
          <circle cx="121" cy="202" r="3" fill="#ef4444" />
        </g>
      </g>

      {/* Floating Morning Fog Clouds across the Canvas */}
      <g opacity="0.25">
        <path d="M 40,240 Q 120,210 240,230 T 440,210 T 600,240" stroke="#FFFFFF" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M 150,300 Q 250,280 380,295 T 620,280" stroke="#FFFFFF" strokeWidth="20" fill="none" strokeLinecap="round" />
      </g>

      {/* Flock of mountain birds soaring in the golden morning sky */}
      <g stroke="#451a03" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M 380,120 Q 388,114 394,120 Q 400,114 408,120" />
        <path d="M 415,135 Q 421,130 426,135 Q 431,130 437,135" />
        <path d="M 360,140 Q 365,136 370,140 Q 375,136 380,140" />
      </g>

      {/* Subtle Archival Inscription in Corner */}
      <text
        x="24"
        y="628"
        fill="#FFFFFF"
        fillOpacity="0.8"
        fontSize="12"
        fontFamily="serif"
        letterSpacing="2"
      >
        CHENGMI BASIN · MONG CIRCLE · KHAGRACHARI
      </text>
    </svg>
  );
};
