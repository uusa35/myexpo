import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import PropTypes from 'prop-types';
import {addToCart} from '../../../redux/actions/cart';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import WrapAsGiftWidget from './WrapAsGiftWidget';
import {EXPO} from './../../../../app';

const ProductColorSizeGroup = ({
  element,
  setAddToCartStatus,
  setCartItem,
  handleAddToCart,
}) => {
  const {settings} = useSelector(state => state);
  const {colors} = settings;
  const dispatch = useDispatch();
  const {size, color, qty, show_attribute} = element;
  const [requestQty, setRequestQty] = useState(0);
  const [notes, setNotes] = useState('');
  const [wrapGift, setWrapGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  useEffect(() => {
    setAddToCartStatus(!qty || requestQty <= 0);
  }, [requestQty]);

  useMemo(() => {
    if (!requestQty <= 0) {
      setCartItem({
        element,
        type: 'product',
        product_attribute_id: null,
        product_id: element.id,
        cart_id: element.id,
        qty: requestQty,
        directPurchase: element.directPurchase,
        wrapGift,
        notes: wrapGift
          ? notes.concat(
              `\n :: (${I18n.t('wrap_as_gift', {
                item: settings.gift_fee,
              })}) :: \n ${giftMessage}`,
            )
          : notes,
      });
    }
  }, [requestQty, notes, giftMessage]);

  return (
    <View
      style={{
        width: '100%',
      }}>
      {element.show_attribute && (
        <View
          style={{
            flexDirection: 'row',
            // width: '100%',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          {!validate.isEmpty(size) && show_attribute && (
            <Button
              containerStyle={{flex: 0.4}}
              buttonStyle={{
                backgroundColor: 'whitesmoke',
                // borderRadius: text.smallest,
                borderWidth: 0.5,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'space-around',
                minHeight: 42,
              }}
              title={size ? size.name : I18n.t('choose_size')}
              titleStyle={{
                fontFamily: text.font,
                color: 'black',
                fontSize: text.small,
                fontWeight: text.bold,
              }}
            />
          )}
          {!validate.isEmpty(color) && show_attribute && (
            <Button
              iconRight
              icon={
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={25}
                  color={color.code}
                />
              }
              containerStyle={{flex: 0.4}}
              buttonStyle={{
                backgroundColor: 'whitesmoke',
                // borderRadius: text.smallest,
                borderWidth: 0.5,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'space-around',
                minHeight: 42,
              }}
              title={color ? color.name : I18n.t('height')}
              titleStyle={{
                fontFamily: text.font,
                color: 'black',
                fontSize: text.small,
                fontWeight: text.bold,
              }}
            />
          )}
        </View>
      )}
      <ProductWidgetQtyBtns
        qty={qty}
        requestQty={requestQty}
        setRequestQty={setRequestQty}
      />
      {element.wrap_as_gift && (
        <WrapAsGiftWidget
          wrapGift={wrapGift}
          setWrapGift={setWrapGift}
          giftMessage={giftMessage}
          setGiftMessage={setGiftMessage}
          requestQty={requestQty}
          productAttribute={null}
        />
      )}
      <Input
        spellCheck={true}
        placeholder={
          element.notes
            ? element.notes
            : I18n.t(
                EXPO
                  ? 'add_notes_shoulders_height_and_other_notes_expo'
                  : 'add_notes_shoulders_height_and_other_notes',
              )
        }
        inputContainerStyle={{
          borderWidth: 0.5,
          borderColor: colors.btn_bg_theme_color,
          // borderRadius: text.smallest,
          paddingLeft: 10,
          paddingRight: 10,
          height: 80,
          width: '105%',
          marginTop: 10,
          position: 'relative',
          left: -10,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
          lineHeight: 25,
        }}
        defaultValue={notes ? notes : null}
        disabled={!qty || requestQty <= 0}
        shake={true}
        keyboardType="default"
        multiline={true}
        numberOfLines={3}
        onChangeText={notes => setNotes(notes)}
      />
      {element.has_stock && element.is_available && (
        <Button
          onPress={() => handleAddToCart()}
          disabled={!qty || requestQty <= 0}
          raised
          containerStyle={{width: '100%', justifyContent: 'center'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      )}
    </View>
  );
};

export default React.memo(ProductColorSizeGroup);

ProductColorSizeGroup.propTypes = {
  size: PropTypes.object,
  color: PropTypes.object,
};

const styles = StyleSheet.create({});
