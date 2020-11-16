import Redirect from 'umi/redirect';
import { sysDefultPage } from '@/config/platform.config';

export default () => <Redirect to={{ pathname:sysDefultPage.pathname, state: {} }} />
