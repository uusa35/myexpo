import I18n, {isRTL} from '../../../I18n';
import {text} from '../../../constants/sizes';
import {enableWarningMessage} from '../../../redux/actions';
import {View} from 'react-native';
import ImageLoaderContainer from '../ImageLoaderContainer';
import React from 'react';
import {Input, CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

const WrapAsGiftWidget = ({
  wrapGift,
  setWrapGift,
  productAttribute,
  requestQty,
  giftMessage,
  setGiftMessage,
}) => {
  const {settings} = useSelector((state) => state);
  const {colors} = settings;
  const dispatch = useDispatch();
  return (
    <View>
      <CheckBox
        title={I18n.t('wrap_as_gift', {item: settings.gift_fee})}
        titleProps={{
          style: {
            fontFamily: text.font,
            fontSize: text.medium,
            paddingLeft: 5,
            paddingRight: 5,
          },
        }}
        textStyle={{fontFamily: text.font, padding: 5}}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checkedColor={colors.btn_bg_theme_color}
        checked={wrapGift}
        onPress={() =>
          !productAttribute || requestQty <= 0
            ? dispatch(enableWarningMessage(I18n.t('choose_size_or_qty')))
            : setWrapGift(!wrapGift)
        }
        // disabled={!productAttribute || requestQty <= 0}
      />
      {wrapGift && (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <ImageLoaderContainer
            img={settings.gift_image}
            style={{width: 100, height: 100}}
          />
          <Input
            spellCheck={true}
            placeholder={
              giftMessage
                ? giftMessage
                : I18n.t('wrap_as_gift_message', {
                    item: settings.gift_fee,
                  })
            }
            defaultValue={giftMessage ? giftMessage : null}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              paddingLeft: 15,
              marginTop: 5,
              height: 80,
              width: '72%',
            }}
            inputStyle={{
              fontFamily: text.font,
              fontSize: text.medium,
              textAlign: isRTL ? 'right' : 'left',
            }}
            disabled={!productAttribute || requestQty <= 0}
            // editable={!productAttribute || requestQty <= 0}
            shake={true}
            keyboardType="default"
            multiline={true}
            numberOfLines={3}
            onChangeText={(e) => setGiftMessage(e)}
          />
        </View>
      )}
    </View>
  );
};

export default WrapAsGiftWidget;
