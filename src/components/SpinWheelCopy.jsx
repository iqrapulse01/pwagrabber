import React from 'react';
import { withRouter } from './withRouter'; // A helper to use navigation in class components
import './SpinWheel.css';
import toast from 'react-hot-toast';
import spinSound from '../assets/audio/CasinoWheel-m.mp3';
import dgLogo from '../assets/images/dealgrabberlogo.png';
import localopolyLogo from '../assets/images/localopolylogo.png';
import foodopolyLogo from '../assets/images/foodopoly.png';
import dealopolyLogo from '../assets/images/dealopoly.png';
import mobilopolyLogo from '../assets/images/mobilopoly.png';
import bizopolyLogo from '../assets/images/Bizopoly.png';

class SpinWheelCopy extends React.Component {
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
        this.audio.pause();
        this.audio.currentTime = 0;

        if (selectedItem === 0) {
          toast.success(`Sorry, No Prize! 😞`);
        } else {
          const prize = this.props.prizes[selectedItem];
          toast.success(`Congratulations! You're a Winner!: ${prize}! 🎉`);
          
          // Redirect to the Claim Prize page with the prize as state
          this.props.navigate('/claim-prize', { state: { prize } });
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
    
    const logos = [dgLogo, dealopolyLogo, foodopolyLogo, mobilopolyLogo, bizopolyLogo, localopolyLogo, dgLogo];
    
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
              style={{ '--item-nb': index }}
            >
              <img src={logos[index]} alt="Wheel Logo" className="wheel-logo" /> <br />
              <span className="wheel-text">{item}</span>
            </div>
          ))}
        </div>
        <div className="wheel-center" onClick={this.selectItem}></div>
      </div>
    );
  }
}

export default withRouter(SpinWheelCopy);
