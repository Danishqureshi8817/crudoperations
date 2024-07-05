import { useMutation } from '@tanstack/react-query';

import { queryClient, showError, showSucess } from '../../utiles/helpers';
import productService from '../../services/product-service';


export default function useDeleteProduct() {

  return useMutation({
    mutationFn: productService.deleteProduct,
    onError: (error: any) => {
      showError('Something went wrong while Delete')
      console.log(error);

    }, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productService.queryKeys.getAllProducts]
      })
      showSucess('Deleted Successfully')

    }
  });

}