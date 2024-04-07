import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private RUTA_API_UBICACION = "https://api.ipgeolocation.io/ipgeo?apiKey=d08f0216e7c142f59f5bedab4c08b8f9";

  constructor() { }

  async obtenerDatosUbicacion() {
    const response = await fetch(this.RUTA_API_UBICACION)
    return await response.json();
  }


  async obtenerDatosDeClima(longitude: string, latitude: string) {
    const response = await fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
    return await response.json();
  }

  parsearFecha(value: string) {
    value = "" + value;
    if (!value) {
      return "";
    }
    let anio = value.substring(0, 4);
    let mes = value.substring(4, 6);
    let dia = value.substring(6, 8);
    return dia + "-" + mes + "-" + anio;
  }
}
