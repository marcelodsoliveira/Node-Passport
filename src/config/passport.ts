import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "../models/User";


const noAuthorizedJson = { status: 401, message: "Não autorizado" };

passport.use(new BasicStrategy(async (email, password, done) => {
  if(email&& password){
    const user = await User.findOne({
      where: { email, password }
    });
  }
  return done(noAuthorizedJson, false);
}));

export default passport;
// This file is used to configure the passport authentication strategy.