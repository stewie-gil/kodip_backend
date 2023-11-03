import React from "react";
import { loadBingApi, Microsoft } from "./BingMapLoader";

class BingMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    loadBingApi().then(() => {
      this.initMap();
    });
  }

  render() {
    return <div ref={this.mapRef} className="map" />;
  }

  initMap() {
    const map = new Microsoft.Maps.Map(this.mapRef.current);
    if (this.props.mapOptions) {
      map.setOptions(this.props.mapOptions);
    }
    return map;
  }
}

export default BingMap;
