import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { authQueryKeys } from './auth';

export const allQueryKeysStore = mergeQueryKeys(authQueryKeys);
