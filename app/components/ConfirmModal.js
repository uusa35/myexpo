import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import {StyleSheet, Text} from 'react-native';
import widgetStyles from './widgets/widgetStyles';
import I18n from '../I18n';
import DesigneratBtn from './widgets/Button/DesigneratBtn';
import Modal from 'react-native-modal';
import React from 'react';
import PropTypes from 'prop-types';
import DesigneratCartListConfirmationScreen from './widgets/cart/DesigneratCartListConfirmationScreen';

const ConfirmModal = ({
  isVisible,
  setIsVisible,
  handleClick,
  title = '',
  message = '',
}) => {
  return (
    <Modal isVisible={isVisible} transparent={true}>
      <View
        style={{
          height: '30%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'exclamation'}
            type="evilicon"
            style={{paddingLeft: 5, paddingRight: 5}}
          />
          <Text style={widgetStyles.headerFour}>{title}</Text>
        </View>
        <View style={[widgetStyles.panelContent, {marginBottom: 10}]}>
          <Text
            style={[
              widgetStyles.headerFour,
              {textAlign: 'center', lineHeight: 25},
            ]}>
            {message}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <DesigneratBtn
            handleClick={() => {
              setIsVisible(false);
              return handleClick();
            }}
            title={I18n.t('confirm')}
            width={'30%'}
          />
          <DesigneratBtn
            handleClick={() => setIsVisible(false)}
            title={I18n.t('cancel')}
            width={'30%'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ConfirmModal);

ConfirmModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({});
