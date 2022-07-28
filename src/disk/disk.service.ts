import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) { }
    getData(){
        console.log('Needs 20W to get data')
        this.powerService.supplyPower(20);
        return 'data';
    }
}
