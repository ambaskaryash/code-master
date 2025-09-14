import { atom } from "recoil";

type AuthModalState = {
	isOpen: boolean;
	type: "login" | "register" | "forgotPassword";
};

const initalAuthModalState: AuthModalState = {
	isOpen: false,
	type: "login",
};

// Use a unique key to prevent HMR duplicate key errors
const uniqueKey = `authModalState_${Math.random().toString(36).substring(2, 15)}`;

export const authModalState = atom<AuthModalState>({
	key: process.env.NODE_ENV === 'development' ? uniqueKey : "authModalState",
	default: initalAuthModalState,
});
