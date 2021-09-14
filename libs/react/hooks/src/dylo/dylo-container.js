import PropTypes from 'prop-types';
import React from 'react';
import { uuid } from '@kleeen/core-react';

export function withDylo(WrappedComponent) {
  return class KUIDyloContainer extends React.Component {
    static propTypes = {
      onDyloApiReady: PropTypes.func.isRequired,
      children: PropTypes.arrayOf(PropTypes.node),
    };

    state = {
      children: [],
    };

    componentDidMount = () => {
      this.props.onDyloApiReady({
        addChild: this.addChild,
        addChildren: this.addChildren,
        getUniqueIdentifier: this.getUniqueIdentifier,
        removeChild: this.removeChild,
        removeChildren: this.removeChildren,
        removeItemByProp: this.removeItemByProp,
      });
    };

    addChild = (child, props) => {
      const newComponent = React.cloneElement(
        child,
        {
          ...child.props,
          ...props,
          key: uuid(),
        },
        child.props.children,
      );
      this.setState({ children: [...this.state.children, newComponent] });
    };

    addChildren = (routes) => {
      let newComponents = Array(routes.length);

      for (let index = 0; index < routes.length; index++) {
        let child = routes[index].route;
        let props = routes[index].props;

        newComponents[index] = React.cloneElement(
          child,
          {
            ...child.props,
            ...props,
            key: uuid(),
          },
          child.props.children,
        );
      }

      this.setState({ children: [].concat(this.state.children, [...newComponents]) });
    };

    getUniqueIdentifier = () => uuid();

    removeChild = (index) => {
      this.setState({
        children: [...this.state.children.slice(0, index), ...this.state.children.slice(index + 1)],
      });
    };

    removeItemByProp = (propToRemove) => {
      const key = Object.keys(propToRemove)[0];
      const positionToRemove = this.state.children.findIndex(({ props }) => props[key] === propToRemove[key]);

      if (positionToRemove !== -1) {
        this.removeChild(positionToRemove);
      }
    };

    removeChildren = () => {
      this.setState({ children: [] });
    };

    render = () => {
      return (
        <WrappedComponent {...this.props}>
          {[...(this.props.children || []), ...this.state.children]}
        </WrappedComponent>
      );
    };
  };
}
