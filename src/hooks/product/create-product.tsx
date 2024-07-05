import { useMutation } from '@tanstack/react-query';

import { queryClient, showError, showSucess } from '../../utiles/helpers';
import productService from '../../services/product-service';


export default function useCreateProduct() {

  return useMutation({
    mutationFn: productService.createProduct,
    onError: (error: any) => {
      showError('Something went wrong while product create')
      console.log(error);

    }, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productService.queryKeys.getAllProducts]
      })
      showSucess('Created Successfully')

    }
  });

}