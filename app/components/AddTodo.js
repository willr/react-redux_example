import React, { PropTypes } from 'react';

const AddTodo = React.createClass({
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={e => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  },

  handleClick() {
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
});

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

export default AddTodo;

