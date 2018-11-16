import React, { Component } from 'react';




class CheckIp extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('listArray') == null) {
      this.state = {
        ip: '',
        list: [],
        info: []
      }
    } else if (localStorage.getItem('ipData') == null) {
        this.state = {
        ip: '',
        list: [],
        info: []
      }
    } else {
      this.state = {
        ip: '',
        list: JSON.parse(localStorage.getItem('listArray')),
        info: JSON.parse(localStorage.getItem('ipData'))
      }
    }
  }
  handleSubmit(event) {
    event.preventDefault();

    let listArray = this.state.list;
    let ipData = this.state.info;
    let url = 'https://api.2ip.ua/geo.json?ip=';
    let that = this;
    fetch(url + this.state.ip).then(function(response) {
        if (response.status !== 200) { 
        alert('Looks like there was a problem. Status Code: ' + 
        response.status); 
        return; 
        }

         response.json().then(function(data) {
          ipData.unshift(data.city_rus);
          localStorage.setItem('ipData', JSON.stringify(ipData)); 

          listArray.unshift(data.ip);
          localStorage.setItem('listArray', JSON.stringify(listArray));

                  that.setState({
                  list: JSON.parse(localStorage.getItem('listArray')),
                  info: JSON.parse(localStorage.getItem('ipData')),
                  ip: ''
            });
                  
        }); 
      })
      .catch(function(err) { 
                  console.log('Fetch Error :-S', err); 
                  });
  }

  handleIpChange(event) {
    this.setState({ip: event.target.value});
  }

  clearHistory(event) {
    localStorage.removeItem('listArray');
    localStorage.removeItem('ipData');
    this.setState({
      list: [],
      info: []
    });
  }

  render() {
    return (
      <div className="container">
        <form className="form_check_ip" onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <p className="title">Введите ip-адрес</p>
            <input 
            type="text"
            placeholder="Ip-адрес..."
            value={this.state.ip}
            onChange={this.handleIpChange.bind(this)} 
             />
          </label>
          <p><button className="submit">Проверить</button></p>
        </form>
        <div>
          <ul className="ip-adress">
            {this.state.list.map((adress, index) => 
                  <li key={index}>Ip-адрес: {adress}</li>
                
              )}
          </ul>
          <ul className="city">
          {this.state.info.map((info, index) => 
                  <li key={index}>Город: {info}</li>
              )}
          </ul>
        </div>
        <form className="form_check_ip">
        <p><button 
        className="submit"
        onClick={this.clearHistory.bind(this)}
        >Очистить историю</button></p>
        </form>
      </div>
      );
  }
}

export default CheckIp;
