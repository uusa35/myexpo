/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import widgetStyles from './widgets/widgetStyles';
import {iconSizes} from '../constants/sizes';
import {
  showProductFilter,
  toggleCompanySearchTextInputModal,
} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {EXPO} from '../../app';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {icons} from '../constants/images';

export const HeaderLeft = ({
  showCart = false,
  showSideMenu = true,
  showAccount = false,
  showProductsSearch = false,
  showCompanySearchTextInputModal = false,
}) => {
  const navigation = useNavigation();
  const {cartLength, colors} = useContext(GlobalValuesContext);
  const {companySearchTextInputModal} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <View style={widgetStyles.safeContainer}>
      {showSideMenu && (
        <Icon
          name="menu"
          type="material"
          size={iconSizes.small}
          onPress={() => navigation.openDrawer()}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color={colors.footer_theme_color}
        />
      )}
      {showCompanySearchTextInputModal && (
        <Icon
          onPress={() =>
            dispatch(
              toggleCompanySearchTextInputModal(!companySearchTextInputModal),
            )
          }
          name="search1"
          type="antdesign"
          size={iconSizes.small - 6}
          underlayColor="transparent"
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          color={colors.footer_theme_color}
        />
      )}
      {showProductsSearch && (
        <Icon
          onPress={() => dispatch(showProductFilter())}
          name="filter"
          type="antdesign"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          color={colors.footer_theme_color}
        />
      )}
      {showCart ? (
        <View>
          <Icon
            onPress={() => navigation.navigate('CartTab')}
            name="shoppingcart"
            type="antdesign"
            size={iconSizes.small}
            underlayColor="transparent"
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            color={colors.footer_theme_color}
          />
          <FastImage
            source={icons.cart}
            style={{width: 30, height: 30}}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            tintColor={colors.footer_theme_color}
          />
          {cartLength > 0 ? (
            <Badge
              status="error"
              value={cartLength}
              containerStyle={{
                position: 'absolute',
                top: -4,
                right: -4,
                opacity: 0.9,
              }}
              badgeStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                color: colors.footer_theme_color,
              }}
            />
          ) : null}
        </View>
      ) : showAccount ? (
        <Icon
          onPress={() => navigation.navigate('Account')}
          name="user-circle"
          type="font-awesome"
          size={iconSizes.small}
          underlayColor="transparent"
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          color={colors.footer_theme_color}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
});
