import { DataSource } from 'apollo-datasource';

/**
 * Here you can add your custom dataSources.
 * Please refer to the official documentation about how to add a custom dataSources.
 * https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * @example
 * export const customDataSources = (): Record<string, DataSource> => ({
 *  apiNavigation: new NavigationApi(),
 * });
 */
export const customDataSources = (): Record<string, DataSource> => ({});
