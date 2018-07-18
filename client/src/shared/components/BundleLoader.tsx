import * as React from "react";

interface BundleProps {
  load: Function;
  children: any;
}

interface BundleState {
  mod: null;
}
class Bundle extends React.Component<BundleProps, BundleState> {
  constructor(props: BundleProps) {
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null,
    };
  }

  public componentWillMount(): void {
    this.getComponent(this.props);
  }

  public componentWillReceiveProps(nextProps: BundleProps): void {
    if (nextProps.load !== this.props.load) {
      this.getComponent(nextProps);
    }
  }

  public getComponent(props: BundleProps): void {
    this.setState({ mod: null });
    // handle both es imports and cjs

    props.load().then((mod: any) => {
      const state = { mod: mod.default ? mod.default : mod };
      this.setState(state);
    });
  }

  public render(): any {
    if (this.state.mod) {
      return this.props.children(this.state.mod);
    }
  }
}

export default Bundle;
