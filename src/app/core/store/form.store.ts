import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Field {
  value: string | null;
  isAnswer: boolean;
}

export interface QuizForm {
  id: string;
  title: string;
  question: string;
  fields: Field[];
}

export interface QuizState {
  forms: QuizForm[];
}

const initialQuizState: QuizState = {
  forms: [],
};

export const quizFlowStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizState),
  withComputed(({ forms }) => ({
    getForms: computed(() => forms()),
  })),
  withMethods((store) => ({
    saveAllForms(forms: QuizForm[]): void {
      patchState(store, { forms });
      console.log(forms);
    },
  }))
);
