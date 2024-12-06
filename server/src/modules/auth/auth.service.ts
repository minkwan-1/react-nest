// // test code
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {
//   private users: any[] = [];

//   // 유저 검색 또는 등록
//   registerOrFindUser(user: any, provider: string): any {
//     const existingUser = this.users.find(
//       (u) => u.providerId === user.id && u.provider === provider,
//     );

//     if (!existingUser) {
//       const newUser = {
//         id: this.users.length + 1,
//         providerId: user.id,
//         provider,
//         nickname: user.nickname || user.name,
//         email: user.email,
//       };
//       this.users.push(newUser);
//       return newUser;
//     }

//     return existingUser;
//   }

//   getAllUsers() {
//     return this.users;
//   }
// }
