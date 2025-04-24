import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service';

interface CountryData {
  name: string;
  capitalCity: string;
  region: { value: string };
  incomeLevel: { value: string };
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent {
  data?: CountryData;

  constructor(private countryService: CountryService) {}

  getCountryData(countryCode: string) {
    this.countryService.getCountryData(countryCode).subscribe((data: any) => {
      if (data[1] && data[1][0]) {
        const countryData = data[1]?.[0];
        this.data = {
          name: countryData.name,
          capitalCity: countryData.capitalCity,
          region: countryData.region,
          incomeLevel: countryData.incomeLevel,
          latitude: countryData.latitude,
          longitude: countryData.longitude
        };
      }
    }, (error) => {
      console.error("Error retreiving country data:", error);
    });
  }

  onCountryHover(event: MouseEvent) {
    const path = event.target as SVGPathElement;
    const countryCode = path.id;
    if (countryCode) {
        this.getCountryData(countryCode);
    }
}
}
