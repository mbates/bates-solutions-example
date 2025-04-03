import {
  Subjects,
  Publisher,
  FooBarEvent,
} from '@bates-solutions/common-example';

export class FooBarPublisher extends Publisher<FooBarEvent> {
  readonly subject = Subjects.FooBar;
}
