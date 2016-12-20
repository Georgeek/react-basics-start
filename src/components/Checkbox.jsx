import React from 'react';

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.initiallyChecked
		};

		this.handleClick = this.handleClick.bind(this); // откуда бы не вызывалась функция hadleClick
	} // this всегда будет привязана к объекту Checkbox

	handleClick(event) {
		this.setState({
			checked: !this.state.checked
		});
	}

	render() {
		return (
			<button className="checkbox icon" onClick={this.handleClick}>
					<i className="material-icons">{this.state.checked ? 'check_box' : 'check_box_outline_blank'}</i>
			</button>
		);
	}

}

Checkbox.propTypes = {
	initiallyChecked: React.PropTypes.bool.isRequired
};

export default Checkbox;
