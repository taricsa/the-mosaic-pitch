export type StaffMember = {
  name: string;
  role: string;
};

export type WorldCupCampaign = {
  id: string;
  year: number;
  hostCountry: string;
  result: string;
  headCoach: string;
  auxiliares: StaffMember[];
  story: string;
  milestone: string;
};

export const MENS_WC_HISTORY: WorldCupCampaign[] = [
  {
    id: "mnt-1986",
    year: 1986,
    hostCountry: "Mexico",
    result: "Group Stage",
    headCoach: "Tony Waiters",
    auxiliares: [
      { name: "Bob Bearpark", role: "Assistant Coach" },
      { name: "Les Wilson", role: "Team Manager" },
    ],
    story:
      "The pioneering crew that shocked the sporting landscape by qualifying out of CONCACAF with little money and no domestic league. In Mexico, Captain Bruce Wilson and former NASL stars held global powers like France to an agonizingly close 1-0 battle, laying down the baseline grit for Canadian soccer history.",
    milestone: "Historic World Cup debut campaign.",
  },
  {
    id: "mnt-2022",
    year: 2022,
    hostCountry: "Qatar",
    result: "Group Stage",
    headCoach: "John Herdman",
    auxiliares: [
      { name: "Mauro Biello", role: "Assistant Coach" },
      { name: "Eric Tenllado", role: "Assistant Coach & Performance Lead" },
      { name: "Simon Eaddy", role: "Goalkeeper Coach" },
      { name: "Robyn Gayle", role: "Mental & Cultural Performance Coach" },
      { name: "Alex Dodgshon", role: "Scouting & Analytics Coach" },
    ],
    story:
      "The generation that broke the 36-year curse by topping CONCACAF qualification with an unbeaten run on freezing home-soil nights. In Qatar, Alphonso Davies scored the country's historic first-ever Men's World Cup goal against Croatia with a booming header just 68 seconds into kickoff, announcing a new era.",
    milestone: "First tournament goal scored.",
  },
  {
    id: "mnt-2026",
    year: 2026,
    hostCountry: "Canada / USA / Mexico",
    result: "Knockout Run",
    headCoach: "Jesse Marsch",
    auxiliares: [
      { name: "Mauro Biello", role: "Assistant Coach" },
      { name: "Ewan Sharp", role: "Assistant Coach & Head Opposition Analyst" },
      { name: "Pierre Barrieu", role: "Assistant Coach & Head of Performance" },
      { name: "Daniel Michelucci", role: "Director of National Team Operations" },
      { name: "Jan Lang", role: "Men's National Team Manager" },
    ],
    story:
      "Playing on home soil in front of rocking, sold-out stands from Vancouver to Toronto. Re-energized by a high-intensity press tactical identity, Les Rouges translated home-crowd passion into a historic, unforgettable run deep into the expanded tournament bracket, cementing soccer as a mainstream Canadian obsession.",
    milestone: "Historic knockout achievement on home soil.",
  },
];

