import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
  Fragment,
} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {
  getCompany,
  getDesigner,
  getSearchCelebrities,
  getSearchCompanies,
  getSearchDesigners,
} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {
  bottomContentInset,
  iconSizes,
  text,
  TheHold,
  width,
} from './../../constants/sizes';
import {filter, orderBy, uniqBy, lowerCase} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import TopSearchInput from '../widgets/TopSearchInput';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import SearchSort from '../widgets/search/SearchSort';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import ElementWidgetHorizontal from './ElementWidgetHorizontal';
import SortByModal from '../widgets/search/SortByModal';
import EmptyListWidget from './EmptyListWidget';
import ProductWidget from '../widgets/product/ProductWidget';
import ServiceWidget from '../widgets/service/ServiceWidget';
import {getSearchServices, getService} from '../../redux/actions/service';
import NoMoreElements from '../widgets/NoMoreElements';
import {animations} from '../../constants/animations';
import {
  getClassified,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import {ABATI, HOMEKEY, EXPO} from '../../../app';
import ClassifiedsMapView from '../widgets/map/ClassifiedsMapView';
import ClassifiedWidget from '../widgets/classified/ClassifiedWidget';
import CompanyHorizontalWidget from '../widgets/user/CompanyHorizontalWidget';
import {setElementType} from '../../redux/actions';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import {convertNumberToEnglish} from '../../helpers';
import OrderWidget from '../widgets/order/OrderWidget';
import {
  SET_CLASSIFIEDS,
  SET_COMPANIES,
  SET_DESIGNERS,
  SET_PRODUCTS,
  SET_SERVICES,
} from '../../redux/actions/types';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import Pluralize from 'pluralize';
import ProductNormalWidget from '../widgets/product/ProductNormalWidget';

const ElementsHorizontalList = ({
  elements,
  searchParams,
  showName = true,
  showMore = false,
  showSearch = false,
  showFooter = false,
  showTitle = false,
  showSortSearch = false,
  showProductsFilter = false,
  showClassifiedsFilter = false,
  emptyListImage = '',
  showTitleIcons = false,
  showRefresh = false,
  title,
  type,
  iconSize = iconSizes.small,
  textSize = text.small,
  columns = 2,
  customHeight = 240,
  pageLimit = 10,
  productGalleryMode = false,
}) => {
  const [items, setItems] = useState(elements);
  const [originalItems, setOriginalItems] = useState(elements);
  const [elementsWithMap, setElementsWithMap] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const {token} = useSelector(state => state);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = () => {
    setTimeout(() => {
      if (
        showMore &&
        page <= pageLimit &&
        originalItems.length <= items.length
      ) {
        setPage(page + 1);
        setIsLoading(true);
      }
    }, 500);
  };

  useMemo(() => {
    if (
      showMore &&
      page > 1 &&
      page <= pageLimit &&
      originalItems.length <= items.length
    ) {
      switch (type) {
        case 'product':
          return axiosInstance(`search/product?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                dispatch({type: SET_PRODUCTS, payload: elementsGroup});
                setItems(elementsGroup);
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        case 'designer':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                dispatch({type: SET_DESIGNERS, payload: elementsGroup});
                setItems(elementsGroup);
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        case 'celebrity':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                dispatch({type: SET_DESIGNERS, payload: elementsGroup});
                setItems(elementsGroup);
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        case 'company':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
                dispatch({type: SET_COMPANIES, payload: elementsGroup});
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        case 'classified':
          return axiosInstance(`search/classified?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        case 'service':
          return axiosInstance(`search/service?page=${page}`, {
            params,
          })
            .then(r => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                dispatch({type: SET_SERVICES, payload: elementsGroup});
                setItems(elementsGroup);
              } else {
                setIsLoading(false);
              }
            })
            .catch(e => e);
          break;
        default:
          null;
      }
    }
  }, [page]);

  useMemo(() => {
    switch (sort) {
      case 1:
        setItems(orderBy(items, ['name'], ['asc']));
        break;
      case 2:
        setItems(orderBy(items, ['name'], ['desc']));
        break;
      case 3:
        setItems(orderBy(items, ['finalPrice'], ['desc']));
        break;
      case 4:
        setItems(orderBy(items, ['finalPrice'], ['asc']));
        break;
      case 5:
        setItems(orderBy(items, ['id'], ['desc']));
        break;
      case 6:
        setItems(orderBy(items, ['id'], ['asc']));
        break;
      case 7:
        setItems(orderBy(items, ['price'], ['desc']));
        break;
      case 8:
        setItems(orderBy(items, ['price'], ['asc']));
        break;
      default:
        items;
    }
    setSortModal(false);
  }, [sort]);

  const handleRefresh = () => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      switch (type) {
        case 'designer':
          dispatch(getSearchDesigners({searchParams: params}));
          break;
        case 'celebrity':
          dispatch(getSearchCelebrities({searchParams: params}));
          break;
        case 'product':
          dispatch(getSearchProducts({searchParams: params, redirect: false}));
          break;
        case 'service':
          dispatch(getSearchServices({searchParams: params}));
          break;
        case 'company':
          dispatch(getSearchCompanies({searchParams: params}));
          break;
        case 'classified':
          dispatch(
            getSearchClassifieds({searchParams: params, redirect: false}),
          );
          break;
        case 'service':
          dispatch(getSearchServices({searchParams: params, redirect: false}));
          break;
        default:
          null;
      }
    }
  };

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      let filtered = filter(items, i =>
        i.name
          ? lowerCase(i.name).includes(lowerCase(search)) ||
            i.sku.includes(convertNumberToEnglish(search))
          : lowerCase(i.slug).includes(lowerCase(search))
          ? i
          : null,
      );
      filtered.length > 0 ? setItems(filtered) : setItems(elements);
    } else {
      setItems(elements);
    }
  }, [search]);

  useMemo(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  const handleClick = element => {
    dispatch(setElementType(type));
    switch (type) {
      case 'designer':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'celebrity':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'category':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'company':
        return dispatch(
          getCompany({
            id: element.id,
            searchParams: {user_id: element.id},
            redirect: true,
          }),
        );
        break;
      case 'product':
        return dispatch(
          getProduct({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      case 'service':
        return dispatch(
          getService({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      case 'classified':
        return dispatch(
          getClassified({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  };

  const renderItem = item => {
    switch (type) {
      case 'product':
        if (productGalleryMode) {
          return (
            <Pressable
              onPress={() => handleClick(item)}
              style={{width: '33.2%', height: 175}}>
              <ImageLoaderContainer
                img={item.thumb}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </Pressable>
          );
        } else {
          if (EXPO) {
            return (
              <ProductNormalWidget
                element={item}
                showName={showName}
                key={item.id}
                showSku={false}
                handleClickProductWidget={handleClick}
              />
            );
          } else {
            return (
              <ProductWidget
                element={item}
                showName={showName}
                key={item.id}
                showSku={false}
                handleClickProductWidget={handleClick}
              />
            );
          }
        }
        break;
      case 'service':
        return (
          <ServiceWidget
            element={item}
            showName={showName}
            handleClick={handleClick}
          />
        );
        break;
      case 'classified':
        return (
          <ClassifiedWidget
            element={item}
            showName={showName}
            handleClick={handleClick}
          />
        );
        break;
      case 'company':
        return (
          <CompanyHorizontalWidget
            user={item}
            showName={true}
            showDescription={true}
            handleClick={handleClick}
          />
        );
        break;
      case 'designer':
        return (
          <UserWidgetHorizontal
            user={item}
            showName={true}
            showDescription={true}
            showRating={false}
            rounded={true}
          />
        );
        break;
      case 'celebrity':
        return (
          <UserWidgetHorizontal
            user={item}
            showName={true}
            showDescription={true}
            showRating={false}
          />
        );
        break;
      case 'order':
        return <OrderWidget element={item} />;
        break;
      default:
        return (
          <ElementWidgetHorizontal
            element={item}
            title={item.slug ? item.slug : item.name}
            showName={showName}
            showSearch={false}
            thumb={item.thumb}
            iconSize={iconSize}
            textSize={textSize}
            type={type}
            handleClick={handleClick}
          />
        );
    }
  };

  useEffect(() => {
    setItems(elements);
    dispatch(setElementType(type));
    setElementsWithMap(filter(elements, (e, i) => (e.has_map ? e : null)));
  }, [elements]);

  const renderFooter = () => {
    if (showFooter) {
      return !validate.isEmpty(items) ? (
        <NoMoreElements
          title={I18n.t('no_more_', {item: I18n.t(Pluralize(type))})}
          isLoading={isLoading}
        />
      ) : (
        isLoading && <ActivityIndicator size={iconSizes.larger} />
      );
    }
    return <Fragment></Fragment>;
  };

  const renderHeader = () => {
    return (
      <SafeAreaView style={{flex: 1}}>
        {!validate.isEmpty(items) && (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              margin: showSearch ? '2%' : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {showSortSearch && (
                <SearchSort
                  sort={sort}
                  sortModal={sortModal}
                  setSortModal={setSortModal}
                  setSort={setSort}
                  showProductsFilter={showProductsFilter}
                  showClassifiedsFilter={showClassifiedsFilter}
                />
              )}
              {!validate.isEmpty(elementsWithMap) && (HOMEKEY || EXPO) && (
                <ClassifiedsMapView
                  mapModal={mapModal}
                  setMapModal={setMapModal}
                  elements={elementsWithMap}
                />
              )}
            </View>
            {showTitle && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  padding: 5,
                  paddingRight: 25,
                }}>
                <Text
                  style={[
                    styles.mainTitle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {title ? title : I18n.t(type)}
                </Text>
                {showTitleIcons && (
                  <Icon
                    type="entypo"
                    name="select-arrows"
                    size={iconSizes.smaller}
                    onPress={() => setSortModal(true)}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <EmptyListWidget
        emptyAnimation={animations.emptyShape}
        emptyImage={emptyListImage}
        title={I18n.t('no_', {item: I18n.t(type)})}
      />
    );
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View>
      {showSearch && <TopSearchInput search={search} setSearch={setSearch} />}
      <FlatList
        ListEmptyComponent={() => renderEmptyComponent()}
        scrollEnabled={showFooter}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="never"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset, width: '100%'}}
        numColumns={columns}
        data={uniqBy(items, 'id')}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
        onEndReachedThreshold={TheHold}
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => (showRefresh ? handleRefresh() : null)}
          />
        }
        columnWrapperStyle={{
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'center',
          marginLeft: productGalleryMode ? 0 : 15,
          marginRight: productGalleryMode ? 0 : 15,
          // marginBottom : 15,
          marginTop: productGalleryMode ? 0 : 15,
        }}
        renderItem={({item}) => renderItem(item)}
        ListFooterComponent={() => renderFooter()}
        initialNumToRender={12}
        maxToRenderPerBatch={24}
        ListFooterComponentStyle={{
          marginBottom: showFooter ? bottomContentInset : 0,
        }}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
          width,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        ListHeaderComponent={() => renderHeader()}
      />
      <SortByModal
        setSortModal={setSortModal}
        sortModal={sortModal}
        setSort={setSort}
        type={type}
      />
    </View>
  );
};

export default ElementsHorizontalList;

ElementsHorizontalList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignSelf: 'center',
    // minHeight: height,
    minWidth: '100%',
    flexGrow: 1,
  },
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  emptyCaseBtn: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  sortModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  countryFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.small,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnStyle: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 4,
    width: width / 2.1,
    minHeight: 40,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 1,
  },
});
