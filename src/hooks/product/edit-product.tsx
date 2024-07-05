import { useMutation } from '@tanstack/react-query';

import { queryClient, showError, showSucess } from '../../utiles/helpers';
import productService from '../../services/product-service';


export default function useEditProduct() {

  return useMutation({
    mutationFn: productService.editProduct,
    onError: (error: any) => {
      showError('Something went wrong while Edit Produc')
      console.log(error);

    }, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productService.queryKeys.getAllProducts]
      })
      showSucess('Edit Successfully')

    }
  });

}