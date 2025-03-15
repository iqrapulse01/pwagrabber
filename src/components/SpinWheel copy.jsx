import React from 'react';
import './SpinWheel.css';
import toast from 'react-hot-toast';

export default class SpinWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.prizes.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });

      // Show toast after selection
      setTimeout(() => {
        if(selectedItem === 0){
            toast.success(`Sorry No Prizes!😞 `);
        }
        else
        toast.success(`You won: ${this.props.prizes[selectedItem]}! 🎉`);
      }, 3000); // Delay to match spin animation
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { prizes } = this.props;

    const wheelVars = {
      '--nb-item': prizes.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {prizes.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
