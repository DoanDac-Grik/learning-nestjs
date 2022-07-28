import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';
@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) { }
    compute(a: number, b: number){
        console.log('10 watts needs to run Power Service');
        //To call Service in Power Module
        this.powerService.supplyPower(10);
        return a+b;
    }
}
