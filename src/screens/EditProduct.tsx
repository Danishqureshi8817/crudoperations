import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Container } from '../components/Container/Container'
import HeaderComp from '../components/Header/Header'
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale } from '../styles/responsiveSize'
import TextInputComp from '../components/TextInput/TextInput'
import ButtonComp from '../components/Button/Button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import useEditProduct from '../hooks/product/edit-product'

const EditProduct = () => {

  // init
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute()
  const editDataParam: any = route.params
  console.log(editDataParam);
  let pprice = String(editDataParam?.price)
  let pstock = String(editDataParam?.stock)

  // states
  const [name, setName] = useState(editDataParam.name);
  const [price, setprice] = useState(pprice);
  const [description, setdescription] = useState(editDataParam?.desxription);
  const [category, setcategory] = useState(editDataParam?.category);
  const [stock, setstock] = useState(pstock);

  // api call
  const useEditProductMutation = useEditProduct()

  const editProduct = (id: string) => {
    const payload = {

      name: name,
      price: Number(price),
      description: description,
      category: category,
      stock: Number(stock),

    }

    useEditProductMutation.mutate({ id: id, payload: payload })
  }

  return (
    <Container statusBarStyle='dark-content'>
      <HeaderComp onPressLeft={() => { navigation.goBack() }} />

      <View style={{ padding: moderateScale(10), marginTop: moderateScale(40) }} >

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

        <ButtonComp text='Edit Product' onPress={() => { editProduct(editDataParam.id) }} isLoading={useEditProductMutation.isPending} disabled={useEditProductMutation.isPending} />

      </View>

    </Container>
  )
}

export default EditProduct

const styles = StyleSheet.create({})