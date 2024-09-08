const initState = {
    themeId: 1,
};

type StateType = typeof initState;

export const themeReducer = (state = initState, action: ActionType): StateType => {
    // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID': {
            return { ...state, themeId: action.id };
        }
        default:
            return state;
    }
};

type ActionType = ChangeThemeType;

type ChangeThemeType = {
    type: string;
    id: number;
};

export const changeThemeId = (id: number): ChangeThemeType =>
    ({ type: 'SET_THEME_ID', id } as const); // fix any
