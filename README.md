# @lynx-roleplay/client-api
Rest API to make Lynx Client work.

## Installation

Make sure you have `git`, `npm` and `node` installed.

```bash
$ git clone https://github.com/lynx-roleplay/client-api.git
$ cd client-api
$ npm i
```

Add `downloads.json` to `config/downloads.json` in project root. The syntax is as following:

```json
{
  "jre": {
    "win32_x86": "32-Bit Windows JRE Download URL",
    "win32_x86_64": "64-Bit Windows JRE Download URL",
    "linux_x86": "32-Bit GNU/Linux JRE Download URL",
    "linux_x86_64": "64-Bit GNU/Linux JRE Download URL"
  },
  "modpack": "Modpack Download URL"
}
```

## Usage

You can start the server with npm.

```bash
$ npm start
```

You can also use Docker.

```bash
$ make dockerstart
```

## Endpoints

| Endpoint                      | Description                         | Returns             |
| ----------------------------- | ----------------------------------- | ------------------- |
| GET /client                   | Shows information about the client. | { version: number } |
| GET /game                     | Shows information about the game.   | { version: number } |
| POST /auth                    | Generates an authentication token.  | { authentication_token: string } |
| GET /download/:platform/:arch | Shows download links for platform. `modpack` is only available if authorized. | { jre: string, modpack?: string } |

## Authorization

You can get the authentication token by sending a post request to `/auth` endpoint.

#### cURL Example:

```bash
$ curl -H "Content-Type: application/json" \
    -d '{"id": "client_id"}' \
    http://link.to.api/auth -X POST
```

After getting the token, you can authorize using headers.

#### cURL Example:

```bash
$ curl -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${token}" \
    http://link.to.api/download/linux/x86_64 -X GET
```