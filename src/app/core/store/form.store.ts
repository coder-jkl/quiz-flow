import { Service } from '@angular/core';

interface QuizForm {
  id: string;
  title: string | null;
  question: string | null;
  fields: {
    value: string | null;
    isAnswer: boolean;
  }[];
}

interface QuizState {
  forms: QuizForm[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  forms: [],
  loading: false,
  error: null,
};

// const quizFlowStore = createStore(
//   { name: 'quiz-flow' },
//   withProps<QuizState>(initialState)
// );

// @Service()
// export class FormStore {
//   public readonly forms$ = quizFlowStore.pipe(select((store) => {
//     return store.forms;
//   }));
//
//   public saveAllForms(forms: QuizForm[]): void {
//     quizFlowStore.update((store) => {
//       return {
//         ...store,
//         forms: forms,
//       };
//     })
//   }
// }
