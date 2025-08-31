"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const google_auth_entity_1 = require("./src/modules/auth/google/google.auth.entity");
const naver_auth_entity_1 = require("./src/modules/auth/naver/naver.auth.entity");
const phone_verification_entity_1 = require("./src/modules/phone/phone-verification.entity");
const session_entity_1 = require("./src/modules/auth/session/session.entity");
const self_intro_entity_1 = require("./src/modules/self-intro/self-intro.entity");
const myInfo_entity_1 = require("./src/modules/myInfo/myInfo.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'react-nest',
    synchronize: false,
    logging: true,
    entities: [
        google_auth_entity_1.GoogleUser,
        naver_auth_entity_1.NaverUser,
        phone_verification_entity_1.PhoneVerification,
        session_entity_1.UserSession,
        self_intro_entity_1.SelfIntro,
        myInfo_entity_1.MyInfo,
    ],
});
//# sourceMappingURL=data-source.js.map