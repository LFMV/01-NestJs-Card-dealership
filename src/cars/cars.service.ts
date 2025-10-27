import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from './dtos';

/** 
 * nest g s cars --no-spec 
 * yarn add -D @types/uuid 
 * npm i class-validator class-transformer
 * */

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherockee'
        },
        
    ];

    findAll() {
       return this.cars;
    }

    findOneById( id: string ) {

        const car = this.cars.find( car => car.id === id );

        if ( !car ) throw new NotFoundException(`Car with "${ id }" not found`);
        return car;

    }

    create( createCarDto: CreateCarDto ) {

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push( car );
        return car;

    }

    update( id: string, updateCarDto: UpdateCarDto ) {

        if( updateCarDto.id && updateCarDto.id === id )
                throw new BadRequestException(`Car Id is not valid inside body`);
        
        let carDB = this.findOneById( id );
        this.cars = this.cars.map( car => {
            if ( car.id === id ) {
                carDB ={
                    // Esparce todas las propiedades
                    ...carDB, 
                    /** Esparzo las nuevas propiedades que vienen actualizadas
                     * y las sobrescribe en la anterior(carDB)
                    */ 
                    ...updateCarDto,
                   /** si viene un id lo sobrescribe en (updateCarDto) */
                   id
                }
                return carDB;
            }
            return car;
        })

        return carDB;
    }

    delete( id: string ) {
        const car = this.findOneById( id ); 
        this.cars = this.cars.filter( car => car.id !== id );        
    }

}
