"use client"

import React from "react"
import "./SpinWheel.css"
import toast from "react-hot-toast"
import spinSound from "../assets/audio/CasinoWheel-m.mp3"
import chaCha from "../assets/audio/chacha.wav"
import dgLogo from "../assets/images/dealgrabberlogo.png"
import localopolyLogo from "../assets/images/localopolylogo.png"
import foodopolyLogo from "../assets/images/foodopoly.png"
import dealopolyLogo from "../assets/images/dealopoly.png"
import mobilopolyLogo from "../assets/images/mobilopoly.png"
import bizopolyLogo from "../assets/images/Bizopoly.png"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"
import prizeImage from "../assets/images/prize.png"
import { Link } from "react-router-dom"

export default class SpinWheel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItem: null,
      showPopup: false,
      name: "",
      phone: "",
      prize: "",
      hasWon: false,
      ipRestricted: false,
      userIp: "",
      isAuthenticated: false,
      showSpinGame: true,
      hasPlayed: false,
      formSubmitted: false,
      oneSignalInitialized: false,
    }
    this.selectItem = this.selectItem.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.audio = new Audio(spinSound)
    this.winningAudio = new Audio(chaCha)

    // Prize URLs mapping
    this.prizeUrls = {
      0: "", // No prize
      1: "https://lp.digicpn.com/deZ7EflDXv",
      2: "https://digicpn.com/p/njxfr2",
      3: "https://lp.digicpn.com/3VEeX4kepp",
      4: "https://digivoucher.online/p/7am3nf",
      5: "https://lp.digicpn.com/e1ikVxqr5o",
      6: "https://digicpn.com/p/zfe3xr",
    }
  }

  componentDidMount() {
    // Initialize OneSignal
    this.loadOneSignalSDK(() => {
      this.setupOneSignal() 
    })

    const auth = getAuth()
    this.authUnsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          showSpinGame: false,
        })
      } else {
        this.setState({
          isAuthenticated: false,
          showSpinGame: true,
        })
      }
    })

    this.fetchIpAndCheckRestriction()
  }

  componentWillUnmount() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe()
    }
  }

  // initializeOneSignal() {
  //   if (window.OneSignal && window.OneSignalInitialized) {
  //     console.warn("OneSignal is already initialized.")
  //     return
  //   }

  //   // Load OneSignal script dynamically
  //   const script = document.createElement("script")
  //   script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js"
  //   script.async = true
  //   script.onload = () => this.setupOneSignal()
  //   document.body.appendChild(script)
  // }

  loadOneSignalSDK(callback) {
    if (window.OneSignal) {
      console.warn("OneSignal is already loaded.")
      callback() // Run setup function immediately if SDK is already loaded
      return
    }
  
    const script = document.createElement("script")
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js"
    script.async = true
    script.onload = callback // ✅ Calls setupOneSignal() after SDK loads
    document.body.appendChild(script)
  }
  

  setupOneSignal() {
    if (window.OneSignalInitialized) return ;
  
    if (!window.OneSignal || typeof window.OneSignal !== "object") {
      console.warn("OneSignal SDK is not loaded yet.")
      return
    }
  
    window.OneSignal.push(() => {
      window.OneSignal.init({
        appId: "41678371-bbec-4aee-98ab-dfbe18be70b6",
        safari_web_id: "web.onesignal.auto.xxxxx",
        notifyButton: { enable: true },
        allowLocalhostAsSecureOrigin: true,
        serviceWorkerPath: "/OneSignalSDKWorker.js", // ✅ Ensure correct SW path
        serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
      })
    })
  
    window.OneSignalInitialized = true
    this.setState({ oneSignalInitialized: true })
  }
  

  async fetchIpAndCheckRestriction() {
    try {
      // For development/testing
      // if (process.env.NODE_ENV === 'development') {
      // Generate a random mock IP for testing
      // const mockIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      // console.log("Using mock IP for testing:", mockIp)
      // this.setState({ userIp: mockIp })
      // this.checkIpRestriction(mockIp)
      // return;
      // }

      // Normal production code
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      this.setState({ userIp: data.ip });
      this.checkIpRestriction(data.ip);
    } catch (error) {
      console.error("Error fetching IP:", error)
    }
  }

  async checkIpRestriction(ip) {
    const db = getFirestore()
    const spinRecordsRef = collection(db, "spinRecords")
    const q = query(spinRecordsRef, where("ip", "==", ip))

    try {
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        this.setState({
          ipRestricted: true,
          hasPlayed: true,
        })
        if(!isAuthenticated){
          toast.error("You can play only once. Create an account to access more exciting features");
        }
      }
    } catch (error) {
      console.error("Error checking IP restriction:", error)
    }
  }

  selectItem() {
    // Check if IP is restricted
    if (this.state.ipRestricted) {
      toast.error("You have already played the game from this device!")
      return
    }

    if (this.state.selectedItem === null) {
      const randomValue = Math.random()
      const selectedItem = randomValue < 0.5 ? 0 : 1

      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem)
      }
      this.setState({ selectedItem })
      this.audio.play()

      setTimeout(() => {
        this.audio.pause()
        this.audio.currentTime = 0

        // it's "Try Again"
        if (selectedItem === 0) {
          this.setState({
            hasWon: false,
            hasPlayed: true,
            showSpinGame: false,
          })
          toast.error("Try Again Next Time! 😞")
        } else {
          this.setState({
            hasWon: true,
            prize: this.props.prizes[selectedItem],
            showPopup: true,
            hasPlayed: true,
            showSpinGame: false,
          })
          this.winningAudio.play();
          toast.success(`Congratulations! You won Foodopoly! 🎉`)
        }
      }, 3000)
    } else {
      this.setState({ selectedItem: null })
      setTimeout(this.selectItem, 500)
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const { name, phone, prize, userIp, selectedItem } = this.state

    if (!name || !phone) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const db = getFirestore()

      await addDoc(collection(db, "spinRecords"), {
        name,
        phone,
        prize,
        ip: userIp,
        timestamp: new Date(),
      })

      // Send notification
      this.sendOneSignalNotification(name, prize)

      toast.success("Congratulations! Your prize has been claimed.")

      // Set state to hide popup
      this.setState({
        showPopup: false,
        formSubmitted: true,
        ipRestricted: true,
      })

      // Redirect to the appropriate prize URL
      if (selectedItem !== null && selectedItem !== 0) {
        const prizeUrl = this.prizeUrls[selectedItem]
        if (prizeUrl) {
          // Short delay to allow the toast to be seen
          setTimeout(() => {
            window.open(prizeUrl, "_blank");
          }, 500)
        }
      }
    } catch (error) {
      console.error("Error saving data:", error)
      toast.error("There was an error claiming your prize. Please try again.")
    }
  }

  sendOneSignalNotification(userName, prizeName) {
    if (!window.OneSignal) {
      console.error("OneSignal not initialized")
      return
    }

    window.OneSignal.getUserId().then((userId) => {
      if (userId) {
        console.log("OneSignal User ID:", userId)

        this.sendNotificationToUser(userId, userName, prizeName)
      } else {
        // If no user ID, we can still try to show a notification to the current user
        this.showLocalNotification(userName, prizeName)
      }
    })
  }

  sendNotificationToUser(userId, userName, prizeName) {
    console.log("Would send notification to user:", userId)
    console.log("Notification data:", {
      app_id: "41678371-bbec-4aee-98ab-dfbe18be70b6",
      include_player_ids: [userId],
      contents: {
        en: `Congratulations ${userName}! You've won: ${prizeName}`,
      },
      headings: {
        en: "Prize Claimed!",
      },
    })

    this.showLocalNotification(userName, prizeName)
  }

  showLocalNotification(userName, prizeName) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Prize Claimed!", {
        body: `Congratulations ${userName}! You've won: ${prizeName}`,
      })
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Prize Claimed!", {
            body: `Congratulations ${userName}! You've won: ${prizeName}`,
          })
        }
      })
    }
  }

  handleClosePopup() {
    this.setState({ showPopup: false })
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      selectedItem,
      showPopup,
      name,
      phone,
      hasWon,
      ipRestricted,
      isAuthenticated,
      showSpinGame,
      hasPlayed,
      formSubmitted,
      prize,
    } = this.state

    const { prizes } = this.props

    const logos = [dgLogo, foodopolyLogo, dealopolyLogo, mobilopolyLogo, bizopolyLogo, localopolyLogo, dgLogo]

    const wheelVars = {
      "--nb-item": prizes.length,
      "--selected-item": selectedItem,
    }
    const spinning = selectedItem !== null ? "spinning" : ""

    // If user is authenticated, don't show the spin game
    if (isAuthenticated) {
      return (
        <div className="authenticated-message">
          <h2>Welcome!</h2>
          <p>You're logged in!</p>
        </div>
      )
    }

    if (ipRestricted && (!hasWon || formSubmitted)) {
      return (
        <div className="restricted-message">
          <h2>You can play only once.</h2>
          <p>Create an account to access more exciting features</p>
          <Link to="/dealopoly-dynasty" className="create-account-link">
                  Create an Account
          </Link>
        </div>
      )
    }

    if (hasPlayed && !hasWon && !showSpinGame) {
      return (
        <div className="result-message lose">
          <h3>Try Again Next Time!</h3>
          <p>Better luck next time. Create an account to access more features.</p>
        </div>
      )
    }

    if (hasWon && !formSubmitted && !showPopup) {
      return (
        <div className="result-message win">
          <h3>Congratulations! You're a Winner!: Foodopoly</h3>
          <button className="claim-button" onClick={() => this.setState({ showPopup: true })}>
            Claim Prize
          </button>
        </div>
      )
    }

    return (
      <div>
        {showSpinGame && (
          <div className="wheel-container">
            <div className="wheel-indicator"></div>
            <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
              {prizes.map((item, index) => (
                <div className="wheel-item" key={index} style={{ "--item-nb": index }}>
                  <img src={logos[index] || "/placeholder.svg"} alt="Wheel Logo" className="wheel-logo" /> <br />
                  <span className="wheel-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="wheel-center" onClick={this.selectItem}></div>
          </div>
        )}

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div
                className="brand-logo"
                style={{
                  backgroundImage: `url(${prizeImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "80px",
                  height: "80px",
                }}
              ></div>
              <h2 className="brand-title">Enter Details to Claim Your Prize</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="inputs">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="popup-buttons">
                  <button type="submit" className="submit-bt">
                    Claim!
                  </button>
                  <button className="close-btn" type="reset" onClick={this.handleClosePopup}>
                    Home
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}







