export type utilisateurs = {
  id: string;
  nom: string;
  email: string;
  motdepasse: string;
  date_inscription: Date;  
};

export type inscrits = {
  id: number;
  nom: string;
  email: string;
  motdepasse: string;
  date_inscription: Date;  
};

export type RankingMap = {
  id: number;
  username: string;
  score: number;
  rankingDate: Date;
};

export type RankingAPI = {
  id: number;
  username: string;
  score: number;
  rankingDate: Date;
};