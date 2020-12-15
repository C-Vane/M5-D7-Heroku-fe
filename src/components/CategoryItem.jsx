import React from 'react';
import { Form, Row } from "react-bootstrap";
import PropTypes from 'prop-types';


class CategoryItem extends React.Component {

  toTitleCase = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }
  options = () => {
    const { categoryNames } = this.props;
    let element = [];
    categoryNames.forEach((name, i) => {
      element.push(<option key={i} value={i}>{this.toTitleCase(name)}</option>)
    })
    return element;
  }
  render() {
    const { onChange, onSearch } = this.props;
    return <Row className="justify-content-around mb-3">
      <Form>
        <Form.Control as='select' variant='secondary' style={{ width: "150px" }} placeholder='Category' id='category' onChange={onChange}>
          {this.options()}
        </Form.Control>
      </Form>
      <div className="input-group w-25">
        <input className="form-control" type="search" name="search" placeholder="Search" id="search" onChange={onSearch} />
        <div className="input-group-prepend">
          <button className="btn btn light"></button>
        </div>
      </div>
    </Row>;
  }
}

CategoryItem.propTypes = { category: PropTypes.number, categoryNames: PropTypes.array.isRequired, onChange: PropTypes.func, onSearch: PropTypes.func };
CategoryItem.defaultProps = { category: undefined };

export default CategoryItem;