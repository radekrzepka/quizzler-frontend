export interface UserInfo {
   userId: number;
   username: string;
   email: string;
   firstName?: string;
   lastName?: string;
   dateRegistered: string;
   avatar: number | null;
}
