//Function to ease retrieval of DOM elements
const elem = x => {
  return document.querySelector(x);
};

// Get the root element (usually :root)
const root = document.documentElement;

var slider = elem("#slider"),
  viewCount = elem("span.views_count"),
  price = elem("span.price"),
  billingType = elem("#billType"),
  billPeriod = elem("span.bill_period"),
  monthlyPrice = true; //Will be changed according to billing period type

/*
    ---reasoning----
    if 50% of the slider = 100K views what about 1%
    that will be 2K views

    if 100K = $16.00 what about 2K views
    that will be $0.32 :) 
    
    So, the views increments by 2 and price by 0.32

    let's implement this :)

*/
let viewsCalc = 100, //defaults
  pricing = 16.0;

slider.onchange = e => {
  let sliderSize = e.target.value;

  sliderTrackSize = root.style.setProperty(
    "--Slider-Truck-Size",
    sliderSize + "%"
  ); //Update

  //Calculations :)
  viewsCalc = (sliderSize * 2) / 1;

  monthlyPrice
    ? (pricing = ((viewsCalc * 16.0) / 100).toFixed(2))
    : (pricing = (
        (viewsCalc * 16.0) / 100 -
        ((viewsCalc * 16.0) / 100) * 0.25
      ).toFixed(2)); //check if monthly price otherwise give discount

  //Display
  viewCount.innerText = `${viewsCalc}`;

  price.innerText = `$${pricing}`;
};

//Update the pricing period if billing is checked to Yearly

billingType.onclick = e => {
  if (e.target.checked === true) {
    monthlyPrice = false;
    billPeriod.innerText = "/ year";
    pricing = ( //update the pricing
      (viewsCalc * 16.0) / 100 -
      ((viewsCalc * 16.0) / 100) * 0.25
    ).toFixed(2);
    price.innerText = `$${pricing}`;
  } else {
    monthlyPrice = true;
    billPeriod.innerText = "/ month";
    pricing = ((viewsCalc * 16.0) / 100).toFixed(2);
    price.innerText = `$${pricing}`;
  }
};
