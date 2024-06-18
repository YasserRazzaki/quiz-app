export type utilisateurs = {
  idutilisateurs: string;
  nom: string;
  email: string;
  motdepasse: string;
  date_inscription: Date;  
};

export type RankingMap = {
  id: number;
  userId: string;
  score: number;
  rankingDate: Date;
};

export type RankingAPI = {
  id: number;
  userId: string;
  score: number;
  rankingDate: Date;
};