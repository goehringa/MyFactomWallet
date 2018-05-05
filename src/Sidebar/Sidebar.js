import React, { Component } from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
class Sidebar extends Component {
  state = {activeWalletID: 1}

  render() {
    const activeWalletID = this.state.activeWalletID;
    const sideBar_o = this;
    const listWallets = this.props.wallets.map(function(item, index){
    if (activeWalletID === item){
      return <Link key={index} to={"/wallet/manage/" + item}><WalletSmall onClick={() => {sideBar_o.handleClick(item)}} active id={item}/></Link>
    } else{
      return <Link key={index} to={"/wallet/manage/" + item}><WalletSmall onClick={() => {sideBar_o.handleClick(item)}} id={item}/></Link>
    }
    });
    return (
      <span className={this.props.className}>
        {listWallets}
        <AddWallet>+ New Wallet</AddWallet>
      </span>
    );
  }

  handleClick = (walletID) => {
    this.setState({
      activeWalletID: walletID,
    });
  }
}

class Wallet extends Component {
  state = {amount: 1203022.02}

  render() {
    const amount = '$' + this.state.amount.toLocaleString();
    const amountStyle = {
      fontSize:'35px'
    };
    return (
      <div className={this.props.className} onClick={this.props.onClick}>
        My Wallet #{this.props.id}
        <br/><br/>
        <span style={amountStyle}>{amount}</span>
        <br/><br/>
        503.2024920 FCT
      </div>
    );
  }
}

const WalletSmall = styled(Wallet)`
    width: 343px;
    height: 150px;
    border-radius: 6px;
    background-color: #103151;
    color: #ffffff;
    padding-left: 19px;
    padding-top: 17px;
    position: relative;
    margin-Top: 43px;
    font-family: Roboto;
    font-weight: 300;
    letter-spacing: 0.4px;
    ${props => props.active ?
      'background-image: linear-gradient(to bottom, #06c7ff, #0372ff); box-shadow: 0 0 10px 0 #007eff; font-weight:400' :
      ''};
`;

const AddWallet = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  line-height: 1.25;
  color: #007eff;
  margin-top: 9px;
  text-align: center;
`;

export default Sidebar;
