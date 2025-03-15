import React from 'react';
import './SpinWheel.css';
import toast from 'react-hot-toast';
import spinSound from '../assets/audio/CasinoWheel-m.mp3';
import logo from '../assets/images/dealgrabberlogo.png';

export default class SpinWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
    this.audio = new Audio(spinSound);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.prizes.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });

      this.audio.play();

      setTimeout(() => {
        this.audio.pause(); // Stop the audio when the spin stops
        this.audio.currentTime = 0;
        if (selectedItem === 0) {
          toast.success(`Sorry, No Prize! 😞`);
        } else {
          toast.success(`You won: ${this.props.prizes[selectedItem]}! 🎉`);
        }
      }, 3000);
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
        <div className="wheel-indicator"></div>
        <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
          {prizes.map((item, index) => (
            <div
            className="wheel-item"
            key={index}
            style={{
              '--item-nb': index,
              backgroundColor: index % 2 === 0 ? '#044f70' : '#148446',
            }}
          >
            <img src={logo} alt="DG Logo" className="wheel-logo" />
            <span className="wheel-text">{item}</span>
          </div>
          
          ))}
        </div>
        <div className="wheel-center" onClick={this.selectItem}></div>
      </div>
    );
  }
}
