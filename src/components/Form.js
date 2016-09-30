import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'form',
  fields: [
    'fruits[].name'
  ]
})
export default class Form extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    onEnter: PropTypes.func.isRequired
  };

  render() {
    const {
      handleSubmit,
      fields,
      onEnter
    } = this.props;
    const styles = require('../css/form.less');
    const submit = (app) => {
      onEnter(app);
    };

    return (
      <form
        className={styles.form}
        onSubmit={
          handleSubmit(
            values => submit(values)
          )
        }
      >
        <img src={require('../images/glass.png')} />
        {
          fields.fruits.map(fruit =>
            <p key={fruit.name.value} >
              <input type="text" {...fruit.name} />
            </p>
          )
        }
      </form>
    );
  }
}
