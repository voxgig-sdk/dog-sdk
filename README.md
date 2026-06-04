# Dog SDK

Free, open-source library of 20,000+ dog photos covering 120+ breeds and their sub-breeds

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Dog API

The [Dog API](https://dog.ceo/dog-api/) ("Dog CEO") is a free, community-driven service that exposes a large catalogue of dog photos through a small JSON HTTP API. It is maintained as an open-source project, with images contributed via the [dog-api-images](https://github.com/jigsawpieces/dog-api-images) GitHub repository, and runs on donations.

What you get from the API:

- A master list of breeds and their sub-breeds (`/breeds/list/all`).
- Random dog images, either from the full collection or filtered by breed / sub-breed.
- Direct image URLs that can be embedded or downloaded.

All endpoints are served from `https://dog.ceo/api` over HTTPS and return JSON. No authentication is required, and the published documentation does not specify rate limits — please be considerate when batching requests.

## Try it

**TypeScript**
```bash
npm install dog
```

**Python**
```bash
pip install dog-sdk
```

**PHP**
```bash
composer require voxgig/dog-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/dog-sdk/go
```

**Ruby**
```bash
gem install dog-sdk
```

**Lua**
```bash
luarocks install dog-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DogSDK } from 'dog'

const client = new DogSDK({})

// List all breeds
const breeds = await client.Breed().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o dog-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "dog": {
      "command": "/abs/path/to/dog-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Breed** | The taxonomy of dogs covered by the API, including sub-breeds; backed by `/breeds/list/all` and breed-scoped image endpoints under `/breed/{breed}`. | `/breed/{breed}/list` |
| **Image** | Photographs of dogs returned as direct image URLs, available as random picks (`/breeds/image/random`) or filtered by breed and sub-breed. | `/breed/{breed}/{subBreed}/images` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from dog_sdk import DogSDK

client = DogSDK({})

# List all breeds
breeds, err = client.Breed(None).list(None, None)

# Load a specific breed
breed, err = client.Breed(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'dog_sdk.php';

$client = new DogSDK([]);

// List all breeds
[$breeds, $err] = $client->Breed(null)->list(null, null);

// Load a specific breed
[$breed, $err] = $client->Breed(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/dog-sdk/go"

client := sdk.NewDogSDK(map[string]any{})

// List all breeds
breeds, err := client.Breed(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Dog_sdk"

client = DogSDK.new({})

# List all breeds
breeds, err = client.Breed(nil).list(nil, nil)

# Load a specific breed
breed, err = client.Breed(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("dog_sdk")

local client = sdk.new({})

-- List all breeds
local breeds, err = client:Breed(nil):list(nil, nil)

-- Load a specific breed
local breed, err = client:Breed(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DogSDK.test()
const result = await client.Breed().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DogSDK.test(None, None)
result, err = client.Breed(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DogSDK::test(null, null);
[$result, $err] = $client->Breed(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Breed(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DogSDK.test(nil, nil)
result, err = client.Breed(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Breed(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Dog API

- Upstream: [https://dog.ceo/dog-api/](https://dog.ceo/dog-api/)
- API docs: [https://dog.ceo/dog-api/documentation/](https://dog.ceo/dog-api/documentation/)

- The Dog API is a free, open-source service; no API key or registration is required.
- Image data is sourced from the community-maintained [dog-api-images](https://github.com/jigsawpieces/dog-api-images) repository on GitHub.
- No explicit licence terms are published on the site; check the upstream image repository for any per-image attribution requirements.
- The project is donation-supported and may be subject to availability changes; treat hosting as best-effort.

---

Generated from the Dog API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
