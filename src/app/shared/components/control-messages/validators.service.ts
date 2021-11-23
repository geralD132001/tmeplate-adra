import {Injectable} from '@angular/core';

@Injectable()
export class ValidatorsService {

    getMessage(validatorName: string, validatorValue?: any): any {
        // console.log(validatorName, validatorValue);
        const config = {
            required: 'Campo requerido',
            email: 'Correo electronico invalido',
            max: 'El máximo es ' + ' ' + validatorValue['max'] + ' ' + 'actual' + ' ' + validatorValue['actual'],
        };
        return config;
    }
}
