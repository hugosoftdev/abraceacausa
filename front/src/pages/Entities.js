import React from 'react';

class Entities extends React.Component {
  state = {
    entities: [],
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Entities;
