import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { QueryClient } from '@tanstack/react-query';

import { Container } from '../components/Container/Container'
import ButtonComp from '../components/Button/Button'
import { moderateScale, textScale, verticalScale } from '../styles/responsiveSize'
import colors from '../styles/colors'
import useGetAllProducts from '../hooks/product/get-all-products'
import useCreateProduct from '../hooks/product/create-product'
import productService from '../services/product-service'
import { queryClient } from '../utiles/helpers';
import useDeleteProduct from '../hooks/product/delete-products';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import TextInputComp from '../components/TextInput/TextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import navigationStrings from '../navigation/navigationStrings';

const Home = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // states
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [stock, setstock] = useState('');

  // api call
  const useGetAllProductsInfintQuery = useGetAllProducts()
  const useCreateProductMutation = useCreateProduct()
  const useDeleteProductMutation = useDeleteProduct()


  const craeteProduct = () => {
    const now = new Date();
    const isoString = now.toISOString();
    const payload = {

      name: name,
      price: Number(price),
      description: description,
      category: category,
      stock: Number(stock),
      createdAt: isoString

    }
    console.log(payload);


    useCreateProductMutation.mutate(payload)
  }

  const deleteProduct = (id: string) => {
    useDeleteProductMutation.mutate(id)
  }




  return (
    <Container statusBarStyle='dark-content'>
      <View style={{ flex: 1, marginHorizontal: moderateScale(15), marginTop: verticalScale(15) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
          <Text style={{ fontSize: textScale(20), color: colors.whiteColor }} >Product List</Text>
          <ButtonComp text='Create New' onPress={() => setShowCreateModel(true)} />
        </View>

        <FlatList
          data={useGetAllProductsInfintQuery?.data?.pages}
          renderItem={({ item, index }) => {

            return item?.data?.data?.map((item: any, index: number) => {

              return (
                <View key={index.toString()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: moderateScale(10) }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '75%' }} >
                    <Text style={styles.listdataText} numberOfLines={2}>{item?.name}</Text>
                    <Text style={styles.listdataText} numberOfLines={2}>{item?.price}</Text>
                    <Text style={styles.listdataText} numberOfLines={2}>{item?.stock}</Text>
                    <Text style={styles.listdataText} numberOfLines={2}>{item?.createdAt}</Text>
                  </View>

                  <View style={{ gap: moderateScale(10), width: '18%' }}>
                    <ButtonComp text='Edit' onPress={() => { navigation.navigate(navigationStrings.EDIT, { id: item?._id, name: item?.name, price: item?.price, description: item?.description, category: item?.category, stock: item?.stock }) }} style={{ height: moderateScale(30) }} bgColor={'green'} textStyle={{ fontSize: textScale(11) }} />
                    <ButtonComp text='Show'  onPress={() => { navigation.navigate(navigationStrings.ShowProduct, { id: item?._id, name: item?.name, price: item?.price, description: item?.description, category: item?.category, stock: item?.stock }) }} style={{ height: moderateScale(30) }} textStyle={{ fontSize: textScale(11) }} />
                    <ButtonComp text='Delete' onPress={() => { deleteProduct(item?._id) }} style={{ height: moderateScale(30) }} textStyle={{ fontSize: textScale(11) }} bgColor='skyblue' />
                  </View>
                </View>
              )
            }
            )
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.listTag} numberOfLines={1} >Name</Text>
                <Text style={styles.listTag} numberOfLines={1} >Price</Text>
                <Text style={styles.listTag} numberOfLines={1} >Stock</Text>
                <Text style={styles.listTag} numberOfLines={1}>CreatedAt</Text>
                <Text style={styles.listTag} numberOfLines={1}>Action</Text>
              </View>
            )
          }}
          style={{ flex: 1, marginTop: moderateScale(15) }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => useGetAllProductsInfintQuery?.fetchNextPage()}
          keyExtractor={(item, index) => item?._id?.toString()}
          contentContainerStyle={{ flexGrow: 1 }}

          ListEmptyComponent={() => {
            if (useGetAllProductsInfintQuery?.isLoading || useGetAllProductsInfintQuery?.isFetching) {
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size='large' color={'green'} />
                </View>
              )
            }

            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: textScale(18) }}>No Products Found</Text>
              </View>
            )
          }}

          ListFooterComponent={() => {
            if (useGetAllProductsInfintQuery?.isFetchingNextPage) {
              return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: moderateScale(200), paddingTop: verticalScale(10) }}>
                  <ActivityIndicator size='small' color={'green'} />
                </View>
              )
            }
          }}

        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCreateModel}
        onRequestClose={() => setShowCreateModel(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }} >
          <View style={{ width: responsiveWidth(85), backgroundColor: colors.themeColor, borderRadius: moderateScale(10), padding: moderateScale(10) }} >

            <TouchableOpacity onPress={() => setShowCreateModel(false)} style={{ alignSelf: 'flex-end', marginBottom: moderateScale(15) }}>
              <Text style={{ color: colors.whiteColor, fontSize: textScale(16) }}>Close</Text>
            </TouchableOpacity>

            <TextInputComp
              value={name}
              placeholder={'Enter Product Name'}
              onChangeText={(value: string) => setName(value)}
            />
            <TextInputComp
              value={price}
              placeholder={'Enter Price'}
              onChangeText={(value: string) => setprice(value)}
            />
            <TextInputComp
              value={description}
              placeholder={'Enter Description'}
              onChangeText={(value: string) => setdescription(value)}
            />
            <TextInputComp
              value={category}
              placeholder={'Enter Category'}
              onChangeText={(value: string) => setcategory(value)}
            />
            <TextInputComp
              value={stock}
              placeholder={'Enter Stock'}
              onChangeText={(value: string) => setstock(value)}
            />

            <ButtonComp text='Create Product' onPress={craeteProduct} isLoading={useCreateProductMutation.isPending} disabled={useCreateProductMutation.isPending} />

          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={useDeleteProductMutation.isPending}
        onRequestClose={() => setShowCreateModel(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }} >
          <View >
            <ActivityIndicator size={'large'} />
          </View>
        </View>
      </Modal>


    </Container>
  )
}

export default Home

const styles = StyleSheet.create({
  listTag: {
    color: colors.grayColor,
    fontSize: textScale(18),
    width: '18%',
    alignSelf: 'flex-start'

  },
  listdataText: {
    color: colors.whiteColor,
    fontSize: textScale(16),
    width: '19%',
    alignSelf: 'flex-start'

  }
})