import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brans.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class SeedService {

    constructor( 
        private readonly carServ: CarsService,
        private readonly brandsServ: BrandsService,
    ) {}
  
    populateDB() {

        this.carServ.fillCarsWithSeedData( CARS_SEED );
        this.brandsServ.fillCarsWithSeedData( BRANDS_SEED )

        return 'SEED executed';

    }
}
