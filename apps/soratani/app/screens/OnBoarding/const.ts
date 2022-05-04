import { translate } from 'apps/soratani/app/i18n';
import { IProcessItem } from './components';

export const onBoardingScreens: IProcessItem[] = [
  {
    id: 1,
    backgroundImage: require('../../../assets/images/background_01.png'),
    bannerImage: require('../../../assets/images/on_boarding_bg.png'),
    title: translate('OnBoarding.one.title'),
    description: translate('OnBoarding.one.description'),
  },
  {
    id: 2,
    backgroundImage: require('../../../assets/images/background_02.png'),
    bannerImage: require('../../../assets/images/on_boarding_bg_one.png'),
    title: translate('OnBoarding.two.title'),
    description: translate('OnBoarding.two.description'),
  },
  {
    id: 3,
    backgroundImage: require('../../../assets/images/background_01.png'),
    bannerImage: require('../../../assets/images/on_boarding_bg_two.png'),
    title: translate('OnBoarding.three.title'),
    description: translate('OnBoarding.three.description'),
  },
];
