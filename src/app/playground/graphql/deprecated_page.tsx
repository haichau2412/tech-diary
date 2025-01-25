// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// // import { ApolloProvider } from "@apollo/client/react";

// const client = new ApolloClient({
//   uri: "https://beta.pokeapi.co/graphql/v1beta",
//   cache: new InMemoryCache(),
// });

// const GET_DATA = gql`
//   query Pokemon_v2_ability {
//     pokemon_v2_ability {
//       generation_id
//       id
//       is_main_series
//       name
//     }
//   }
// `;

// const Page = async () => {
//   const { data } = await client.query({
//     query: GET_DATA,
//   });

//   console.log("data", data);

//   return null;
//   // <div>
//   //     <h1>Data from Apollo</h1>
//   //     <ul>
//   //       {data.pokemon_v2_ability.map((item: any) => (
//   //         <li key={item.id}>
//   //           <h2>{item.name}</h2>
//   //           <p>{item.is_main_series}</p>
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
// };

// export default Page;
