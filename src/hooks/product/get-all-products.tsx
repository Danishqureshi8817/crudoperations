import { useInfiniteQuery } from '@tanstack/react-query';

import productService from '../../services/product-service';

function useGetAllProducts(data?:any) {

  return useInfiniteQuery({
    queryKey: [productService.queryKeys.getAllProducts ],
    queryFn: ({ pageParam = 1 }: any) => productService.getAllProducts({
      pageParam: pageParam ?? 1,
      ...data
  
    }),
    getNextPageParam: (lastPage: any,pages) => {
        
        if (pages?.length < lastPage?.data?.totalPages) {
              
            return pages?.length + 1;
        }
    
    },
    initialPageParam: 1,
    
  })

}

export default useGetAllProducts;
