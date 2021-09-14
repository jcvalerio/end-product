import { Attribute, DataPointValue } from '@kleeen/types';

import camelcase from 'lodash.camelcase';
import { useHistory } from 'react-router-dom';

const defaultResolver = (name: string, slug: string, id: string) => `/profile/${slug}?${name}=${id}`;

export enum AttributeType {
  XOR = 'xor',
}

// TODO: @cafe refactor all these params into a single object and create an interface for it
export type CrossLink = (
  slug: string,
  entity: DataPointValue,
  attribute: Attribute,
  openNewTab?: boolean,
) => void;

export function useCrosslinking(): { crosslink: CrossLink } {
  const history = useHistory();

  // FIXME: @cafe handle this function with a useState
  function crosslink(slug: string, entity: DataPointValue, attribute: Attribute, openNewTab?: boolean) {
    const paramName =
      attribute.dataType === AttributeType.XOR ? entity?.$metadata?.entityType : attribute.name;
    const currentCrossLinking = attribute?.crossLinking?.find(({ slug: localSlug }) => localSlug === slug);
    const urlResolver = currentCrossLinking?.customUrlResolver || defaultResolver;
    const urlToNavigate = urlResolver(camelcase(paramName), slug, entity?.id, history.location);
    if (openNewTab) {
      window.open(urlToNavigate);
    } else {
      history.push(urlToNavigate);
    }
  }

  return { crosslink };
}
