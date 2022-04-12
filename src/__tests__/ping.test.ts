import { ping } from '../index';

test('Mumble Ping localhost on port 64738', async () => {
  const result = await ping('localhost', 64738);

  expect(result.version).toEqual(expect.any(String));
  expect(result.users).toEqual(expect.any(Number));
  expect(result.maxUsers).toEqual(expect.any(Number));
  expect(result.bandwidth).toEqual(expect.any(Number));
  expect(result.latency).toEqual(expect.any(Number));
});
