import {} from '@bates-solutions/common';
import {
  Listener,
  Status,
  ExampleEvent,
  Subjects,
} from '@bates-solutions/common-example';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';

export class FooListener extends Listener<ExampleEvent> {
  readonly subject = Subjects.Example;
  queueGroupName = queueGroupName;

  async onMessage(data: ExampleEvent['data'], msg: Message) {
    console.log(
      'I should do some stuff with Status.Active and Status.Deleted',
      Status.Active,
      Status.Deleted
    );

    msg.ack();
  }
}
