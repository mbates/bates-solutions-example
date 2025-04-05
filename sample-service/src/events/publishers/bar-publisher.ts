import {
  Subjects,
  Publisher,
  FooBarEvent,
} from '@bates-solutions/common-example';

export class BarPublisher extends Publisher<FooBarEvent> {
  readonly subject = Subjects.FooBar;
}
