<p align="center"><img src="https://avatars.githubusercontent.com/u/88306458?s=200&v=4"></p>
<p align="center">It's just another text storage service built in <b>fastify</b>.</p>

## Table of Contents

- [Api](#api)
  - [Endpoints](#endpoints)
- [Examples](#examples)
- [Developers](#developers)

## API

Ofcouse we have an public API without any api-key required.
Let's get started with it...

### Endpoints

#### The following endpoints are available -

Get a paste from the storage -

```http
POST /api/get HTTP/1.1
Host: dustbin.me
Content-Type: application/json

{ "fileId": "<string>" }
```

The request body is provided in place -

```http
POST /api/new HTTP/1.1
Host: dustbin.me
Content-Type: application/json

{ "data" : "<string>", "language": "string" }
```

Get a paste in browser -

```http
GET /paste/{fileId} HTTP/1.1
Host: dustbin.me
```

Get raw paste in browser -

```http
GET /paste/{fileId}/raw HTTP/1.1
Host: dustbin.me
```

Download a paste in browser -

```http
GET /paste/{fileId}/download HTTP/1.1
Host: dustbin.me
```

## Examples

- #### Python

```python
import requests

# Create A New Paste
new_req = requests.post(
  'https://dustbin.me/api/new',
  json={
    'data': 'def main():\n\tprint("Hello World!")\n\nif __name__ == "__main__":\n\tmain()',
    'language': 'Python',
})
print(new_req.json())
paste_id = new_req.json()['id']

# Get The Same Paste
paste_req = requests.post(
  'https://dustbin.me/api/paste/',
  json={'fileId': paste_id},
)
print(paste_req.json())
```

- #### Dart

```dart
import 'dart:convert';

import 'package:http/http.dart' as http;

void main(List<String>? arguments) async {
  // Create A New Paste
  var new_req = await http.post(
    Uri.parse('https://dustbin.me/api/new'),
    body: {
      'data': 'void main() {\n\tprint("Hello World!");\n}',
      'language': 'Dart',
    }
  );
  print(new_req.body);
  final String pasteId = jsonDecode(new_req.body)['id'];

  // Get The Same Paste
  var paste_req = await http.post(
    Uri.parse('https://dustbin.me/api/get/'),
    body: {
      'fileId': pasteId,
    }
  );
  print(paste_req.body);
}
```

## Developers

- [Akash Pattnaik](https://github.com/BLUE-DEVIL1134)
- [Arnab Paryali](https://github.com/ArnabXD)
