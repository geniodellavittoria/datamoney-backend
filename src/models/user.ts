export interface User {
  id: string;
  role: 'doctor' | 'patient' | 'buyer';
  privateWalletId: string;
  publicWalletId: string;
  username: string;
  password?: string;
}
