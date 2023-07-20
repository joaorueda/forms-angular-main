import { Directive } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from "@angular/forms";
import { Observable, map } from "rxjs";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Directive({
  selector: "[validadorCep]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})

export class ValidandoCepDirective implements AsyncValidator {

  constructor(private cepConsulta: ConsultaCepService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.cepConsulta
      .getConsultaCep(cep)
      .pipe(
        map((res: any) => 
          res.erro ? { validadorCep: true } : null
        )
      );
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
