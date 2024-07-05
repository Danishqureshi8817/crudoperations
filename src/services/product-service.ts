
import { fetcher } from '../utiles/fetcher';

class ProductService {

  queryKeys = {
    getAllProducts: 'getAllProducts',
    createProduct : 'createProduct',
    editProduct : 'editProduct'
     

  };

  getAllProducts = async (data: any) => {
    const {  pageParam } = data
    return fetcher({
      url: `/product/all?page=${pageParam}&limit=20`,
      method: 'GET',
    });

  }

  createProduct = async (data: any) => {

    return fetcher({
      url: `/product/create`,
      method: 'POST',
      data
    });

  }

  deleteProduct = async (data: any) => {

    return fetcher({
      url: `/product/delete/${data}`,
      method: 'DELETE',
    });

  }

  editProduct = async (data: any) => {
   const {id,payload} = data
    return fetcher({
      url: `/product/update/${id}`,
      method: 'PATCH',
      data:payload
    });

  }




}

export default new ProductService();