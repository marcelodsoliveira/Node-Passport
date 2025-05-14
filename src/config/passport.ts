import passport from "passport";
import dotenv from "dotenv";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/User";


dotenv.config();



const notAuthorizedJson = { status: 401, message: 'Não autorizado' };
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
}

passport.use(new JwtStrategy(options, async (payload, done) => {
  const user = await User.findByPk(payload.id);
  if(user) {
    return done(null, user);  
  } else {
    return done(notAuthorizedJson, false);
  } 
}));



export default passport;
// This file is used to configure the passport authentication strategy.