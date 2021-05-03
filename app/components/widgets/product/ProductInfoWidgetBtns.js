import React, {useContext, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {text} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import {Button, Divider} from 'react-native-elements';
import I18n from '../../../I18n';
import ProductColorSizeGroup from './ProductColorSizeGroup';
import ProductColorSizeGroupWithAttributes from './ProductColorSizeGroupWithAttributes';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetBtns = ({
  element,
  setAddToCartStatus,
  setCartItem,
  handleAddToCart,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.btn_bg_theme_color,
      }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        {element.has_attributes && (
          <Text
            style={{
              fontFamily: text.font,
              color: colors.normal_text_theme_color,
              textAlign: 'center',
              paddingTop: 10,
              fontSize: 15,
            }}>
            {I18n.t('sizes_and_colors_and_length_available')}
          </Text>
        )}
        {!element.has_stock && (
          <View style={{width: '100%', marginTop: 5}}>
            <Button
              raised
              title={I18n.t('out_of_stock')}
              buttonStyle={{backgroundColor: 'red', width: '100%'}}
              titleStyle={{fontFamily: text.font, fontSize: text.medium}}
            />
          </View>
        )}
      </View>
      {element.has_stock && (
        <Fragment>
          {element.has_attributes ? (
            <ProductColorSizeGroupWithAttributes
              element={element}
              setAddToCartStatus={setAddToCartStatus}
              setCartItem={setCartItem}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <ProductColorSizeGroup
              element={element}
              setAddToCartStatus={setAddToCartStatus}
              setCartItem={setCartItem}
              handleAddToCart={handleAddToCart}
            />
          )}
        </Fragment>
      )}
    </View>
  );
};

export default React.memo(ProductInfoWidgetBtns);

ProductInfoWidgetBtns.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
