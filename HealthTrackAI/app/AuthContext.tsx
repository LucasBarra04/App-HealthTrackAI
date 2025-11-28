
type AuthContextType = {
  user: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
};

