import React from 'react';
import * as Babel from 'babel-standalone';

class BabelTransformer extends React.Component {
  constructor(props){
    super(props);
    this.state {
      inputJSX: '/* Insert JSX code here */',
      outputJS: '',
      error: ''
    }
    this.transformJSX = this.transformJSX.bind(this);
  }
  transformJSX(event) {

  }
  render() {
    return (
      <div>
        <div>
          <textarea id="input" onChange={this.transformJSX} defaultValue={this.state.inputJSX} ></textarea>
          <div id="output">{this.state.outJS}</div>
        </div>
        <footer>{this.state.error}</footer>
      </div>
    )
  }
}
