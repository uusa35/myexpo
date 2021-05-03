import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ExpoMainSliderWidget from '../../components/widgets/slider/ExpoMainSliderWidget';
import ExpoDesignerHorizontalWidget from '../../components/widgets/user/ExpoDesignerHorizontalWidget';
import ExpoHomeScreenBtns from '../../components/widgets/home/ExpoHomeScreenBtns';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {bottomContentInset, height} from '../../constants/sizes';
import {isIOS} from '../../constants';
import CompanyCategoryHorizontalWidget from '../../components/widgets/category/CompanyCategoryHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';

const IorderHomeScreen = () => {
  const {
    homeCategories,
    homeUserCategories,
    commercials,
    slides,
    brands,
    homeDesigners,
    homeCelebrities,
    homeProducts,
    homeCompanies,
    splashes,
    show_commercials,
    services,
    showIntroduction,
    mainBg,
    country,
    settings,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(refetchHomeElements());

  return (
    <BgContainer showImage={true} white={true}>
      <AppHomeConfigComponent />
      {settings.splash_on && (
        <IntroductionWidget
          elements={splashes}
          IntroductionWidget
          showIntroduction={showIntroduction}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'transparent',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        endFillColor="white"
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => handleRefresh()}
          />
        }>
        {/*<ProductSearchForm />*/}
        <ExpoMainSliderWidget elements={slides} />
        {/* expo is a designer */}
        {!validate.isEmpty(brands) && validate.isArray(brands) && (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        )}
        {homeUserCategories && (
          <CompanyCategoryHorizontalWidget
            elements={homeUserCategories}
            showName={true}
            title={I18n.t('iorder.user_categories')}
            type="companies"
          />
        )}
        <ExpoDesignerHorizontalWidget
          elements={homeDesigners}
          showName={true}
          name={I18n.t('iorder.participated_stores')}
          title={I18n.t('iorder.participated_stores')}
          searchElements={{is_designer: 1, country_id: country.id}}
        />
        <ExpoDesignerHorizontalWidget
          elements={homeCompanies}
          showName={true}
          name={I18n.t('iorder.small_business')}
          title={I18n.t('iorder.small_business')}
          searchElements={{is_company: 1, country_id: country.id}}
        />
        {homeCategories && (
          <ProductCategoryHorizontalRoundedWidget
            elements={homeCategories}
            showName={true}
            title={I18n.t('iorder.product_categories')}
            type="products"
          />
        )}
        {homeProducts && (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title={I18n.t('iorder.recentest_products')}
            searchParams={{on_home: 1, country_id: country.id, on_sale: 1}}
          />
        )}
        {homeProducts && (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title={I18n.t('iorder.on_sale_products')}
            searchParams={{on_home: 1, country_id: country.id, on_sale: 1}}
          />
        )}
        {/*<ExpoHomeScreenBtns />*/}
      </ScrollView>
    </BgContainer>
  );
};

export default IorderHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
