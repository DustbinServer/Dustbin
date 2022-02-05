# Dustbin

It's just another text storage service built in **fastify**.

## API

Ofcouse we have an public API without any api-key required.
Let's get started with it...

### Endpoints

```diff
+ POST /api/get - Get a paste from the storage

PARAMETERS
[fileId]: string
```

```diff
+ POST /api/new - Create a new paste

PARAMETERS
[data]: string
[language]: string
```

## Examples

- ### Python

```python
import requests

# Create A New Paste
new_req = requests.post(
    'https://dustbin.me/api/new',
    json={
        'data': 'def main():\n\tprint("Hello World!")\n\nif __name__ == "__main__":\n\tmain()',
        'language': 'Python'
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

- ### Dart

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
