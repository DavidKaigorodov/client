export const handleStationButtonClick = (mapRef, stationPlacemarks) => {
    if (stationPlacemarks.current.length === 0) {
      fetchStationData(mapRef, stationPlacemarks);
    } else {
      clearStations(mapRef, stationPlacemarks);
    }
  };
  const fetchStationData = (mapRef, objectsAdded1) => {
    fetch('http://localhost:5000/api/Station')
      .then(response => response.json())
      .then(data => {
        data.forEach(coord => {
          const placemark = new window.ymaps.Placemark(
            [coord.latitude, coord.longitude],
            { hintContent: coord.address }
          );
  
          objectsAdded1.current.push(placemark);
          mapRef.current.geoObjects.add(placemark);
        });
      })
      .catch(error => {
        console.error('Error fetching station data:', error);
      });
  };
  
  const clearStations = (mapRef, objectsAdded1) => {
    objectsAdded1.current.forEach((placemark) => {
      mapRef.current.geoObjects.remove(placemark);
    });
    objectsAdded1.current = [];
  };

  