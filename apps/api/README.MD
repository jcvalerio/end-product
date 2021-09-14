# API - Apollo Graphql Middleware.

The middleware is a Apollo Graphql endpoint. You can learn more of Apollo Server [here](https://www.apollographql.com/docs/apollo-server/).

<hr/>

## Overwriting widget resolvers
TODO: under construction

<hr/>

## Use your custom graphql operations

Kleeen generates all the Graphql operations the UI will need, but there are sometimes a custom query/mutation is required.

For that, you can write your own custom operations by extending the `custom-resolvers.ts` and `custom-schema.ts` files, both under the `apps/api/src/graphql/custom/operations` folder.

<hr/>

## Extended configuration

You can use some `env` variables to customize the API.

### Dev Configuration

- `LOG_QUERIES`
  - Enable a basic profiling to log the graphql queries and its duration.

- `PERSIST_FAKE_DB`
  - When using the realistic fake data in a lambda you may want to persist it by enabling this variable. This will highly increase the time for each query.
