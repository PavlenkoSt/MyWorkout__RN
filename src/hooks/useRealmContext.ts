import {createRealmContext} from '@realm/react';

import realmConfig from '@app/db/realmConfig';

const context = createRealmContext(realmConfig);

const useRealmContext = () => context;

export default useRealmContext;

export const realm = new Realm(realmConfig);
