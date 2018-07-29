import PropTypes from 'prop-types';
import { requireNativeComponent, ViewPropTypes } from 'react-native';


const iface = {
  name: 'AndroidTextView',
  propTypes: {
    title: PropTypes.string,
    ...ViewPropTypes
  }
};

module.exports = requireNativeComponent('AndroidTextView', iface);
