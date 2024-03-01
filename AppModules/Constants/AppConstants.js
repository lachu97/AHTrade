import {LayoutAnimation} from 'react-native';

export const INFO_TEXT =
  'Due to High Demand,the Maximum Quantity is limited to 25 MT(Metric Tonne) per Order per User';
export const PRIVACY_POLICY_LINK = 'https://atlashorizon.in/privacypolicy/';

export const TERMS_AND_CONDITION = 'https://atlashorizon.in/termsandconditons/'
export const DELETION_LINK = '';
export const SLACK_GROUP_URL = 'https://hooks.slack.com/services/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'
export const layoutAnimConfig = {
  duration: 599,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};
