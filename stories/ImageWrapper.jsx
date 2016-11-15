import React from 'react';
import Image from 'components/image';

export default class ImageWrapper extends React.Component {
  state = {
    visible: false
  }
  onLoad = (promise) => {
    promise.then(() => {
      this.setState({visible: true});
    });
  }
  render () {
    const props = this.props;
    return (
      <figure>
        {this.state.visible ? '' : 'loading...'}
        <Image {...props} visible={this.state.visible} onLoad={this.onLoad}></Image>
        <figcaption>
          title of image
        </figcaption>
      </figure>
    );
  }
}
