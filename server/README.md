[back](../README.md)

## External Modules
- `express`
- `mongoose`
- `dotenv`
- `jsonwebtoken`
- `cookie-parser`
- `bcryptjs`

## WebToken Setup
1. Generate a secret key
```shell
openssl rand -base64 32
# append to file
openssl rand -base64 64 >> rand.secret.pub.key
```
2. put auth code
```js
// signature to generate token
token = jwt.sign({userid,role,date}, secretKey)

// attach to response body
res.cookie("token_name", token, {protocolType}).status(statusCode).json(object);

// verify tokens on access-points
jwt.verify(req.cookies.token_name, process.env.jwt, callback)

// adding middleware before all entrypoints to use cookieParser
app.use(cookieParser());
```
