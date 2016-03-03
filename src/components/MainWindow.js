import url from 'url';

import React, { PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Input from 'react-bootstrap/lib/Input';

export default class MainWindow extends React.Component {
  state = {
    selected: ""
  };

  handleChange = (value) => {
   this.setState({selected: value});
  };

  getMappedLogins = () => {
    if (this.props.logins.length === 0) {
      return [{label: 'LOADING'}]
    };
    return this.props.logins.map((login) => {
      const parsedUrl = url.parse(login.server);
      parsedUrl.auth = login.username;
      return {
        value: `${login.username}@${login.server}`,
        label: url.format(parsedUrl)
      };
    });
  };

  render () {
    const values = this.getMappedLogins();
    console.log(JSON.stringify(values));

    /* Maybe do a Menu of logins? */
    return (
      <Grid>
        <Row>
          <Col md={8}>
            <Input type='url' label='Url' />
          </Col>
          <Col md={4}>
            <Dropdown
              auto
              onChange={this.handleChange}
              source={values}
              value={this.state.selected}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

MainWindow.propTypes = {
  logins: PropTypes.array.isRequired
};
