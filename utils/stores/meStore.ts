

import { atom, useRecoilState } from 'recoil';
import { IUser } from '../account';

export const meStore = atom<IUser|null>({
    key: 'me',
    default: null
})
