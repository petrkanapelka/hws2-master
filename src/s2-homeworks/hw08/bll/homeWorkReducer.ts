import { UserType } from '../HW8';

type ActionType = { type: 'sort'; payload: 'up' | 'down' } | { type: 'check'; payload: number };

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': {
            return [
                ...state.sort((a, b) => {
                    return action.payload === 'up'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                }),
            ];
        }
        case 'check': {
            const filteredState = state.filter((user) => user.age >= action.payload);
            return filteredState.sort((a, b) => a.name.localeCompare(b.name));
        }
        default:
            return state;
    }
};
