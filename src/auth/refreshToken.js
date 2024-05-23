import fetch from "node-fetch";
import { useParams } from "react-router";
import {URLSearchParams } from "url";
// import URLSearchParams;


export async function reqAccessToken(){
  let response
  let data
  let access_token
  const body = {
    grant_type: "authorization_code",
    refresh_token: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.XHePgSLvTN08BVnElHpiOXXbLrxoHePyT_wIj720_1hAdDaXYjon8R_FZUDWXYmG5UsQUtsTcxJIFy33FWmsnPdUeA7Xue1Uc_Wjn-QWLTy_0Ksp33GICg3a0Fv_R_D0pPk3MWEllHLtxk2phW0bTwDoGJyD-yy7NMyQZuO32einYlquWKatqmFoJQl4-h-y1NrfwqU_wJScs69V2TWwSQLpvvm1yLtm-CjHU984_OfeNxSuDImXICsRDpIIz7egtFCvvlT1PufPPP3V6hE7b7roIz983pdkTBoSWQUxoFKPai4HX2FCJZqnGi3cMAwb7M9P_U7boLuNSjzv_FEkDA.Lo1AUZong6SdeBqE.XSJD8ZcCcB7brHLyYfz3jKr5lDa0wWjWgIejBuVpzZNN1FGQjuyn5_6Pk6Ye54YPSsqjfj6AK0OQMtrQTBP30HznyRudWvkNF1lg8K3_ouaPg35naQfGAlpZhIi2RhBXK80xEM_KwYjlUgFkF-JEHNipR9881E0i9kkOR9s8qa3u0EiA-z9oG9uCTqf8npYDyPhhIA5WcpniFSses-Cn1o51LusIbNDzMLrlfFPk7LV4uUIRoV5BEEmre2fx_5F6mesjCJznPqpV7wwO0KxQDPJluLGzmyn9PVWx8C5DET4GBCV2dX7ebsvL4ZzUFAzwyHXDcUDPzmlMqU9HMZJlF3G2fOtXrD_4tlyTQNwEthNhhytbg0M-Y4fGCUESkwVDdaK-PAEx2XBUUgcn-IV9b-P_y2fIwK_GAg7V_kzP8Q-eAap0dKqG6Ysmegf5jCZgwTY-9GLRpL7XQCFfuApHqXYe_E76ZXtBjhauOQiHkKQCFjO1W451xkIZXHCwQ5HHKeXm_ve16GDOlsyVKTSH7XhBcdvnASHjvpfaYsHVctuOV7ClezMiGskDNBhjRU91l879MWaWEAp-jPLckyz-vG1vTWgxe5rd90pAYYj1ViK0CtlF4W7yQ9LCd2leTDZyeBtIrVZ4vB__nIjanMt8GzdmwyePyzVZs3x10ZTiil164HFK9kVZAPBZoMNv3JbaCHtHTcFLFJVcDS8zaOGRYTnZ9T-w5N7NjXgua7rMQKFgO5Pzn2spx5deiuAfg5Z3XUSAnGkcKHpF7nyLId6Ppzol-O-vIGLUDSac6h1H6ARHTEBIj2uBxfqbi-GPex8RRNZzv5fm4e91-Ij_S0xr91KJp4p8yRvjwP-e46mwkJLdQiMWgLIHNH3Y9gFFCae1QLWEwZv0MrYpwJcsnJRMQqlPEOEYiBDPI8vwm4CyNKKiHVg9J3iPPGtXTWnZy1DyPMzpBrmjsAV7-RA8tzdXq0J1CYz-ILLx1AqhIlLXX8Q4CljCW5eS-m74IGCNb2B9ff2Cv0c9WmILZz40htS5VdF7w_Hrg4_uB_t7wX3Jlvo_hMAjbQHTX63HYjxv6bkK0OeyfAKHCshO8E6uX75cepjEQwiCRghc-3nn230dnY7S6fe8VVdn4ENjZBCSACelEAPccIMUjPHYIa4ftkwOx2-HUH7UYmWIL12-M4Lss9AmS-EZ8XFqVZB6uDnHoeOBKAutDkczJcf6FhnnDVGxLCig4-ISC81efdCHrkqvQXEROpb1fjmvuxy6Fmto_uSR_BrpiOHILFo1fhle5wFBBTKn66CT3IMwLQT0UqbQuUXsiJf8bGjqLOGkvVE.7SrH0qlcqKsBdDsISeljOw"
  };
  response = await fetch('https://application-auth.auth.us-east-1.amazoncognito.com/oauth2/token', {
    method: 'post',
    body:  {
      'grant_type': "refresh_token",
      'refresh_token': "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.XHePgSLvTN08BVnElHpiOXXbLrxoHePyT_wIj720_1hAdDaXYjon8R_FZUDWXYmG5UsQUtsTcxJIFy33FWmsnPdUeA7Xue1Uc_Wjn-QWLTy_0Ksp33GICg3a0Fv_R_D0pPk3MWEllHLtxk2phW0bTwDoGJyD-yy7NMyQZuO32einYlquWKatqmFoJQl4-h-y1NrfwqU_wJScs69V2TWwSQLpvvm1yLtm-CjHU984_OfeNxSuDImXICsRDpIIz7egtFCvvlT1PufPPP3V6hE7b7roIz983pdkTBoSWQUxoFKPai4HX2FCJZqnGi3cMAwb7M9P_U7boLuNSjzv_FEkDA.Lo1AUZong6SdeBqE.XSJD8ZcCcB7brHLyYfz3jKr5lDa0wWjWgIejBuVpzZNN1FGQjuyn5_6Pk6Ye54YPSsqjfj6AK0OQMtrQTBP30HznyRudWvkNF1lg8K3_ouaPg35naQfGAlpZhIi2RhBXK80xEM_KwYjlUgFkF-JEHNipR9881E0i9kkOR9s8qa3u0EiA-z9oG9uCTqf8npYDyPhhIA5WcpniFSses-Cn1o51LusIbNDzMLrlfFPk7LV4uUIRoV5BEEmre2fx_5F6mesjCJznPqpV7wwO0KxQDPJluLGzmyn9PVWx8C5DET4GBCV2dX7ebsvL4ZzUFAzwyHXDcUDPzmlMqU9HMZJlF3G2fOtXrD_4tlyTQNwEthNhhytbg0M-Y4fGCUESkwVDdaK-PAEx2XBUUgcn-IV9b-P_y2fIwK_GAg7V_kzP8Q-eAap0dKqG6Ysmegf5jCZgwTY-9GLRpL7XQCFfuApHqXYe_E76ZXtBjhauOQiHkKQCFjO1W451xkIZXHCwQ5HHKeXm_ve16GDOlsyVKTSH7XhBcdvnASHjvpfaYsHVctuOV7ClezMiGskDNBhjRU91l879MWaWEAp-jPLckyz-vG1vTWgxe5rd90pAYYj1ViK0CtlF4W7yQ9LCd2leTDZyeBtIrVZ4vB__nIjanMt8GzdmwyePyzVZs3x10ZTiil164HFK9kVZAPBZoMNv3JbaCHtHTcFLFJVcDS8zaOGRYTnZ9T-w5N7NjXgua7rMQKFgO5Pzn2spx5deiuAfg5Z3XUSAnGkcKHpF7nyLId6Ppzol-O-vIGLUDSac6h1H6ARHTEBIj2uBxfqbi-GPex8RRNZzv5fm4e91-Ij_S0xr91KJp4p8yRvjwP-e46mwkJLdQiMWgLIHNH3Y9gFFCae1QLWEwZv0MrYpwJcsnJRMQqlPEOEYiBDPI8vwm4CyNKKiHVg9J3iPPGtXTWnZy1DyPMzpBrmjsAV7-RA8tzdXq0J1CYz-ILLx1AqhIlLXX8Q4CljCW5eS-m74IGCNb2B9ff2Cv0c9WmILZz40htS5VdF7w_Hrg4_uB_t7wX3Jlvo_hMAjbQHTX63HYjxv6bkK0OeyfAKHCshO8E6uX75cepjEQwiCRghc-3nn230dnY7S6fe8VVdn4ENjZBCSACelEAPccIMUjPHYIa4ftkwOx2-HUH7UYmWIL12-M4Lss9AmS-EZ8XFqVZB6uDnHoeOBKAutDkczJcf6FhnnDVGxLCig4-ISC81efdCHrkqvQXEROpb1fjmvuxy6Fmto_uSR_BrpiOHILFo1fhle5wFBBTKn66CT3IMwLQT0UqbQuUXsiJf8bGjqLOGkvVE.7SrH0qlcqKsBdDsISeljOw"
    },
    // headers: {'Content-Type': 'applicatio'}
  });
  data = await response.json();
  access_token = data.access_token;
//   console.log("apitoken",apiToken)
  console.log("data",data)
//   console.log("new URLSearchParams(body)",new URLSearchParams(body))
  console.log("body",body)
  return access_token;
}

// export async function generateGraphToken(apiToken: ApiToken)
// {
//   const log = Logger.getInstance();
//   if(process.env.IS_OFFLINE)
//     await storage.init();
//   else
//     await storage.init({dir: '/tmp'});

//   let access_token:string=await storage.getItem('access_token');

//   if(access_token)
//   {
//     log.info('Access Token is available locally')
//     const decoded = jwt.decode(access_token);
//     if (Date.now() >= decoded.exp * 1000) {
//       log.info('Token Expired')
//       access_token=await reqAccessToken(apiToken);
//       await storage.setItem('access_token',access_token)
//     }
//     else{
//       log.info('Token is not Expired')
//     }
//   }
//   else
//   {
//     log.info('Access Token is not available locally')
//     access_token=await reqAccessToken(apiToken);
//     await storage.setItem('access_token',access_token)
//   }
//   log.info('Exciting from Token Generation')
//   return access_token;
// }
