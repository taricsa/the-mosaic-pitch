export const i18nConfig = {
  defaultLocale: "en",
  locales: ["en", "fr"] as const,
  localeTags: {
    en: "en-CA",
    fr: "fr-CA",
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type LocaleTag = (typeof i18nConfig.localeTags)[Locale];

export type FandomQuizRecommendation = {
  club: string;
  league: string;
  fanGroup: string;
  tagline: string;
  description: string;
  shareLine: string;
};

export type FandomQuizDictionary = {
  badge: string;
  title: string;
  subtitle: string;
  questionLabel: string;
  questionOf: string;
  back: string;
  resultLabel: string;
  copyShare: string;
  copied: string;
  retake: string;
  shareHint: string;
  findYourClub: string;
  questions: {
    region: {
      prompt: string;
      westCoast: string;
      prairies: string;
      ontario: string;
      quebec: string;
      atlantic: string;
    };
    energy: {
      prompt: string;
      boisterous: string;
      tactical: string;
      family: string;
    };
    heartbreak: {
      prompt: string;
      bulletproof: string;
      rollercoaster: string;
    };
  };
  recommendations: {
    vancouverWhitecaps: FandomQuizRecommendation;
    cavalry: FandomQuizRecommendation;
    fcEdmonton: FandomQuizRecommendation;
    montrealUltras: FandomQuizRecommendation;
    montreal1642: FandomQuizRecommendation;
    halifax: FandomQuizRecommendation;
    torontoFC: FandomQuizRecommendation;
    forge: FandomQuizRecommendation;
    atleticoOttawa: FandomQuizRecommendation;
  };
};

export type HeritageCardGeneratorDictionary = {
  badge: string;
  title: string;
  subtitle: string;
  surnameLabel: string;
  surnamePlaceholder: string;
  heritageLabel: string;
  heritagePlaceholder: string;
  positionLegend: string;
  positionOptional: string;
  positions: {
    striker: string;
    midfielder: string;
    defender: string;
    goalkeeper: string;
  };
  clearPosition: string;
  generateButton: string;
  cardTrueNorth: string;
  cardRookie: string;
  cardEdition: string;
  cardOfficialLabel: string;
  positionPrefix: string;
  rootedIn: string;
  grownUnder: string;
  shareText: string;
  downloadPreparing: string;
  downloadButton: string;
  copyShare: string;
  copied: string;
  shareHint: string;
};

export type MatchCalendarDictionary = {
  badge: string;
  title: string;
  subtitle: string;
  worldCupBannerTitle: string;
  worldCupMlsBody: string;
  worldCupCplBody: string;
  filterAriaLabel: string;
  filterAll: string;
  mlsPausedUntil: string;
  emptyState: string;
  todayBadge: string;
  mlsOnBreak: string;
  versus: string;
  cplScheduleLink: string;
  mlsScheduleLink: string;
  fixtureNotes: {
    "cpl-july-4": string;
    "mls-july-16-mtl": string;
    "mls-july-16-van": string;
    "mls-oct-10-tor": string;
    "mls-nov-7-van": string;
  };
};

export type LanguageSwitcherDictionary = {
  ariaLabel: string;
  enLabel: string;
  frLabel: string;
};

export type NeighborhoodCounterDictionary = {
  description: string;
  liveEstimate: string;
};

export type RosterMosaicDictionary = {
  badge: string;
  title: string;
  subtitle: string;
  selectSquadAria: string;
  squads: {
    men: { label: string; subtitle: string };
    women: { label: string; subtitle: string };
  };
  playersCount: string;
  journeyMap: string;
  roots: string;
  heritageSuffix: string;
  represents: string;
  canadianNationalTeam: string;
  readMoreAbout: string;
  homegrown: string;
  readMore: string;
  closeAria: string;
  representingMosaic: string;
  oneMapleLeaf: string;
  close: string;
};

export type SiteFooterDictionary = {
  brandName: string;
  description: string;
  cplHeading: string;
  cplOfficialSite: string;
  mlsHeading: string;
  mlsOfficialSite: string;
  historyNavAria: string;
  mensArchive: string;
  womensArchive: string;
  disclaimer: string;
  builtInCanadaPrefix: string;
  builtInCanadaSuffix: string;
};

export type WomensWorldCupCountdownDictionary = {
  badge: string;
  headline: string;
  subtitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  tournamentBegun: string;
  openingMatch: string;
};

export type YouthClubFinderProvinceCode =
  | "BC"
  | "AB"
  | "SK"
  | "MB"
  | "ON"
  | "QC"
  | "NB"
  | "NS"
  | "PE"
  | "NL"
  | "YT"
  | "NT"
  | "NU";

export type YouthClubFinderProvinceEntry = {
  name: string;
  board: string;
  directoryLabel: string;
};

export type YouthClubFinderGrantProgram = {
  name: string;
  tagline: string;
  description: string;
  cta: string;
};

export type YouthClubFinderDictionary = {
  badge: string;
  title: string;
  subtitle: string;
  provinceLabel: string;
  selectPlaceholder: string;
  selectHint: string;
  onTrackLabel: string;
  welcomeFamilies: string;
  governingBodyDescription: string;
  grantsBadge: string;
  grantsTitle: string;
  grantsSubtitle: string;
  provinces: Record<YouthClubFinderProvinceCode, YouthClubFinderProvinceEntry>;
  grantPrograms: {
    kidsport: YouthClubFinderGrantProgram;
    jumpstart: YouthClubFinderGrantProgram;
  };
};

export type HistorySquadPageSquadCopy = {
  label: string;
  title: string;
  subtitle: string;
};

export type HistorySquadPageDictionary = {
  backLink: string;
  squadNavAria: string;
  mensHistoryNav: string;
  womensHistoryNav: string;
  campaignWorldCupLabel: string;
  headCoachLabel: string;
  behindTheBench: string;
  squads: {
    men: HistorySquadPageSquadCopy;
    women: HistorySquadPageSquadCopy;
  };
};

export type HomePageAchievement = {
  title: string;
  headline: string;
  detail: string;
};

export type HomePageStat = {
  value: string;
  label: string;
};

export type HomePageDictionary = {
  badge: string;
  headline: string;
  subtitle: string;
  ctaMeetMosaic: string;
  ctaFindClub: string;
  ctaShareTile: string;
  achievementsBadge: string;
  achievementsTitle: string;
  achievements: {
    tokyo2021: HomePageAchievement;
    worldCup2026: HomePageAchievement;
  };
  stats: {
    firstWorldCup: HomePageStat;
    nations: HomePageStat;
    oneCountry: HomePageStat;
  };
};

export type Dictionary = {
  fandomQuiz: FandomQuizDictionary;
  heritageCardGenerator: HeritageCardGeneratorDictionary;
  matchCalendar: MatchCalendarDictionary;
  languageSwitcher: LanguageSwitcherDictionary;
  neighborhoodCounter: NeighborhoodCounterDictionary;
  rosterMosaic: RosterMosaicDictionary;
  siteFooter: SiteFooterDictionary;
  womensWorldCupCountdown: WomensWorldCupCountdownDictionary;
  youthClubFinder: YouthClubFinderDictionary;
  historySquadPage: HistorySquadPageDictionary;
  homePage: HomePageDictionary;
};

export const en: Dictionary = {
  fandomQuiz: {
    badge: "World Cup → Club Fandom",
    title: "Find Your Canadian Club Home",
    subtitle:
      "Three quick questions to turn your World Cup buzz into a lifelong domestic supporter identity.",
    questionLabel: "Question",
    questionOf: "of",
    back: "← Back",
    resultLabel: "Your matchday home",
    copyShare: "Copy & share your club match",
    copied: "Copied to clipboard!",
    retake: "Retake quiz",
    shareHint:
      "Paste your result on X, Instagram, or group chat — the link brings friends straight back to find their club.",
    findYourClub: "Find your club:",
    questions: {
      region: {
        prompt: "What is your geological hub?",
        westCoast: "West Coast",
        prairies: "Prairies",
        ontario: "Ontario",
        quebec: "Quebec",
        atlantic: "Atlantic",
      },
      energy: {
        prompt: "Choose your matchday energy level.",
        boisterous: "Boisterous singing and flags",
        tactical: "Tactical analysis and coffee",
        family: "Family afternoon at the pitch",
      },
      heartbreak: {
        prompt: "How do you handle sports heartbreak?",
        bulletproof: "I'm a hockey fan, I am bulletproof",
        rollercoaster: "I embrace the emotional rollercoaster",
      },
    },
    recommendations: {
      vancouverWhitecaps: {
        club: "Vancouver Whitecaps FC",
        league: "MLS",
        fanGroup: "The Southsiders",
        tagline: "Rain-soaked passion on the Pacific.",
        description:
          "From the terraces of BC Place, the Southsiders turn every Whitecaps match into a coastal anthem. Flags, drums, and full-throated singing define a supporter culture built for those who want the World Cup roar to continue every weekend — whether you're riding the rollercoaster or shrugging off heartbreak like a seasoned Canucks fan.",
        shareLine:
          "My World Cup fandom match: Vancouver Whitecaps FC & The Southsiders — rain-soaked Pacific passion, every weekend.",
      },
      cavalry: {
        club: "Cavalry FC",
        league: "CPL",
        fanGroup: "The Cavalry faithful",
        tagline: "High-altitude football, high standards.",
        description:
          "At ATCO Field, Cavalry supporters treat every match like a tactical briefing with a soundtrack. Smart, loyal, and fiercely proud of Alberta's football identity, this is the club for viewers who loved Canada's organized press and want a domestic side that rewards the thinking fan.",
        shareLine:
          "My World Cup fandom match: Cavalry FC — high-altitude football for the tactical mind.",
      },
      fcEdmonton: {
        club: "FC Edmonton",
        league: "CPL",
        fanGroup: "The Brickmen",
        tagline: "Northern grit, unbreakable loyalty.",
        description:
          "The Brickmen carry Edmonton's working-class football soul into every stand. Built for fans who've survived playoff heartbreak in other sports and still show up — because prairie loyalty doesn't flinch when the scoreboard turns cruel.",
        shareLine:
          "My World Cup fandom match: FC Edmonton & The Brickmen — northern grit, unbreakable loyalty.",
      },
      montrealUltras: {
        club: "CF Montréal",
        league: "MLS",
        fanGroup: "Ultras Montréal",
        tagline: "Passion bilingue, stade en feu.",
        description:
          "Ultras Montréal bring European-style intensity to Stade Saputo — tifos, chants en français, and an emotional commitment that mirrors the highs and lows of Les Rouges on the world stage. If the World Cup made you feel alive, this is your weekly fix.",
        shareLine:
          "My World Cup fandom match: CF Montréal & Ultras Montréal — passion bilingue, stade en feu.",
      },
      montreal1642: {
        club: "CF Montréal",
        league: "MLS",
        fanGroup: "1642 MTL",
        tagline: "Passion bilingue, stade en feu.",
        description:
          "1642 MTL channels Montréal's creative, community-driven supporter energy into every matchday. Steady, proud, and deeply connected to the city's football story — perfect for fans who want passion with staying power.",
        shareLine:
          "My World Cup fandom match: CF Montréal & 1642 MTL — community-driven Montréal football pride.",
      },
      halifax: {
        club: "Halifax Wanderers FC",
        league: "CPL",
        fanGroup: "The Town",
        tagline: "A whole province, one terrace.",
        description:
          "The Town is Halifax Wanderers' heartbeat — a tight-knit Atlantic community that treats every home match like a neighbourhood reunion. Flags, sea air, and an emotional honesty that welcomes casual World Cup converts into lifelong Wanderers faithful.",
        shareLine:
          "My World Cup fandom match: Halifax Wanderers FC & The Town — a whole province, one terrace.",
      },
      torontoFC: {
        club: "Toronto FC",
        league: "MLS",
        fanGroup: "The Red Patch Boys",
        tagline: "The loudest room in Canadian club football.",
        description:
          "The Red Patch Boys have turned BMO Field into a cauldron for over a decade — scarves, songs, and an unapologetic volume that mirrors the World Cup atmospheres you fell in love with. Ontario's biggest stage for fans who want every Saturday to feel like a knockout round.",
        shareLine:
          "My World Cup fandom match: Toronto FC & The Red Patch Boys — the loudest room in Canadian club football.",
      },
      forge: {
        club: "Forge FC",
        league: "CPL",
        fanGroup: "The Forge Army",
        tagline: "Hamilton heart, championship habits.",
        description:
          "The Forge Army welcomes families and die-hards alike at Hamilton's Tim Hortons Field. It's community-first football with a winning edge — the perfect landing spot for World Cup viewers who want matchday to feel like a local tradition, not just a spectacle.",
        shareLine:
          "My World Cup fandom match: Forge FC & The Forge Army — Hamilton heart, championship habits.",
      },
      atleticoOttawa: {
        club: "Atlético Ottawa",
        league: "CPL",
        fanGroup: "The Bytown Boys",
        tagline: "Capital composure, growing conviction.",
        description:
          "The Bytown Boys bring thoughtful, coffee-fueled devotion to TD Place — analyzing every pass while building one of the CPL's most authentic supporter cultures. For Ontario fans who loved Canada's tactical evolution at the World Cup, Atlético Ottawa is your weekly deep dive.",
        shareLine:
          "My World Cup fandom match: Atlético Ottawa & The Bytown Boys — capital composure, growing conviction.",
      },
    },
  },
  heritageCardGenerator: {
    badge: "Share the Mosaic",
    title: "Mint Your True North Rookie Card",
    subtitle:
      "Claim your family's place in the story. Generate a premium rookie tile and invite others to stand behind the Maple Leaf.",
    surnameLabel: "Your Name or Family Surname",
    surnamePlaceholder: "e.g., Nguyen, O'Brien, Singh",
    heritageLabel: "Sovereign Heritage / Ancestral Origins",
    heritagePlaceholder: "e.g., Italy, Nigeria, Philippines, Punjab",
    positionLegend: "Your Primary Position",
    positionOptional: "(optional)",
    positions: {
      striker: "Striker",
      midfielder: "Midfielder",
      defender: "Defender",
      goalkeeper: "Goalkeeper",
    },
    clearPosition: "Clear position",
    generateButton: "Generate My Rookie Card",
    cardTrueNorth: "True North",
    cardRookie: "Rookie",
    cardEdition: "Edition",
    cardOfficialLabel: "THE MOSAIC PITCH · OFFICIAL ROOKIE TILE",
    positionPrefix: "Position:",
    rootedIn: "Rooted in",
    grownUnder:
      ". Grown under the True North. United by the Beautiful Game.",
    shareText:
      "Our family tree started in {{heritage}}, but we stand behind the Maple Leaf on the pitch. Generate your family's football passport on The Mosaic Pitch: {{url}}",
    downloadPreparing: "Preparing download…",
    downloadButton: "Download Tile Image",
    copyShare: "Copy Share Link",
    copied: "Copied to clipboard!",
    shareHint:
      "Download the 4:5 rookie card for Instagram, or copy the link to invite friends and family.",
  },
  languageSwitcher: {
    ariaLabel: "Language selector",
    enLabel: "EN",
    frLabel: "FR",
  },
  matchCalendar: {
    badge: "Canadian Club Football",
    title: "Match Calendar",
    subtitle:
      "Verified upcoming fixtures for Canadian CPL and MLS clubs — adjusted for the 2026 World Cup schedule breaks.",
    worldCupBannerTitle:
      "🏆 World Cup in progress · {{start}} – {{end}}",
    worldCupMlsBody:
      "League play is paused until {{date}}. Canadian clubs return July 16 (Montréal vs Toronto, Whitecaps at Chicago).",
    worldCupCplBody:
      "Paused {{pauseStart}} – {{pauseEnd}}, then resumed. One confirmed match today: Atlético Ottawa vs Cavalry FC.",
    filterAriaLabel: "Filter by league",
    filterAll: "All Leagues",
    mlsPausedUntil:
      "No MLS matches until {{date}} — the league is on World Cup break.",
    emptyState:
      "No verified fixtures in this filter right now. Check the official league schedules below for the full calendar.",
    todayBadge: "Today",
    mlsOnBreak: "MLS on break",
    versus: "vs",
    cplScheduleLink: "Full CPL Schedule →",
    mlsScheduleLink: "Full MLS Schedule →",
    fixtureNotes: {
      "cpl-july-4":
        "2025 CPL Final rematch — Nathan Ingham returns to Ottawa.",
      "mls-july-16-mtl":
        "MLS returns from World Cup break — 100% Canadian clash.",
      "mls-july-16-van":
        "Whitecaps return from World Cup break on the road.",
      "mls-oct-10-tor":
        "Canadian Classique — second meeting of the season.",
      "mls-nov-7-van":
        "Decision Day — final matchday of the 2026 MLS regular season.",
    },
  },
  neighborhoodCounter: {
    description:
      "Estimated number of neighborhood kids currently kicking a football across Canadian grass right now.",
    liveEstimate: "Live estimate",
  },
  rosterMosaic: {
    badge: "Canada · National Teams",
    title: "30 Journeys. Multiple Heritages. One Maple Leaf.",
    subtitle:
      "A tribute to the immigrant roots and diverse origins that forged Canada's greatest teams. Every tile is a homecoming.",
    selectSquadAria: "Select national squad",
    squads: {
      men: {
        label: "🍁 Men's National Squad",
        subtitle:
          "Les Rouges — the golden generation that changed everything.",
      },
      women: {
        label: "🍁 Women's Championship Squad",
        subtitle:
          "Olympic champions. World beaters. The standard-bearers of Canadian sport.",
      },
    },
    playersCount: "{{count}} players",
    journeyMap: "Journey Map",
    roots: "Roots",
    heritageSuffix: "{{heritage}} heritage",
    represents: "Represents",
    canadianNationalTeam: "Canadian National Team",
    readMoreAbout: "Read more about {{name}}",
    homegrown: "Homegrown 🍁 {{heritage}}",
    readMore: "Read more",
    closeAria: "Close",
    representingMosaic: "On representing the mosaic",
    oneMapleLeaf: "One Maple Leaf",
    close: "Close",
  },
  siteFooter: {
    brandName: "The Mosaic Pitch",
    description:
      "An inclusive community hub for every Canadian who discovered football during the World Cup — and decided to stay.",
    cplHeading: "Canadian Premier League",
    cplOfficialSite: "CPL Official Site →",
    mlsHeading: "MLS · Canadian Clubs",
    mlsOfficialSite: "MLS Official Site →",
    historyNavAria: "National team history archives",
    mensArchive: "Men's Historical Archive",
    womensArchive: "Women's Historical Archive",
    disclaimer: "For the love of the game. For the love of this country.",
    builtInCanadaPrefix: "Built with",
    builtInCanadaSuffix: "in Canada",
  },
  womensWorldCupCountdown: {
    badge: "FIFA Women's World Cup 2027 · Brazil",
    headline: "Countdown to Canada's next global stage",
    subtitle:
      "Olympic champions, world-class talent — Les Rouges return to the biggest stage. The clock is ticking until kickoff in Brazil.",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    tournamentBegun: "The tournament has begun — go Canada! 🍁",
    openingMatch: "Opening match · June 24, 2027 · Brazil",
  },
  youthClubFinder: {
    badge: "Grassroots · Youth Soccer",
    title: "Find a Local Club for Your Child",
    subtitle:
      "Every national team player started on a community pitch. Select your province or territory to connect with the official governing body and register with a club near you.",
    provinceLabel: "Your province or territory",
    selectPlaceholder:
      "Choose BC, AB, SK, MB, ON, QC, NB, NS, PE, NL, YT, NT, or NU…",
    selectHint:
      "Select your home province or territory to see where to register for youth soccer programs.",
    onTrackLabel: "You're on the right track",
    welcomeFamilies: "Welcome, {{name}} families!",
    governingBodyDescription:
      "{{board}} is the official governing body for sanctioned youth soccer in {{name}}. Their club directory and registration resources will connect you with programs in your community — from first-time U4 kickabouts to competitive pathways.",
    grantsBadge: "Financial support",
    grantsTitle: "Cost should never bench a child",
    grantsSubtitle:
      "Registration fees and equipment can add up — especially for newcomer and low-income families. These national programs help cover the costs so every child can step onto the pitch with pride.",
    provinces: {
      BC: {
        name: "British Columbia",
        board: "BC Soccer",
        directoryLabel: "Browse BC Soccer membership directory",
      },
      AB: {
        name: "Alberta",
        board: "Alberta Soccer",
        directoryLabel: "Find clubs through Alberta Soccer districts",
      },
      SK: {
        name: "Saskatchewan",
        board: "Saskatchewan Soccer",
        directoryLabel: "View Saskatchewan member clubs",
      },
      MB: {
        name: "Manitoba",
        board: "Manitoba Soccer",
        directoryLabel: "Browse Manitoba clubs & associations",
      },
      ON: {
        name: "Ontario",
        board: "Ontario Soccer",
        directoryLabel: "Open Ontario Soccer registration hub",
      },
      QC: {
        name: "Quebec",
        board: "Soccer Québec",
        directoryLabel: "Search clubs with Soccer Québec",
      },
      NB: {
        name: "New Brunswick",
        board: "Soccer New Brunswick",
        directoryLabel: "View Soccer NB member clubs",
      },
      NS: {
        name: "Nova Scotia",
        board: "Soccer Nova Scotia",
        directoryLabel: "Find your local Nova Scotia club",
      },
      PE: {
        name: "Prince Edward Island",
        board: "PEI Soccer",
        directoryLabel: "Visit PEI Soccer Association",
      },
      NL: {
        name: "Newfoundland & Labrador",
        board: "NLSA",
        directoryLabel: "Connect with Newfoundland & Labrador Soccer",
      },
      YT: {
        name: "Yukon",
        board: "Yukon Soccer Association",
        directoryLabel: "Explore Yukon Soccer programs",
      },
      NT: {
        name: "Northwest Territories",
        board: "NWT Soccer",
        directoryLabel: "Visit Northwest Territories Soccer",
      },
      NU: {
        name: "Nunavut",
        board: "Nunavut Soccer Association",
        directoryLabel: "Contact Nunavut Soccer via Sport Federation",
      },
    },
    grantPrograms: {
      kidsport: {
        name: "KidSport Canada",
        tagline: "So every kid can play",
        description:
          "KidSport provides grants of up to $500 per year to help cover registration fees for children aged 18 and under. Chapters exist in communities across every province and territory — making it one of the most accessible entry points for newcomer and low-income families.",
        cta: "Apply for KidSport funding",
      },
      jumpstart: {
        name: "Canadian Tire Jumpstart",
        tagline: "Removing financial barriers to sport",
        description:
          "Jumpstart helps families with registration, equipment, and transportation costs so children can join organized sport. Individual child grants and community partnerships mean support reaches kids in rural, urban, and immigrant communities alike.",
        cta: "Explore Jumpstart grants",
      },
    },
  },
  historySquadPage: {
    backLink: "← Back to The Mosaic Pitch",
    squadNavAria: "Squad history navigation",
    mensHistoryNav: "Men's History",
    womensHistoryNav: "Women's History",
    campaignWorldCupLabel: "FIFA World Cup · {{year}}",
    headCoachLabel: "Head Coach:",
    behindTheBench: "Behind the Bench",
    squads: {
      men: {
        label: "Les Rouges",
        title: "Men's World Cup History",
        subtitle:
          "From Mexico 1986 to a home-soil knockout run — every Maple Leaf campaign.",
      },
      women: {
        label: "Canada WNT",
        title: "Women's World Cup History",
        subtitle:
          "Eight tournaments. Olympic gold legacies. One unstoppable golden generation.",
      },
    },
  },
  homePage: {
    badge: "Les Rouges · World Cup 2026",
    headline: "Canada showed the world what we're made of.",
    subtitle:
      "From coast to coast, a golden generation turned a nation of hockey towns into football believers. This is your hub to meet the players, honour their journeys, and find your club home for life.",
    ctaMeetMosaic: "Meet the mosaic",
    ctaFindClub: "Find your club",
    ctaShareTile: "Share your tile",
    achievementsBadge: "The Golden Résumé",
    achievementsTitle: "Two triumphs. One footballing nation.",
    achievements: {
      tokyo2021: {
        title: "Tokyo 2021 · Olympic Gold",
        headline: "Champions of the world stage.",
        detail:
          "Canada's women stood atop the Olympic podium in Tokyo — a gold-medal triumph sealed on penalties that announced this country as a true footballing power.",
      },
      worldCup2026: {
        title: "World Cup 2026 · Home Soil",
        headline: "A historic run in front of our own.",
        detail:
          "Les Rouges carried a golden generation deep into a home-soil World Cup, turning stadiums from Vancouver to Toronto into a sea of red and igniting a nation of new believers.",
      },
    },
    stats: {
      firstWorldCup: {
        value: "36 yrs",
        label: "First World Cup since '86",
      },
      nations: {
        value: "30+",
        label: "Nations represented in our squad",
      },
      oneCountry: {
        value: "1 🍁",
        label: "Country, infinite stories",
      },
    },
  },
};

export const fr: Dictionary = {
  fandomQuiz: {
    badge: "Coupe du monde → Ferveur clubistique",
    title: "Trouvez votre club canadien",
    subtitle:
      "Trois questions rapides pour transformer votre enthousiasme de la Coupe du monde en une identité de supporter domestique pour la vie.",
    questionLabel: "Question",
    questionOf: "sur",
    back: "← Retour",
    resultLabel: "Votre foyer les jours de match",
    copyShare: "Copier et partager votre club",
    copied: "Copié dans le presse-papiers!",
    retake: "Refaire le quiz",
    shareHint:
      "Collez votre résultat sur X, Instagram ou en groupe — le lien ramène vos amis directement pour trouver leur club.",
    findYourClub: "Trouvez votre club :",
    questions: {
      region: {
        prompt: "Quel est votre carrefour géographique?",
        westCoast: "Côte Ouest",
        prairies: "Prairies",
        ontario: "Ontario",
        quebec: "Québec",
        atlantic: "Atlantique",
      },
      energy: {
        prompt: "Choisissez votre niveau d'énergie les jours de match.",
        boisterous: "Chants exuberants et drapeaux",
        tactical: "Analyse tactique et café",
        family: "Après-midi familial au terrain",
      },
      heartbreak: {
        prompt: "Comment gérez-vous les déceptions sportives?",
        bulletproof: "Je suis fan de hockey, je suis à l'épreuve des balles",
        rollercoaster: "J'embrasse les montagnes russes émotionnelles",
      },
    },
    recommendations: {
      vancouverWhitecaps: {
        club: "Vancouver Whitecaps FC",
        league: "MLS",
        fanGroup: "The Southsiders",
        tagline: "Une passion trempée de pluie sur le Pacifique.",
        description:
          "Depuis les terrasses du BC Place, les Southsiders transforment chaque match des Whitecaps en hymne côtier. Drapeaux, tambours et chants à pleins poumons définissent une culture de supporters pour ceux qui veulent prolonger la ferveur de la Coupe du monde chaque fin de semaine — qu'on vive les montagnes russes ou qu'on encaisse les déceptions comme un partisan chevronné des Canucks.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Vancouver Whitecaps FC et The Southsiders — passion pluvieuse du Pacifique, chaque fin de semaine.",
      },
      cavalry: {
        club: "Cavalry FC",
        league: "CPL",
        fanGroup: "The Cavalry faithful",
        tagline: "Football en haute altitude, standards élevés.",
        description:
          "Au ATCO Field, les supporters de Cavalry traitent chaque match comme un briefing tactique avec bande sonore. Intelligents, loyaux et fiers de l'identité footballistique albertaine, c'est le club pour les téléspectateurs qui ont aimé le pressing organisé du Canada et qui veulent une équipe domestique qui récompense le supporter réfléchi.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Cavalry FC — football en haute altitude pour l'esprit tactique.",
      },
      fcEdmonton: {
        club: "FC Edmonton",
        league: "CPL",
        fanGroup: "The Brickmen",
        tagline: "Rugosité nordique, loyauté inébranlable.",
        description:
          "Les Brickmen portent l'âme footballistique ouvrière d'Edmonton dans chaque tribune. Conçu pour les fans qui ont survécu aux déceptions des séries éliminatoires dans d'autres sports et qui reviennent quand même — parce que la loyauté des Prairies ne faiblit pas quand le tableau d'affichage devient cruel.",
        shareLine:
          "Mon match de ferveur Coupe du monde : FC Edmonton et The Brickmen — rugosité nordique, loyauté inébranlable.",
      },
      montrealUltras: {
        club: "CF Montréal",
        league: "MLS",
        fanGroup: "Ultras Montréal",
        tagline: "Passion bilingue, stade en feu.",
        description:
          "Les Ultras Montréal apportent une intensité de style européen au Stade Saputo — tifos, chants en français et un engagement émotionnel qui reflète les hauts et les bas des Rouges sur la scène mondiale. Si la Coupe du monde vous a fait sentir vivant, voici votre dose hebdomadaire.",
        shareLine:
          "Mon match de ferveur Coupe du monde : CF Montréal et Ultras Montréal — passion bilingue, stade en feu.",
      },
      montreal1642: {
        club: "CF Montréal",
        league: "MLS",
        fanGroup: "1642 MTL",
        tagline: "Passion bilingue, stade en feu.",
        description:
          "1642 MTL canalise l'énergie créative et communautaire des supporters montréalais à chaque jour de match. Stable, fier et profondément lié à l'histoire footballistique de la ville — parfait pour les fans qui veulent une passion durable.",
        shareLine:
          "Mon match de ferveur Coupe du monde : CF Montréal et 1642 MTL — fierté footballistique montréalaise communautaire.",
      },
      halifax: {
        club: "Halifax Wanderers FC",
        league: "CPL",
        fanGroup: "The Town",
        tagline: "Une province entière, une seule tribune.",
        description:
          "The Town est le pouls des Halifax Wanderers — une communauté atlantique soudée qui traite chaque match à domicile comme une réunion de quartier. Drapeaux, air marin et honnêteté émotionnelle qui accueillent les convertis de la Coupe du monde comme fidèles Wanderers à vie.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Halifax Wanderers FC et The Town — une province entière, une seule tribune.",
      },
      torontoFC: {
        club: "Toronto FC",
        league: "MLS",
        fanGroup: "The Red Patch Boys",
        tagline: "La salle la plus bruyante du soccer club canadien.",
        description:
          "Les Red Patch Boys ont transformé le BMO Field en chaudron depuis plus d'une décennie — écharpes, chansons et volume sans compromis qui rappellent les atmosphères de Coupe du monde que vous avez adorées. La plus grande scène de l'Ontario pour les fans qui veulent que chaque samedi ressemble à un match à élimination directe.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Toronto FC et The Red Patch Boys — la salle la plus bruyante du soccer club canadien.",
      },
      forge: {
        club: "Forge FC",
        league: "CPL",
        fanGroup: "The Forge Army",
        tagline: "Cœur d'Hamilton, habitudes de champion.",
        description:
          "The Forge Army accueille familles et passionnés au Tim Hortons Field d'Hamilton. C'est du soccer axé sur la communauté avec un avantage gagnant — l'atterrissage parfait pour les téléspectateurs de la Coupe du monde qui veulent que le jour de match ressemble à une tradition locale, pas seulement à un spectacle.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Forge FC et The Forge Army — cœur d'Hamilton, habitudes de champion.",
      },
      atleticoOttawa: {
        club: "Atlético Ottawa",
        league: "CPL",
        fanGroup: "The Bytown Boys",
        tagline: "Sang-froid de la capitale, conviction grandissante.",
        description:
          "Les Bytown Boys apportent une dévotion réfléchie, alimentée au café, au TD Place — analysant chaque passe tout en bâtissant l'une des cultures de supporters les plus authentiques de la CPL. Pour les fans ontariens qui ont aimé l'évolution tactique du Canada à la Coupe du monde, Atlético Ottawa est votre plongée hebdomadaire.",
        shareLine:
          "Mon match de ferveur Coupe du monde : Atlético Ottawa et The Bytown Boys — sang-froid de la capitale, conviction grandissante.",
      },
    },
  },
  heritageCardGenerator: {
    badge: "Partagez la mosaïque",
    title: "Créez votre carte recrue True North",
    subtitle:
      "Réclamez la place de votre famille dans l'histoire. Générez une tuile recrue premium et invitez les autres à soutenir la feuille d'érable.",
    surnameLabel: "Votre nom ou nom de famille",
    surnamePlaceholder: "p. ex., Nguyen, O'Brien, Singh",
    heritageLabel: "Patrimoine souverain / origines ancestrales",
    heritagePlaceholder: "p. ex., Italie, Nigeria, Philippines, Punjab",
    positionLegend: "Votre poste principal",
    positionOptional: "(facultatif)",
    positions: {
      striker: "Attaquant",
      midfielder: "Milieu",
      defender: "Défenseur",
      goalkeeper: "Gardien",
    },
    clearPosition: "Effacer le poste",
    generateButton: "Générer ma carte recrue",
    cardTrueNorth: "True North",
    cardRookie: "Recrue",
    cardEdition: "Édition",
    cardOfficialLabel: "THE MOSAIC PITCH · TUILE RECRUE OFFICIELLE",
    positionPrefix: "Poste :",
    rootedIn: "Ancré en",
    grownUnder:
      ". Grandi sous le True North. Unis par le beau jeu.",
    shareText:
      "Notre arbre familial a pris racine en {{heritage}}, mais nous soutenons la feuille d'érable sur le terrain. Créez le passeport footballistique de votre famille sur The Mosaic Pitch : {{url}}",
    downloadPreparing: "Préparation du téléchargement…",
    downloadButton: "Télécharger l'image",
    copyShare: "Copier le lien de partage",
    copied: "Copié dans le presse-papiers!",
    shareHint:
      "Téléchargez la carte recrue 4:5 pour Instagram, ou copiez le lien pour inviter amis et famille.",
  },
  languageSwitcher: {
    ariaLabel: "Sélecteur de langue",
    enLabel: "EN",
    frLabel: "FR",
  },
  matchCalendar: {
    badge: "Soccer club canadien",
    title: "Calendrier des matchs",
    subtitle:
      "Matchs à venir vérifiés pour les clubs canadiens de la CPL et de la MLS — ajustés pour les pauses du calendrier de la Coupe du monde 2026.",
    worldCupBannerTitle:
      "🏆 Coupe du monde en cours · {{start}} – {{end}}",
    worldCupMlsBody:
      "Le jeu de championnat est suspendu jusqu'au {{date}}. Les clubs canadiens reprennent le 16 juillet (Montréal contre Toronto, Whitecaps à Chicago).",
    worldCupCplBody:
      "Suspendu du {{pauseStart}} au {{pauseEnd}}, puis repris. Un match confirmé aujourd'hui : Atlético Ottawa contre Cavalry FC.",
    filterAriaLabel: "Filtrer par ligue",
    filterAll: "Toutes les ligues",
    mlsPausedUntil:
      "Aucun match de la MLS avant le {{date}} — la ligue est en pause pour la Coupe du monde.",
    emptyState:
      "Aucun match vérifié dans ce filtre pour le moment. Consultez les calendriers officiels des ligues ci-dessous pour le calendrier complet.",
    todayBadge: "Aujourd'hui",
    mlsOnBreak: "MLS en pause",
    versus: "c.",
    cplScheduleLink: "Calendrier complet de la CPL →",
    mlsScheduleLink: "Calendrier complet de la MLS →",
    fixtureNotes: {
      "cpl-july-4":
        "Revanche de la finale de la CPL 2025 — Nathan Ingham revient à Ottawa.",
      "mls-july-16-mtl":
        "La MLS reprend après la pause de la Coupe du monde — affrontement 100 % canadien.",
      "mls-july-16-van":
        "Les Whitecaps reprennent après la pause de la Coupe du monde à l'extérieur.",
      "mls-oct-10-tor":
        "Classique canadienne — deuxième rencontre de la saison.",
      "mls-nov-7-van":
        "Decision Day — dernière journée de la saison régulière MLS 2026.",
    },
  },
  neighborhoodCounter: {
    description:
      "Nombre estimé d'enfants du quartier en train de taper dans un ballon sur le gazon canadien en ce moment même.",
    liveEstimate: "Estimation en direct",
  },
  rosterMosaic: {
    badge: "Canada · Équipes nationales",
    title: "30 parcours. Plusieurs héritages. Une seule feuille d'érable.",
    subtitle:
      "Un hommage aux racines immigrantes et aux origines diverses qui ont forgé les plus grandes équipes du Canada. Chaque tuile est un retour aux sources.",
    selectSquadAria: "Sélectionner l'équipe nationale",
    squads: {
      men: {
        label: "🍁 Équipe nationale masculine",
        subtitle:
          "Les Rouges — la génération dorée qui a tout changé.",
      },
      women: {
        label: "🍁 Équipe championne féminine",
        subtitle:
          "Championnes olympiques. Dominatrices mondiales. Les porte-étendards du sport canadien.",
      },
    },
    playersCount: "{{count}} joueurs",
    journeyMap: "Carte du parcours",
    roots: "Racines",
    heritageSuffix: "patrimoine {{heritage}}",
    represents: "Représente",
    canadianNationalTeam: "Équipe nationale du Canada",
    readMoreAbout: "En savoir plus sur {{name}}",
    homegrown: "Issu du pays 🍁 {{heritage}}",
    readMore: "En savoir plus",
    closeAria: "Fermer",
    representingMosaic: "Sur la représentation de la mosaïque",
    oneMapleLeaf: "Une feuille d'érable",
    close: "Fermer",
  },
  siteFooter: {
    brandName: "The Mosaic Pitch",
    description:
      "Un carrefour communautaire inclusif pour chaque Canadien qui a découvert le soccer pendant la Coupe du monde — et qui a décidé de rester.",
    cplHeading: "Première ligue canadienne",
    cplOfficialSite: "Site officiel de la CPL →",
    mlsHeading: "MLS · Clubs canadiens",
    mlsOfficialSite: "Site officiel de la MLS →",
    historyNavAria: "Archives historiques des équipes nationales",
    mensArchive: "Archives historiques masculines",
    womensArchive: "Archives historiques féminines",
    disclaimer: "Pour l'amour du jeu. Pour l'amour de ce pays.",
    builtInCanadaPrefix: "Conçu avec",
    builtInCanadaSuffix: "au Canada",
  },
  womensWorldCupCountdown: {
    badge: "Coupe du monde féminine de la FIFA 2027 · Brésil",
    headline:
      "Compte à rebours avant la prochaine étape mondiale du Canada",
    subtitle:
      "Championnes olympiques, talent de calibre mondial — Les Rouges retournent sur la plus grande scène. L'horloge tourne jusqu'au coup d'envoi au Brésil.",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    tournamentBegun: "Le tournoi a commencé — allez Canada! 🍁",
    openingMatch: "Match d'ouverture · 24 juin 2027 · Brésil",
  },
  youthClubFinder: {
    badge: "Soccer de base · Soccer jeunesse",
    title: "Trouvez un club local pour votre enfant",
    subtitle:
      "Chaque joueur de l'équipe nationale a commencé sur un terrain communautaire. Sélectionnez votre province ou territoire pour entrer en contact avec l'organisme directeur officiel et vous inscrire dans un club près de chez vous.",
    provinceLabel: "Votre province ou territoire",
    selectPlaceholder:
      "Choisissez CB, AB, SK, MB, ON, QC, NB, NÉ, Î.-P.-É., T.-N.-L., Yn, T.N.-O. ou Nt…",
    selectHint:
      "Sélectionnez votre province ou territoire de résidence pour voir où vous inscrire aux programmes de soccer jeunesse.",
    onTrackLabel: "Vous êtes sur la bonne voie",
    welcomeFamilies: "Bienvenue, familles de {{name}}!",
    governingBodyDescription:
      "{{board}} est l'organisme directeur officiel du soccer de jeunesse sanctionné en {{name}}. Son répertoire de clubs et ses ressources d'inscription vous connecteront aux programmes de votre communauté — des premiers matchs U4 aux parcours compétitifs.",
    grantsBadge: "Soutien financier",
    grantsTitle: "Le coût ne devrait jamais mettre un enfant sur le banc",
    grantsSubtitle:
      "Les frais d'inscription et l'équipement peuvent s'accumuler — surtout pour les familles nouvelles arrivantes et à faible revenu. Ces programmes nationaux aident à couvrir les coûts pour que chaque enfant puisse fouler le terrain avec fierté.",
    provinces: {
      BC: {
        name: "Colombie-Britannique",
        board: "BC Soccer",
        directoryLabel:
          "Parcourir le répertoire des membres de BC Soccer",
      },
      AB: {
        name: "Alberta",
        board: "Alberta Soccer",
        directoryLabel:
          "Trouver des clubs par les districts d'Alberta Soccer",
      },
      SK: {
        name: "Saskatchewan",
        board: "Saskatchewan Soccer",
        directoryLabel: "Voir les clubs membres de la Saskatchewan",
      },
      MB: {
        name: "Manitoba",
        board: "Manitoba Soccer",
        directoryLabel:
          "Parcourir les clubs et associations du Manitoba",
      },
      ON: {
        name: "Ontario",
        board: "Ontario Soccer",
        directoryLabel:
          "Ouvrir le portail d'inscription d'Ontario Soccer",
      },
      QC: {
        name: "Québec",
        board: "Soccer Québec",
        directoryLabel: "Rechercher des clubs avec Soccer Québec",
      },
      NB: {
        name: "Nouveau-Brunswick",
        board: "Soccer New Brunswick",
        directoryLabel: "Voir les clubs membres de Soccer NB",
      },
      NS: {
        name: "Nouvelle-Écosse",
        board: "Soccer Nova Scotia",
        directoryLabel: "Trouver votre club local en Nouvelle-Écosse",
      },
      PE: {
        name: "Île-du-Prince-Édouard",
        board: "PEI Soccer",
        directoryLabel:
          "Visiter l'association de soccer de l'Î.-P.-É.",
      },
      NL: {
        name: "Terre-Neuve-et-Labrador",
        board: "NLSA",
        directoryLabel:
          "Entrer en contact avec le soccer de Terre-Neuve-et-Labrador",
      },
      YT: {
        name: "Yukon",
        board: "Yukon Soccer Association",
        directoryLabel: "Explorer les programmes de soccer du Yukon",
      },
      NT: {
        name: "Territoires du Nord-Ouest",
        board: "NWT Soccer",
        directoryLabel:
          "Visiter le soccer des Territoires du Nord-Ouest",
      },
      NU: {
        name: "Nunavut",
        board: "Nunavut Soccer Association",
        directoryLabel:
          "Contacter le soccer du Nunavut via la fédération sportive",
      },
    },
    grantPrograms: {
      kidsport: {
        name: "KidSport Canada",
        tagline: "Pour que chaque enfant puisse jouer",
        description:
          "KidSport offre des subventions pouvant atteindre 500 $ par année pour aider à couvrir les frais d'inscription des enfants de 18 ans et moins. Des antennes existent dans les communautés de chaque province et territoire — ce qui en fait l'une des portes d'entrée les plus accessibles pour les familles nouvelles arrivantes et à faible revenu.",
        cta: "Demander du financement KidSport",
      },
      jumpstart: {
        name: "Canadian Tire Jumpstart",
        tagline: "Éliminer les obstacles financiers au sport",
        description:
          "Jumpstart aide les familles avec les coûts d'inscription, d'équipement et de transport pour que les enfants puissent joindre un sport organisé. Les subventions individuelles et les partenariats communautaires font en sorte que l'aide touche les enfants des communautés rurales, urbaines et immigrantes.",
        cta: "Explorer les subventions Jumpstart",
      },
    },
  },
  historySquadPage: {
    backLink: "← Retour à The Mosaic Pitch",
    squadNavAria: "Navigation historique des équipes",
    mensHistoryNav: "Historique masculin",
    womensHistoryNav: "Historique féminin",
    campaignWorldCupLabel: "Coupe du monde de la FIFA · {{year}}",
    headCoachLabel: "Entraîneur-chef :",
    behindTheBench: "Derrière le banc",
    squads: {
      men: {
        label: "Les Rouges",
        title: "Historique de la Coupe du monde masculine",
        subtitle:
          "Du Mexique 1986 à une course éliminatoire à domicile — chaque campagne de la feuille d'érable.",
      },
      women: {
        label: "Équipe nationale féminine du Canada",
        title: "Historique de la Coupe du monde féminine",
        subtitle:
          "Huit tournois. L'héritage de l'or olympique. Une génération dorée imparable.",
      },
    },
  },
  homePage: {
    badge: "Les Rouges · Coupe du monde 2026",
    headline: "Le Canada a montré au monde de quoi nous sommes faits.",
    subtitle:
      "D'un océan à l'autre, une génération dorée a transformé un pays de villes hockey en passionnés de football. C'est votre carrefour pour rencontrer les joueurs, honorer leurs parcours et trouver votre club pour la vie.",
    ctaMeetMosaic: "Rencontrez la mosaïque",
    ctaFindClub: "Trouvez votre club",
    ctaShareTile: "Partagez votre tuile",
    achievementsBadge: "Le curriculum doré",
    achievementsTitle: "Deux triomphes. Une nation footballistique.",
    achievements: {
      tokyo2021: {
        title: "Tokyo 2021 · Or olympique",
        headline: "Champions de la scène mondiale.",
        detail:
          "Les Canadiennes ont gravi le podium olympique à Tokyo — un triomphe sous forme de médaille d'or aux tirs de barrage qui a annoncé ce pays comme une véritable puissance footballistique.",
      },
      worldCup2026: {
        title: "Coupe du monde 2026 · À domicile",
        headline: "Une course historique devant les nôtres.",
        detail:
          "Les Rouges ont mené une génération dorée loin dans une Coupe du monde à domicile, transformant les stades de Vancouver à Toronto en une mer de rouge et allumant une nation de nouveaux partisans.",
      },
    },
    stats: {
      firstWorldCup: {
        value: "36 ans",
        label: "Première Coupe du monde depuis 1986",
      },
      nations: {
        value: "30+",
        label: "Nations représentées dans notre effectif",
      },
      oneCountry: {
        value: "1 🍁",
        label: "Un pays, des histoires infinies",
      },
    },
  },
};

export const dictionaries = {
  en,
  fr,
} as const satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocaleTag(locale: Locale): LocaleTag {
  return i18nConfig.localeTags[locale];
}
