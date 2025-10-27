import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car-dto';
import { UpdateCarDto } from './dtos/update-car-dto';

@Controller('cars')
@UsePipes( ValidationPipe )
export class CarsController {

    /**
     *  los controllers solo escuchar las solicitudes
     *  del cliente y regresa una respuesta, no manejan la 
     *  lógica de negocio
     *  */ 

    constructor(
        private readonly carServ: CarsService
    ) {}

  @Get()
  getAllCars() {    
    return this.carServ.findAll();
  }

  @Get(':id') 
  getCardById( @Param('id', ParseUUIDPipe ) id: string ) {
    console.log({ id });    
    return this.carServ.findOneById( id );
  }
 
  @Post()  
  create( @Body() createCarDto: CreateCarDto ) {
    return this.carServ.create( createCarDto );
  }

  @Patch(':id')
  updateCar( 
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() updateCarDto: UpdateCarDto ) {
    return updateCarDto;
  }

  @Delete(':id')
  deleteCar( @Param('id', ParseIntPipe ) id: number ) {
    return {
        method: 'delete',
        id
    }
  }

}
