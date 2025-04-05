import { ExampleListener } from '../example-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Message } from 'node-nats-streaming';
import { ExampleEvent } from '@bates-solutions/common-example';

const setup = async () => {
  const listener = new ExampleListener(natsWrapper.client);

  const data: ExampleEvent['data'] = {
    message: 'test message',
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

describe('example-listener', () => {
  it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
