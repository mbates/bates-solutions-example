import {
  Subjects,
  Publisher,
  ExampleEvent,
} from '@bates-solutions/common-example';

export class ExamplePublisher extends Publisher<ExampleEvent> {
  readonly subject = Subjects.Example;
}
