import { Subjects } from "./subjects";

export interface ExampleEvent {
  subject: Subjects.Example;
  data: {
    message: string;
  };
}