export const WOMENS_WC_HISTORY: WorldCupCampaign[] = [
  {
    id: "wnt-1995",
    year: 1995,
    hostCountry: "Sweden",
    result: "Group Stage",
    headCoach: "Sylvie Béliveau",
    auxiliares: [{ name: "Geri Donnelly", role: "Technical Staff / Captain" }],
    story:
      "Canada's historic entry into the elite echelons of global women's football. Led by coach Sylvie Béliveau, this trailblazing group fought through group-stage battles against England and Norway, writing the opening blueprint for high-performance women's sports development under the Maple Leaf.",
    milestone: "Inaugural Women's World Cup appearance.",
  },
  {
    id: "wnt-1999",
    year: 1999,
    hostCountry: "United States",
    result: "Group Stage",
    headCoach: "Neil Turnbull",
    auxiliares: [{ name: "Charmaine Hooper", role: "Technical Leader" }],
    story:
      "A gritty campaign across packed stadiums in the United States that established Canada as a tough, physical contender. The tournament laid down essential structural lessons that paved the way for the youth EXCEL development tracks of the 21st century.",
    milestone: "Foundational tournament growth.",
  },
  {
    id: "wnt-2003",
    year: 2003,
    hostCountry: "United States",
    result: "4th Place Finish",
    headCoach: "Even Pellerud",
    auxiliares: [{ name: "Ian Bridge", role: "Assistant Coach" }],
    story:
      "A legendary, transcendent breakthrough. Under Norwegian mentor Even Pellerud, Canada charged through the knockouts—shocking regional giants to secure a historic fourth-place global finish. This was the exact launchpad tournament that witnessed the definitive rise of a young captain named Christine Sinclair.",
    milestone: "Historic Top-4 global finish.",
  },
  {
    id: "wnt-2007",
    year: 2007,
    hostCountry: "China",
    result: "Group Stage",
    headCoach: "Even Pellerud",
    auxiliares: [{ name: "Clami Soccer", role: "Performance Analyst" }],
    story:
      "An intensely close Asian campaign where Canada missed out on the quarter-finals by a fraction of a metric margin due to a late 92nd-minute equalizer by Australia. The squad showed world-class technical adaptation, proving that their 2003 success was no fluke.",
    milestone: "Elite level consolidation.",
  },
  {
    id: "wnt-2011",
    year: 2011,
    hostCountry: "Germany",
    result: "Group Stage",
    headCoach: "Carolina Morace",
    auxiliares: [
      { name: "Elisabetta Bavagnoli", role: "Assistant Coach" },
      { name: "Luigi Garzya", role: "Technical Analyst" },
    ],
    story:
      "A difficult tournament in Germany that ended in heartbreak, but paradoxically triggered the most important turning point in the nation's soccer history. The baseline frustration directly led to the hiring of John Herdman and the dawn of Canada's golden medal era.",
    milestone: "Catalyst for modern structural shift.",
  },
  {
    id: "wnt-2015",
    year: 2015,
    hostCountry: "Canada",
    result: "Quarter-Finals",
    headCoach: "John Herdman",
    auxiliares: [
      { name: "Bev Priestman", role: "Assistant Coach" },
      { name: "Simon Eaddy", role: "Goalkeeper Coach" },
      { name: "Robyn Gayle", role: "Mental & Wellness Manager" },
    ],
    story:
      "A historic, soaring celebration of soccer across home soil. Playing in front of record-breaking crowds from coast to coast, Herdman's squad advanced into the quarter-finals, turning the entire country into a sea of red and cementing the women's team as mainstream national heroes.",
    milestone: "Record-breaking home attendance.",
  },
  {
    id: "wnt-2019",
    year: 2019,
    hostCountry: "France",
    result: "Round of 16",
    headCoach: "Kenneth Heiner-Møller",
    auxiliares: [
      { name: "Bev Priestman", role: "Assistant Coach" },
      { name: "Danny Worthington", role: "Assistant Coach" },
    ],
    story:
      "A highly tactical, European campaign where Canada navigated past tough group-stage clean sheets before bowing out in a narrow, physical round of 16 defensive chess match against Sweden. The tournament bridges the transition toward the iconic Olympic Gold squad.",
    milestone: "Navigated competitive group stage.",
  },
  {
    id: "wnt-2023",
    year: 2023,
    hostCountry: "Australia / New Zealand",
    result: "Group Stage",
    headCoach: "Bev Priestman",
    auxiliares: [
      { name: "Andy Spence", role: "Assistant Coach" },
      { name: "Jasmine Mander", role: "Assistant Coach" },
      { name: "Jen Herst", role: "Goalkeeper Coach" },
    ],
    story:
      "Entering the Southern Hemisphere as reigning Olympic Gold champions, Canada faced deep tactical hurdles and injury constraints. While the tournament ended early, it served as the final international tournament curtain call for legendary captain Christine Sinclair, the greatest goalscorer in global game history.",
    milestone: "Sinclair's final World Cup campaign.",
  },
];
