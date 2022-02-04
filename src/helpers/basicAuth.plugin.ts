import * as createBasicAuth from 'express-basic-auth';
import * as bcrypt from 'bcrypt';

const useBasicAuth = (basicAuthUserName: string, basicAuthHash: string) =>
  createBasicAuth({
    challenge: true,
    authorizeAsync: true,
    authorizer: (username, password, cb) => {
      const userMatches = createBasicAuth.safeCompare(
        username,
        basicAuthUserName,
      );
      bcrypt.compare(password, basicAuthHash).then((compResult) => {
        if (compResult && userMatches) {
          return cb(null, true);
        } else {
          return cb(null, false);
        }
      });
    },
  });

export default useBasicAuth;
