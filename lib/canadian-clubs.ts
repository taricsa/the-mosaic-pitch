export type CanadianClub = {
  name: string;
  league: "CPL" | "MLS";
  city: string;
  url: string;
};

export const CANADIAN_CLUBS: CanadianClub[] = [
  {
    name: "Atlético Ottawa",
    league: "CPL",
    city: "Ottawa, ON",
    url: "https://atleticoottawa.canpl.ca/",
  },
  {
    name: "Cavalry FC",
    league: "CPL",
    city: "Calgary, AB",
    url: "https://cavalryfc.canpl.ca/",
  },
  {
    name: "FC Edmonton",
    league: "CPL",
    city: "Edmonton, AB",
    url: "https://fcedmonton.canpl.ca/",
  },
  {
    name: "Forge FC",
    league: "CPL",
    city: "Hamilton, ON",
    url: "https://forgefc.canpl.ca/",
  },
  {
    name: "Halifax Wanderers FC",
    league: "CPL",
    city: "Halifax, NS",
    url: "https://canpl.ca/halifax-wanderers",
  },
  {
    name: "Pacific FC",
    league: "CPL",
    city: "Langford, BC",
    url: "https://pacificfc.canpl.ca/",
  },
  {
    name: "Valour FC",
    league: "CPL",
    city: "Winnipeg, MB",
    url: "https://valourfc.canpl.ca/",
  },
  {
    name: "Vancouver FC",
    league: "CPL",
    city: "Langley, BC",
    url: "https://vancouverfc.canpl.ca/",
  },
  {
    name: "York United FC",
    league: "CPL",
    city: "Toronto, ON",
    url: "https://yorkunitedfc.canpl.ca/",
  },
  {
    name: "CF Montréal",
    league: "MLS",
    city: "Montréal, QC",
    url: "https://www.cfmontreal.com/",
  },
  {
    name: "Toronto FC",
    league: "MLS",
    city: "Toronto, ON",
    url: "https://www.torontofc.ca/",
  },
  {
    name: "Vancouver Whitecaps FC",
    league: "MLS",
    city: "Vancouver, BC",
    url: "https://www.whitecapsfc.com/",
  },
];

export const CPL_SCHEDULE_URL = "https://canpl.ca/schedule";
export const MLS_SCHEDULE_URL = "https://www.mlssoccer.com/schedule";
