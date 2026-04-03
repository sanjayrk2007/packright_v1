import {
  PACKING_BASE,
  BEACH_EXTRAS,
  BUSINESS_EXTRAS,
  ADVENTURE_EXTRAS,
  COLD_EXTRAS,
  RAIN_EXTRAS,
  HOT_EXTRAS,
} from '../data/packingData.js';

export function buildPackingList(destObj, numDays, type, weatherData, persons = 1){
  const list=JSON.parse(JSON.stringify(PACKING_BASE));
  const shirtCount=Math.min(numDays+1,15) * persons;
  const standardCount=Math.min(numDays+1,15) * persons;
  list.Clothing=list.Clothing.map(i=>
    i==="T-shirts / tops"?`T-shirts / tops ×${shirtCount}`:
    i==="Socks"?`Socks ×${standardCount}`:
    i==="Underwear"?`Underwear ×${standardCount}`:i
  );
  if(numDays>5) list.Clothing.push("Laundry bag","Travel laundry detergent sheets");
  if(numDays>9) list.Essentials.push("Extra SIM card / local eSIM","Large checked luggage lock");
  if(type==="beach")     list["Beach Gear"]=BEACH_EXTRAS;
  if(type==="business")  list["Business"]=BUSINESS_EXTRAS;
  if(type==="adventure") list["Adventure Gear"]=ADVENTURE_EXTRAS;

  if(weatherData){
    const daily=weatherData.daily;
    const n=Math.min(numDays,7);
    const avgMax=daily.temperature_2m_max.slice(0,n).reduce((a,b)=>a+b,0)/n;
    const avgMin=daily.temperature_2m_min.slice(0,n).reduce((a,b)=>a+b,0)/n;
    const avgRain=daily.precipitation_probability_max.slice(0,n).reduce((a,b)=>a+b,0)/n;
    const weatherTags=[];
    if(avgMax>32){weatherTags.push("hot");list["For the Heat"]=HOT_EXTRAS;}
    if(avgMin<5) {weatherTags.push("cold");list["Cold Weather"]=COLD_EXTRAS;}
    if(avgRain>50){weatherTags.push("rainy");list["Rain Gear"]=RAIN_EXTRAS;}
    return{list,weatherTags,avgMax:Math.round(avgMax),avgMin:Math.round(avgMin),avgRain:Math.round(avgRain)};
  }
  return{list,weatherTags:[],avgMax:null,avgMin:null,avgRain:null};
}
