import React, {useEffect, useMemo, useState} from 'react';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, first} from 'lodash';
import BgContainer from '../components/containers/BgContainer';
import {useRoute} from '@react-navigation/native';
import DesigneratBtn from '../components/widgets/Button/DesigneratBtn';
import {getWhatsappLink} from '../helpers';
import {ISTORES} from './../../app.json';
import I18n from 'react-native-i18n';
import {themeColors} from '../constants/colors';
import {text} from '../constants/sizes';
import {Linking} from 'react-native';

const PaymentIndexScreen = () => {
  const [merchant, setMerchant] = useState({});
  const [merchantPhone, setMerchantPhone] = useState();
  const {cart} = useSelector(state => state);
  const dispatch = useDispatch();
  const route = useRoute();

  useMemo(() => {
    setMerchant(first(cart).element.user);
  }, []);

  useMemo(() => {
    merchant.whatsapp
      ? setMerchantPhone(merchant.whatsapp)
      : setMerchantPhone(merchant.fullMobile);
  }, [merchant]);

  return (
    <BgContainer>
      <WebView
        useWebKit={true}
        source={{uri: route.params.paymentUrl}}
        style={{marginTop: 20}}
        injectedJavaScript={'(function(){ return "test"}());'}
        onNavigationStateChange={navEvent =>
          !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        }
      />
      {route.params.paymentUrl.includes('invoice') &&
        merchantPhone &&
        ISTORES && (
          <DesigneratBtn
            width={'100%'}
            handleClick={() =>
              Linking.openURL(
                getWhatsappLink(merchantPhone, route.params.paymentUrl),
              )
            }
            bgColor={themeColors.whatsapp}
            title={I18n.t('contact_with_the_merchant')}
            titleStyle={{marginBottom: 15, fontFamily: text.font}}
          />
        )}
    </BgContainer>
  );
};

export default PaymentIndexScreen;
