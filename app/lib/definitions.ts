export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  date_inscription:Date;
};

export type utilisateurs = {
  idutilisateurs: string;
  nom: string;
  email: string;
  motdepasse: string;
  date_inscription: Date;  
};

export interface Quiz {
  id: string;
  title: string;
  description: string;
  numberOfQuestions: number;
  timeLimit: number;
}

export interface Question {
  id: string;
  text: string;
  quizId: string;
  options?: Response[];
}

export interface Response {
  id: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
}


export type Ranking = {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  rankingDate: Date;
};
