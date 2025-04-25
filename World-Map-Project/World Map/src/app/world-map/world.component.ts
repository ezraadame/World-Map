import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service'
import { CountryData } from '../models/country-data.model';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})

export class WorldComponent {
  data?: CountryData;
  error: boolean = false;

  constructor(private countryService: CountryService) {}

  getCountryData(countryCode: string) {
    this.error = false;
    this.countryService.getCountryData(countryCode).subscribe((data: any) => {
      if (data[1] && data[1][0]) {
        const countryData = data[1]?.[0];
        this.data = {
          name: countryData.name,
          capitalCity: countryData.capitalCity,
          region: countryData.region,
          incomeLevel: countryData.incomeLevel,
          latitude: countryData.latitude,
          longitude: countryData.longitude,
          iso2Code: countryData.iso2Code
        };
      } else {
        this.error = true;
      }
    }, (error) => {
      this.error = true;
      console.error("Error retrieving country data:", error);
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
