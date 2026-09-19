export type Difficulty = "C" | "A" | "I"; // Contenido / Análisis / Ingenio

export interface TheorySection {
  id: string;
  kind: "def" | "theorem" | "proof" | "note";
  title: string;
  body: string; // supports $inline$ and $$block$$ LaTeX
}

export interface SolutionStep {
  text: string; // supports LaTeX
}

export interface WorkedExample {
  id: string;
  title: string;
  difficulty: Difficulty;
  source?: string;
  statement: string;
  steps: SolutionStep[];
  answer: string;
}

export interface Exercise {
  id: string;
  title: string;
  difficulty: Difficulty;
  source?: string;
  statement: string;
  steps: SolutionStep[];
  answer: string;
  answerNumeric?: number; // for self-check input, when a single number applies
}

export type QuizQuestionType = "mc" | "tf" | "fill";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string; // supports LaTeX
  options?: string[]; // for "mc"
  correctIndex?: number; // for "mc"
  correctBool?: boolean; // for "tf"
  correctText?: string[]; // for "fill" — accepted normalized answers
  explanation: string; // shown after answering, supports LaTeX
}

export interface FlashCard {
  id: string;
  front: string; // prompt/question, supports LaTeX
  back: string; // concise answer, supports LaTeX
}

export interface Week {
  slug: string;
  number: number;
  dateRange: string;
  title: string;
  summary: string;
  sections: string[]; // Stewart sections reference
  theory: TheorySection[];
  examples: WorkedExample[];
  exercises: Exercise[];
  quiz?: QuizQuestion[];
  flashcards?: FlashCard[];
}
