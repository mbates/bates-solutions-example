import { Subjects } from './subjects';

export interface FooBarEvent {
  subject: Subjects.FooBar;
  data: {
    foo: string;
    bar: number;
  };
}
