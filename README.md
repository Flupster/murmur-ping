# murmur-ping
Receive server information from a murmur (mumble) server


## Usage
```TS
import { ping } from "murmur-ping";
//JavaScript: const { ping } = require("murmur-ping");

ping("localhost", 64738).then((result) => console.log(result));
ping("localhost", 64738, "udp4", 100).then((result) => console.log(result)); // with timeout
ping("::1", 64738, "udp6").then((result) => console.log(result)); // ipv6
```

## Result

```JS
{
  version: '1.5.0',
  users: 9,
  maxUsers: 100,
  bandwidth: 256000,
  latency: 2
}
```
