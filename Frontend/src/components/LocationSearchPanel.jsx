import React from 'react'; 
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
  setSuggestions
}) => {
  // Render the list of location suggestions provided via props
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);
    } else if (activeField === 'destination') {
      setDestination(suggestion.description);
    }
    // Clear suggestions and close the panel
    setSuggestions([]);
    //setPanelOpen(false);
    // Optionally, open the vehicle panel if further action is desired
   // setVehiclePanel(true);
  };

  return (
    <div>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className="flex gap-4 border-2 p-3 rounded-xl px-2 items-center justify-start my-2 border-white active:border-black cursor-pointer"
        >
          <div className="bg-[#eee] p-2 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </div>
          <h4 className="font-medium">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
