const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '12345678-1234-1234-1234-123456789abc',
    name: 'Alice',
    email: 'yuno@mail.com',
    password: '123456',
  },
  {
    id: '87654321-4321-4321-4321-210987654321',
    name: 'Bob',
    email: 'bob@nextmail.com',
    password: '123456',
  },
  {
    id: '11223344-5566-7788-99aa-bbccddeeff00',
    name: 'Charlie',
    email: 'charlie@nextmail.com',
    password: '123456',
  },
  {
    id: '99887766-5544-3322-1100-ffeeccbbaa99',
    name: 'Diana',
    email: 'diana@nextmail.com',
    password: '123456',
  },
  {
    id: '99885766-5544-3322-1100-ffeeccbbaa99',
    name: 'Jett',
    email: 'jett@nextmail.com',
    password: '123456',
    
  },
  {
    id: '98885766-5544-3322-1100-ffeeccbbaa99',
    name: 'Jet',
    email: 'jet@nextmail.com',
    password: '123456',
    
  },
  {
    id: '97885766-5544-3322-1100-ffeeccbbaa99',
    name: 'Tom',
    email: 'tom@nextmail.com',
    password: '1234567',
    
  },
];

const quizzes = [
  {
    id: 'quiz1',
    title: 'Math Quiz',
    description: 'A simple quiz on basic mathematics',
    numberOfQuestions: 5,
    timeLimit: 600
  },
  {
    id: 'quiz2',
    title: 'Science Quiz',
    description: 'Explore the wonders of science',
    numberOfQuestions: 5,
    timeLimit: 900
  }
];

const questions = [
  {
    id: 'q1',
    text: 'What is 2+2?',
    quizId: 'quiz1'
  },
  {
    id: 'q2',
    text: 'What is the boiling point of water?',
    quizId: 'quiz2'
  }
];

const responses = [
  {
    id: 'r1',
    text: '4',
    isCorrect: true,
    questionId: 'q1'
  },
  {
    id: 'r2',
    text: '22',
    isCorrect: false,
    questionId: 'q1'
  },
  {
    id: 'r3',
    text: '100°C',
    isCorrect: true,
    questionId: 'q2'
  },
  {
    id: 'r4',
    text: '90°C',
    isCorrect: false,
    questionId: 'q2'
  }
];

const rankings = [
  {
    id: 'rank1',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    quizId: 'quiz1',
    score: 5,
    rankingDate: new Date()
  },
  {
    id: 'rank2',
    userId: '12345678-1234-1234-1234-123456789abc',
    quizId: 'quiz2',
    score: 3,
    rankingDate: new Date()
  }
];

module.exports = {
  users,
  quizzes,
  questions,
  responses,
  rankings
};
