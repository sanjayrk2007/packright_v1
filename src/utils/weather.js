export function weatherInfo(code){
  if(code<=1)  return{icon:"☀️",desc:"Clear sky"};
  if(code<=3)  return{icon:"🌤️",desc:"Partly cloudy"};
  if(code<=49) return{icon:"🌫️",desc:"Foggy"};
  if(code<=59) return{icon:"🌦️",desc:"Drizzle"};
  if(code<=69) return{icon:"🌧️",desc:"Rainy"};
  if(code<=79) return{icon:"❄️",desc:"Snowy"};
  if(code<=84) return{icon:"🌧️",desc:"Rain showers"};
  if(code<=94) return{icon:"⛈️",desc:"Thunderstorm"};
  return{icon:"⚡",desc:"Severe storm"};
}
