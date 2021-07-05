import Axios from "axios";
import React, { Component } from "react";
import CarDisplay from "./CarDisplay";
import { NavLink } from "react-router-dom";
export default class Mainpage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getCarInfo();
  }

  state = {
    cars: null,
    loading: true,
  };
  getCarInfo = async () => {
    try {
      const data = await Axios.get("http://localhost:4000/unreserved");
      console.log(data.data);
      this.setState({
        cars: data.data,
        loading: false,
      });
    } catch (e) {
      alert("server is down");
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    return (
      <div>
        <nav style={{ textAlign: "right", marginRight: "20px" }}>
          <NavLink style={{ color: "blue" }} to="/signIn">
            Admin Login
          </NavLink>
        </nav>
        {this.state.loading ? <div class="loader"></div> : null}
        {!this.state.loading &&
          this.state.cars &&
          (this.state.cars.length ? (
            this.state.cars.map((car) => {
              return <CarDisplay data={car} />;
            })
          ) : (
            <h1>No Car Available</h1>
          ))}
      </div>
    );
  }
}
