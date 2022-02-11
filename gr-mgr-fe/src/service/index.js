/* 所有请求相关的内容都会放在service这个目录下面 */
// import { register } from './auth';
// 把auth文件导出的所有内容聚合到一个对象里这个对象就叫auth
export * as auth from './auth';
export * as record from './record';
export * as user from './user';
export * as character from './character';
export * as log from './log';
export * as resetPassword from './reset-password';
export * as inviteCode from './invite-code';

