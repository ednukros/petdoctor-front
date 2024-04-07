
import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/weather-service.service';
import { Weather, MinMax } from 'src/app/interfaces/weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cargando = false;
  city = "";
  region_name = "";
  country_name = "";
  hora = "";
  detallesHoy: Weather = {
    date: 0,
    temp2m: {
      min: 0,
      max: 0,
    },
    weather: '',
    wind10m_max: 0
  };
  tempMin = 0;
  tempMax = 0;
  detallesProximos = [];

  constructor(private weatherService: ClimaService) {

  }

  comenzarReloj() {
    const _this = this;
    setInterval(() => {
      let hora = "";
      let fecha = new Date();
      let horas = fecha.getHours();
      let minutos = fecha.getMinutes();
      let segundos = fecha.getSeconds();
      let horasArregladas = horas.toString();
      if (horas < 10) {
        horasArregladas = "0" + horasArregladas;
      }
      let minutosArreglados = minutos.toString();
      if (minutos < 10) {
        minutosArreglados = "0" + minutosArreglados;
      }
      let segundosArreglados = segundos.toString();
      if (segundos < 10) {
        segundosArreglados = "0" + segundosArreglados;
      }
      _this.hora = `${horasArregladas}:${minutosArreglados}:${segundosArreglados}`;
    }, 500);
  }

  async ngOnInit() {
    // Hacer que se muestre el indicador de carga
    this.cargando = true;
    // Obtener los datos de ubicación
    const datosDeUbicacion = await this.weatherService.obtenerDatosUbicacion();
    this.city = datosDeUbicacion.city;
    this.region_name = datosDeUbicacion.region_name;
    this.country_name = datosDeUbicacion.country_name;
    const { latitude, longitude } = datosDeUbicacion;
    // Obtener, ahora, los datos del clima
    const datosDeClima = await this.weatherService.obtenerDatosDeClima(latitude, longitude);
    // Cortamos el arreglo para mostrar la de hoy, y también las siguientes
    this.detallesHoy = datosDeClima.dataseries.slice(0, 1)[0];
    this.detallesProximos = datosDeClima.dataseries.slice(1, 5);
    this.tempMax =  this.detallesHoy.temp2m.max;
    this.tempMin =  this.detallesHoy.temp2m.min;
    console.log(this.detallesHoy.weather);
    




    // Ocultamos el indicador de carga y comenzamos el reloj
    this.cargando = false;
    this.comenzarReloj();


  }


}

function value(value: unknown, index: number, array: unknown[]): unknown {
  throw new Error('Function not implemented.');
}
