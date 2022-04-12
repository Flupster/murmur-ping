import { createSocket } from 'dgram';

interface PingResult {
  version: string;
  users: number;
  maxUsers: number;
  bandwidth: number;
  latency: number;
}

type PingArgs = [host: string, port: number, protocol?: 'udp4' | 'udp6', timeout?: number];

function ping(...args: PingArgs): Promise<PingResult> {
  const [host, port, protocol = 'udp4', timeout = 1000] = args;
  const client = createSocket(protocol);

  return new Promise((resolve, reject) => {
    let start: number;
    client.send(new Uint8Array(12), 0, 12, port, host, (e) => {
      start = +new Date();
      if (e) reject(e);
    });

    client.on('message', (msg) => {
      const latency = +new Date() - start;

      resolve({
        version: msg.slice(1, 4).join('.'),
        users: msg.readUInt32BE(12),
        maxUsers: msg.readUInt32BE(16),
        bandwidth: msg.readUInt32BE(20),
        latency,
      });

      client.close();
    });

    setTimeout(() => reject('timeout'), timeout);
  });
}

export { ping };
