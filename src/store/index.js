import { merge, namespaced } from 'overmind/config';
import { createHook } from 'overmind-react';

import { onInitialize } from './onInitialize'
import { state } from './state'
import * as effects from './effects';
import * as actions from './actions';

// common
import * as alert from '@/store/namespaces/alert';
import * as hud from '@/store/namespaces/hud';
import * as pushNotification from '@/store/namespaces/pushNotification';

export const config = merge(
  {
    onInitialize,
    state,
    effects,
    actions
  },
  namespaced({
    alert,
    hud,
    pushNotification
  })
)

export const useOvermind = createHook();
